import { ReactElement, ReactNode, createContext, useState } from "react";

import { IChannel } from "../interface/Interface";

interface IContext {
  favorites: IChannel[];
  addFavorite: (props: IChannel) => void;
  removeFavorite: (props: IChannel) => void;


}


interface IFavoriteProviderProps {
  children: ReactNode;
}


export const FavoriteContext = createContext({} as IContext);

export function FavoriteProvider({ children }: IFavoriteProviderProps): ReactElement {
  const [favorites, setFavorites] = useState<IChannel[]>([]);

  const addFavorite = (props: IChannel) => {
    const newFavoriteList = [...favorites, props];
    setFavorites(newFavoriteList);
  }

  const removeFavorite = (props: IChannel) => {
    const newFavoriteList = favorites.filter((favorite) => favorite.id !== props.id);
    setFavorites(newFavoriteList);

  };



  return (
    <FavoriteContext.Provider  value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

