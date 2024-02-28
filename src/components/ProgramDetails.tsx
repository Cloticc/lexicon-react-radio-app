import 'react-tabs/style/react-tabs.css'; // Import the styles

import { Episode, PodFile, Program } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export function ProgramDetails() {
  const { id } = useParams();


  const fetchDetails = async () => {
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
    queryFn: fetchDetails
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

  const fetchEpisodes = async () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
console.log(`Today: ${todayStr}` );

    const response = await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${id}&fromdate=${todayStr}&todate=${todayStr}&format=json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data) {
      return data.episodes;
    }
    throw new Error('No episodes found');
  }

  const { data: episodes, isLoading: isLoadingEpisodes, error: errorEpisodes } = useQuery({
    queryKey: ['episodes', id],
    queryFn: fetchEpisodes
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
    <div>
      <h1>Program Details</h1>
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
          {/* Render broadcasts here */}
          <h1>Test</h1>
        </TabPanel>
        <TabPanel>
          <h1>Test</h1>

          <ul>
            {podFiles && podFiles.length > 0 ? (
              podFiles.map((pod: PodFile) => (
                <li key={pod.id}>
                  <h2>{pod.title}</h2>
                  <p>{pod.description}</p>
                  <p>Duration: {pod.duration} seconds</p>
                  <audio controls>
                    <source src={pod.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              ))
            ) : (
              <p className='no-files'>No pod files available</p>
            )}
          </ul>

        </TabPanel>
        <TabPanel>
          {/* Render episode here */}
          <h1>Test</h1>
          <ul>
            {episodes && episodes.length > 0 ? (
              episodes.map((episode: Episode) => (
                <li key={episode.id}>
                  <h2>{episode.title}</h2>
                  <p>{episode.description}</p>
                  {/* <p>Duration: {episode.broadcast.timeend - episode.broadcast.timestart} seconds</p> */}
                  <audio controls>
                    <source src={episode.listenpodfile.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              ))
            ) : (
              <p className='no-files'>No episodes available</p>
            )}
          </ul>


        </TabPanel>

      </Tabs>
    </div>
  );
}