import ReactDOM from "react-dom/client";
import "./scss/main.scss";

import Sudoku from "./sudoku"


const LandingPage = ()=>{
  return (
    <>
    <Sudoku/>
    </>
  )
}




ReactDOM.createRoot(document.querySelector("#root")).render(
    <LandingPage />
)