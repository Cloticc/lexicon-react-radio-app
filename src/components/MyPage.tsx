import 'react-tabs/style/react-tabs.css';

import { IChannel, IFavoriteItem, IProgram } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useContext, useEffect } from 'react';

import { FavoriteContext } from '../context/ContexProvider'; // Adjust the path to match your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const MyPage = () => {
  const { favorites, removeFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    //will update the favorites state
    // console.log(favorites);
    // console.log(favorites.filter(favorite => favorite.type === 'channel'));


  }, [favorites]);


  return (
    <div className="myPage bg-gray-100 p-4 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Favoriter</h1>
      <Tabs>
        <TabList className="flex border-b">
          <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Favorit kanal</Tab>
          <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Favorit program</Tab>
        </TabList>
        <TabPanel className="p-4 bg-white rounded-b-lg">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {favorites.filter(favorite => favorite.type === 'channel').map((favorite: IFavoriteItem) => {
              if (favorite.type === 'channel') {
                const channel = favorite as IChannel;
                return (
                  <div key={channel.id} className="card border rounded-lg overflow-hidden shadow-md bg-white relative">
                    <img src={channel.image} alt={channel.name} className="w-full h-64 object-cover-fill" />
                    <div className="p-4">
                      <h2 className="text-xl mb-2">{channel.name}</h2>
                      <p className="text-gray-700 mb-2">{channel.tagline}</p>
                      <a href={channel.siteurl} className="text-blue-500 hover:underline mb-2 block">Besök sida</a>
                      <Link className="text-blue-500 hover:underline" to={`/channels/channel/${channel.name}/${channel.id}`}>
                        <h2 className="text-xl font-bold">Länk till detaljer</h2>
                      </Link>
                      <button onClick={() => removeFavorite(channel)} className="absolute top-0 right-0 m-2">
                        <FontAwesomeIcon icon={faStar} color="red"/>
                      </button>
                    </div>
                  </div>
                );
              }
              return null; // will return null if the favorite is not a channel
            })}
          </div>
        </TabPanel>
        <TabPanel className="p-4 bg-white rounded-b-lg">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {favorites.filter(favorite => favorite.type === 'program').map((favorite: IFavoriteItem) => {
              if (favorite.type === 'program') {
                const program = favorite as IProgram;
                return (
                  <div key={program.id} className="card border rounded-lg overflow-hidden shadow-md bg-white relative">
                  <img src={program.programimage} alt={program.name} className="w-full h-64 object-cover-fill" />
                  <div className="p-4">
                    <h2 className="text-xl mb-2">{program.name}</h2>
                    <p className="text-gray-700 mb-2">{program.description}</p>
                    <p className="text-gray-700 mb-2">{program.broadcastinfo}</p>
                    <a href={program.programurl} className="text-blue-500 hover:underline mb-2 block">Besök sida</a>
                    <Link className="text-blue-500 hover:underline" to={`/programs/program/${program.id}`}>
                    <h2 className="text-xl font-bold">Länk till detaljer</h2>
                    </Link>
                    <button onClick={() => removeFavorite(program)} className="absolute top-0 right-0 m-2">
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

