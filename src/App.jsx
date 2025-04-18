// Task 1: Fetch & Store Tour Data

import { useState, useEffect } from 'react';

function App() {
  const [tours, setTours] = useState([]); 
  // stores tour data
  const [loading, setLoading] = useState(true); 
  // show loading text
  const [error, setError] = useState(false);
  // show error if fetch fails

  // Task 2: Dropdown Filter
  const [filteredTours, setFilteredTours] = useState([]); 
  // tours shown on what is selected
  const [selected, setSelected] = useState("All Destinations"); 
  // selected tour name from dropdown

  useEffect(() => {
    fetchTours();
    // run on page load
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch("https://course-api.com/react-tours-project");
      const data = await res.json();
      setTours(data); 
      // saves the data
      setFilteredTours(data); 
      // show all tours 
      setLoading(false); 
      // stop showing loading
    } catch (err) {
      setError(true); 
      // show error if it breaks
      setLoading(false);
    }
  };

  // Task 2:  destination names
  const destinationNames = ["All Destinations", ...new Set(tours.map((tour) => tour.name))];
  // list of all tour names (no repeats)

  // Task 2: dropdown change
  const handleSelectChange = (value) => {
    setSelected(value);
    // update selected destination
    if (value === "All Destinations") {
      setFilteredTours(tours); 
      // show all tours
    } else {
      setFilteredTours(tours.filter((tour) => tour.name === value));
      // show only the tour that is selected 
    }
  };

  return (
    <main>
      <h1>Tour Explorer</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong.</p>}

      {/* Task 2: Dropdown Filter */}
      {!loading && !error && (
        <select value={selected} onChange={(e) => handleSelectChange(e.target.value)}>
          {destinationNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}

      {/*  display tours later */}
    </main>
  );
}

export default App;
