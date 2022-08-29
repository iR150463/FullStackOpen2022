import axios from 'axios'
import {useEffect, useState} from 'react'
import "./App.css"

const Filter = ({setFilter, filter}) => {
  return (
    <>
      Find Countries: <input type="text" value={filter} onChange={(e)=>{setFilter(e.target.value)}}></input>
    </>
  )
}

const ResultDisplay = ({countries, filter}) => {
  if (filter === "") {
    return (
      <p>Type in query to search country...</p>
    )
  }

  const result = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

  if (result.length > 10) {
    return (
      <p>"Too many matches, specify another filter."</p>
    )
  }

  if (result.length > 1) {
    let arr = [];
    for (let country of result) {
      arr.push(<p key={country.name}>{country.name}</p>)
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

        <p className="flag">{country.flag}</p>
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
  const [filter, setFilter] = useState('')

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
          flag: country.flag
        }}))
      })
  }, [])

  return (
    <div className="App">
      <Filter setFilter={setFilter} filter={filter} />
      <ResultDisplay countries={countries} filter={filter} />
    </div>
  );
}

export default App;
