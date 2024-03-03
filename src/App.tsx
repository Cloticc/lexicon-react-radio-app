import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Broadcasts } from "./components/Broadcasts";
import { Channel } from "./components/Channels";
import { ChannelDetails } from './components/ChannelDetails';
import { Home } from './components/Home';
import { LoginForm } from "./components/LoginForm";
import { MyPage } from "./components/MyPage";
import { Navbar } from "./components/Navbar";
import { ProgramComponent } from "./components/Program";
import { ProgramDetails } from './components/ProgramDetails';

const queryClient = new QueryClient()

export function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Broadcasts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/channels" element={<Channel />} />
          <Route path="/channels/channel/:name/:channelId" element={<ChannelDetails />} />
          <Route path="/programs" element={<ProgramComponent />} />
          <Route path="/programs/program/:id" element={<ProgramDetails />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}