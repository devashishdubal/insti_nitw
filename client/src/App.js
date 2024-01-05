import Home from "./pages/Home"
import LoginWithGoogle from "./pages/Authentication/LoginWithGoogle";
import ViewProfile from "./pages/ViewProfile/ViewProfile"
import { Link, Outlet } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContextProvider, AuthContext } from "./Context/AuthContext"
import { useContext } from "react";
import Topbar from "./components/topbar/Topbar";
import StudentSidebar from "./components/sidebar/student_sidebar";
import Questions from "./components/forum/questions/questions";
import Feed from "./components/feed/feed";
import Calendar from "./components/students/calendar/Calendar";
import ClubList from "./components/clubs/NITW-clubs/clubList";
import ClubsSidebar from "./components/sidebar/clubs_sidebar";
import Recentevent from "./components/clubs/recent-events/Recentevent";
import UpcomingEvents from "./components/clubs/upcoming-events/Upcomingevent";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  const ProtectedRouteLogin = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }

    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute />} />
        </Route>
        <Route path="login" element={<ProtectedRouteLogin><LoginWithGoogle /></ProtectedRouteLogin>} />
        <Route path="/profile/:userId" element={<ViewProfile />} />
        <Route
          path="students"
          element={
            <div className="full_app">
              <div className="side">
                <StudentSidebar />
              </div>
              <div className="main">
                <Topbar />
                <div className="center scrollbar scrollbar-primary">
                  <Outlet />
                  <div className="force-overflow"></div> {/*scrollbar*/}
                </div>
              </div>
            </div>
          }
        >
          <Route path="feed" element={<Feed />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="forum" element={<Questions />} />
          <Route path="academics" element={<h1>Academics</h1>} />
        </Route>
        <Route
          path="clubs"
          element={
            <div className="full_app">
              <div className="side">
                <ClubsSidebar />
              </div>
              <div className="main">
                <Topbar />
                <div className="center scrollbar scrollbar-primary">
                  <Outlet />
                  <div className="force-overflow"></div> {/*scrollbar*/}
                </div>
              </div>
            </div>
          }
        >
          <Route path="nitw_clubs" element={<ClubList />} />
          <Route path="cses" element={<h1>CSES</h1>} />
          <Route path="recent_events" element={<Recentevent />} />
          <Route path="upcoming_events" element={<UpcomingEvents />} />
        </Route>
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