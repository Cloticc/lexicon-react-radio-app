import 'react-tabs/style/react-tabs.css'; // Import the styles

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useEffect, useState } from 'react';

import { Program } from '../interface/Interface';
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }






  return (
    <div>
      <h1>Program Details</h1>
      <Tabs>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Broadcasts</Tab>
          <Tab>Pods</Tab>
          <Tab>Old Chapters</Tab>
        </TabList>

        <TabPanel>
          {/* Render details here */}
          <h1>{program?.name}</h1>
          <p>{program?.description}</p>
          <img src={program?.programimage} alt={program?.name} />
          <a href={program?.programurl}>Visit Site</a>


        </TabPanel>
        <TabPanel>
          {/* Render broadcasts here */}
          <h1>Test</h1>

        </TabPanel>
        <TabPanel>
          {/* Render pods here */}
        </TabPanel>
        <TabPanel>
          {/* Render old chapters here */}
        </TabPanel>
      </Tabs>
    </div>
  );
}