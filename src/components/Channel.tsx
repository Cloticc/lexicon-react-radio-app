import { useCallback, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChannel } from '../interface/Interface';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useChannel } from '../api/apiChannel';

// import { Link } from 'react-router-dom';




export const Channel = () => {
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayerVisible, setPlayerVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { data: channels, isLoading, isError } = useChannel();
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


  // useEffect(() => {
  //   if (currentAudioUrl) {
  //     setAudio(new Audio(currentAudioUrl));
  //   }
  // }, [currentAudioUrl]);


  // useEffect(() => {
  //   if (audio) {
  //     audio.play();
  //   }
  // }, [audio]);



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
            <a href={channel.siteurl} className="text-blue-500 hover:underline mb-2 block">Visit Site</a>
          </div>
          <div className="absolute bottom-0 right-0 m-2">
            <button onClick={() => {
              setCurrentAudioUrl(channel.liveaudio.url);
              if (audioRef.current) {
                audioRef.current.play();
              }
            }}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
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