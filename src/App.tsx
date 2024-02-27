import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Channel } from "./components/Channel";
import { Home } from './components/Home';
import { LissenDirectly } from "./components/LissenDirectly";
import { LoginForm } from "./components/LoginForm";
import { MyPage } from "./components/MyPage";
import { Navbar } from "./components/Navbar";
import { Program } from "./components/Program";

export function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <LissenDirectly />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/Channel" element={<Channel />} />
        <Route path="/Program" element={<Program />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}