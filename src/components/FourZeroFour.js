import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function FourZeroFour() {
     const { t } = useTranslation()

     return (
          <div className="bg-gray-100 h-5/6 flex flex-col justify-center items-center">
               <div className="flex justify-center items-center flex-col">
                    <h1 className="font-sans 2xl:text-9xl 1xl:text-9xl xl:text-9xl lg:text-9xl md:text-4xl sm:text-4xl "> {t('404_oops')} </h1>
                    <p className="text-lg mt-6 mb-12"> {t('404_desc')} </p>
                    <div className='flex gap-4'>
                         <Link to='/' className="text-base font-sans w-max text-BLACK border-opacity-80 border-2 border-BLACK py-2 px-4 hover:text-WHITE hover:bg-BLACK transition-all" > {t('404_getBackHome')} </Link>
                         <Link to='/contact' className="text-base font-sans w-max text-WHITE border-2 border-BLACK py-2 px-4 hover:text-BLACK hover:bg-WHITE bg-BLACK transition-all"> {t('404_contactUs')} </Link>
                    </div>
               </div>
          </div>
     )
}

export default FourZeroFour
