import "./recenteventcard.css"

export default function recenteventcard({recenteventdata}) {
  return (
    <div className="card">
          <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703116800&semt=sph" />
          <div className="card-body">
            <h2>{recenteventdata.title}</h2>
            <p>{recenteventdata.description}</p>
            <h5>{recenteventdata.author}</h5>
          </div>
        </div>
  )
}
