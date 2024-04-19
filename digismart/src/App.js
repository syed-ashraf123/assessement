import axios from "axios";
import React, { useState, useEffect } from "react";

import "./App.css";
import RightDiv from "./components/RightDiv.jsx";
import LeftDiv from "./components/LeftDiv.jsx";
function App() {
  // State to store the fetched data
  const [data, setData] = useState([]);

  // Function to fetch data using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/smartphone");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App mt-20">
      <div className="grid grid-cols-2 lg:mx-96">
        <LeftDiv data={data} />
        <RightDiv data={data} />
      </div>
    </div>
  );
}

export default App;
