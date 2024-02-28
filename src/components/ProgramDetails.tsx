import 'react-tabs/style/react-tabs.css'; // Import the styles

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useEffect, useState } from 'react';

import { fetchData } from '../api/fetchData';
import { useParams } from 'react-router-dom';

interface Program {
  id: string;
  name: string;
  description: string;
  payoff: string;
  broadcastinfo: string;
  email: string;
  phone: string;
  programurl: string;
  programimage: string;
  programimagetemplate: string;
  programimagewide: string;
  programimagetemplatewide: string;
  socialimage: string;
  socialimagetemplate: string;
  archived: boolean;
  hasondemand: boolean;
  haspod: boolean;
  responsibleeditor: string;
}

export function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      setLoading(true);
      const { data, isLoading, error } = await fetchData(`programs/${id}?format=json`);
  
      if (error) {
        console.error('Error:', error);
        return;
      }
  
      if (!isLoading && data) {
        setProgram(data);
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
          <h2>{program?.name}</h2>
          <p>{program?.description}</p>
          <img src={program?.programimage} alt={program?.name} />

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