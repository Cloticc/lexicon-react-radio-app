import 'react-tabs/style/react-tabs.css'; // Import the styles

import { IEpisode, IPodFile } from '../interface/Interface';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

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

  const fetchEpisodeDetails = async (episodeId: number) => {
    const response = await fetch(`http://api.sr.se/api/v2/episodes/get?id=${episodeId}&format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    if (data) {
      return data.episode;
    }
    throw new Error('No episode details found');
  }


  const fetchEpisodes = async () => {

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoStr = `${twoDaysAgo.getFullYear()}-${String(twoDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(twoDaysAgo.getDate()).padStart(2, '0')}`;

    const startDateStr = '2010-01-01';

    const response = await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${id}&fromdate=${startDateStr}&todate=${twoDaysAgoStr}&audioquality=hi&format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   
    const data = await response.json();
  if (data) {
    const episodesWithDetails = await Promise.all(
      data.episodes.map(async (episode: IEpisode) => {
      const episodeDetails = await fetchEpisodeDetails(Number(episode.id));
        return { ...episode, ...episodeDetails };
      })
    );
    return episodesWithDetails;
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
              podFiles.map((pod: IPodFile) => (
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
              episodes.map((episode: IEpisode) => (
                <li key={episode.id ? episode.id : 'No ID'}>
                  <h2>{episode.title ? episode.title : 'No title available'}</h2>
                  <p>{episode.description ? episode.description : 'No description available'}</p>
                  <p>Published: {episode.publishdateutc ? episode.publishdateutc : 'No publish date available'}</p>
                  {episode.url ? <a href={episode.url}>Listen</a> : null}
                  {episode.imageurl ? <img src={episode.imageurl} alt={episode.title ? episode.title : 'No title available'} /> : null}
                  {episode.listenpodfile && episode.listenpodfile.url ? (
                    <audio controls>
                      <source src={episode.listenpodfile.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <p>No audio file available</p>
                  )}
                  {episode.downloadpodfile && episode.downloadpodfile.url ? <a href={episode.downloadpodfile.url}>Download</a> : <p>No download file available</p>}
                  <p>Episode Group: {episode.episodegroups && episode.episodegroups.length > 0 ? episode.episodegroups[0].name : 'No episode group available'}</p>
                  <p>Available Until: {episode.availableuntilutc ? episode.availableuntilutc : 'No available until date available'}</p>
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