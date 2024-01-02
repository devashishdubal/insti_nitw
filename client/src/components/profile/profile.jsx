import "./profile.css"
import { useState,useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      axios
        .get('http://localhost:8000/api/v1/users/jdoe')
        .then(response => {
          setUserData(response.data);
        //   console.log(response.data);
        })
        .catch(error => {
          alert('Error! Please check input fields');
        });
    }, []);

    const redirectToUrl = (url) => {
        window.open(url, '_blank');
    };

  return (
    <div className="profile_page">
      <div className="user_info">
        <div className="banner-container">
          <div className="banner">
            <img
              src='https://static.vecteezy.com/system/resources/previews/002/274/811/large_2x/banner-template-with-a-dark-abstract-design-vector.jpg'
              alt="Your img"
              className="circle-photo"
            />
          </div>

          <div className="circle-container">
            <img
              src="https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg"
              alt="Your img"
              className="circle-photo"
            />
          </div>
        </div>

        <div className="information">
          <h4>Username: rashwinmusuku</h4>
          <h4>Roll Number: 22CSB0F07</h4>
          <h4>Branch: Computer Science and Engineering</h4>
          <h4>Email: rm22csb0f07@student.nitw.ac.in</h4>
          <p>About: Kabhi Kabhi lagta hai apun hi Bhagwan hai</p>
        </div>

        <div className="social_buttons">
          <button className="logo-button" onClick={() => redirectToUrl('https://www.instagram.com/?hl=en')}>
            <img
              className="logo-img"
              src="https://1.bp.blogspot.com/-8iUAoBlaDXs/XydkeTuLe3I/AAAAAAAAAG8/0hBkKsURAKQTM8FQ6DBEvHQS5_zjkYHrwCLcBGAsYHQ/s2048/logo%2Binstagram%2Bhitam%2Byogiancreative.png"
              alt="Insta"
            />
          </button>

          {/* Add similar blocks for other social buttons */}
          
          <button className="logo-button" onClick={() => redirectToUrl('https://www.linkedin.com')}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.c5c502876072b029777af952de544fa2?rik=4ZzmtGhxDHoMWg&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2013%2f04%2flinkedin-logo-transparent_371228.png&ehk=dJYm07mzFlEA2Ygv3E2Z7u%2bYgIpw5iewUm6vHledgok%3d&risl=&pid=ImgRaw&r=0"
              alt="LinkedIn"
            />
          </button>
          
          <button className="logo-button" onClick={() => redirectToUrl('mailto:your.email@example.com')}>
            <img
              className="logo-img"
              src="https://clipground.com/images/email-logo-png-19.png"
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

        </div>

        <div className="buttons">
          <button id="savebutton">Edit</button>
          <button id="savebutton">Share</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
