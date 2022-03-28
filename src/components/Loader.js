import React from 'react'
import img from '../assets/imgs/loader.gif'

function Loader() {
     return (
          <div className='flex flex-row justify-center items-center m-auto'>
               <img style={{ width: "100px" }} src={img} alt="light.services" />
          </div>
     )
}

export default Loader
