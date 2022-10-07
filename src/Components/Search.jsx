import React from 'react'
import './Search.css'
import {BiSearch} from 'react-icons/bi'

function Search({value, onChange}) {
  return (
    <div className="searchbar">
      <BiSearch size={20} className="icon"/>
      <input type="text" placeholder='Search by name'  value={value} onChange={onChange}/>
    </div>
  )
}

export default Search