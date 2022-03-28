import React from 'react'
import cookies from 'js-cookie'
import parser from "html-react-parser"

function Faq({ faq }) {
     return (
          <div className="">
               <h3 className="pb-2 2xl:text-xl xl:text-xl sm:text-lg ">{cookies.get('i18next') === 'ar' ? faq.question__ar : (cookies.get('i18next') === 'fr' ? faq.question__fr : faq.question__en)} </h3>
               <p className="text-sm text-justify text-gray-500">
                    {cookies.get('i18next') === 'ar' ? parser(`${faq.answer__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${faq.answer__fr}`) : parser(`${faq.answer__en}`))}
               </p>
          </div>
     )
}

export default Faq
