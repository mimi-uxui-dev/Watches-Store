import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import { SLIDERS } from '../sevices/globalServices';
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { TweenMax } from "gsap/all";
import { Link } from 'react-router-dom';

function HeroSection2() {
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
          <div style={{ maxHeight: '70%' }} className=" px-52 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4">

               <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    autoplay={{ "delay": 3000 }}
                    style={{ height: "70vh" }}
               >
                    {
                         sliders.map(s => <SwiperSlide key={s.id} style={{ height: 'fitContent !important' }}>
                              <Link to={'/products'} >
                                   <img src={s.photo} className='object-cover' style={{ width: "100%", height: "70vh", objectFit: "cover" }} alt="Light Services" className="" />
                              </Link>
                         </SwiperSlide>)
                    }
               </Swiper>

          </div>
     )
}

export default HeroSection2
