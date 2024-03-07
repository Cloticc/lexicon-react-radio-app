import 'react-tabs/style/react-tabs.css'; // Import the styles

// import { AnimatePresence, motion } from 'framer-motion';
import { IBroadcast, IEpisode, IPodFile, ISocialMediaPlatform } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useBroadcasts, useEpisodes, usePodFiles, useProgramDetails } from '../api/apiEpisode';
import { useCallback, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

interface ProgramDetailsProps {
  onPlayAudio: (src: string) => void;
}


export function ProgramDetails({ onPlayAudio }: ProgramDetailsProps) {


  const { id: idString } = useParams<{ id: string }>();
  const id = Number(idString);

  // const [page, setPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const { data: program, isLoading: programLoading, error: programError } = useProgramDetails(id);
  const [isVisible, setIsVisible] = useState(false);

  // const { isLoading: episodeLoading, error: episodeError } = useEpisodeDetails(id);
  // const { data: episodes, isLoading: episodesLoading, error: episodesError } = useEpisodes(id, page);


  const { data: podFiles, fetchNextPage: fetchNextPodPage, hasNextPage: hasNextPodPage } = usePodFiles(id);
  // const { data: episodes, fetchNextPage: fetchNextEpisodePage, hasNextPage: hasNextEpisodePage } = useEpisodes(id);
  const { data: episodes, fetchNextPage: fetchNextEpisodePage, hasNextPage: hasNextEpisodePage } = useEpisodes(id);
  const { data: broadcasts } = useBroadcasts(id);

  const episodeObserver = useRef<IntersectionObserver | null>(null);
  const podObserver = useRef<IntersectionObserver | null>(null);

  const lastEpisodeElementRef = useCallback((node: HTMLDivElement | null) => {
    if (episodeObserver.current) episodeObserver.current.disconnect();
    episodeObserver.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextEpisodePage) {
        fetchNextEpisodePage();
      }
    });
    if (node) episodeObserver.current.observe(node);
  }, [fetchNextEpisodePage, hasNextEpisodePage]);

  const lastPodFileElementRef = useCallback((node: HTMLDivElement | null) => {
    if (podObserver.current) podObserver.current.disconnect();
    if (node) {
      podObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPodPage) {
          fetchNextPodPage();
        }
      });
      podObserver.current.observe(node);
    }
  }, [fetchNextPodPage, hasNextPodPage]

  );

  // useEffect(() => {
  //   if (localStorage.getItem('isRefreshed')) {
  //     console.log('The page was refreshed');
  //   } else {
  //     localStorage.setItem('isRefreshed', 'true');
  //   }


  //   return () => {
  //     localStorage.removeItem('isRefreshed');
  //   };
  // }, []);

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



  const socialMedia = program?.socialmediaplatforms.map((platform: ISocialMediaPlatform) => {
    let icon;
    switch (platform.platform.toLowerCase()) {
      case 'facebook':
        icon = faFacebook;
        break;
      case 'twitter':
        icon = faTwitter;
        break;
      case 'instagram':
        icon = faInstagram;
        break;
      default:
        icon = null;
    }

    return (
      <a key={platform.platform} href={platform.platformurl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
        {icon && <FontAwesomeIcon icon={icon} className="mr-1" />}
        {platform.platform}
      </a>
    );
  });
  const parseDate = (dateString: string) => {
    const match = dateString.match(/\/Date\((\d+)\)\//);
    return match ? new Date(+match[1]) : new Date();
  };

  const handlePlay = (audioSrc: string) => {
    onPlayAudio(audioSrc);
  };

  if (programLoading) {
    return null;
  }

  if (programError) {
    return <div>Error: {programError?.message}</div>;
  }

  // console.log(`podFiles`, podFiles);

  // console.log('episodes', episodes);
  //   episodes.forEach((episode: any) => {
  //     episode.broadcast?.broadcastfiles?.forEach(file => {
  //         const listenUrl = file.url;
  //         console.log(listenUrl);
  //         // Use listenUrl as needed (e.g., play audio)
  //     });
  // });

  return (

     <Tabs className="flex flex-col" selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <TabList className="flex mt-4 mb-4">
        <Tab className="mr-2 bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Detaljer
        </Tab>
        <Tab className="mr-2 bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Sändningar
        </Tab>
        <Tab className="mr-2 bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Pod
        </Tab>
        <Tab className="bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Avsnitt
        </Tab>
      </TabList>
      <TabPanel>
        <div className="space-y-4 bg-gray-800 text-white shadow-lg rounded-lg p-6 flex items-start gap-6">
          <div className="w-1/6 rounded-md overflow-hidden">
            <img className="h-full object-cover" src={program?.programimage} alt={program?.name} />
          </div>

          <div className="flex-grow">
            <h2 className='text-3xl font-bold'>{program?.name}</h2>
            <p className='text-gray-300'>{program?.broadcastinfo}</p>
            <p className='text-gray-300'>{program?.description}</p>
            <a className='text-blue-400 hover:underline' href={program?.programurl}>Visit Site</a>
            <div className='flex space-x-4 mt-4'>
              {socialMedia}
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        {/* BroadCast */}
        <h1>Sändningar</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {broadcasts && broadcasts.length > 0 ? (
            broadcasts.map((broadcast: IBroadcast) => (
              <div
                key={broadcast.id}
                className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-white"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{broadcast.title}</h2>
                  <p className="text-gray-300 mb-4">{broadcast.description}</p>
                  <p className="text-gray-300">Längd: {Math.round(broadcast.broadcastfiles.reduce((acc, file) => acc + file.duration, 0) / 60)} minutes</p>

                  <p className="text-gray-300">
                    Publicerad: {parseDate(broadcast.broadcastdateutc).toLocaleDateString('en-GB')}
                    <br />
                    {parseDate(broadcast.broadcastdateutc).toLocaleTimeString('en-GB')}
                  </p>
                </div>
                {broadcast.broadcastfiles.length > 0 ? (
                  <div className="px-6 pb-4">
                      <button onClick={() => handlePlay(broadcast.broadcastfiles[0].url)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Play Audio</button>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-red-500 text-2xl">Inga sändningar tillgängliga</p>
          )}
      
        </div>




      </TabPanel>
      <TabPanel>
        {/* Pods */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {podFiles && podFiles.pages.length > 0 ? (
            podFiles.pages.map((page, pageIndex) => (
              page.data.sort((a: { publishdateutc: string | number | Date; }, b: { publishdateutc: string | number | Date; }) => new Date(b.publishdateutc).getTime() - new Date(a.publishdateutc).getTime()).map((pod: IPodFile, podIndex: number) => (
                <div
                  key={pod.id}
                  ref={pageIndex === podFiles.pages.length - 1 && podIndex === page.data.length - 1 ? lastPodFileElementRef : null}
                  className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-white"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{pod.title}</h2>
                    <p className="text-gray-300 mb-4">{pod.description}</p>
                    <p className="text-gray-300">Varaktighet: {Math.round(pod.duration / 60)} minutes</p>
                    <p className="text-gray-300">Publicerad: {new Date(parseInt(pod.publishdateutc.substring(6, pod.publishdateutc.length - 2))).toLocaleDateString('en-GB')}</p>
                  </div>
                  <div className="px-6 py-4">
                    <button onClick={() => handlePlay(pod.url)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Play Audio</button>
                  </div>
                </div>
              ))
            ))
          ) : (
            <p className="text-red-500 text-2xl">Inga poddar tillgängliga</p>
          )}
       
        </div>

      </TabPanel>
      <TabPanel>
        <div className="flex justify-center items-center ">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 rounded-lg">

            {episodes && episodes.pages.length > 0 ? (
              episodes.pages.map((page, pageIndex) => (
                page.data.map((episode: IEpisode, episodeIndex: number) => (
                  <div
                    key={episode.id ? episode.id : 'No ID'}
                    ref={pageIndex === episodes.pages.length - 1 && episodeIndex === page.data.length - 1 ? lastEpisodeElementRef : null}
                    className="shadow-md rounded-lg bg-gray-800 text-white"
                  >
                    <img className="w-full h-44 object-cover rounded-lg" src={episode.imageurl || ""} alt={episode.title || "No title"} />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{episode.title || 'Ingen titel tillgänglig'}</div>
                      <p className="text-gray-300 text-base">{episode.description || 'Ingen beskrivning finns tillgänglig'}</p>
                      <p className="mt-2 text-gray-300">
                        Publicerad: {new Date(parseInt(episode.publishdateutc.substring(6, episode.publishdateutc.length - 2))).toLocaleDateString('en-GB')}
                      </p>
                      <p className="text-gray-300">
                        Sändningstid: {episode.broadcasttime ? `${new Date(parseInt(episode.broadcasttime.starttimeutc.substring(6, episode.broadcasttime.starttimeutc.length - 2))).toLocaleTimeString('en-GB')} - ${new Date(parseInt(episode.broadcasttime.endtimeutc.substring(6, episode.broadcasttime.endtimeutc.length - 2))).toLocaleTimeString('en-GB')}` : "No broadcast"}
                      </p>
                    </div>
                    {episode.broadcast ? (
                      <div className="px-6 pb-4">
                        <audio controls src={episode.broadcast.broadcastfiles.length > 0 ? episode.broadcast.broadcastfiles[0].url : ''} />
                      </div>
                    ) : null}
                    <div className="px-6 py-4 flex justify-between">
                      {episode.url && episode.url ? (
                        <a href={episode.url} className="text-blue-500">Webbadress</a>
                      ) : (
                        <p className="text-red-500">Ingen webbadress tillgänglig</p>
                      )}
                      {episode.url && episode.url ? (
                        <a href={episode.url} download className="text-blue-500">Ladda ner</a>
                      ) : (
                        <p className="text-red-500">Ingen nedladdningsfil tillgänglig</p>
                      )}
                    </div>
                  </div>
                ))
              ))
            ) : (
              <p className="text-red-500 text-2xl">Inga avsnitt tillgängliga</p>
            )}
          </div>
        </div>


      </TabPanel>

        {isVisible && (
          <div onClick={scrollToTop} className='scroll-to-top cursor-pointer text-2xl w-10 h-10 bg-gray-700 text-white fixed bottom-5 right-5 rounded-full flex items-center justify-center'>
            ↑
          </div>
        )}

    </Tabs>


  );
}

