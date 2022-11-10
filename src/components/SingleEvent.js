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
    <div className='event-container'>

      <h1 className='title'>{event.event.title}</h1>
      <div className='single-event-image'>
            <img className='single-event-image' src={event.event.thumbnail.path +'.'+ event.event.thumbnail.extension} alt=''/>
      </div>
      <h2 className='event-id-num'>Event Identification Number: {event.event.id} </h2>

      <ul className='event-description'>
        Description:
        <li> {event.event.description}</li>
      </ul>

      <div className='event-info-container'>

        <ul className='event-timeline'>
          Event Timeline:
          <li>Start: {event.event.start}</li>
          <li>End: {event.event.end}</li>
        </ul>

          Assosciated Characters:
          <div className="event-characters-container">
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
          
        


      </div>
    </div>
  )

}

export default SingleEvent;