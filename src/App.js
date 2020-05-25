import React, { useState, useEffect } from "react";
import { Root, Routes } from "react-static";
import axios from "axios";
import { Router } from "@reach/router";

import { endpoint } from "../config";

import "./app.css";

const ListingsContext = React.createContext();

function useListings() {
  const [listings, setListings] = useState([]);
  async function fetchListings() {
    console.log("Re-running fetch listings");
    const { data } = await axios.get(`${endpoint}/listings`);
    setListings(data);
  }
  // fetch the listings on component mount
  useEffect(() => {
    fetchListings();
  }, []);
  // expose the fetch function so we can manually call it on click
  return { listings, fetchListings };
}

function Data({ children }) {
  const { listings, fetchListings } = useListings();

  return (
    <ListingsContext.Provider
      value={{
        listings,
        fetchListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

function App() {
  return (
    <Root>
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Data>
            <Router>
              <Routes path="/" />
            </Router>
          </Data>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;
export { ListingsContext };
