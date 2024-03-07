import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Broadcasts } from "./components/Broadcasts";
import { Channel } from "./components/Channels";
import { ChannelDetails } from './components/ChannelDetails';
import { LoginForm } from "./components/LoginForm";
import { MyPage } from "./components/MyPage";
import { Navbar } from "./components/Navbar";
import { ProgramComponent } from "./components/Program";
import { ProgramDetails } from './components/ProgramDetails';
import { Register } from './components/Register';
import { useState } from 'react';

// import { Home } from './components/Home';






const queryClient = new QueryClient()

export function App() {

  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const handlePlayAudio = (src: string) => {
    setAudioSrc(src);
  };
  return (

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Broadcasts />
        <Routes>
          {/* <Route path="/" element={<Home onPlayAudio={handlePlayAudio} />} /> */}
          <Route path="/channels" element={<Channel onPlayAudio={handlePlayAudio} />} />
          <Route path="/channels/channel/:name/:channelId" element={<ChannelDetails/>} />
          <Route path="/programs" element={<ProgramComponent />} />
          <Route path="/programs/program/:id" element={<ProgramDetails onPlayAudio={handlePlayAudio} />} />
          <Route path="/mypage" element={<MyPage onPlayAudio={handlePlayAudio} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {audioSrc && (
          <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-white">
            <audio controls autoPlay src={audioSrc}>
              Your browser does not support the audio element.
            </audio>
            <button onClick={() => setAudioSrc(null)} className='ml-20 bg-red-500 text-white p-2 rounded-md'>Stäng</button>
          </div>
        )}
      </BrowserRouter>
    </QueryClientProvider>

  );
}