import { useState, useEffect } from "react";
 
function useLocalStorage(key, initialValue) {
  // Try to get existing value from localStorage on first render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      // If something was saved before, use it; otherwise use initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
 
  // CONCEPT: useEffect
  // Runs every time storedValue changes
  // Saves the new value to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Could not save to localStorage", error);
    }
  }, [key, storedValue]);
 
  // Return exactly like useState: [value, setter]
  return [storedValue, setStoredValue];
}
 
export default useLocalStorage;
