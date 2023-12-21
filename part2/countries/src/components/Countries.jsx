

const CountryList = ({name, show}) => {
    return(
    <div>
      <p>{name}</p>
      <button onClick={() => show(name)}>show</button>   
    </div>
    )
}

const Countries = ({countries, show}) => {
    if(countries.length <= 10){
      return(
      <div>
        {countries.map(element => 
            < CountryList key={element} name={element} show={show} />
            )}   
      </div>
      )
    }else{
     return(<p>Too Many matches, specify your search</p>
        
        )}

  }

export default Countries