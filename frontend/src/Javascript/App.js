import '../Css/App.css';
import { useState } from 'react';
import { getSolverResult } from './Solver';

function App() {
  const [result, setResult] = useState("");

  const handleClick = async () => {
    try {
      const res = await getSolverResult();
      setResult(res.score);
    } catch (err) {
      console.error("Error calling backend:", err);
      setResult("Error occurred");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>NP Date Puzzle Solver</h1>
      <button onClick={handleClick}>Send Test Input</button>
      <p>Backend response: {result}</p>
    </div>
  );
}

export default App;
