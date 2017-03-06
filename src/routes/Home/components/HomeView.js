import React from 'react'
import {Link} from 'react-router'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const HomeView = () => (
  <div style={{ height:1200}}>
    <h4>Welcome!</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      />
      <Link to="/signin">signin</Link>
  </div>
);


export default HomeView
