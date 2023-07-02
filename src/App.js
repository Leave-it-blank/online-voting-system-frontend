import "./App.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import ViewPoll from './pages/ViewPoll'
import CreatePoll from './pages/CreatePoll'

function App() {
  return (
    <Router>
      <div className="w-full h-screen">
        <div className="h-16 w-full bg-gray-800 flex items-center">
            <div className="container mx-auto px-5">
              <Link to='/' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Home</Link>
              <Link to='/polls/create' className='text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-3'>Create Poll</Link>
            </div>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path='/polls/create' element={CreatePoll} />
          <Route path='/polls/:poll' element={ViewPoll} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
