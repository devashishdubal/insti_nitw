import "./upcomingeventcard.css"

export default function UpcomingEventCard({eventData}) {
  return (
    <div className="card">
        <img src={eventData.eventImage}/>
        <div className="card-body">
          <h2>{eventData.eventName}</h2>
          <p>{eventData.eventDescription}</p>
          <h5>{eventData.eventOrganizer}</h5>
        </div>
      </div>
  )
}
