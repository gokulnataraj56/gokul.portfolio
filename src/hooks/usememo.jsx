import React, { useEffect, useState, useMemo } from "react";
export const Usememo = () => {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);

    const doubleNumber = useMemo(() => {
        slowFunction(number);
  }, [number]);

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
      padding: "10px",
      marginTop: "10px",
    };
  }, [dark]);
  
  useEffect(() => {
      console.log("Theme changed");
    }, [themeStyles]);
    
    return (
        <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        />
      <button onClick={() => setDark((curr) => !curr)}>
        Toggle Theme
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </div>
  );
  
  function slowFunction(num) {
    console.log("Calling slow function...");
    for (let i = 0; i < 1000000000; i++) {}
    return num * 2;
  }
};





/*
import React, { useState, useMemo } from 'react';

export const Usememo = () => {
  const [dark, setDark] = useState(false);

  const bg = useMemo(() => {
    return {
      backgroundColor: dark ? "yellow" : "black",
      color: dark ? "black" : "white",
      height: "100px", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
  }, [dark]);

  return (
    <>
      <button onClick={() => setDark((prev) => !prev)}>Theme Change</button>
      <div style={bg}>
        {dark ? "Light Mode" : "Dark Mode"}
      </div>
    </>
  );
};
*/