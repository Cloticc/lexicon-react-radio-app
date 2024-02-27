import '../styles/Channel.css';

import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchData } from '../api/fetchData';

interface LiveAudio {
  id: string;
  url: string;
  statkey: string;
}

interface Channel {
  id: string;
  name: string;
  image: string;
  tagline: string;
  siteurl: string;
  liveaudio: LiveAudio;
  scheduleurl: string;
  channeltype: string;
  xmltvid: string;
}

export const Channel: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastChannelElementRef = useCallback((node: HTMLLIElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading]);

  useEffect(() => {
    const fetchChannels = async () => {
      const { data, isLoading, error } = await fetchData(`channels?page=${page}&format=json`);

      if (data) {
        setChannels(prevChannels => [...prevChannels, ...data.channels]);
      } else {
        setError('No channels found');
      }

      setIsLoading(isLoading);
      if (error) {
        setError(error);
      }
    };

    fetchChannels();
  }, [page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="channel">
      <h1>Kanaler</h1>
      <ul>
        {channels.map((channel: Channel, index: number) => (
          <li ref={index === channels.length - 1 ? lastChannelElementRef : null} key={`${channel.id}-${channel.name}-${index}`}>
            <h2>{channel.name}</h2>
            <img src={channel.image} alt={channel.name} />
            <p>{channel.tagline}</p>
            <a href={channel.siteurl}>Visit Site</a>
            <div>
              <h3>Live Audio</h3>
              <audio controls src={channel.liveaudio.url}>
                Your browser does not support the audio element.
              </audio>
            </div>
            <a href={channel.scheduleurl}>Schedule</a>
            <p>{channel.channeltype}</p>
            <p>{channel.xmltvid}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


//Old code used for fetching XML data instead of JSON.

// import '../styles/Channel.css';

// import { useEffect, useState } from 'react';

// import { fetchData } from '../api/fetchData';

// interface Channel {
//   id: string;
//   name: string;
//   image: string;
//   tagline: string;

// }

// export const Channel: React.FC = () => {
//   const [channels, setChannels] = useState<Channel[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChannels = async () => {
//       const { data, isLoading, error } = await fetchData('channels');

//       if (data) {
//         const channelNodes = data.getElementsByTagName('channel');
//         const parsedChannels = Array.from(channelNodes).map((channelNode) => {
//           return {
//             id: channelNode.getAttribute('id') || '',
//             name: channelNode.getElementsByTagName('name')[0]?.textContent || '',
//             image: channelNode.getElementsByTagName('image')[0]?.textContent || '',
//             color: channelNode.getElementsByTagName('color')[0]?.textContent || '',
//             tagline: channelNode.getElementsByTagName('tagline')[0]?.textContent || '',
//             siteurl: channelNode.getElementsByTagName('siteurl')[0]?.textContent || '',
//             liveaudio: {
//               id: channelNode.getElementsByTagName('liveaudio')[0]?.getAttribute('id') || '',
//               url: channelNode.getElementsByTagName('url')[0]?.textContent || '',
//               statkey: channelNode.getElementsByTagName('statkey')[0]?.textContent || '',
//             },
//             scheduleurl: channelNode.getElementsByTagName('scheduleurl')[0]?.textContent || '',
//             channeltype: channelNode.getElementsByTagName('channeltype')[0]?.textContent || '',
//             xmltvid: channelNode.getElementsByTagName('xmltvid')[0]?.textContent || '',
//           };
//         });
//         setChannels(parsedChannels);
//       } else {
//         setError('No channels found');
//       }

//       setIsLoading(isLoading);
//       if (error) {
//         setError(error);
//       }
//     };

//     fetchChannels();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="channel">
//       <h1>Kanaler</h1>
//       <ul>
//         {channels.map((channel) => (
//           <li key={channel.id}>
//             <h2>{channel.name}</h2>
//             <img src={channel.image} alt={channel.name} />
//             <p>{channel.tagline}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };