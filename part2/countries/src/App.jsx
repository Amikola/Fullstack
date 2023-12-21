import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'
// using https://www.weatherapi.com
const api_key = import.meta.env.VITE_SOME_KEY




const App = () => {
  const [newfilter, setNewFilter] = useState("")
  const [allCountries, setStart] = useState([])
  const [currentList, setList] = useState([])
  const [weather, setWeather] = useState([])

  
  const [countryData, setCountryData] = useState([])

  useEffect(() => { 

    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
          const temp = response.data.map(element => element.name.common)
          setStart(temp)
          const filter = newfilter.toLowerCase()
          const current = temp.filter(element => element.toLowerCase().includes(filter))
          setList(current)
        })


  
      },[])


  

  const handleChange = (event) => {
    event.preventDefault()

    setNewFilter(event.target.value)
    const filter = event.target.value.toLowerCase()
    const current = allCountries.filter(element => element.toLowerCase().includes(filter))
    setList(current)

    
    if (current.length === 1) {
      const temp = current[0].toLowerCase()
      
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${temp}`)
      .then(response => {
        setCountryData(response.data)

        axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${response.data.capital[0]}`)
        .then(response => {
        setWeather(response.data)
      })
    
      })

      

    }
    else{
      
      setCountryData([])
    }}
      

  const show = (name) => {
    

    const temp = name.toLowerCase()
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${temp}`)
      .then(response => {
        setCountryData(response.data)
        
        
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${response.data.capital[0]}`)
        .then(response => {
        setWeather(response.data)
        })
      })
    
  }
 
  if (countryData.length !== 0 && weather.length !== 0 ){
    console.log(weather)

    return (
      <div>
        Find country: <input 
            value={newfilter}
            onChange={handleChange}/>
        <Country country={countryData} weather={weather}/>
      </div>
    )

  }else{
    
    return (
    <div>
      Find country: <input 
          value={newfilter}
          onChange={handleChange}/>
      <Countries countries={currentList} show={show}/>
    </div>
  )
} 


}

export default App