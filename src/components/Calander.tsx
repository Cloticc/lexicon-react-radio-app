import { useEffect, useState } from "react";

import { IBroadcast } from '../interface/Interface';

interface CalanderProps {
  broadcasts: IBroadcast[];
}

export function Calander({ broadcasts }: CalanderProps) {

  const [currentDate, setCurrentDate] = useState(new Date());

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

  currentDate.setHours(0, 0, 0, 0); // to ignore time part of the date when comparing dates



  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  let key = 0;
  const rows = [];
  for (let i = 0; i < daysInMonth; i += 7) {
    const cells = [];
    for (let j = i; j < i + 7 && j < daysInMonth; j++) {
      const isToday = j + 1 === currentDate.getDate();
   
      const dayBroadcasts = broadcasts.filter(broadcast => {
        const startTimeMilliseconds = parseInt(broadcast.localstarttime.replace(/\/Date\((-?\d+)([+-]\d{4})\)\/$/, '$1'));
        const broadcastDate = new Date(startTimeMilliseconds);
        const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), j + 1);
        return broadcastDate.getFullYear() === cellDate.getFullYear() &&
          broadcastDate.getMonth() === cellDate.getMonth() &&
          broadcastDate.getDate() === cellDate.getDate();
      });

      cells.push(
        <td key={j} className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease ${isToday ? 'bg-gray-100 text-white' : 'hover:bg-gray-300'}`}>
          <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
            <div className="top h-5 w-full">
              <span className="text-gray-500">{j + 1}</span>
            </div>
            <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer overflow-auto">
              {dayBroadcasts.map((broadcast, index) => (
                // <div key={index} className="event bg-purple-400 text-white rounded p-1 text-sm mb-1" onClick={() => window.open(broadcast.liveaudio.url, '_blank')}>
                <div key={index} className="event bg-purple-400 text-white rounded p-1 text-sm mb-1" onClick={() => window.open(broadcast.liveaudio.url, '_blank')}>
                  <span >{broadcast.name}</span>
                  <span className="">{new Date(parseInt(broadcast.localstarttime.replace(/[^0-9 +]/g, ''))).toLocaleString('sv-SE', { hour: 'numeric', minute: 'numeric', hour12: false })}</span>
                </div>
              ))}
            </div>
          </div>
        </td>
      );
    }
    rows.push(<tr key={key++} className="text-center h-20">{cells}</tr>);
  }

  return (
    <div className="bg-gray-200">
      <div className="wrapper bg-white rounded shadow w-full ">
        <div className="header flex justify-between border-b p-2">
          <span className="text-lg font-bold">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </span>
          <div className="buttons">
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Sunday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Monday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Tuesday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Wednesday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Thursday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Friday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">Saturday</span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* inserty here */}
            {rows}

          </tbody>
        </table>
      </div>
    </div>
  );
}
