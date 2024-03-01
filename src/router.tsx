import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { App } from "./App";
import { Channel } from "./components/Channel";
import { LoginForm } from "./components/LoginForm";
import { MyPage } from "./components/MyPage";
import { ProgramComponent } from "./components/Program";
import { ProgramDetails } from "./components/ProgramDetails";

export const Router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="Channel" element={<Channel />} />
        <Route path="program/:id" element={<ProgramDetails />} />
        <Route path="Program" element={<ProgramComponent />} />
        <Route path="MyPage" element={<MyPage />} />
        <Route path="Login" element={<LoginForm />} />
      </Route>

  )
);