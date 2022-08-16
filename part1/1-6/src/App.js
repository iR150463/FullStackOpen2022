import {useState} from "react";

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = (props) => {
  const {goodFb, neuFb, badFb} = props;
  const allFb = goodFb + neuFb + badFb;

  if (allFb === 0) {
    return (
      <div id="statisticsDiv">
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div id="statisticsDiv">
      <h1>statistics</h1>
      <StatisticLine text="good" value={goodFb} />
      <StatisticLine text="neutral" value={neuFb} />
      <StatisticLine text="bad" value={badFb} />
      <StatisticLine text="all" value={allFb} />
      <StatisticLine text="averate" value={(goodFb - badFb) / allFb} />
      <StatisticLine text="positive" value={`${100 * goodFb / allFb}%`} />
    </div>
  )
}

function App() {
  const [goodFb, setGoodFb] = useState(0);
  const [neuFb, setNeuFb] = useState(0);
  const [badFb, setBadFb] = useState(0);

  return (
    <div className="App">
      <div id="feedBackDiv">
        <h1>give feedback</h1>
        <button onClick={()=>{setGoodFb(goodFb+1)}}>good</button>
        <button onClick={()=>{setNeuFb(neuFb+1)}}>neutral</button>
        <button onClick={()=>{setBadFb(badFb+1)}}>bad</button>
      </div>
      <Statistics goodFb={goodFb} neuFb={neuFb} badFb={badFb}/>
    </div>
  );
}

export default App;
