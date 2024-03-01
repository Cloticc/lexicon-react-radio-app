import { useCallback, useRef, useState } from 'react';

import { IChannel } from '../interface/Interface';
import { Link } from 'react-router-dom';
import { useChannel } from '../api/apiChannel';

export const Channel = () => {
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const { data: channels, isLoading, isError } = useChannel(); // use the hook
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



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching channels</div>;
  }

  return (
    <div className="channel grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <h1 className="col-span-full text-2xl mb-4">Channel</h1>
      {channels?.map((channel: IChannel, index: number) => (
        <div ref={index === channels.length - 1 ? lastChannelElementRef : null} key={`${channel.id}-${channel.name}-${index}`} className="card border rounded-lg overflow-hidden shadow-md">
          <img src={channel.image} alt={channel.name} className="w-full h-64 object-contain" />
          <div className="p-4">
            <h2 className="text-xl mb-2">{channel.name}</h2>
            <p className="text-gray-700 mb-2">{channel.tagline}</p>
            <a href={channel.siteurl} className="text-blue-500 hover:underline mb-2 block">Visit Site</a>
            <div>
              <h3 className="text-lg mb-2">Live Audio</h3>
              <audio
                controls
                src={channel.liveaudio.url}
                className="w-full"
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
            </div>
            <a href={channel.scheduleurl} className="text-blue-500 hover:underline mb-2 block">Schedule</a>
            <p className="text-gray-700 mb-2">{channel.channeltype}</p>
            <p className="text-gray-700">{channel.xmltvid}</p>

            <Link className="text-blue-500 hover:underline" to={`/Program/${channel.id}`}>
              Jump to details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};