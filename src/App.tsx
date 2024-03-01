import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

import { LissenDirectly } from "./components/LissenDirectly";
import { Navbar } from "./components/Navbar";
import { Outlet } from 'react-router-dom';

// import { Channel } from "./components/Channel";
// import { Home } from './components/Home';

// import { LoginForm } from "./components/LoginForm";
// import { MyPage } from "./components/MyPage";

// import { ProgramComponent } from "./components/Program";
// import { ProgramDetails } from './components/ProgramDetails';

const queryClient = new QueryClient()

export function App() {

  return (
    <>
      <Navbar />
      <LissenDirectly />

      <QueryClientProvider client={queryClient}>
      <Outlet />
      </QueryClientProvider>
    </>
  );
}




{/* <BrowserRouter>
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
  </BrowserRouter> */}