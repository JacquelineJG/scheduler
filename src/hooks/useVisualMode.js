import REACT, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, update = false) { 
    if (update) {
    setMode(mode);
   } else {
     setMode(mode);
     setHistory(prev => [...prev, mode]);
   }
  };
  function back() { 
    if (history.length > 1) {
      setMode(history[history.length -2]);
      setHistory(prev => [...prev.slice(0, prev.length-1)]);
    }
  }
    return { mode, transition, back };
  };

