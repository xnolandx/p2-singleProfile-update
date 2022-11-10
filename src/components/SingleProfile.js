import { React, useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import EventContext from "./EventContext"
import BarChart from './charts/BarChart'
import HeroSearch from "./HeroSearch";
import useDebounce from "./useDebounce";
import CharacterContext from './CharacterContext'

function Character({character, compare}) {
  let hiddenButton = document.getElementById("hiddenButton")
  let hiddenButton2 = document.getElementById("hiddenButton2")
  let truncatedResults = []
 


  const[eventURL, setEventURL] = useState('');
  const[eventData, setEventData] =useState([])
  const [chartPath, setChartPath] = useState(``)
  const {setEventCon} = useContext(EventContext)
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [chartRedirect, setChartRedirect] = useState({});
  const {characterCon, setCharacterCon} = useContext(CharacterContext)

  const [displayedName, setDisplayedName] =useState('Average')
  const [displayedData, setDisplayedData] =useState([49.9, 37.9, 31.1,45.7,49.7,47.7])

  const [powerData, setPowerData] = useState({
    labels: ['Intelligence', 'Strength', 'Speed', 'Durability', 'Power', 'Combat'],
    datasets: [  {
      label: displayedName,
      data: displayedData,
      backgroundColor: [
        'rgba(176,28,11, 0.3)'
      ], 
      pointBackgroundColor: 'rgb(136, 9, 9, 1)',
      pointHoverBorderColor: 'rgb(245, 66, 66)',
      borderWidth: 1,
      borderColor: 'grey', 
      rAxisID: 'r',
    },  

    {
      label: character.name,
      data: [
        character.powerstats.intelligence, 
        character.powerstats.strength, 
        character.powerstats.speed,
        character.powerstats.durability,
        character.powerstats.power,
        character.powerstats.combat
      ], 
      backgroundColor: [
        'rgba(10,175,101, 0.3)'
      ], 
      pointBackgroundColor: 'rgb(7, 107, 1, 1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(245, 66, 66)',
      borderWidth: 1,
      borderColor: 'grey', 
      rAxisID: 'r',
    } ]
    
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [characterCon])

  useEffect(() => {
    fetch(`https://gateway.marvel.com/v1/public/characters?name=${character.name}&ts=1&apikey=7e83ac0b463a8a08dd9a9d134ac0130a&hash=6576dc02e0ffad166dad1d8a3e0febfc`)
    .then(res => res.json())
    .then(data => {
      data.data.results.length === 0 ?
      setEventURL([]) :
      setEventURL(data.data.results[0].events.collectionURI)
    })
    .catch(err => console.log(err))
  }, [character.name])


  useEffect(() => {
    fetch(`${eventURL}?limit=100&ts=1&apikey=7e83ac0b463a8a08dd9a9d134ac0130a&hash=6576dc02e0ffad166dad1d8a3e0febfc`)
    .then(res => res.json())
    .then(data => setEventData(data.data.results))
    .catch(err => console.log(err))
  }, [eventURL])



      // Effect for API call
      useEffect(
        () => {
          if (debouncedSearchTerm) {
            setIsSearching(true);
            setError(false);
            HeroSearch(debouncedSearchTerm).then((results) => {
              if (!results) {
                  setIsSearching(false)
                  setError(true)
                  setResults([])
              } else {
              setIsSearching(false);
              for (let i = 0; i < 2; i++) {
                if (results[i] !== undefined) {
                  truncatedResults.push(results[i])
                }
              }
              setResults(truncatedResults);
              }
              
            });
          } else {
            setResults([]);
            setIsSearching(false);
          }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
      );

      function showTheButtons() {
        hiddenButton.style.display = 'block';
        hiddenButton2.style.visibility = 'visible';
      }

  return (
    
    <div className='single-profile-container'>
     <div className="character-container">
          <h1 className='character-title' >{character.name} (Alignment Status: <strong>{character.biography.alignment}</strong>)
            </h1>
          <h2 className='alignment'>Identification Number: {character.id} </h2>
      <div></div>

<div className='all-the-buttons'>

<input id='compare-search'
        placeholder="Compare Individuals"
         onChange={(e) => setSearchTerm(e.target.value)} />

{results.map((result) => (
                      character.name !== result.name ?
                      <div onClick={() => {
                        setDisplayedName(`${result.name}`)
                        setDisplayedData([result.powerstats.intelligence, result.powerstats.strength, 
                          result.powerstats.speed, result.powerstats.durability, result.powerstats.power, 
                          result.powerstats.combat])
                        showTheButtons()
                        setChartPath(result.id)
                        setChartRedirect(result)
                        
                        document.getElementById('compare-search').value = ''
                        
                    }} key={result.id}  className="Hero">
                      
                          <div className='result-buttons'>
                            <button>{result.name}</button>
                          </div>
                          
                      </div>
                        : <div></div>

                    ),
                  )} 

<Link to={`/characters/${chartPath}`} className='link-text' key={character.id} onClick={() => {
                      setCharacterCon(chartRedirect)
                      setPowerData(
                        {
                          labels: ['Intelligence', 'Strength', 'Speed', 'Durability', 'Power', 'Combat'],
                          datasets: [  {
                            label: displayedName,
                            data: displayedData,
                            backgroundColor: [
                              'rgba(176,28,11, 0.3)'
                            ], 
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(245, 66, 66)',
                            borderWidth: 1,
                            borderColor: 'grey', 
                            rAxisID: 'r',
                          },  
                      
                          {
                            label: `${character.name}`,
                            data: [
                              character.powerstats.intelligence, 
                              character.powerstats.strength, 
                              character.powerstats.speed,
                              character.powerstats.durability,
                              character.powerstats.power,
                              character.powerstats.combat
                            ], 
                            backgroundColor: [
                              'rgba(10,175,101, 0.3)'
                            ], 
                            pointBackgroundColor: 'rgb(7, 107, 1, 1)',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(245, 66, 66)',
                            borderWidth: 1,
                            borderColor: 'grey', 
                            rAxisID: 'r',
                          }]})
                      setDisplayedName('Average')
                      setDisplayedData([49.9, 37.9, 31.1,45.7,49.7,47.7])
                      setSearchTerm('')
                      hiddenButton.style.display = 'block';
                      hiddenButton2.style.visibility = 'hidden';
                      }}>
                      {<button className='hiddenButton' id='hiddenButton' onClick={() => {
                        setCharacterCon(chartRedirect)
                      }}>{`Go to ${displayedName}'s page =>`}</button>}
                  </Link>

                <button className='hiddenButton2' id='hiddenButton2' onClick={() => {
                    hiddenButton.style.display = 'none';
                    hiddenButton2.style.visibility = 'hidden';
                      setSearchTerm('')
                      setPowerData(
                        {
                          labels: ['Intelligence', 'Strength', 'Speed', 'Durability', 'Power', 'Combat'],
                          datasets: [  {
                            label: displayedName,
                            data: displayedData,
                            backgroundColor: [
                              'rgba(176,28,11, 0.3)'
                            ], 
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(245, 66, 66)',
                            borderWidth: 1,
                            borderColor: 'grey', 
                            rAxisID: 'r',
                          },  
                      
                          {
                            label: `${character.name}`,
                            data: [
                              character.powerstats.intelligence, 
                              character.powerstats.strength, 
                              character.powerstats.speed,
                              character.powerstats.durability,
                              character.powerstats.power,
                              character.powerstats.combat
                            ], 
                            backgroundColor: [
                              'rgba(10,175,101, 0.3)'
                            ], 
                            pointBackgroundColor: 'rgb(7, 107, 1, 1)',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(245, 66, 66)',
                            borderWidth: 1,
                            borderColor: 'grey', 
                            rAxisID: 'r',
                          }]})
                      setDisplayedName('Average')
                      setDisplayedData([49.9, 37.9, 31.1,45.7,49.7,47.7])
                      document.getElementById('compare-search').value = ''
                  }}>{`Clear Results =>`}</button>





</div>




    <div className='hope'>


      
        <div className='chart-container'>
          <BarChart chartData={powerData}  />
        </div>

        <div className='character-image'>
            <img className='image' src={character.image.url} alt=''/>
        </div>
      



        <div className='character-info-container'>

        Biographical Data:
        <span><u>Full Name:</u> {character.biography['full-name']}</span><br></br>
        <span><u> Base(s) of Operation:</u> {character.work.base}</span><br></br>
        <span><u> Occupation:</u> {character.work.occupation}</span><br></br>
        <span><u>Place of Birth:</u> {character.biography['place-of-birth']}</span><br></br>
        <span><u>Alter Egos:</u> {character.biography['alter-egos']}</span><br></br>
        <span><u>Aliases:</u>             
          {character.biography.aliases.map((alias, index) => (
          <> /{alias}/</>
        ))}  
        </span>



  <i><strong>Appearance:</strong></i><br></br>
  <span><u>Species:</u> {character.appearance.race} {character.appearance.gender}</span><br></br>
  <span><u>Height:</u> {character.appearance.height[0]}</span><br></br>
  <span><u>Weight:</u> {character.appearance.weight[0]}</span><br></br>
  <span><u>Eye Color:</u> {character.appearance['eye-color']}</span><br></br>
  <span><u>Hair Color:</u> {character.appearance['hair-color']}</span><br></br>



  <i><strong>Connections:</strong></i><br></br>
  <span><u> Group-Affiliation:</u> {character.connections['group-affiliation']}</span><br></br>
  </div>







    </div>


      
          <div className='compare-container' id='compare-container'>
            <div className="hero-results-container">
               {useEffect(() => {
                        setPowerData(
                          {
                            labels: ['Intelligence', 'Strength', 'Speed', 'Durability', 'Power', 'Combat'],
                            datasets: [  {
                              label: displayedName,
                              data: displayedData,
                              backgroundColor: [
                                'rgba(176,28,11, 0.3)'
                              ], 
                              pointBackgroundColor: 'rgb(136, 9, 9, 1)',
                              // pointBackgroundColor: 'rgb(7, 107, 1, 1)',
                              pointHoverBackgroundColor: '#fff',
                              pointHoverBorderColor: 'rgb(245, 66, 66)',
                              borderWidth: 1,
                              borderColor: 'grey', 
                              rAxisID: 'r',
                            },  
                        
                            {
                              label: `${character.name}`,
                              data: [
                                character.powerstats.intelligence, 
                                character.powerstats.strength, 
                                character.powerstats.speed,
                                character.powerstats.durability,
                                character.powerstats.power,
                                character.powerstats.combat
                              ], 
                              backgroundColor: [
                                'rgba(10,175,101, 0.3)'
                              ], 
                              pointBackgroundColor: 'rgb(13, 95, 18, 1)',
                              pointHoverBackgroundColor: '#fff',
                              pointHoverBorderColor: 'rgb(245, 66, 66)',
                              borderWidth: 1,
                              borderColor: 'grey', 
                              rAxisID: 'r',
                            } ]
                            
                          }
                        )
                  }, [displayedName])}


              

                      

          </div>
        </div>  



              
 

        
        <div className='events-container'> 
        {/* <div className='events-container-header'>Associated Events</div> */}
            <div className='character-events'>{
              
                (eventURL === '' || eventURL === undefined || eventURL.length === 0  ?  <div>No known event data.</div> : 
                    eventData.map((event, index) => (
                        <Link to={`/events/${event.id}`} key={event.id} onClick={() => {
                            setEventCon(event)
                        }} className='event-link-text'>
                            
                            <div className='event-card' key={event.id}>
                                <h5 className="thumbnail-caption">{event.title}</h5>
                                <img src={event.thumbnail.path +'.'+ event.thumbnail.extension} alt='' className='events-thumbnail'/>
                                <div className="event-text">
                                
                                </div>
                            </div>
                        </Link>
                    )))
            }
            </div>
        </div>
          
      
    </div>
    
    </div>
  )

}

export default Character