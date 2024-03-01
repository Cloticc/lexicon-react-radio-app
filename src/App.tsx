import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Broadcasts } from "./components/Broadcasts";
import { Channel } from "./components/Channel";
import { Home } from './components/Home';
import { LoginForm } from "./components/LoginForm";
import { MyPage } from "./components/MyPage";
import { Navbar } from "./components/Navbar";
import { ProgramComponent } from "./components/Program";
import { ProgramDetails } from './components/ProgramDetails';

// import { Outlet } from 'react-router-dom';



// export function App() {
//   return (
//     <>
//       <Navbar />
//       <LissenDirectly />

//       <QueryClientProvider client={queryClient}>
//       <Outlet />
//       </QueryClientProvider>
//     </>
//   );
// }

const queryClient = new QueryClient()

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <QueryClientProvider client={queryClient}>
      <Broadcasts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Channel" element={<Channel />} />
          <Route path="/program" element={<ProgramComponent />} />
          <Route path="/program/:id" element={<ProgramDetails />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/Login" element={<LoginForm />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}