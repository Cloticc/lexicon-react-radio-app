import 'react-tabs/style/react-tabs.css'; // Import the styles

import { IEpisode, IPodFile } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useEffect, useState } from 'react';
import { useEpisodes, usePodFiles, useProgramDetails } from '../api/Episode';

import { useParams } from 'react-router-dom';

export function ProgramDetails() {
  const { id: idString } = useParams<{ id: string }>();
  const id = Number(idString);
  const [page, setPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);

  const { data: program, isLoading: programLoading, error: programError } = useProgramDetails(id);
  const { data: podFiles, isLoading: podFilesLoading, error: podFilesError } = usePodFiles(id);
  // const { isLoading: episodeLoading, error: episodeError } = useEpisodeDetails(id);
  const { data: episodes, isLoading: episodesLoading, error: episodesError } = useEpisodes(id, page);

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

  if (programLoading || podFilesLoading || episodesLoading) {
    return <div>Loading...</div>;
  }

  if (programError || podFilesError || episodesError) {
    return <div>Error: {programError?.message || podFilesError?.message || episodesError?.message}</div>;
  }


  console.log('episodes', episodes);
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
          <h1>Test</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {podFiles && podFiles.length > 0 ? (
              podFiles.map((pod: IPodFile) => (
                <div key={pod.id} className='max-w-xs w-full lg:max-w-xs lg:flex p-2  '>
                  <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-col justify-between leading-normal'>
                    <div className='mb-4'>
                      <div className='text-gray-900 font-bold text-sm mb-1'>{pod.title}</div>
                      <p className='text-gray-700 text-xs'>{pod.description}</p>
                      <p className='text-xs text-gray-500'>Duration: {pod.duration} seconds</p>
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
            ) : (
              <p className='no-files'>No pod files available</p>
            )}
          </div>

        </TabPanel>
        <TabPanel>
          {/* Render episode here */}
          <div className='grid grid-cols-2 gap-4'>
            {episodes && episodes.length > 0 ? (
              episodes.map((episode: IEpisode) => (
                <div key={episode.id ? episode.id : 'No ID'} className='max-w-sm w-full lg:max-w-full lg:flex'>
                  {episode.imageurl ? (
                    <div className='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
                      style={{
                        backgroundImage: `url(${episode.imageurl})`,
                        backgroundPosition: 'center'
                      }}
                      title={episode.title ? episode.title : 'No title available'}
                    />
                  ) : null}
                  <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
                    <div className='mb-8'>
                      <div className='text-gray-900 font-bold text-xl mb-2'>{episode.title ? episode.title : 'No title available'}</div>
                      <p className='text-gray-700 text-base'>{episode.description ? episode.description : 'No description available'}</p>
                      <p className='text-sm text-gray-500'>
                        Published: {episode.publishdateutc ? new Date(Number(episode.publishdateutc.replace(/\/Date\((\d+)\)\//, '$1'))).toLocaleDateString('en-GB') : 'No publish date available'}
                      </p>
                    </div>
                    {episode.broadcast ? <audio controls src={episode.broadcast.broadcastfiles[0].url} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3" /> : null}

                    <div className='flex items-center justify-between'>
                      {episode.url && episode.url ? <a href={episode.url} className='text-blue-500'>url</a> : null}
                      {episode.url && episode.url ? <a href={episode.url} download className='text-blue-500'>Download</a> : <p className='text-red-500'>No download file available</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-red-500'>No episodes available</p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => setPage(old => Math.max(old - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg mr-2 ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
            >
              Previous Page
            </button>
            <button
              type="button"
              onClick={() => setPage(old => old + 1)}
              disabled={episodes && episodes.length === 0}
              className={`px-4 py-2 rounded-lg ${episodes && episodes.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
            >
              Next Page
            </button>


          </div>

        </TabPanel>


      </Tabs>
    </div>
  );
}

