import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [state, setState] = useState(initialValue);
  const toggle = () => {
    setState((previous) => !previous);
  };
  return [state, toggle];
};

export default useToggle;
