import "./profile.css"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext} from "../../Context/AuthContext"
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const {currentUser, userDetails} = useContext(AuthContext)
    const [link, setLink] = useState("");
    const [isPrivate, setIsPrivate] = useState(userDetails.privateProfile);
    const [openEdit, setOpenEdit] = useState(false);
    // info which can be edited
    const[username,setUsername] = useState("");
    const[instagramLink,setInstaLink] = useState("");
    const[twitterLink,setTwitterLink] = useState("");
    const[githubLink,setGitLink] = useState("");
    const[linkedinLink,setLinLink] = useState("");
    const[aboutMe, setAboutMe] = useState("");
    const[mess, setMess] = useState("1");

    const [apiStatus, setApiStatus] = useState("idle");
    function setTheme(color) {
      document.body.style.backgroundColor = color; // Set body background color
    }
    

    const MessChooser = () => {
        return (
          <div>
            <label for="mess">Choose a mess:</label>

            <select name="mess" id="mess" value={mess} onChange={(e) => setMess(e.target.value)}>
              <option value="1">IFC-A</option>
              <option value="2">IFC-B</option>
              <option value="3">IFC-C</option>
              <option value="4">Ladies Hostel</option>
            </select>
          </div>
        );
    }

    const MessName = (number) => {
        switch (number) {
          case 1: return "IFC-A";
          case 2: return "IFC-B";
          case 3: return "IFC-C";
          case 4: return "Ladies Hostel";
        }

        return "";
    }

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
      e.preventDefault();
      console.log();
      const data = {"username": username, "instagramLink": instagramLink, "linkedinLink": linkedinLink,
              "twitterLink": twitterLink, "githubLink": githubLink, "aboutMe": aboutMe, "mess": mess};
      axios
        .put(`http://localhost:8000/api/v1/users/updateProfile/${userData.username}`, data)
        .then(() => {
        })
        .catch((error) => {
            console.log(error)
        });

        toast.success('Details updated! Reload page to see details.', {
            duration: 3000,
            position: 'top-right',
            style: { marginTop: 70 },
            className: '',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });  
    };

    const handlePrivatePublicButton = () => {
      const newPrivateProfileValue = !isPrivate;
      setIsPrivate(newPrivateProfileValue);
      // send http request also
      const profileVisibilityChanges = {"privateProfile": newPrivateProfileValue};
      axios
        .put(`http://localhost:8000/api/v1/users/updateVisibility/${userData.username}`, profileVisibilityChanges)
        .then(() => {
          //console.log("Updated")
          let confirmationString = (newPrivateProfileValue) ? ("Account is private") : ("Account is public");
          toast.success(confirmationString, {
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
            console.log(error)
        });
    }

    useEffect(() => {
    // Fetch user data and set the link
      const fetchData = async () => {
        try {
          let reqLink = "http://localhost:8000/api/v1/users/getSession/" + userDetails.email;
          const response = await axios.get(reqLink);
          setUserData(response.data);
          setIsPrivate(response.data.privateProfile);
          console.log(userData.profilePic)
          setLink("http://localhost:3000/profile/" + response.data.username); // Set the link from the response URL
        } catch (error) {
          console.log('Error! Please check input fields');
        }
      };

      if (userDetails && userDetails.email) {
        //setUsername(currentUser.email.split("@")[0]);
        fetchData();
      }

    }, [isPrivate]);


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
    <div className="profile_page">
        {userData && (
      <div className="user_info">
        <div className="user-info-features">
        
          <div className="theme-container">
  <p>Personalize Theme</p>
  <div className="theme-options">
    <div
      className="theme-circle"
      style={{ backgroundColor: "#0f172a" }}
      onClick={() => setTheme("#0f172a")}
    ></div>
    <div
      className="theme-circle"
      style={{ backgroundColor: "#6b3f5e" }}
      onClick={() => setTheme("#6b3f5e")}
    ></div>
    <div
      className="theme-circle"
      style={{ backgroundColor: "#6b705c" }}
      onClick={() => setTheme("#6b705c")}
    ></div>
    <div
      className="theme-circle"
      style={{ backgroundColor: "#ffffff" }}
      onClick={() => setTheme("#ffffff")}
    ></div>
  </div>
</div>
<div className="visibility_settings">
            <h6>Stay private</h6>
            <label class="switch">
            <label className="switch">
              { (isPrivate != null) ? (
              <input type="checkbox" checked={isPrivate} onChange={handlePrivatePublicButton}/>): (null)
              }
              { (isPrivate != null) ? (
              <span className="slider round"></span>): (null)
              }
            </label>
            </label>
          </div>
        </div>
        



        <div className="banner-container">
          <div className="banner">
            <img
              src='https://static.vecteezy.com/system/resources/previews/002/274/811/large_2x/banner-template-with-a-dark-abstract-design-vector.jpg'
              alt="Your img"
              className="banner-image"
            />
          </div>

          <div className="circle-container">
            <img
              src={userData.profilePic}
              alt="Your img"
              className="circle-photo"
            />
          </div>
        </div>

        <div className="information">
          
          <h2>{userData.firstName} {userData.lastName} </h2>
          <br></br>
          
          
          
          {openEdit ? 
            (<div>
              <h4 style={{textAlign:"left",margin:"1rem"}}>Basic Information</h4>
              <div className="edit-username-div">
              <h5>Username</h5>
              <input type="text" value={username} onChange={validateUsername} 
            placeholder={userData.username} />
            {apiStatus === "loading" && <FaSpinner />}
            {apiStatus === "success" && <FaCheck color="green" />}
            {apiStatus === "error" && <FaTimes color="red" />}
            </div>
              
              <div className="edit-username-div">
              <h5>Roll number</h5>
              <input type="text"  disabled
            placeholder={userData.rollNo} />
            
            </div>
            <div className="edit-username-div">
              <h5>Branch</h5>
              <input type="text"  disabled
            placeholder={userData.branch} />
            
            </div>
            <div className="edit-username-div">
              <h5>Email</h5>
              <input type="text"  disabled
            placeholder={userData.email} />
            
            </div>

            </div>
            
            
            ) :
            (
              <div>
                <h4>Username: {userData.username}
                </h4>
                <h4>Roll Number: {userData.rollNo}</h4>
          <h4>Branch: {userData.branch}</h4>
          <h4>Email: {userData.email}</h4>


              </div>
            
            )
          }
          {openEdit ? (<div style={{textAlign:"left",marginTop:"1rem",marginBottom:"1rem"}}><MessChooser/></div>): (<h4>Hostel Subscription: You are subscribed to {MessName(userData.mess)}</h4>)}
          
          {(openEdit) ? 
            (
              <div className="edit-username-div">
                <h5>About</h5>
                <textarea onChange={(e) => setAboutMe(e.target.value)}>{userData.aboutMe}</textarea></div>)
             : (<h4>About: {userData.aboutMe}</h4>)
          }
        </div>

        <div className="social_buttons">
          
          {
            (openEdit) ? (
             
    
              <div className="edit-socials-div">
                <button className="logo-button" onClick={() => redirectToUrl(userData.instagramLink)}>
            <img
              className="logo-img"
              src="https://1.bp.blogspot.com/-8iUAoBlaDXs/XydkeTuLe3I/AAAAAAAAAG8/0hBkKsURAKQTM8FQ6DBEvHQS5_zjkYHrwCLcBGAsYHQ/s2048/logo%2Binstagram%2Bhitam%2Byogiancreative.png"
              alt="Insta"
            />
          </button>
                <input type="text" placeholder={userData.instagramLink} onChange={(e) => setInstaLink(e.target.value)}/>
              </div>
             
            ) : <button className="logo-button" onClick={() => redirectToUrl(userData.instagramLink)}>
            <img
              className="logo-img"
              src="https://1.bp.blogspot.com/-8iUAoBlaDXs/XydkeTuLe3I/AAAAAAAAAG8/0hBkKsURAKQTM8FQ6DBEvHQS5_zjkYHrwCLcBGAsYHQ/s2048/logo%2Binstagram%2Bhitam%2Byogiancreative.png"
              alt="Insta"
            />
          </button>
          }

          {/* Add similar blocks for other social buttons */}
          
          
          {
            (openEdit) ? (
              
              <div className="edit-socials-div">
                <button className="logo-button" onClick={() => redirectToUrl(userData.linkedInLink)}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.c5c502876072b029777af952de544fa2?rik=4ZzmtGhxDHoMWg&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2013%2f04%2flinkedin-logo-transparent_371228.png&ehk=dJYm07mzFlEA2Ygv3E2Z7u%2bYgIpw5iewUm6vHledgok%3d&risl=&pid=ImgRaw&r=0"
              alt="LinkedIn"
            />
          </button>
            <input type="text" placeholder={userData.linkedinLink} onChange={(e) => setLinLink(e.target.value)}/>
            </div>
            
            
            ) : <button className="logo-button" onClick={() => redirectToUrl(userData.linkedInLink)}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.c5c502876072b029777af952de544fa2?rik=4ZzmtGhxDHoMWg&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2013%2f04%2flinkedin-logo-transparent_371228.png&ehk=dJYm07mzFlEA2Ygv3E2Z7u%2bYgIpw5iewUm6vHledgok%3d&risl=&pid=ImgRaw&r=0"
              alt="LinkedIn"
            />
          </button>
          }

         
          {
            (openEdit) ? (
              <div className="edit-socials-div">
                <button className="logo-button" onClick={() => redirectToUrl(userData.githubLink)}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.7a864f07681f187fb572468bfc949977?rik=EyUQGBjtSbMjVw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgithub%2fgithub_PNG80.png&ehk=sCQlSHnb7Wc8WNPgOilokXbf8jL4g20yv7QFEFpl6ko%3d&risl=&pid=ImgRaw&r=0"
              alt="Github"
            />
          </button>
                <input type="text" placeholder={userData.githubLink} onChange={(e) => setGitLink(e.target.value)}/>

              </div>
            ) :  <button className="logo-button" onClick={() => redirectToUrl(userData.githubLink)}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.7a864f07681f187fb572468bfc949977?rik=EyUQGBjtSbMjVw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgithub%2fgithub_PNG80.png&ehk=sCQlSHnb7Wc8WNPgOilokXbf8jL4g20yv7QFEFpl6ko%3d&risl=&pid=ImgRaw&r=0"
              alt="Github"
            />
          </button>
          }

          
          {
            (openEdit) ? (<div className="edit-socials-div">
              <button className="logo-button" onClick={() => redirectToUrl(userData.twitterLink)}>
            <img
              className="logo-img"
              src="https://clipartcraft.com/images/twitter-logo-high-quality-5.png"
              alt="Twitter"
            />
          </button>
            <input type="text" placeholder={userData.twitterLink} onChange={(e) => setTwitterLink(e.target.value)}/>
            </div>) : <button className="logo-button" onClick={() => redirectToUrl(userData.twitterLink)}>
            <img
              className="logo-img"
              src="https://clipartcraft.com/images/twitter-logo-high-quality-5.png"
              alt="Twitter"
            />
          </button>
          }

        </div>
       
      

        <div className="buttons">
         
        

            {openEdit ? <button id="savebutton" onClick={handleCopyLink}>
            <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>


            Cancel</button> : <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 0 24 24" width="36" style={{fill: "black", cursor:"pointer",marginRight:"3rem"}} onClick={() => setOpenEdit(!openEdit)}>
  <path d="M0 0h24v24H0V0z" fill="none"/>
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.41L18.37 3.29c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
</svg>
}
          <button id="savebutton" onClick={handleCopyLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share</button>
          <Toaster/>
          {/* handleUpdate */}

          {openEdit ? (
            <button id="savebutton" onClick={handleUpdate}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>              
            Save details
            </button>
          ) 
          : (null)}
        </div>
      </div>
        )}
    </div>
  );
}

export default Profile;
