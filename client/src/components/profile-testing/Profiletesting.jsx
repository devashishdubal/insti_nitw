import axios from "axios";
import ".//profiletesting.css"
import { useState, useEffect, useContext } from "react";
// import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

export default function Profiletesting() {

    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[username,setUsername] = useState("");
    const[rollNo,setRollNo] = useState("");
    const[branch,setBranch] = useState("");
    const[email,setEmail] = useState("");
    const[about,setAbout] = useState("");

    const [apiStatus, setApiStatus] = useState("idle");

    const redirectToUrl = (url) => {
        window.open(url, '_blank');
    };


    const validateUsername = async(e) => {
        e.preventDefault();
        setUsername(e.target.value);

        setApiStatus("idle");

        if(e.target.value){
            setApiStatus("loading");
            let link = `http://localhost:8000/api/v1/users/exist/${e.target.value}`;
            let response;
            try{
                response = await axios.get(link);
                setApiStatus(response.status === 200 ? "success" : "error");
            }
            catch(err){
                console.error('Error checking username:', err);
                setApiStatus("error");
            }
        }
    }

  return (
    <div className="profile_page">
        {/* {userData && ( */}
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
            //   src={currentUser.photoURL}
              src = ""
              alt="Your img"
              className="circle-photo"
            />
          </div>
        </div>

        <div className="information">
          {/* <h2>{userData.firstName} {userData.lastName} </h2> */}
          {/* <h4>firstName: <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" /></h4> */}
          {/* <h4>lastName: <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" /></h4> */}
          <h4>First Name: <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" /> Last Name: <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" /></h4>
          {/* <h4>Username: {userData.username}</h4> */}
          <h4>Username: <input type="text" value={username} onChange={validateUsername} placeholder="username" />
        {apiStatus === "loading" && <FaSpinner />}
        {apiStatus === "success" && <FaCheck color="green" />}
        {apiStatus === "error" && <FaTimes color="red" />}
          </h4>
          {/* <h4>Roll Number: {userData.rollNo}</h4> */}
          <h4>Roll No.: <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" /></h4>
          {/* <h4>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" /> Roll No.: <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" /></h4> */}
          {/* <h4>Branch: {userData.branch}</h4> */}
          {/* <h4>Branch: <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Branch" /></h4> */}
          {/* <h4>Email: {userData.email}</h4> */}
          {/* <h4>Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /></h4> */}
          {/* <p>About: {userData.aboutMe}</p> */}
          <h4>Branch: <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Branch" /> Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /></h4>
          <p>About: </p>
          <textarea rows="5" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Tell us something about yourself" />
        </div>

        <div className="social_buttons">
          {/* <button className="logo-button" onClick={() => redirectToUrl(userData.instagramLink)}> */}
          <button className="logo-button" onClick={() => redirectToUrl()}>
            <img
              className="logo-img"
              src="https://1.bp.blogspot.com/-8iUAoBlaDXs/XydkeTuLe3I/AAAAAAAAAG8/0hBkKsURAKQTM8FQ6DBEvHQS5_zjkYHrwCLcBGAsYHQ/s2048/logo%2Binstagram%2Bhitam%2Byogiancreative.png"
              alt="Insta"
            />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </button>

          {/* Add similar blocks for other social buttons */}
          
          {/* <button className="logo-button" onClick={() => redirectToUrl(userData.linkedInLink)}> */}
          <button className="logo-button" onClick={() => redirectToUrl()}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.c5c502876072b029777af952de544fa2?rik=4ZzmtGhxDHoMWg&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2013%2f04%2flinkedin-logo-transparent_371228.png&ehk=dJYm07mzFlEA2Ygv3E2Z7u%2bYgIpw5iewUm6vHledgok%3d&risl=&pid=ImgRaw&r=0"
              alt="LinkedIn"
            />
          </button>
          
          {/* <button className="logo-button" onClick={() => redirectToUrl(`mailto:${userData.email}`)}> */}
          <button className="logo-button" onClick={() => redirectToUrl()}>
            <img
              className="logo-img"
              src="https://clipground.com/images/email-logo-png-19.png"
              alt="Mail"
            />
          </button>
          
          {/* <button className="logo-button" onClick={() => redirectToUrl(userData.githubLink)}> */}
          <button className="logo-button" onClick={() => redirectToUrl()}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.7a864f07681f187fb572468bfc949977?rik=EyUQGBjtSbMjVw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgithub%2fgithub_PNG80.png&ehk=sCQlSHnb7Wc8WNPgOilokXbf8jL4g20yv7QFEFpl6ko%3d&risl=&pid=ImgRaw&r=0"
              alt="Github"
            />
          </button>
          
          {/* <button className="logo-button" onClick={() => redirectToUrl(userData.twitterLink)}> */}
          <button className="logo-button" onClick={() => redirectToUrl()}>
            <img
              className="logo-img"
              src="https://clipartcraft.com/images/twitter-logo-high-quality-5.png"
              alt="Twitter"
            />
          </button>

        </div>

        <div className="buttons">
          <button id="savebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
            Edit</button>
          {/* <button id="savebutton" onClick={handleCopyLink}> */}
          <button id="savebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share</button>
          <Toaster/>
        </div>
      </div>
        {/* )} */}
    </div>
  );
}
