import 'react-tabs/style/react-tabs.css'; // Import the styles

// import { AnimatePresence, motion } from 'framer-motion';
import { IEpisode, IPodFile, ISocialMediaPlatform } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEpisodes, usePodFiles, useProgramDetails } from '../api/apiEpisode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

export function ProgramDetails() {


  const { id: idString } = useParams<{ id: string }>();
  const id = Number(idString);

  // const [page, setPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const { data: program, isLoading: programLoading, error: programError } = useProgramDetails(id);
  const [isVisible, setIsVisible] = useState(false);

  // const { isLoading: episodeLoading, error: episodeError } = useEpisodeDetails(id);
  // const { data: episodes, isLoading: episodesLoading, error: episodesError } = useEpisodes(id, page);


  const { data: podFiles, fetchNextPage: fetchNextPodPage, hasNextPage: hasNextPodPage } = usePodFiles(id);
  // const { data: episodes, fetchNextPage: fetchNextEpisodePage, hasNextPage: hasNextEpisodePage } = useEpisodes(id);
  const { data: episodes, fetchNextPage: fetchNextEpisodePage, hasNextPage: hasNextEpisodePage } = useEpisodes(id);


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

  useEffect(() => {
    if (localStorage.getItem('isRefreshed')) {
      console.log('The page was refreshed');
    } else {
      localStorage.setItem('isRefreshed', 'true');
    }


    return () => {
      localStorage.removeItem('isRefreshed');
    };
  }, []);

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


  if (programLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
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
      <TabList className="flex mb-4">
        <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Detaljer</Tab>
        <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Sändningar</Tab>
        <Tab className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Pod</Tab>
        <Tab className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">Avsnitt</Tab>
      </TabList>
      <TabPanel>
        {/* Details */}
        <div className='space-y-4 bg-white shadow-lg rounded-lg p-6'>
          <h1 className='text-3xl font-bold text-gray-800'>{program?.name}</h1>
          <p className='text-gray-600'>{program?.broadcastinfo}</p>
          <p className='text-gray-600'>{program?.description}</p>
          <div className='flex flex-col space-y-4'>
            <img className='w-1/6 h-full rounded-md object-cover' src={program?.programimage} alt={program?.name} />
            <a className='text-blue-500 hover:underline' href={program?.programurl}>Visit Site</a>
          </div>
          <div className='flex space-x-4 mt-4'>
            {socialMedia}
          </div>
        </div>

      </TabPanel>
      <TabPanel>
        {/* BroadCast */}
        <h1>Sändningar</h1>



      </TabPanel>
      <TabPanel>
        {/* Pods */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
          {podFiles && podFiles.pages.length > 0 ? (
            podFiles.pages.map((page, pageIndex) => (
              page.data.sort((a: { publishdateutc: string | number | Date; }, b: { publishdateutc: string | number | Date; }) => new Date(b.publishdateutc).getTime() - new Date(a.publishdateutc).getTime()).map((pod: IPodFile, podIndex: number) => (

                <div
                  key={pod.id}
                  ref={pageIndex === podFiles.pages.length - 1 && podIndex === page.data.length - 1 ? lastPodFileElementRef : null}
                  className='rounded overflow-hidden shadow-lg m-4 bg-gray-500 text-white'
                >
                  <div className='px-6 py-4'>
                    <div className='font-bold text-xl mb-2'>{pod.title}</div>
                    <p className='text-gray-100 text-base'>{pod.description}</p>
                    <p className='text-gray-200 text-xs'>Varaktighet: {Math.round(pod.duration / 60)} minutes</p>
                    <p className='text-gray-200 text-xs'>Publicerad: {new Date(parseInt(pod.publishdateutc.substring(6, pod.publishdateutc.length - 2))).toLocaleDateString('en-GB')}</p>
                  </div>
                  <div className='px-6 py-4'>
                    <audio
                      controls
                      onPlay={(event) => {
                        const audio = event.currentTarget;
                        if (playingAudio && playingAudio !== audio) {
                          playingAudio.pause();
                        }
                        setPlayingAudio(audio);
                      }}
                    >
                      <source src={pod.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              ))
            ))
          ) : (
            <p className='text-red-500 text-2xl'>Inga poddar tillgängliga</p>
          )}
          {isVisible && (
            <div onClick={scrollToTop} className='scroll-to-top cursor-pointer text-2xl w-10 h-10 bg-gray-700 text-white fixed bottom-5 right-5 rounded-full flex items-center justify-center'>
              ↑
            </div>
          )}
        </div>
      </TabPanel>
      <TabPanel>
        <div className='flex justify-center items-center'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {episodes && episodes.pages.length > 0 ? (
              episodes.pages.map((page, pageIndex) => (
                page.data.map((episode: IEpisode, episodeIndex: number) => (
                  <div
                    key={episode.id ? episode.id : 'No ID'}
                    ref={pageIndex === episodes.pages.length - 1 && episodeIndex === page.data.length - 1 ? lastEpisodeElementRef : null}
                    className='shadow-md rounded-lg  bg-white'
                  >
                    <div key={episode.id ? episode.id : 'No ID'} className='shadow-md rounded-lg  bg-white'>
                      {/* {episode.imageurl ? (
                        <div
                          className='w-full h-64 bg-cover bg-center'
                          style={{
                            backgroundImage: `url(${episode.imageurl})`
                          }}
                          title={episode.title ? episode.title : 'Ingen titel tillgänglig'}
                        />
                      ) : null} */}
                      <img className="w-full object-contain" src={episode.imageurl || ""} alt={episode.title || "No title"} />
                      <div className='px-6 py-4'>
                        <div className='font-bold text-xl mb-2'>{episode.title ? episode.title : 'Ingen titel tillgänglig'}</div>
                        <p className='text-gray-700 text-base'>{episode.description ? episode.description : 'Ingen beskrivning finns tillgänglig'}</p>

                        <p className="mt-2 text-gray-500">
                          Publicerad vid: {new Date(parseInt(episode.publishdateutc.substring(6, episode.publishdateutc.length - 2))).toLocaleDateString('en-GB')}
                        </p>
                        <p>
                          Sändningstid: {episode.broadcasttime ? `${new Date(parseInt(episode.broadcasttime.starttimeutc.substring(6, episode.broadcasttime.starttimeutc.length - 2))).toLocaleTimeString('en-GB')} - ${new Date(parseInt(episode.broadcasttime.endtimeutc.substring(6, episode.broadcasttime.endtimeutc.length - 2))).toLocaleTimeString('en-GB')}` : "No broadcast"}
                        </p>
                      </div>
                      {episode.broadcast ? (
                        <div className='px-6 pb-4'>
                          <audio controls src={episode.broadcast.broadcastfiles.length > 0 ? episode.broadcast.broadcastfiles[0].url : ''} />
                        </div>
                      ) : null}
                      <div className='px-6 py-4 flex justify-between'>
                        {episode.url && episode.url ? (
                          <a href={episode.url} className='text-blue-500'>Webbadress</a>
                        ) : (
                          <p className='text-red-500'>Ingen webbadress tillgänglig</p>
                        )}
                        {episode.url && episode.url ? (
                          <a href={episode.url} download className='text-blue-500'>Ladda ner</a>
                        ) : (
                          <p className='text-red-500'>Ingen nedladdningsfil tillgänglig</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ))
            ) : (
              <p className='text-red-500 text-2xl'>Inga avsnitt tillgängliga</p>
            )}
          </div>

        </div>

        {isVisible && (
          <div onClick={scrollToTop} className='scroll-to-top cursor-pointer text-2xl w-10 h-10 bg-gray-700 text-white fixed bottom-5 right-5 rounded-full flex items-center justify-center'>
            ↑
          </div>
        )}

      </TabPanel>


    </Tabs>


  );
}

