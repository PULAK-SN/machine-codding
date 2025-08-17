import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [results, setResults] = useState("");
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      // console.log("cache retuen " + input);
      setResults(cache[input]);
      return;
    }
    // console.log("API_CALL " + input);
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h1>Auto Compulete</h1>
      <div>
        <input
          className="app_input"
          type="text"
          value={input}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          onChange={(e) => setInput(e.target.value)}
        />
        {showResults && results.length > 0 && (
          <div className="results_container">
            {results?.map((item) => (
              <span className="results" key={item.id}>
                {item.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
