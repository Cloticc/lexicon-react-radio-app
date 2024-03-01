import 'react-tabs/style/react-tabs.css'; // Import the styles

import { IEpisode, IPodFile } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEpisodes, usePodFiles, useProgramDetails } from '../api/Episode';

import { Spinner } from 'flowbite-react';
import { useParams } from 'react-router-dom';

export function ProgramDetails() {


  const { id: idString } = useParams<{ id: string }>();
  const id = Number(idString);
  // const [page, setPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);

  const { data: program, isLoading: programLoading, error: programError } = useProgramDetails(id);


  // const { isLoading: episodeLoading, error: episodeError } = useEpisodeDetails(id);
  // const { data: episodes, isLoading: episodesLoading, error: episodesError } = useEpisodes(id, page);


  const { data: podFiles, fetchNextPage: fetchNextPodPage, hasNextPage: hasNextPodPage } = usePodFiles(id);
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

  if (programLoading || !program) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="blue" size="lg" />
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


          <div className="space-y-4 bg-white shadow-sm rounded-lg p-6">
            <h1 className="text-2xl font-bold">{program?.name}</h1>
            <p className="text-gray-600">{program?.broadcastinfo}</p>
            <p className="text-gray-600">{program?.description}</p>
            <img className="w-1/6 h-full  rounded-md" src={program?.programimage} alt={program?.name} />
            <a className="text-blue-500 hover:underline" href={program?.programurl}>Visit Site</a>
          </div>

        </TabPanel>
        <TabPanel>
          <h1>Test</h1>
          {/* broadcast describe('first', () => { second }) */}
          <h1>whatis this</h1>
        </TabPanel>
        <TabPanel>
          {/* Pods */}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {podFiles && podFiles.pages.length > 0 ? (
              podFiles.pages.map((page, pageIndex) => (
                page.data.map((pod: IPodFile, podIndex: number) => (
                  <div
                    key={pod.id}
                    ref={pageIndex === podFiles.pages.length - 1 && podIndex === page.data.length - 1 ? lastPodFileElementRef : null}
                    className='max-w-xs w-full lg:max-w-xs lg:flex p-2  '
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
                  </div>
                ))
              ))
            ) : (
              <p className='text-red-500 text-2xl'>No pods available</p>
            )}
          </div>

        </TabPanel>
        <TabPanel>
          {/* Render episode here */}
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
                    </div>
                  ))
                ))
              ) : (
                <p className='text-red-500 text-2xl'>No episodes available</p>
              )}
            </div>
          </div>



        </TabPanel>


      </Tabs>
    </div >
  );
}

