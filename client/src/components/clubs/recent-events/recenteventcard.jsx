import "./recenteventcard.css"

export default function recenteventcard({recenteventdata}) {
  return (
    <div className="card">
        <img src={recenteventdata.eventImage}/>
        <div className="card-body">
          <h2>{recenteventdata.eventName}</h2>
          <p>{recenteventdata.eventDescription}</p>
          <h5>{recenteventdata.eventOrganizer.clubName}</h5>
        </div>
      </div>
  )
}
