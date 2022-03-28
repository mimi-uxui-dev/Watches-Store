import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import axios from 'axios';
import { PARTNERS } from './../sevices/globalServices';

function Partners() {
     SwiperCore.use([Autoplay]);

     const [partners, setPartners] = useState([])

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(PARTNERS())
                    .then(res => setPartners(res.data.data))
          }
          fetchData()
     }, [])

     return (
          <div data-aos="fade-up" className="px-52 h-full mt-12 max-h-24 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4">
               <Swiper
                    slidesPerView={partners.length >= 5 ? 5 : partners.length}
                    spaceBetween={0}
                    loop={true}
                    breakpoints={{

                         "1040": {
                              "slidesPerView": 3,
                         },
                         "640": {
                              "slidesPerView": 3,
                         },
                         "320": {
                              "slidesPerView": 3,
                         },
                    }}
                    autoplay={{ "delay": 1500, "pauseOnMouseEnter": true, "disableOnInteraction": false }}
               >
                    {
                         partners.map(p => <SwiperSlide key={p.id}><img src={p.photo} alt="Light Services" className="mx-auto py-8  filter grayscale hover:grayscale-0 transition-all" /> </SwiperSlide>)
                    }
               </Swiper>
          </div>
     )
}

export default Partners
