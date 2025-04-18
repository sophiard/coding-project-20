// Task 1: Fetch & Store Tour Data

import { useState, useEffect } from 'react';

function App() {
  const [tours, setTours] = useState([]); 
  // stores tour data
  const [loading, setLoading] = useState(true); 
  // show loading text
  const [error, setError] = useState(false);
   // show error if fetch fails

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
      setLoading(false); 
      // stop showing loading
    } catch (err) {
      setError(true); 
      // show error if it breaks
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Tour Explorer</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong.</p>}
      {/* We’ll display tours later */}
    </main>
  );
}

export default App;