import 'react-tabs/style/react-tabs.css'; // Import the styles

// import { AnimatePresence, motion } from 'framer-motion';
import { IEpisode, IPodFile, ISocialMediaPlatform } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEpisodes, usePodFiles, useProgramDetails } from '../api/Episode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

export function ProgramDetails() {


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


  if (programLoading || !program) {
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
    <div className='flex flex-col w-full '>
      <h1 className=''>{program?.name}</h1>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Broadcasts</Tab>
          <Tab>Pods</Tab>
          <Tab>Episodes</Tab>
        </TabList>
        <TabPanel>


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
          <h1>BroadCast</h1>



        </TabPanel>
        <TabPanel>
          {/* Pods */}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {/* <AnimatePresence> */}
            {podFiles && podFiles.pages.length > 0 ? (
              podFiles.pages.map((page, pageIndex) => (
                page.data.map((pod: IPodFile, podIndex: number) => (
                  <div
                    // <motion.div
                    key={pod.id}
                    ref={pageIndex === podFiles.pages.length - 1 && podIndex === page.data.length - 1 ? lastPodFileElementRef : null}
                  // className='max-w-xs w-full lg:max-w-xs lg:flex p-2'
                  // initial={{ opacity: 0, y: 50 }} // Initial state of the component
                  // animate={{ opacity: 1, y: 0 }} // Final state of the component
                  // exit={{ opacity: 0, y: 50 }} // State of the component when it's unmounting
                  // transition={{ duration: 0.3 }} // Animation duration
                  >
                    <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-col justify-between leading-normal'>
                      <div className='mb-4'>
                        <div className='text-gray-900 font-bold text-sm mb-1'>{pod.title}</div>
                        <p className='text-gray-700 text-xs'>{pod.description}</p>
                        <p className='text-xs text-gray-500'>Duration: {Math.round(pod.duration / 60)} minutes</p>
                      </div>
                      <div className='flex items-center'>
                        <audio controls>
                          <source src={pod.url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                    {/* </motion.div> */}
                  </div>
                ))
              ))
            ) : (
              <p className='text-red-500 text-2xl'>No pods available</p>
            )}
            {/* </AnimatePresence> */}
            {isVisible && (
              <div onClick={scrollToTop} className='scroll-to-top cursor-pointer text-2xl w-10 h-10 bg-gray-700 text-white fixed bottom-5 right-5 rounded-full flex items-center justify-center'>
                ↑
              </div>
            )}
          </div>

        </TabPanel>
        <TabPanel>
          {/* Render episode here */}
          <div className='flex justify-center items-center'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {/* <AnimatePresence> */}
              {episodes && episodes.pages.length > 0 ? (
                episodes.pages.map((page, pageIndex) => (
                  page.data.map((episode: IEpisode, episodeIndex: number) => (
                    // <motion.div
                    <div
                      key={episode.id ? episode.id : 'No ID'}
                      ref={pageIndex === episodes.pages.length - 1 && episodeIndex === page.data.length - 1 ? lastEpisodeElementRef : null}
                      className='shadow-md rounded-lg  bg-white'
                    // initial={{ opacity: 0, y: 50 }} // Initial state of the component
                    // animate={{ opacity: 1, y: 0 }} // Final state of the component
                    // exit={{ opacity: 0, y: 50 }} // State of the component when it's unmounting
                    // transition={{ duration: 0.3 }}// Animation duration
                    >
                      <div key={episode.id ? episode.id : 'No ID'} className='shadow-md rounded-lg  bg-white'>
                        {episode.imageurl ? (
                          <div
                            className='h-48 bg-cover bg-center'
                            style={{
                              backgroundImage: `url(${episode.imageurl})`
                            }}
                            title={episode.title ? episode.title : 'No title available'}
                          />
                        ) : null}
                        <div className='px-6 py-4'>
                          <div className='font-bold text-xl mb-2'>{episode.title ? episode.title : 'No title available'}</div>
                          <p className='text-gray-700 text-base'>{episode.description ? episode.description : 'No description available'}</p>
                          <p className='text-sm text-gray-500 mt-2'>
                            Published: {episode.publishdateutc ? new Date(Number(episode.publishdateutc.replace(/\/Date\((\d+)\)\//, '$1'))).toLocaleDateString('en-GB') : 'No publish date available'}
                          </p>
                        </div>
                        {episode.broadcast ? (
                          <div className='px-6 pb-4'>
                            <audio controls src={episode.broadcast.broadcastfiles[0].url} className='w-full' />
                          </div>
                        ) : null}
                        <div className='px-6 py-4 flex justify-between'>
                          {episode.url && episode.url ? (
                            <a href={episode.url} className='text-blue-500'>URL</a>
                          ) : (
                            <p className='text-red-500'>No URL available</p>
                          )}
                          {episode.url && episode.url ? (
                            <a href={episode.url} download className='text-blue-500'>Download</a>
                          ) : (
                            <p className='text-red-500'>No download file available</p>
                          )}
                        </div>
                      </div>
                      {/* </motion.div> */}
                    </div>
                  ))
                ))
              ) : (
                <p className='text-red-500 text-2xl'>No episodes available</p>
              )}
              {/* </AnimatePresence> */}
            </div>

          </div>

          {isVisible && (
            <div onClick={scrollToTop} className='scroll-to-top cursor-pointer text-2xl w-10 h-10 bg-gray-700 text-white fixed bottom-5 right-5 rounded-full flex items-center justify-center'>
              ↑
            </div>
          )}

        </TabPanel>


      </Tabs>

    </div >
  );
}

