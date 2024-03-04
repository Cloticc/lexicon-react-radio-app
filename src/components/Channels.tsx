import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { FavoriteContext } from '../context/ContexProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChannel } from '../interface/Interface';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useChannel } from '../api/apiChannel';

export const Channel = () => {
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayerVisible, setPlayerVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { data: channels, isLoading, isError } = useChannel();
  const [playingChannelId, setPlayingChannelId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playPromise, setPlayPromise] = useState<Promise<void> | null>(null);



  const { addFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    // Just to show message so dumb
  }, [addFavorite]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastChannelElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // TODO: Implement pagination logic here
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    let isCancelled = false;
    if (currentAudioUrl) {
      const audio = new Audio(currentAudioUrl);
      setPlayingAudio(audio);

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);


      const promise = audio.play();
      setPlayPromise(promise);
      if (promise !== undefined) {
        promise.then(() => {
          if (!isCancelled) {
            setIsPlaying(true);
          }
        }).catch(error => console.log(error));
      }

      return () => {
        isCancelled = true;
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.pause();
      };
    }
  }, [currentAudioUrl]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching channels</div>;
  }
  return (
    <div className="channel grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {currentAudioUrl && isPlayerVisible && (
        <audio
          ref={audioRef}
          controls
          src={currentAudioUrl}
          className={`fixed z-50 bottom-0 w-6/12 left-24 transition-all duration-500 ${isPlayerVisible ? 'bottom-0' : '-bottom-32'} ${isPlayerVisible ? '' : 'hidden'}`}
          onPlay={(event) => {
            const audio = event.currentTarget;
            if (playingAudio && playingAudio !== audio) {
              playingAudio.pause();
            }
            setPlayingAudio(audio);
          }}
        >
          Your browser does not support the audio element.
        </audio>
      )}
      <button
        className="fixed z-50 bottom-4 left-4 w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center"
        onClick={() => setPlayerVisible(!isPlayerVisible)}
      >
        {isPlayerVisible ? 'Close' : 'Show'}
      </button>

      {channels?.map((channel: IChannel, index: number) => (
        <div ref={index === channels.length - 1 ? lastChannelElementRef : null} key={`${channel.id}-${channel.name}-${index}`} className="card border rounded-lg overflow-hidden shadow-md bg-white relative">

          <img src={channel.image} alt={channel.name} className="w-full h-64 object-cover-fill" />
          <div className="p-4">
            <h2 className="text-xl mb-2">{channel.name}</h2>
            <p className="text-gray-700 mb-2">{channel.tagline}</p>
            {/* <a href={channel.siteurl} className="text-blue-500 hover:underline mb-2 block">Visit Site</a> */}
            <a href={channel.siteurl} className="text-blue-500 hover:underline mb-2 block">Besök sida</a>
            <Link className="text-blue-500 hover:underline" to={`/channels/channel/${channel.name}/${channel.id}`}>
              <h2 className="text-xl font-bold">Länk till detaljer</h2>
            </Link>


            {/* <button onClick={() => addFavorite(channel)} className="absolute top-0 right-0 m-2 ">Add to favorite</button> */}
            <button onClick={() => addFavorite({ ...channel, type: 'channel' })} className="absolute top-0 right-0 m-2">
              <FontAwesomeIcon icon={faStar} />
            </button>

          </div>
          <div className="absolute bottom-0 right-0 m-2">

            <button
              onClick={async () => {
                if (isPlaying && playingChannelId === channel.id) {
                  // Wait for the play promise to resolve before pausing
                  if (playPromise) {
                    await playPromise;
                  }
                  playingAudio?.pause();
                  setIsPlaying(false);
                } else {
                  if (playingAudio) {
                    // Wait for the play promise to resolve before pausing
                    if (playPromise) {
                      await playPromise;
                    }
                    playingAudio.pause();
                  }
                  setCurrentAudioUrl(channel.liveaudio.url);
                  setPlayingChannelId(channel.id);
                }
              }}
            >

              <FontAwesomeIcon icon={isPlaying && playingChannelId === channel.id ? faPause : faPlay} color={playingChannelId === channel.id ? 'green' : 'black'} />
            </button>
          </div>
        </div>
      ))}
      {isVisible && (
        <div onClick={scrollToTop} className='scroll-to-top z-50 cursor-pointer text-2xl w-10 h-10 bg-gray-700 text-white fixed bottom-5 right-5 rounded-full flex items-center justify-center'>
          ↑
        </div>
      )}
    </div>
  );
};