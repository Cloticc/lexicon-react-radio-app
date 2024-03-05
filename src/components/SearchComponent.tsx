// import { IProgram } from '../interface/Interface';

import { IProgram } from '../interface/Interface';
import React from 'react';
import { useSearchPrograms } from '../api/apiSearch';

export const SearchComponent: React.FC<{ searchQuery: string }> = ({ searchQuery }) => { 
  // const { data: episode, isLoading, isError } = useSearchEpisodes(searchQuery);
  const { data: programs, isLoading, isError } = useSearchPrograms(searchQuery);

  function handleProgramClick(program: IProgram): void {
    console.log(program);
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
        {/* {episodes.map((episode: IEpisode) => ( */}
        {/* <div key={episode.id} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleEpisodeClick(episode)}> */}
        {/* {episode.title} */}
        {/* {episode.title} */}
        {/* </div> */}
        {/* ))} */}
        {programs.map((program: IProgram) => (
          <div key={program.id} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProgramClick(program)}>
            {program.name}
            <div>
              {/* <img src={program.programimagetemplate} alt="Program" /> */}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
