import React, { useState, useEffect } from 'react'
import BreadCrumbs from './BreadCrumbs'
import { useSelector } from 'react-redux';
import img1 from '../assets/imgs/about/03.jpg'
import img2 from '../assets/imgs/about/blog.jpg'
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import Team from './Team/Team';
import Faqs from './faqs/Faqs';
import { SERVICES } from './../sevices/globalServices';
import axios from 'axios';
import Service from './Service';

function About() {
     const { t } = useTranslation()
     const ci = useSelector(state => state.account)
     const aboutCover = ci.length === 0 ? null : ci.photo.find(i => i.type === 'About Cover').link

     const [services, setServices] = useState([])

     useEffect(() => {
          const fetchData = async () => {
               const result = await axios.get(SERVICES())
                    .then(res => setServices(res.data.data))
          }
          fetchData()
     }, [])

     return (
          <div>
               <BreadCrumbs img={aboutCover} path={'about'} />
               <div className='px-96 py-12 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4' >
                    <img src={img1} alt="Light.Services" />

                    <div className="pt-12">
                         <h1 className="text-BLACK text-center font-sans 2xl:text-3xl xl:text-3xl sm:text-2xl "> {t('OurStoryIsYourStory')} </h1>
                         <div className="bg-TEXT_GRAY w-16 h-1 mx-auto mt-2" ></div>
                    </div>

                    <p className="text-base  font-sans py-10 px-10  text-TEXT_GRAY">
                         {cookies.get('i18next') === 'ar' ? ci.description__ar : (cookies.get('i18next') == 'fr' ? ci.description__fr : ci.description__en)}
                    </p>

                    <Team />
                    <Faqs />
               </div>

               <div className='max-h-96 min-h-96 py-8 bg-cover object-cover bg-no-repeat bg-center grid 2xl:grid-cols-3 1xl:grid-cols-3 xl:grid-cols-3 2xl:px-96 1xl:px-52 xl:px-16 sm:px-2 sm:gap-10 self-center justify-center'
                    style={{ backgroundImage: `url(${img2})`, width: "100%" }}
               >
                    {services.map(s => <Service key={s.id} data={s} />)}
               </div>
          </div>
     )
}

export default About
