import Home from "./pages/Home"
import LoginWithGoogle from "./pages/Authentication/LoginWithGoogle";
import ViewProfile from "./pages/ViewProfile/ViewProfile"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContextProvider, AuthContext } from "./Context/AuthContext"
import { useContext } from "react";

function App() {
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>
    }

    return children
  }

  return (
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
          </Route>
          <Route path="login" element={<LoginWithGoogle/>} />
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