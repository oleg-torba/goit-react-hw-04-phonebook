import { useState, useEffect } from "react";

export function UseLocalStorage (key, defaultValue)  {
    const [state, setState] = useState(() => {
      return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  };