import "./App.css";
import Home, { loader as homeLoader } from "./pages/Home";
import ViewPoll, { loader as pollViewLoader } from "./pages/ViewPoll";
import CreatePoll from "./pages/CreatePoll";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Error from "./pages/Error";
import PollList, { loader as pollsLoader } from "./pages/PollList";
import PollResult, { loader as resultLoader } from "./pages/PollResults";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <></>,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: () => homeLoader(),
        },
        {
          path: "/polls/:id",
          element: <ViewPoll />,
          loader: ({ params }) => pollViewLoader(params),
        },
        {
          path: "/create-poll",
          element: <CreatePoll />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/polls",
          element: <PollList />,
          loader: () => pollsLoader(),
        },
        {
          path: "/polls/:id/results",
          element: <PollResult />,
          loader: ({ params }) => resultLoader(params),
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
