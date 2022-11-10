import { MD5 } from "crypto-js";
import {useEffect, useState, useContext} from 'react';
import EventContext from './EventContext'
import { Link } from "react-router-dom";

const EventSearch = () => {

const [eventData, setEventData] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [searchTerm, setSearchTerm] = useState('')
const {setEventCon} = useContext(EventContext)

const getHash = (timestamp, privKey, pubKey) => {
    return MD5(timestamp + privKey + pubKey)
  }

  useEffect( () => {
    setIsLoading(true)
    let baseURL = `http://gateway.marvel.com/v1/public/events`
    
    let ts = Date.now().toString()
    let apiKey = '16a2e7a8e840d83b283ad6c31d3d89a4'
    let privateKey = 'fddfab36e90c42519a7dfdee7839c9cc929fa016'
    let hash = getHash(ts, privateKey, apiKey)

    let url = `${baseURL}?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=100`

    fetch(url)
    .then(res => res.json())
    .then(data => setEventData(data.data.results))
    .then(data => setIsLoading(false))
  }, [])

return(
  <>
  <div className="search-container">
        <input 
        className="event-search-bar" 
        type='text' 
        placeholder="Search Event Database" 
        onChange={(event) => {
            setSearchTerm(event.target.value);
        }}
        /> 
    </div>
  <div className="events-container">
  {eventData.filter((value) => {
    if (searchTerm == "" ) {
      return value
    } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return value
    }
  }).map((result) => (
          <Link to={`/events/${result.id}`} onClick={() => {
            setEventCon(result)
        }} key={result.id}  className="Hero">
          <div className='event-card' key={result.id}>
            <img src={result.thumbnail.path +'.'+ result.thumbnail.extension} alt='' className='event-thumbnail'/>
            <h4>{result.title}</h4>
            
          </div>
          </Link>
        ))}
  </div>
  {isLoading && <div>Loading Events...</div>}  
  </>
)

}
  export default EventSearch;

