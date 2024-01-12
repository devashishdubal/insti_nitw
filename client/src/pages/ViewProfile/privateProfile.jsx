import "./privateProfile.css"

const PrivateProfileWarning = () => {
    return (
        <div className='no-events'>
            <p className='msg1'>This is a private profile</p> 
            <p className='msg2'>User has decided to protect his privacy.</p>
            <img src={process.env.PUBLIC_URL + "../assets/nothing-here.png"} alt='There is nothing here'/>  
        </div>
    );
}

export default PrivateProfileWarning;