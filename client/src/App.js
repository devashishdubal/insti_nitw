import React from 'react';
import LoginWithGoogle from "./pages/Authentication/LoginWithGoogle.jsx";
import ViewProfile from "./pages/ViewProfile/ViewProfile.jsx";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContextProvider, AuthContext } from "./Context/AuthContext";
import { useContext, memo } from "react";
import Topbar from "./components/topbar/Topbar.jsx";
import StudentSidebar from "./components/sidebar/student_sidebar.jsx";
import Questions from "./components/forum/questions/questions.jsx";
import Feed from "./components/feed/feed.jsx";
import Calendar from "./layout/CalenderLayout.jsx";
import ClubList from "./components/clubs/NITW-clubs/clubList.jsx";
import ClubsSidebar from "./components/sidebar/clubs_sidebar.jsx";
import Recentevent from "./components/clubs/recent-events/Recentevent.jsx";
import UpcomingEvents from "./components/clubs/upcoming-events/Upcomingevent.jsx";
import CreateEvent from "./components/club-admin/Create-event/createEvent.jsx";
import EditEvent from "./components/club-admin/Edit-event/editEvent.jsx";
import FoodSidebar from "./components/sidebar/food_sidebar.jsx";
import Places from "./components/food/places_to_eat/Places.jsx";
import Menu from "./components/food/mess/menu.jsx";
import "./App.css";
import Profile from "./components/profile/profile.jsx";
import AskQuestionForm from "./components/forum/questions/askQuestion.jsx";
import Answers from "./components/forum/answers/answers.jsx";
import ClubAdmin from './components/club-admin/clubAdmin.jsx';
import ClubLogin from './pages/ClubLogin/ClubLogin.jsx';
import { BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const App = React.memo(() => {
  const { currentUser, userDetails } = useContext(AuthContext);
  const location = useLocation();
  const ProtectedRoute = ({ children }) => {
    if (userDetails === null) {
      return <Navigate to="/" />;
    }
    
    if (currentUser === true) return children
    return <Navigate to="/" />;
  }

  const ProtectedRouteLogin = ({ children }) => {
    if (userDetails !== null && currentUser === true) {
      return <Navigate to="/students/feed" />;
    }

    if (userDetails !== null && currentUser === false) {
      return <Navigate to="/clubAdmin" />;
    }
  
    return children;
  };
  
  const ProtectedClubRoute = ({ children }) => {
    if (userDetails !== null && currentUser === false) {
      return children;
    }
  
    return <Navigate to="/clubLogin" />;
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!currentPath.startsWith('/students/forum')) {
      sessionStorage.removeItem('qn');
      sessionStorage.removeItem('search');
      sessionStorage.removeItem('filter');
      sessionStorage.removeItem('page');
    }
  }, [location]);

  return (
      <Routes>
        <Route
          path="*"
          element={<h1>404</h1>}
        />
        <Route path="/">
          <Route index element={<ProtectedRouteLogin><LoginWithGoogle /></ProtectedRouteLogin>} />
        </Route>
          <Route path="/clubAdmin" element={<ProtectedClubRoute><ClubAdmin/></ProtectedClubRoute>} />
          <Route path="/clubLogin" element={<ProtectedRouteLogin><ClubLogin/></ProtectedRouteLogin>} />
          {/*<Route path="login" element={<ProtectedRouteLogin><LoginWithGoogle /></ProtectedRouteLogin>} />*/}
          <Route path="/profile/:userId" element={<ViewProfile />} />
          <Route path="/clubs/edit_event/:id" element={<ProtectedClubRoute><EditEvent /></ProtectedClubRoute>} />
          <Route path="/clubs/create_event/" element={<ProtectedClubRoute><CreateEvent /></ProtectedClubRoute>} />
        <Route
          path="students"
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="feed" />} />
          <Route path="feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="academics" element={<h1>Academics</h1>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
        <Route
          path="clubs"
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="nitw_clubs" />} />
          <Route path="nitw_clubs" element={<ProtectedRoute><ClubList /></ProtectedRoute>} />
          <Route path="cses" element={<h1>CSES</h1>} />
          <Route path="recent_events" element={<ProtectedRoute><Recentevent /></ProtectedRoute>} />
          <Route path="upcoming_events" element={<ProtectedRoute><UpcomingEvents /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
        <Route
          path="food"
          element={
            <ProtectedRoute>
              <div className="full_app">
                <div className="side">
                  <FoodSidebar />
                </div>
                <div className="main">
                  <Topbar />
                  <div className="center scrollbar scrollbar-primary">
                    <Outlet />
                    <div className="force-overflow"></div> {/*scrollbar*/}
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="places_to_eat" />} />
          <Route path="places_to_eat" element={<ProtectedRoute><Places /></ProtectedRoute>} />
          <Route path="mess" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
        <Route
          path="students/forum"
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          }
        >
          <Route index element={<ProtectedRoute><Questions /></ProtectedRoute>} />
          <Route path="ask_question" element={<ProtectedRoute><AskQuestionForm /></ProtectedRoute>} />
          <Route path=":id/" element={<ProtectedRoute><Answers /></ProtectedRoute>} />
        </Route>
      </Routes>
  );
})

export default App;