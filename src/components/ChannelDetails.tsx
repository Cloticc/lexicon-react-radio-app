import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useEpisodes, useProgramDetails } from "../api/apiEpisode";

import React from "react";
import { useParams } from "react-router-dom";

export const ChannelDetails = () => {
  const { id } = useParams<{ id: string }>();


  // if (!program) {
  // return <div>Loading...</div>;
  // }

  // if (program) {
  return (
    <div className="ProgramDetails">
      <h2>Program Details</h2>
      <Tabs>
        <TabList>
          <Tab>BroadCasts</Tab>
          <Tab>Episodes</Tab>
        </TabList>
        <TabPanel>
          <h2>Program</h2>

        </TabPanel>
      </Tabs>
    </div>
  );
}




