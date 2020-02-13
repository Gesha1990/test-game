import React from 'react'
import './Loader.css'
import loader from '../../assets/img/Spinner-1s-200px.svg'

const Loader = () => {
  return (
    <>
      <img src={loader} alt="louder" className='loader'/>
    </>
  )
}
export default Loader
