import React from 'react'
import {Link} from 'react-router'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      />
      <Link to="/signin">signin</Link>
      {console.log(this)}
  </div>
);


export default HomeView
