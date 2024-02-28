import 'react-tabs/style/react-tabs.css'; // Import the styles

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useEffect, useState } from 'react';

import { Program } from '../interface/Interface';
import { fetchData } from '../api/fetchData';
import { useParams } from 'react-router-dom';

export function ProgramDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      setLoading(true);
      const { data, isLoading, error } = await fetchData(`programs/${id}?format=json`);
      // console.log('Data:', data);

      if (error) {
        console.error('Error:', error);
        return;
      }

      if (!isLoading && data) {
        setProgram(data.program); 
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
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