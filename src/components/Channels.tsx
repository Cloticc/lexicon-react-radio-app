import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { FavoriteContext } from "../context/ContexProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IChannel } from "../interface/Interface";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useChannel } from "../api/apiChannel";

interface ChannelProps {
  onPlayAudio: (src: string) => void;
}

export const Channel: React.FC<ChannelProps> = ({ onPlayAudio }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: channels, isLoading, isError } = useChannel();

  const { addFavorite, removeFavorite, favorites } =
    useContext(FavoriteContext);

  useEffect(() => {
    // Just to show message so dumb
  }, [addFavorite]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastChannelElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // TODO: Implement pagination logic here
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePlay = (audioSrc: string) => {
    onPlayAudio(audioSrc);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching channels</div>;
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {channels?.map((channel: IChannel, index: number) => (
        <div
          ref={index === channels.length - 1 ? lastChannelElementRef : null}
          key={`${channel.id}-${channel.name}-${index}`}
          className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/5"
        >

          <div className="aspect-w-16 aspect-h-9 overflow-hidden">
            <img src={channel.image} alt={channel.name} className="w-full h-full object-cover" />
          </div>


          {/*  */}
          <div className="p-4 flex-grow">
            <h2 className="text-xl mb-2">{channel.name}</h2>
            <p className="text-gray-300 mb-2">{channel.tagline}</p>
            <a
              href={channel.siteurl}
              className="text-blue-400 hover:underline mb-2 block"
            >
              Besök sida
            </a>
            <Link
              className="text-blue-400 hover:underline"
              to={`/channels/channel/${channel.name}/${channel.id}`}
            >
              <h2 className="text-xl font-bold">Länk till detaljer</h2>
            </Link>
          </div>
          <div className="p-4 flex justify-between items-end">
            <button
              onClick={() => handlePlay(channel.liveaudio.url)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              Play Audio
            </button>

            <button
              onClick={() => {
                if (favorites.some((favorite) => favorite.id === channel.id)) {
                  removeFavorite({ ...channel, type: "channel" });
                } else {
                  addFavorite({ ...channel, type: "channel" });
                }
              }}
            >
              <FontAwesomeIcon
                icon={faStar}
                color={
                  favorites.some((favorite) => favorite.id === channel.id)
                    ? "yellow"
                    : "grey"
                }
              />
            </button>
          </div>
        </div>
      ))}
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="scroll-to-top z-50 cursor-pointer text-2xl w-10 h-10 bg-gray-700 text-white fixed bottom-5 right-5 rounded-full flex items-center justify-center"
        >
          ↑
        </div>
      )}
    </div>
  );
};
