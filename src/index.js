import ReactDOM from "react-dom"
import React from 'react'
import Kennel from "./components/Kennel"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
<Router>
    <Kennel />
</Router>, document.querySelector("#root"));