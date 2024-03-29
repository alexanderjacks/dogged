import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import SearchBox from './SearchBox'
import logo from '../img/logo.png'

const Navbar = () => (
  <StaticQuery
    query={graphql`
            query SearchIndexQuery {
                siteSearchIndex {
                    index
                }
            }
        `}
    render={data => (
      <nav className='navbar is-fixed-top is-primary' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            <img src={logo} alt="StardewDex" />
            StardewDex
          </Link>

        </div>
        <div id='navMenu' className='navbar-menu is-active is-primary'>
          <div className='navbar-start'>
          </div>
          <div className='navbar-end'>
            <SearchBox searchIndex={data.siteSearchIndex.index} />
          </div>
        </div>
      </nav>
    )}
  />
)

export default Navbar
