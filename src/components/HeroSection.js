import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/swiper.scss'
import { SLIDERS } from './../sevices/globalServices'
import cookies from 'js-cookie'
import { TweenMax } from "gsap/all"

function HeroSection() {
     SwiperCore.use([Autoplay]);

     const [sliders, setsliders] = useState([])

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(SLIDERS())
                    .then(res => setsliders(res.data.data))
          }
          fetchData()
     }, [])

     return (
          <div className="grid grid-cols-2 px-52 max-h-screen 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4">

               <Swiper
                    className="flex justify-center h-full w-full flex-col "
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    autoplay={{ "delay": 3000 }}
                    onSlideChangeTransitionStart={
                         () => {
                              let intro = document.getElementsByClassName('sliderTitle')
                              let title = document.getElementsByClassName('sliderP')
                              let content = document.getElementsByClassName('sliderBtn')
                              TweenMax.to(intro, 0.5, { opacity: 1, y: -100, delay: 0.2, ease: Strong.easeInOut });
                              TweenMax.to(title, 0.4, { opacity: 1, y: -100, delay: 0.2, ease: Strong.easeInOut });
                              TweenMax.to(content, 0.3, { opacity: 1, y: -100, delay: 0.2, ease: Strong.easeInOut });

                         }
                    }
                    onSlideChangeTransitionEnd={
                         () => {
                              let intro = document.getElementsByClassName('sliderTitle')
                              let title = document.getElementsByClassName('sliderP')
                              let content = document.getElementsByClassName('sliderBtn')
                              TweenMax.from(intro, 0.3, { opacity: 0, y: 100, delay: 0.2, ease: Strong.easeInOut });
                              TweenMax.from(title, 0.4, { opacity: 0, y: 100, delay: 0.2, ease: Strong.easeInOut });
                              TweenMax.from(content, 0.5, { opacity: 0, y: 100, delay: 0.2, ease: Strong.easeInOut });
                         }
                    }
               >
                    {
                         sliders.map(s => <SwiperSlide className="flex flex-col my-auto  justify-center ">
                              <h1 className='font-sans text-BLACK text-5xl w-2/3 sliderTitle'>
                                   {cookies.get('i18next') === 'ar' ? s.title__ar : (cookies.get('i18next') == 'fr' ? s.title__fr : s.title__en)}</h1>
                              <p className='font-sans text-BLACK text-base py-12 w-3/4 sliderP'> {cookies.get('i18next') === 'ar' ? s.description__ar : (cookies.get('i18next') == 'fr' ? s.description__fr : s.description__en)} </p>
                              <a href='/products' className='font-sans text-WHITE bg-BLACK px-8 py-3 hover:bg-gray-700 transition-colors w-max sliderBtn' >SHOP NOW</a>
                         </SwiperSlide>
                         )
                    }

               </Swiper>

               <div className='h-full w-full max-h-screen' >
                    <Swiper
                         slidesPerView={1}
                         spaceBetween={0}
                         loop={true}
                         autoplay={{ "delay": 3000 }}
                    >
                         {sliders.map(s => <SwiperSlide>
                              <img src={s.photo} className='object-cover' style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Light Services" className="" />
                         </SwiperSlide>)}

                    </Swiper>
               </div>

          </div>
     )
}

export default HeroSection
