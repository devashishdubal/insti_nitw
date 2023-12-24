import "./clubs.css"

const ClubCard = () => {
    return (
    <div className="club_card">
        <div className="logo">
            <img src={process.env.PUBLIC_URL + "../assets/logo.png"} alt="logo" className="logo-img"/>
        </div>
        <span className="club_name"><p>Club Name</p></span>
        <div className="info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nisi ut cupiditate ex ipsa, temporibus hic eaque fugit accusamus nobis sunt, 
            reiciendis harum placeat, nostrum officiis necessitatibus exercitationem aliquam recusandae dolorem!
        </div>
    </div>
    );
}

export default ClubCard;