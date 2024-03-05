// import { IProgram } from '../interface/Interface';

import { IProgram } from '../interface/Interface';
import { Link } from 'react-router-dom';
import React from 'react';
import { useSearchPrograms } from '../api/apiSearch';

export const SearchComponent: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  // const { data: episode, isLoading, isError } = useSearchEpisodes(searchQuery);
  const { data: programs, isLoading, isError } = useSearchPrograms(searchQuery);




  function handleProgramClick(program: IProgram): void {
    // console.log(program);

     

  }

  // function handleEpisodeClick(episode: IEpisode): void {
  //   console.log(episode);
  // }
  console.log('Programs:', programs);
  // console.log('Episodes:', episodes);

  if (isLoading || !searchQuery) {
    return null;
  }



  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <div className="absolute bg-white rounded border mt-2 z-50 max-h-64 overflow-auto">
        {programs.map((program: IProgram) => (
        <Link 
            key={program.id} 
            to={`/programs/program/${program.id}`} 
            className="p-2 hover:bg-gray-200 cursor-pointer block"
            onClick={() => handleProgramClick(program)}
          >
            {program.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
