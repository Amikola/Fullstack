

const Country  = ({country, weather}) => { 
    
    
    
    const languages = [];
    for(var i in country.languages){
        languages.push([i, country.languages [i]]);}
    
    

    return(
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>Area {country.area}</p>

        <b>Languages:</b>
        <ul>
        {languages.map(element => <li key={element[1]}>{element[1]}</li>)}
        </ul>
        <img src={country.flags.png}/>

        <h1>Weather in {country.capital}</h1>

        <p>temperature is {weather.current.temp_c} Celcius</p>

        <img src={weather.current.condition.icon}/>

        <p>Wind is {weather.current.wind_kph} kp/h </p>

        
    </div>
    
    
    )
}



export default Country