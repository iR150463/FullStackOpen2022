import axios from 'axios'
import {useEffect, useState} from 'react'
import "./App.css"

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const Filter = ({setQuery, query}) => {
  return (
    <>
      Find Countries: <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}}></input>
    </>
  )
}

const WeatherDisplay = ({place, coords}) => {
  const [weather, setWeather] = useState(undefined)

  useEffect(()=>{
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords[0]}&lon=${coords[1]}&appid=${WEATHER_API_KEY}`)
      .then(res => {
        setWeather(res.data.current)
      })
  }, [coords])

  if (weather === undefined) return (<p>Fetching weather API...</p>)

  return (
    <>
      <h3>Weather in {place}</h3>
      <p>Temperature {weather.temp} Celcius</p>
      <img className="pic" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>Wind {weather.wind_speed} m/s</p>
    </>
  )
}

const ResultDisplay = ({countries, query, setQuery}) => {
  if (query === "") {
    return (
      <p>Type in query to search country...</p>
    )
  }

  const result = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()));

  if (result.length > 10) {
    return (
      <p>"Too many matches, specify another query."</p>
    )
  }

  if (result.length > 1) {
    let arr = [];
    for (let country of result) {
      arr.push(
      <div key={country.name}>
        {country.name} <button onClick={()=>{setQuery(country.name)}}>show</button>
      </div>
      )
    }

    return <>{arr}</>
  }

  if (result.length === 1) {
    const country = result[0];

    let languages = [];
    for (let l in country.languages) {
      languages.push(country.languages[l])
    }

    return (
      <>
        <h2>{country.name}</h2>

        <p>capital {country.capital}</p>
        <p>Area {country.area}</p>

        <h3>languages</h3>
        <ul>{languages.map(l => <li key={l}>{l}</li>)}</ul>

        <p className="pic">{country.flag}</p>

        <WeatherDisplay place={country.capital} coords={country.capitalCoords}/>
      </>
    )
  }

  if (result.length === 0) {
    return (
      <p>Cannot find the country!</p>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data.map(country => { return {
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flag: country.flag,
          capitalCoords: country.capitalInfo.latlng,
        }}))
      })
  }, [])

  return (
    <div className="App">
      <Filter setQuery={setQuery} query={query} />
      <ResultDisplay countries={countries} query={query} setQuery={setQuery} />
    </div>
  );
}

export default App;
