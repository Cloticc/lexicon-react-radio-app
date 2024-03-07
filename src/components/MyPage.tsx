import 'react-tabs/style/react-tabs.css';

import { IChannel, IFavoriteItem, IProgram } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useContext, useEffect } from 'react';

import { FavoriteContext } from '../context/ContexProvider'; // Adjust the path to match your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface MyPageProps {
  onPlayAudio: (src: string) => void;
}


export const MyPage: React.FC<MyPageProps> = ({ onPlayAudio }) => {
  const { favorites, removeFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    //will update the favorites state
    // console.log(favorites);
    // console.log(favorites.filter(favorite => favorite.type === 'channel'));


  }, [favorites]);

  const handlePlay = (audioSrc: string) => {
    onPlayAudio(audioSrc);
  };

  return (
    <div className="p-4 rounded-md shadow-lg">
      <Tabs>
        <TabList className="flex space-x-4 mb-4">
          <Tab selectedClassName="bg-blue-500" className="bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Favorit kanal</Tab>
          <Tab selectedClassName="bg-blue-500" className="bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Favorit program</Tab>
        </TabList>
        <TabPanel className="p-4 rounded-b-lg">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {favorites.filter(favorite => favorite.type === 'channel').map((favorite: IFavoriteItem) => {
              if (favorite.type === 'channel') {
                const channel = favorite as IChannel;
                return (
                  <div key={channel.id} className="card border rounded-lg overflow-hidden shadow-md bg-gray-800 text-white relative">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img src={channel.image} alt={channel.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl mb-2">{channel.name}</h2>
                      <p className="text-gray-300 mb-2">{channel.tagline}</p>
                      <a href={channel.siteurl} className="text-blue-400 hover:underline mb-2 block">Besök sida</a>
                      <Link className="text-blue-400 hover:underline" to={`/channels/channel/${channel.name}/${channel.id}`}>
                        <h2 className="text-xl font-bold">Länk till detaljer</h2>
                      </Link>
                      <button onClick={() => removeFavorite(channel)} className="absolute bottom-0 right-0 m-2">
                        <FontAwesomeIcon icon={faStar} color="red" />
                      </button>
                      <button onClick={() => handlePlay(channel.liveaudio.url)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Play Audio</button>
                    </div>
                  </div>
                );
              }
              return null; // will return null if the favorite is not a channel
            })}
          </div>
        </TabPanel>
        <TabPanel className="p-4  rounded-b-lg">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {favorites.filter(favorite => favorite.type === 'program').map((favorite: IFavoriteItem) => {
              if (favorite.type === 'program') {
                const program = favorite as IProgram;
                return (
                  <div key={program.id} className="card border rounded-lg overflow-hidden shadow-md bg-gray-800 text-white relative">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img src={program.programimage} alt={program.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl mb-2">{program.name}</h2>
                      <p className="text-gray-300 mb-2">{program.description}</p>
                      <p className="text-gray-300 mb-2">{program.broadcastinfo}</p>
                      <a href={program.programurl} className="text-blue-400 hover:underline mb-2 block">Besök sida</a>
                      <Link className="text-blue-400 hover:underline" to={`/programs/program/${program.id}`}>
                        <h2 className="text-xl font-bold">Länk till detaljer</h2>
                      </Link>
                      <button onClick={() => removeFavorite(program)} className="absolute bottom-0 right-0 m-2">
                        <FontAwesomeIcon icon={faStar} color="red" />
                      </button>
                    </div>
                  </div>
                );
              }
              return null; // will return null if the favorite is not a program
            })}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

