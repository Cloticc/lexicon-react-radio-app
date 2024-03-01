import React from 'react';
import { useScheduleEpisodes } from '../api/ScheduleEpisode';

export const ScheduleEpisode = () => {
  
  const { data, isLoading, isError, error } = useScheduleEpisodes(164);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <header className='header-wrapper'>
        <h1>Lissen Directly</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data && data.map((episode, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg p-4">
            <h2 className="text-xl font-bold">{episode.title}</h2>
            <p className="text-sm text-gray-500">{episode.description}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};