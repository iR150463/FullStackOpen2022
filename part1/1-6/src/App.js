import {useState} from "react";

const Statistics = (props) => {
  const {goodFb, neuFb, badFb} = props;
  const allFb = goodFb + neuFb + badFb;

  return (
    <div id="statisticsDiv">
      <h1>statistics</h1>
      <p>good {goodFb}</p>
      <p>neutral {neuFb}</p>
      <p>bad {badFb}</p>
      <p>all {allFb}</p>
      <p>average {(goodFb - badFb) / allFb}</p>
      <p>positive {100 * goodFb / allFb}%</p>
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
