import React, { useEffect, useState } from 'react'
import { FAQS } from '../../sevices/globalServices';
import Faq from './Faq';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

function Faqs() {
     const { t } = useTranslation()

     const [faqs, setFaqs] = useState([])

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(FAQS())
                    .then(res => setFaqs(res.data.data))
          }
          fetchData()
     }, [])


     return (
          <div>
               <div className="pt-12 pb-2" >
                    <h1 className="text-BLACK text-center font-sans 2xl:text-3xl xl:text-3xl sm:text-2xl">{t('FAQS')} </h1>
                    <div className="bg-TEXT_GRAY w-16 h-1 mx-auto mt-2" ></div>
               </div>
               <div className="grid 2xl:grid-cols-2 1xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-12 py-12">
                    {faqs.map(faq => <Faq key={faq.id} faq={faq} />)}
               </div>
          </div>
     )
}

export default Faqs