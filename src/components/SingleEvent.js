import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import CharacterContext from './CharacterContext'


 function SingleEvent(event, character) {
  let eventCharactersURL = event.event.characters.collectionURI
  const[eventCharacters, setEventCharacters] =useState([]);
  const {setCharacterCon} = useContext(CharacterContext)
  const[fetchResults, setFetchResults] = useState([]);
  let namesArray = [] 
  let matchingResults = []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  useEffect(() => {
    fetch(`${eventCharactersURL}?limit=100&ts=1&apikey=7e83ac0b463a8a08dd9a9d134ac0130a&hash=6576dc02e0ffad166dad1d8a3e0febfc`)
    .then(res => res.json())
    .then(data => setEventCharacters(data.data.results))
  }, [])



useEffect(() => {
  eventCharacters.map((event) => {
    namesArray.push(event.name)
  })

  Promise.all(
      namesArray.map(name => 
        fetch(`https://www.superheroapi.com/api.php/101087216157325/search/${name}`)
        .then(res => res.json())
        .catch(err => console.log(err))
        )
    ).then(data => setFetchResults(data))
    
}, [eventCharacters])

  fetchResults.map(result => {
    if (result.response === 'success'){
      matchingResults.push(result)
      
    }})

  return (


    <>
    
      <h1 className='title'>"{event.event.title}"</h1>
      <h2 className='event-id-num'>Event Identification Number: {event.event.id} </h2>
    
    
    <div className='event-container'>
      
 
      
      <div classname='flex-flex-flex'>
      <div className='event-description'>
          <b><u><h4 className='description-tag'>Description: </h4></u></b><br></br>
          <span>{event.event.description}</span>
        </div>


        <div className='event-timeline'>
          <b><u><h4 className='event-timeline-tag'>Event Timeline:</h4></u></b><br></br>
          <span>Start: {event.event.start}</span>
          <span>End: {event.event.end}</span>
        </div>

        <div className='single-event-image'>
            <img className='single-event-image' src={event.event.thumbnail.path +'.'+ event.event.thumbnail.extension} alt=''/>
      </div>
      

      <div className="event-characters-container">
          {/* <b><u><h4 className='event-timeline-tag'>Assosciated Characters:</h4></u></b><br></br> */}
            <div className="event-character-list">{

                (matchingResults.length === 0 ? <div>Loading... </div> : 
                    matchingResults.map((character, index) => (
                        <Link to={`/characters/${character.results[0].id}`} key={character.results[0].id} onClick={() => {
                            setCharacterCon(character.results[0])
                        }} className='event-link-text'>
                            <div className='single-event-card' key={character.results[0].id}>
                                <div>{character.results[0].name}</div> *** 
                            </div>
                        </Link>
                    )))
            }</div>
        </div>

        




        {/* <div className="event-characters-container"> 
            <div className="event-character-list">{
                (eventURL === '' || eventURL === undefined || eventURL.length === 0  ?  <div>No known event data.</div> : 
                    eventData.map((event, index) => (
                        <Link to={`/events/${event.id}`} key={event.id} onClick={() => {
                            setEventCon(event)
                        }} className='event-link-text'>
                            
                            <div className='single-event-card' key={event.id}>
                                <h5 className="thumbnail-caption">{event.title}</h5>
                                <img src={event.thumbnail.path +'.'+ event.thumbnail.extension} alt='' className='events-thumbnail'/>
                                <div className="event-text">
                                
                                </div>
                            </div>
                        </Link>
                    )))
            }
            </div>
        </div> */}


      </div>






        
          


      


    </div>
    </>
  )

}

export default SingleEvent;