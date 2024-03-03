import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useProgramDetails, useSearchEpisodes } from "../api/apiEpisode";

import { Broadcasts } from "./Broadcasts";
import { ISearchEpisode } from "../interface/Interface";
import React from "react";
import { useBroadcasts } from "../api/apiBroadcasts";
import { useParams } from "react-router-dom";

export const ChannelDetails = () => {
  // const { id } = useParams<{ id: string }>();
  const { name } = useParams<{ name: string }>();

  const { data: searchEpisode, isLoading: searchEpisodeLoading, error: searchEpisodeError } = useSearchEpisodes(name || "");


  if (searchEpisodeLoading) {
    return <div>Loading...</div>;
  }

  if (searchEpisodeError) {
    return <div>Error: {searchEpisodeError.message}</div>;
  }



  return (
    <div className="ProgramDetails">
      <h2>Program Details</h2>
      <Tabs>
        <TabList>
          <Tab>BroadCasts</Tab>
          <Tab>Program</Tab>
        </TabList>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {searchEpisode?.sort((a: { publishdateutc: string; }, b: { publishdateutc: string; }) => parseInt(b.publishdateutc.substring(6, b.publishdateutc.length - 2)) - parseInt(a.publishdateutc.substring(6, a.publishdateutc.length - 2))).map((episode: ISearchEpisode) => {
              return (
                <div key={episode.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-auto">
                  <div>
                    <img className="h-48 w-full object-cover" src={episode.imageurl} alt={episode.title} />
                  </div>
                  <div className="p-8">
                    <h3 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{episode.title}</h3>
                    <p className="mt-2 text-gray-500">{episode.description}</p>
                    <p className="mt-2 text-gray-500">
                      Published on: {new Date(parseInt(episode.publishdateutc.substring(6, episode.publishdateutc.length - 2))).toLocaleDateString('en-GB')}
                    </p>
                    <p>
                      Broadcast Time: {new Date(parseInt(episode.broadcasttime.starttimeutc.substring(6, episode.broadcasttime.starttimeutc.length - 2))).toLocaleTimeString('en-GB')} - {new Date(parseInt(episode.broadcasttime.endtimeutc.substring(6, episode.broadcasttime.endtimeutc.length - 2))).toLocaleTimeString('en-GB')}
                    </p>
                    <a href={episode.url} className="mt-2 text-indigo-500 hover:underline">{episode.program.name} Link</a>
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Program</h2>
          <p>Program</p>
        </TabPanel>





      </Tabs>
    </div>
  );
}




