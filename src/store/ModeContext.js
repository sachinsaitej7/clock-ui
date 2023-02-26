import { createContext } from "react";

export const ModeContext = createContext({
  mode: "buyer",
  setMode: () => {},
});
