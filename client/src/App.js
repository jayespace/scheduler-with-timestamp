import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import Scheduler from './pages/Scheduler';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/scheduler" element={<Scheduler />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
