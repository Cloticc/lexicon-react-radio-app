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
        <div className={`z-50 fixed bottom-10 right-0 m-6 p-4 rounded shadow-lg text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
          <button onClick={() => setNotification(null)} className="absolute top-0 right-0 m-2">
            X
          </button>
        </div>
      )}
      {children}
    </FavoriteContext.Provider>
  );
}

