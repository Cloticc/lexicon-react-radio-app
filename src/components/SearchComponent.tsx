// SearchComponent.tsx

import { IEpisode } from '../interface/Interface';
import React from 'react';
import { useSearchEpisodes } from '../api/apiSearch';

export const SearchComponent: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  // const [searchQuery, setSearchQuery] = useState('');
  const { data: episodes, isLoading, isError } = useSearchEpisodes(searchQuery);


  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     onSearch(searchQuery);
  //   }, 500); // 500ms delay

  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [searchQuery, onSearch]);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(event.target.value);
  // };

  const handleEpisodeClick = (episode: IEpisode) => {
    console.log(episode);
    // Handle the episode click event here
  };



  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Sök på Sveriges Radio..."
        className="rounded py-2 px-4 text-gray-700 bg-white border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
        value={searchQuery}
        onChange={handleSearchChange}
      /> */}
      <div className="absolute bg-white rounded border mt-2 z-50 max-h-64 overflow-auto">
        {episodes.map((episode: IEpisode) => (
          <div key={episode.id} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleEpisodeClick(episode)}>
            {/* add small img right side */}
            {/* <img src={episode.imageurl} alt={episode.title} className="float-left h-10 w-10" /> */}
            {episode.title}
          </div>
        ))}
      </div>
    </div>
  );
};