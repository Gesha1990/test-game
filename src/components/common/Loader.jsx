import React from 'react';
import  style from './Loader.module.css'
import loader from '../../assets/img/Spinner-1s-200px.svg'


const Loader = () => {
  return (
      <>
        <img src={loader} alt="louder" className={style.loader}/>
      </>
  )
}
export default Loader;