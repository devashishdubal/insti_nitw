import axios from "axios";
import ".//profiletesting.css"
import { useState, useEffect, useContext } from "react";
// import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext} from "../../Context/AuthContext"
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

export default function Profiletesting() {

    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[username,setUsername] = useState("");
    const[branch,setBranch] = useState("");
    const[about,setAbout] = useState("");
    const[instaLink,setInstaLink] = useState("");
    const[twitterLink,setTwitterLink] = useState("");
    const[gitLink,setGitLink] = useState("");
    const[linLink,setLinLink] = useState("");

    const {currentUser} = useContext(AuthContext);

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

    const handleUpdate = (e) => {
        
    };

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
              src = {currentUser.photoURL}
              alt="Your img"
              className="circle-photo"
            />
          </div>
        </div>

        <div className="information">
          <h4>First Name: <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" /> Last Name: <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" /></h4>
          {/* <h4>Username: {userData.username}</h4> */}
          <h4>Username: <input type="text" value={username} onChange={validateUsername} placeholder="username" />
        {apiStatus === "loading" && <FaSpinner />}
        {apiStatus === "success" && <FaCheck color="green" />}
        {apiStatus === "error" && <FaTimes color="red" />}
          </h4>
          {/* <h4>Roll Number: {userData.rollNo}</h4> */}
          <h4>*Roll No.: </h4>
          {/* <h4>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" /> Roll No.: <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" /></h4> */}
          {/* <h4>Branch: <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Branch" /></h4> */}
          <h4>Branch: <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Branch" /> Email: </h4>
          <p>About: </p>
          <textarea rows="5" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Tell us something about yourself" />
        </div>

        <div className="social_buttons">
          <button className="logo-button">
            <img
              className="logo-img"
              src="https://1.bp.blogspot.com/-8iUAoBlaDXs/XydkeTuLe3I/AAAAAAAAAG8/0hBkKsURAKQTM8FQ6DBEvHQS5_zjkYHrwCLcBGAsYHQ/s2048/logo%2Binstagram%2Bhitam%2Byogiancreative.png"
              alt="Insta"
            />
          </button>
          <input type="text" value={instaLink} onChange={(e) => setInstaLink(e.target.value)} placeholder="Instagram Link" />

          {/* Add similar blocks for other social buttons */}
          
          <button className="logo-button">
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.c5c502876072b029777af952de544fa2?rik=4ZzmtGhxDHoMWg&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2013%2f04%2flinkedin-logo-transparent_371228.png&ehk=dJYm07mzFlEA2Ygv3E2Z7u%2bYgIpw5iewUm6vHledgok%3d&risl=&pid=ImgRaw&r=0"
              alt="LinkedIn"
            />
          </button>
          <input type="text" value={linLink} onChange={(e) => setLinLink(e.target.value)} placeholder="LinkedIn Link" />
          
          <button className="logo-button">
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.7a864f07681f187fb572468bfc949977?rik=EyUQGBjtSbMjVw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgithub%2fgithub_PNG80.png&ehk=sCQlSHnb7Wc8WNPgOilokXbf8jL4g20yv7QFEFpl6ko%3d&risl=&pid=ImgRaw&r=0"
              alt="Github"
            />
          </button>
          <input type="text" value={gitLink} onChange={(e) => setGitLink(e.target.value)} placeholder="Github Link" />
          
          <button className="logo-button" >
            <img
              className="logo-img"
              src="https://clipartcraft.com/images/twitter-logo-high-quality-5.png"
              alt="Twitter"
            />
          </button>
          <input type="text" value={twitterLink} onChange={(e) => setTwitterLink(e.target.value)} placeholder="Twitter Link" />

        </div>

        <div className="buttons">
          <button id="savebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>

            Cancel</button>
          {/* <button id="savebutton" onClick={handleCopyLink}> */}
          <button id="savebutton" onClick={handleUpdate}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
            Save Changes</button>
          <Toaster/>
        </div>
      </div>
        {/* )} */}
    </div>
  );
}
