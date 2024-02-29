import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { Channel } from "./components/Channel";
import { Home } from './components/Home';
import { LissenDirectly } from "./components/LissenDirectly";
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
      <LissenDirectly />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Channel" element={<Channel />} />
          <Route path="/program/:id" element={<ProgramDetails />} />
          <Route path="/Program" element={<ProgramComponent />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/Login" element={<LoginForm />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}



