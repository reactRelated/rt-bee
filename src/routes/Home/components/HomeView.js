import React from 'react'
import {Link} from 'react-router'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const HomeView = () => (
  <div >
    <h4>Welcome!</h4>
      {sessionStorage.getItem("@@History/nn7hbo")}
  </div>
);


export default HomeView
