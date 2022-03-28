import React from 'react'
import cookies from 'js-cookie'

function Service({ data }) {
     return (
          <div className="flex text-WHITE justify-center items-center my-auto">
               <img
                    className="2xl:w-28 1xl:w-28 xl:w-24 lg:w-20 md:w-20 sm:w-16 2xl:h-28 1xl:h-28 xl:h-24 lg:h-20 md:h-20 sm:h-16 "
                    src={data.photo}
                    alt="Light.Services"
               />
               <div className="px-3" >
                    <h3 className="text-lg pb-2">{cookies.get('i18next') === 'ar' ? data.name__ar : (cookies.get('i18next') === 'fr' ? data.name__fr : data.name__en)} </h3>
                    <p className="text-sm w-52"> {cookies.get('i18next') === 'ar' ? data.description__ar : (cookies.get('i18next') === 'fr' ? data.description__fr : data.description__en)}  </p>
               </div>
          </div>
     )
}

export default Service
