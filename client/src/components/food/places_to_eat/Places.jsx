import { useEffect, useState } from 'react';
import "./places.css"

const Places = () => {
    const [places, setPlaces] = useState(null);
    /*
    const request = async () => {
        const options = {
            method: 'GET',
            url: 'https://local-business-data.p.rapidapi.com/search',
            params: {
              query: 'Restaurants in Warangal, Telangana',
              limit: '20',
              lat: '17.9835',
              lng: '79.5308',
              zoom: '13',
              language: 'en',
              region: 'in'
            },
            headers: {
              'X-RapidAPI-Key': '27a637a12cmsh2363bb70a4a1267p1217fcjsnf9ea2c417e27',
              'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              setPlaces(response.data)
          } catch (error) {
              console.error(error);
          }
        }
    useEffect(() => {
        request();
    }, [])

    request();
    */
    /*
        <div className='places'>
                {places.data.map((place, index) => (
                    <div key={index}>
                        <h2>{place.name}</h2>
                        <p>{place.rating}</p>
                    </div>
                ))}
            </div>
    
    */
    return (
        <>
            <h1>These are the various places to eat in Warangal.</h1>
            <p>We will search for an appropriate API and work on the feature later</p>
        </>
    );
}

export default Places;