import { useEffect, useRef } from 'react';

import { IScheduleEpisode } from '../interface/Interface';
import { UseQueryResult } from '@tanstack/react-query';

export const WeeklyCalendar = ({ channelScheduleResults }: { channelScheduleResults: UseQueryResult<IScheduleEpisode[], Error>[] }) => {
  const currentHourRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentHourRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  // export const WeeklyCalendar = ({ channelSchedule }: { channelSchedule: IScheduleEpisode[] }) => {
  // const daysOfWeek = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];
  // const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

  // const currentHour = new Date().getHours();
// const hoursOfDay = Array.from({ length: 24 }, (_, i) => (currentHour + i) % 24);

return (
  <div className="calendar bg-gray-800 text-white">
    <div className="calendar-header">
      <h1 className="text-xl font-bold text-center text-white">Veckoschema</h1>
      <div className="flex items-center justify-between">
      </div>
    </div>
    <div className="calendar-body">
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="text-center font-bold text-white">{day}</div>
        ))}
      </div>
      {hoursOfDay.map((hour) => (
        <div key={hour} className="grid grid-cols-7 gap-1 text-gray-300" ref={hour === new Date().getHours() ? currentHourRef : null}>
          {channelScheduleResults && daysOfWeek.map((day, i) => (
            <div key={i} className="text-center ">
              {channelScheduleResults[i]?.data
                ?.filter((schedule) => {
                  const startTime = new Date(parseInt(schedule.starttimeutc.replace(/[^0-9 +]/g, "")));
                  const currentTime = new Date();
                  return startTime.toISOString().split('T')[0] === day && startTime.getHours() === hour && (i !== 0 || startTime > currentTime);
                })
                .map((schedule, index) => (
                  <div key={index} className="space-y-2">
                    <span className="block text-lg font-semibold text-gray-300">{schedule.title}</span>
                    <span className="block text-sm text-gray-300">
                      {new Date(parseInt(schedule.starttimeutc.replace(/[^0-9 +]/g, ""))).toLocaleString("sv-SE", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      })}
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
};