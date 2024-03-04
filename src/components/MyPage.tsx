import 'react-tabs/style/react-tabs.css';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { FavoriteContext } from '../context/ContexProvider'; // Adjust the path to match your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChannel } from '../interface/Interface';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

export const MyPage = () => {
  const { favorites, removeFavorite } = useContext(FavoriteContext);

  return (
    <div className="myPage bg-gray-100 p-4 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Favorite Page</h1>
      <Tabs>
        <TabList className="flex border-b">
          <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Favorit kanal</Tab>
          <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Favorit program</Tab>
        </TabList>
        <TabPanel className="p-4 bg-white rounded-b-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((favorite: IChannel) => (
              <div key={favorite.id} className="relative rounded overflow-hidden shadow-lg m-2 bg-white">
                <img className="w-full h-64 object-cover" src={favorite.image} alt={favorite.name} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{favorite.name}</div>
                  <p className="text-gray-700 text-base">{favorite.tagline}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  {/* <a href={favorite.siteurl} className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Visit Site</a>
              <Link className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2" to={`/channels/favorite/${favorite.name}/${favorite.id}`}>
                Länk till detaljer
              </Link> */}
                  <a href={favorite.siteurl} className="text-blue-500 hover:underline mb-2 block">Besök sida</a>
                  <Link className="text-blue-500 hover:underline" to={`/channels/channel/${favorite.name}/${favorite.id}`}>
                    <h2 className="text-xl font-bold">Länk till detaljer</h2>
                  </Link>
                </div>
                <div className="absolute top-0 right-0 m-2">
                  <button onClick={() => removeFavorite(favorite)} className="absolute top-0 right-0 m-2 ">
                    <FontAwesomeIcon icon={faStar} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel className="p-4 bg-white rounded-b-lg">
          <h2 className="text-xl font-semibold mb-2">Favoritprogram</h2>
          <p className="text-gray-600">Inget favoritprogram</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};