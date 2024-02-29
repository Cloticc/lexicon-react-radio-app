import 'react-tabs/style/react-tabs.css'; // Import the styles

import { IEpisode, IPodFile } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function ProgramDetails() {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  // this is for details
  const fetchProgramDataDetails = async () => {
    const response = await fetch(`https://api.sr.se/api/v2/programs/${id}?format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data) {
      return data.program;
    }
    throw new Error('No program found');
  }

  const { data: program, isLoading, error } = useQuery({
    queryKey: ['program', id],
    queryFn: fetchProgramDataDetails
  });




  //   const fetchBroadCasts = async () => {
  //     const response = await fetch(`https://api.sr.se/api/v2/broadcasts/?programid=${id}&format=json`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  // console.log(data)
  //     if (data) {
  //       return data.broadcasts;
  //     }
  //     throw new Error('No broadcasts found');
  //   }

  //   const { data: broadcasts, isLoading: isLoadingBroadcasts, error: errorBroadcasts } = useQuery({
  //     queryKey: ['broadcasts', id],
  //     queryFn: fetchBroadCasts
  //   });

  const fetchPodFiles = async () => {
    console.log(`Program ID: ${id}`); // Log the program ID
    const response = await fetch(`https://api.sr.se/api/v2/podfiles?programid=${id}&format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data) {
      return data.podfiles;
    }
    throw new Error('No pod files found');
  }

  const { data: podFiles, isLoading: isLoadingPodFiles, error: errorPodFiles } = useQuery({
    queryKey: ['podfiles', id],
    queryFn: fetchPodFiles
  });

  const fetchEpisodeDetails = async (episodeId: number) => {
    const response = await fetch(`https://api.sr.se/api/v2/episodes/get?id=${episodeId}&format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data) {
      return data.episode;
    }
    throw new Error('No episode details found');
  }


  const fetchEpisodes = async (page: number) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoStr = `${twoDaysAgo.getFullYear()}-${String(twoDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(twoDaysAgo.getDate()).padStart(2, '0')}`;

    const startDateStr = '2010-01-01';

    const response = await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${id}&fromdate=${startDateStr}&todate=${twoDaysAgoStr}&audioquality=hi&format=json&page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.episodes && data.episodes.length > 0) {
      const episodesWithDetails = await Promise.all(
        data.episodes.map(async (episode: IEpisode) => {
          const episodeDetails = await fetchEpisodeDetails(Number(episode.id));
          console.log(episodeDetails);

          return { ...episode, ...episodeDetails };
        })
      );
      return episodesWithDetails;
    } else {
      throw new Error('No episodes found');
    }
  }

  const { data: episodes, isLoading: isLoadingEpisodes, error: errorEpisodes } = useQuery({
    queryKey: ['episodes', id, page],
    queryFn: () => fetchEpisodes(page)
  });

  const isError = error || errorPodFiles || errorEpisodes;
  const isLoadingAll = isLoading || isLoadingPodFiles || isLoadingEpisodes;



  if (isLoadingAll) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }


  return (
    <div className='flex flex-col w-full '>
      <h1 className=''>{program?.name}</h1>
      <Tabs>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Broadcasts</Tab>
          <Tab>Pods</Tab>
          <Tab>episode</Tab>
        </TabList>
        <TabPanel>
          {/* Render details here */}
          <h1>{program?.name}</h1>
          <p>{program?.broadcastinfo}</p>
          <p>{program?.description}</p>
          <img src={program?.programimage} alt={program?.name} />
          <a href={program?.programurl}>Visit Site</a>


        </TabPanel>
        <TabPanel>
          <h1>Test</h1>
          {/* broadcast describe('first', () => { second }) */}
          <h1>whatis this</h1>
        </TabPanel>
        <TabPanel>
          <h1>Test</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {podFiles && podFiles.length > 0 ? (
              podFiles.map((pod: IPodFile) => (
                <div key={pod.id} className='max-w-xs w-full lg:max-w-xs lg:flex p-2 border rounded shadow'>
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
          <h1>Test</h1>

          <ul className='space-y-4 '>
            {episodes && episodes.length > 0 ? (
              episodes.map((episode: IEpisode) => (
                <li key={episode.id ? episode.id : 'No ID'} className='max-w-sm w-full lg:max-w-full lg:flex'>
                  {episode.imageurl ? (
                    <div className='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden' style={{ backgroundImage: `url(${episode.imageurl})` }} title={episode.title ? episode.title : 'No title available'} />
                  ) : null}
                  <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
                    <div className='mb-8'>
                      <div className='text-gray-900 font-bold text-xl mb-2'>{episode.title ? episode.title : 'No title available'}</div>
                      <p className='text-gray-700 text-base'>{episode.description ? episode.description : 'No description available'}</p>
                      <p className='text-sm text-gray-500'>Published: {episode.publishdateutc ? episode.publishdateutc : 'No publish date available'}</p>
                    </div>
                    <div className='flex items-center'>
                      {episode.url ? <a href={episode.url} className='text-blue-500'>Listen</a> : null}
                      {episode.downloadpodfile && episode.downloadpodfile.url ? <a href={episode.downloadpodfile.url} className='text-blue-500'>Download</a> : <p className='text-red-500'>No download file available</p>}
                      <p className='text-sm text-gray-500'>Episode Group: {episode.episodegroups && episode.episodegroups.length > 0 ? episode.episodegroups[0].name : 'No episode group available'}</p>
                      <p className='text-sm text-gray-500'>Available Until: {episode.availableuntilutc ? episode.availableuntilutc : 'No available until date available'}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className='text-center text-red-500'>No episodes available</p>
            )}
          </ul>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setPage(old => Math.max(old - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg mr-2 ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
            >
              Previous Page
            </button>
            <button
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