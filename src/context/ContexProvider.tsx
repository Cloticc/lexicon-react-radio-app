import { FavoriteItem, IFavoriteItem } from "../interface/Interface";
import { ReactElement, ReactNode, createContext, useEffect, useState } from "react";

interface IContext {
  favorites: IFavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (item: FavoriteItem) => void;


}

interface IFavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext({} as IContext);

export function FavoriteProvider({ children }: IFavoriteProviderProps): ReactElement {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const addFavorite = (item: FavoriteItem) => {
    const isExist = favorites.find((favorite) => favorite.id === item.id);
    if (isExist) return;
    const newFavoriteList = [...favorites, item];
    setFavorites(newFavoriteList);
    // console.log(newFavoriteList);
    localStorage.setItem('favorites', JSON.stringify(newFavoriteList));
    if (newFavoriteList.length > favorites.length) {
      setNotification({ type: 'success', message: 'Channel added to favorites!' });
    } else {
      setNotification({ type: 'error', message: 'Failed to add channel to favorites.' });
    }

  }

  const removeFavorite = (item: FavoriteItem) => {

    const newFavoriteList = favorites.filter((favorite) => favorite.id !== item.id);
    setFavorites(newFavoriteList);
    localStorage.setItem('favorites', JSON.stringify(newFavoriteList));


    if (newFavoriteList.length < favorites.length) {
      setNotification({ type: 'success', message: 'Channel removed from favorites!' });
    } else {
      setNotification({ type: 'error', message: 'Failed to remove channel from favorites.' });
    }
  };

  useEffect(() => {
    const loadedFavorites = localStorage.getItem('favorites');
    if (loadedFavorites) {
      setFavorites(JSON.parse(loadedFavorites));
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000); // 2000 milliseconds = 2 seconds

      // Clean up function
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {notification && (
      <div role="alert" className={`rounded-xl border border-gray-100 p-4 fixed bottom-4 right-20 ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>

            <div className="flex-1">
              <strong className="block font-medium">{notification.type === 'success' ? 'Success' : 'Error'}</strong>
              <p className="mt-1 text-sm">{notification.message}</p>
            </div>

            <button onClick={() => setNotification(null)} className="absolute top-0 right-0 m-2">
              X
            </button>
          </div>
        </div>
      )}
      {children}
    </FavoriteContext.Provider>
  );
}