import React from 'react'
import LoginWithGoogle from "./pages/Authentication/LoginWithGoogle";
import ViewProfile from "./pages/ViewProfile/ViewProfile"
import { Link, Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContextProvider, AuthContext } from "./Context/AuthContext"
import { useContext, memo } from "react";
import Topbar from "./components/topbar/Topbar";
import StudentSidebar from "./components/sidebar/student_sidebar";
import Questions from "./components/forum/questions/questions";
import Feed from "./components/feed/feed";
import Calendar from "./layout/CalenderLayout";
import ClubList from "./components/clubs/NITW-clubs/clubList";
import ClubsSidebar from "./components/sidebar/clubs_sidebar";
import Recentevent from "./components/clubs/recent-events/Recentevent";
import UpcomingEvents from "./components/clubs/upcoming-events/Upcomingevent";
import CreateEvent from "./components/clubs/create-event/createEvent";
import EditEvent from "./components/clubs/edit-event/EditEvent";
import FoodSidebar from "./components/sidebar/food_sidebar";
import Places from "./components/food/places_to_eat/Places";
import Menu from "./components/food/mess/menu";
import "./App.css"
import Profile from "./components/profile/profile";
import AskQuestionForm from "./components/forum/questions/askQuestion";
import Answers from "./components/forum/answers/answers";
import Academics from "./components/academics/academics";
import Resources from "./components/academics/resources";
import Quicklinks from "./components/academics/quicklinks";
import Questionsdoubt from './components/academics/doubtforum/questionsdoubt/questionsdoubt';
import QuestionCarddoubt from './components/academics/doubtforum/questionsdoubt/question_carddoubt';
import AskQuestiondoubt from './components/academics/doubtforum/questionsdoubt/askQuestiondoubt';
import Answersdoubt from './components/academics/doubtforum/answersdoubt/answersdoubt';
import { BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const App = React.memo(() => {
  const { currentUser, userDetails } = useContext(AuthContext);
  //const location = useLocation();
  const ProtectedRoute = ({ children }) => {
    if (userDetails === null) {
      return <Navigate to="/" />
    }
    return children
  }

  const ProtectedRouteLogin = ({ children }) => {
    if (userDetails !== null) {
      return <Navigate to="/students/feed" />
    }

    return children
  }

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!currentPath.startsWith('/students/forum')) {
      sessionStorage.removeItem('qn');
      sessionStorage.removeItem('search');
      sessionStorage.removeItem('filter');
      sessionStorage.removeItem('page');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<h1>404</h1>}
        />
        <Route path="/">
          <Route index element={<ProtectedRouteLogin><LoginWithGoogle /></ProtectedRouteLogin>} />
        </Route>
        {/*<Route path="login" element={<ProtectedRouteLogin><LoginWithGoogle /></ProtectedRouteLogin>} />*/}
        <Route path="/profile/:userId" element={<ViewProfile />} />
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
          <Route path="academics" element={<ProtectedRoute><Academics /></ProtectedRoute>} />
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
          <Route path="create_event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
          <Route path="edit_event" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
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

        <Route
          path="students/academics"
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
        <Route path="resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
        <Route path="quicklinks" element={<ProtectedRoute><Quicklinks /></ProtectedRoute>} />
        <Route path="doubtforum/questionsdoubt/questionsdoubt/:course" element={<Questionsdoubt/>} /> {/*welcome to cse forum*/}
        <Route path="doubtforum/questionsdoubt/askQuestiondoubt/:course" element={<AskQuestiondoubt/>} /> {/* ask a question */}
        <Route path="doubtforum/answerssdoubt/answersdoubt/:id/:course" element={<Answersdoubt/>} />
        </Route>
        
      </Routes>
    </Router>
  );
})

export default App;