import ClubCard from "./clubCard";
import "./clubs.css"

const ClubList = () => {
    return (
        <>
        <div className="allClubs">
            <ClubCard/>
            <ClubCard/>
            <ClubCard/>
            <ClubCard/>
            <ClubCard/>
            <ClubCard/>
        </div>
        </>
    );
}

export default ClubList;