import Home from "./pages/Home"
import ViewProfile from "./pages/ViewProfile/ViewProfile"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/profile/:userId" Component={ViewProfile} />
      </Routes>
    </Router>
  );
}

/*
function App() {
  return (
    <Home />
  );
}
*/
export default App;