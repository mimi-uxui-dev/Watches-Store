import React from 'react'

function BreadCrumbs({ img, path }) {

     return (
          <div className='h-60 bg-cover object-cover bg-no-repeat bg-center flex flex-col gap-4 justify-center 2xl:mt-0 1xl:mt-0 xl:mt-0 lg:mt-0 md:mt-16 sm:mt-16' style={{ backgroundImage: `url(${img})`, width: "100%" }} >
               <br />
               <div className='bg-opacity-80 bg-BLACK mx-96 py-8 hover:bg-opacity-75 2xl:mx-52 1xl:mx-52 xl:mx-52 sm:mx-4'>
                    <a className='font-serif flex text-center justify-center capitalize text-WHITE 2xl:text-7xl 1xl:text-5xl xl:text-5xl sm:text-4xl ' href={`/${path}`}> {path} </a>
               </div>
               <div className='text-center mb-4 text-lg flex justify-center text-WHITE'>
                    <a href="/" className="hover:text-REDD"> Home </a>&nbsp;&nbsp;/&nbsp;&nbsp;<a href={`/${path}`} className="hover:text-REDD capitalize" > {path} </a>
               </div>

          </div>
     )
}

export default BreadCrumbs
