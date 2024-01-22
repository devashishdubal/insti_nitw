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
    const [isPrivate, setIsPrivate] = useState(null);
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
      const fetchData = async (userDetails) => {
        try {
          let reqLink = "http://localhost:8000/api/v1/users/" + userDetails;
          const response = await axios.get(reqLink);
          setUserData(response.data);
          setIsPrivate(response.data.privateProfile);
          console.log(userData.profilePic)
          setLink("http://localhost:3000/profile/" + userDetails); // Set the link from the response URL
        } catch (error) {
          console.log('Error! Please check input fields');
        }
      };

      if (currentUser && currentUser.email) {
        //setUsername(currentUser.email.split("@")[0]);
        fetchData(userDetails.username);
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
              src={userData.profilePic}
              alt="Your img"
              className="circle-photo"
            />
          </div>
        </div>

        <div className="information">
          <div className="visibility_settings">
            <p>Stay private: </p>
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
          <h2>{userData.firstName} {userData.lastName} </h2>
          {openEdit ? (<MessChooser/>): (<p>You are subscribed to {MessName(userData.mess)}</p>)}
          {openEdit ? 
            (<div><input type="text" value={username} onChange={validateUsername} 
            placeholder={userData.username} />
            {apiStatus === "loading" && <FaSpinner />}
            {apiStatus === "success" && <FaCheck color="green" />}
            {apiStatus === "error" && <FaTimes color="red" />}
            </div>
            ) :
            (<h4>Username: {userData.username}
            </h4>
            )
          }
          <h4>Roll Number: {userData.rollNo}</h4>
          <h4>Branch: {userData.branch}</h4>
          <h4>Email: {userData.email}</h4>
          {(openEdit) ? 
            (<textarea onChange={(e) => setAboutMe(e.target.value)}>{userData.aboutMe}</textarea>) : (<p>About: {userData.aboutMe}</p>)
          }
        </div>

        <div className="social_buttons">
          <button className="logo-button" onClick={() => redirectToUrl(userData.instagramLink)}>
            <img
              className="logo-img"
              src="https://1.bp.blogspot.com/-8iUAoBlaDXs/XydkeTuLe3I/AAAAAAAAAG8/0hBkKsURAKQTM8FQ6DBEvHQS5_zjkYHrwCLcBGAsYHQ/s2048/logo%2Binstagram%2Bhitam%2Byogiancreative.png"
              alt="Insta"
            />
          </button>
          {
            (openEdit) ? (<input type="text" placeholder={userData.instagramLink} onChange={(e) => setInstaLink(e.target.value)}/>) : (null)
          }

          {/* Add similar blocks for other social buttons */}
          
          <button className="logo-button" onClick={() => redirectToUrl(userData.linkedInLink)}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.c5c502876072b029777af952de544fa2?rik=4ZzmtGhxDHoMWg&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2013%2f04%2flinkedin-logo-transparent_371228.png&ehk=dJYm07mzFlEA2Ygv3E2Z7u%2bYgIpw5iewUm6vHledgok%3d&risl=&pid=ImgRaw&r=0"
              alt="LinkedIn"
            />
          </button>
          {
            (openEdit) ? (<input type="text" placeholder={userData.linkedinLink} onChange={(e) => setLinLink(e.target.value)}/>) : (null)
          }

          <button className="logo-button" onClick={() => redirectToUrl(userData.githubLink)}>
            <img
              className="logo-img"
              src="https://th.bing.com/th/id/R.7a864f07681f187fb572468bfc949977?rik=EyUQGBjtSbMjVw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgithub%2fgithub_PNG80.png&ehk=sCQlSHnb7Wc8WNPgOilokXbf8jL4g20yv7QFEFpl6ko%3d&risl=&pid=ImgRaw&r=0"
              alt="Github"
            />
          </button>
          {
            (openEdit) ? (<input type="text" placeholder={userData.githubLink} onChange={(e) => setGitLink(e.target.value)}/>) : (null)
          }

          <button className="logo-button" onClick={() => redirectToUrl(userData.twitterLink)}>
            <img
              className="logo-img"
              src="https://clipartcraft.com/images/twitter-logo-high-quality-5.png"
              alt="Twitter"
            />
          </button>
          {
            (openEdit) ? (<input type="text" placeholder={userData.twitterLink} onChange={(e) => setTwitterLink(e.target.value)}/>) : (null)
          }

        </div>

        <div className="buttons">
          <button id="savebutton" onClick={() => setOpenEdit(!openEdit)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
            {openEdit ? ("Cancel") : ("Edit")}</button>
          <button id="savebutton" onClick={handleCopyLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share</button>
          <Toaster/>
          {/* handleUpdate */}

          {openEdit ? (
            <button id="savebutton" onClick={handleUpdate}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>              
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
