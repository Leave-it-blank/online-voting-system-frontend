import "./App.css";
import Home, {loader as homeLoader} from "./pages/Home";
import ViewPoll, {loader as pollViewLoader} from './pages/ViewPoll'
import CreatePoll from './pages/CreatePoll'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
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
         
     
      ],
    },
  ]);
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
