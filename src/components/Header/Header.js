import React from 'react'
import { IndexLink, Link } from 'react-router'
// import './Header.scss'

export const Header = () => (
  <div>
    <h1>头部</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/signin' activeClassName='route--active'>
        Signin
    </Link>
  </div>
)

export default Header
