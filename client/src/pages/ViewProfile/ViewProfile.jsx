import "./profile.css";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import PrivateProfileWarning from "./privateProfile";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();
  const [link, setLink] = useState("");
  const [isPrivate, setIsPrivate] = useState(null);

  useEffect(() => {
    // Fetch user data and set the link
    const fetchData = async () => {
      try {
        let getReqLink = "http://localhost:8000/api/v1/users/" + userId;
        const response = await axios.get(getReqLink);
        setUserData(response.data);
        setIsPrivate(response.data.privateProfile);
        setLink("http://localhost:3000/profile/" + userId); // Set the link from the response URL
      } catch (error) {
        console.log('Error! Please check input fields');
      }
    };

    fetchData();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        console.log('Link copied to clipboard:', link);
        // You can add a notification or other feedback if needed
        toast.success('Link copied to clipboard', {
          duration: 3000,
          position: 'top-right',

          // Styling
          style: {},
          className: '',
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
      })
      .catch((error) => {
        console.error('Error copying link to clipboard:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };

  const redirectToUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
    (isPrivate !== null) ? (
      (isPrivate === false) ? (
        <div className="profile_page">
          {userData && (
            <div className="user_info">
              {/* Main content for public profile */}
              <div className="banner-container">
                <div className="banner">
                  <img
                    src='https://static.vecteezy.com/system/resources/previews/002/274/811/large_2x/banner-template-with-a-dark-abstract-design-vector.jpg'
                    alt="Your img"
                    className="circle-photo"
                  />
                </div>

          {/* Add similar blocks for other social buttons */}
          
          <button className="logo-button" onClick={() => redirectToUrl('https://www.linkedin.com')}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.c5c502876072b029777af952de544fa2?rik=4ZzmtGhxDHoMWg&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2013%2f04%2flinkedin-logo-transparent_371228.png&ehk=dJYm07mzFlEA2Ygv3E2Z7u%2bYgIpw5iewUm6vHledgok%3d&risl=&pid=ImgRaw&r=0"
              alt="LinkedIn"
            />
          </button>
          
          <button className="logo-button" onClick={() => redirectToUrl('mailto:{your.email@example.com}')}>
            <img
              className="logo-img"
              src="https://clipgroundh.com/images/email-logo-png-19.png"
              alt="Mail"
            />
          </button>
          
          <button className="logo-button" onClick={() => redirectToUrl('https://www.github.com')}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.7a864f07681f187fb572468bfc949977?rik=EyUQGBjtSbMjVw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgithub%2fgithub_PNG80.png&ehk=sCQlSHnb7Wc8WNPgOilokXbf8jL4g20yv7QFEFpl6ko%3d&risl=&pid=ImgRaw&r=0"
              alt="Github"
            />
          </button>
          
          <button className="logo-button" onClick={() => redirectToUrl('https://www.twitter.com')}>
            <img
              className="logo-img"
              src="https://clipartcraft.com/images/twitter-logo-high-quality-5.png"
              alt="Twitter"
            />
          </button>
                <div className="circle-container">
                  <img
                    src="https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg"
                    alt="Your img"
                    className="circle-photo"
                  />
                </div>
              </div>

              <div className="information">
                <h2>{userData.firstName} {userData.lastName} </h2>
                <h4>Username: {userData.username}</h4>
                <h4>Roll Number: {userData.rollNo}</h4>
                <h4>Branch: {userData.branch}</h4>
                <h4>Email: {userData.email}</h4>
                <p>About: {userData.aboutMe}</p>
              </div>

              <div className="social_buttons">
                {/* Social buttons */}
                {/* ... */}
              </div>
              <div className="buttons">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button id="savebutton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                  <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                </svg> 
                Home
              </button>
            </Link>
            <button id="savebutton" onClick={handleCopyLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
            <Toaster/>
          </div>
            </div>
          )}
        </div>
      ) : (
        <PrivateProfileWarning/>
      )
    ) : null
  );
}

export default Profile;
