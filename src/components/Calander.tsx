import { useEffect, useState } from "react";

import { IBroadcast } from '../interface/Interface';

interface CalanderProps {
  broadcasts: IBroadcast[];
}

export function Calander({ broadcasts }: CalanderProps) {

  const [currentDate, setCurrentDate] = useState(new Date());

  /* The `useEffect` hook in the provided code is responsible for updating the `currentDate` state at
  midnight each day. Here's a breakdown of what the `useEffect` block is doing: */
  useEffect(() => {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    const timeUntilMidnight = nextDay.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, timeUntilMidnight);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [currentDate]); // Only re-run the effect if the date changes

  currentDate.setHours(0, 0, 0, 0); // to ignore time part of the date when comparing dates later



  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  let key = 0;
  const rows = [];

  let cells = [];

  // Generate empty cells to align the starting day of the month hopefully work gotta see next month
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(<td key={`empty-${i}`} className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10"></td>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const today = new Date();
    const isToday = i === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

    const dayBroadcasts = broadcasts.filter(broadcast => {
      const startTimeMilliseconds = parseInt(broadcast.localstarttime.replace(/\/Date\((-?\d+)([+-]\d{4})\)\/$/, '$1'));
      const broadcastDate = new Date(startTimeMilliseconds);
      const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      return broadcastDate.getFullYear() === cellDate.getFullYear() &&
        broadcastDate.getMonth() === cellDate.getMonth() &&
        broadcastDate.getDate() === cellDate.getDate();
    });

    cells.push(
      <td key={i} className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease ${isToday ? 'bg-gray-100 text-white' : 'hover:bg-gray-300'}`}>
        <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
          <div className="top h-5 w-full">
            <span className="text-gray-500">{i}</span>
          </div>
          <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer overflow-auto">
            {dayBroadcasts.map((broadcast, index) => (
              <div key={index} className="event bg-purple-400 text-white rounded p-1 text-sm mb-1" onClick={() => window.open(broadcast.liveaudio.url, '_blank')}>
                <span >{broadcast.name}</span>
                <span className="">{new Date(parseInt(broadcast.localstarttime.replace(/[^0-9 +]/g, ''))).toLocaleString('sv-SE', { hour: 'numeric', minute: 'numeric', hour12: false })}</span>
              </div>
            ))}
          </div>
        </div>
      </td>
    );

    // If we have added 7 cells or it's the last day of the month, push the current row and reset cells
    if (cells.length === 7 || i === daysInMonth) {
      rows.push(<tr key={key++} className="text-center h-20">{cells}</tr>);
      cells = []; // Reset cells array for the next row
    }
  }
  const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  const shortDays = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];

  return (
    <div className="bg-gray-200">
      <div className="wrapper bg-white rounded shadow w-full ">
        <div className="header flex justify-between border-b p-2">
          <span className="text-lg font-bold uppercase">
            {currentDate.toLocaleString('sv-SE', { month: 'long' })} {currentDate.getFullYear()}
          </span>
          <div className="buttons">
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {days.map((_day, index) => (
                <th key={index} className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">{days[index]}</span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">{shortDays[index]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* insert here */}
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
}

