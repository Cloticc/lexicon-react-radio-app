import 'react-tabs/style/react-tabs.css'; // Import the styles

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

export const MyPage = () => {
  return (
    <div className="myPage">
      <h1>Favorit Page</h1>


      <Tabs>
        <TabList>
          <Tab>Favorite Channel</Tab>
          <Tab>Favorite program</Tab>
        </TabList>
        <TabPanel>
          <h2>Favorite Channel</h2>
          <p>No Favorite Channel</p>
        </TabPanel>
        <TabPanel>
          <h2>Favorite program</h2>
          <p>No Favorite program</p>
        </TabPanel>
      </Tabs>
    </div>



  )
}
