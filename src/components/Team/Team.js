import React, { useState, useEffect } from 'react'
import MemberCard from './MemberCard'
import axios from "axios"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { MEMBERS } from './../../sevices/globalServices';


function Team() {
     SwiperCore.use([Autoplay]);
     const { t } = useTranslation()

     const [members, setMembers] = useState([])

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(MEMBERS())
                    .then(res => setMembers(res.data.data))
          }
          fetchData()
     }, [])

     return (
          <div>
               <div className="pt-12 flex flex-col items-center " >
                    <h1 className="text-BLACK text-center font-sans 2xl:text-3xl xl:text-3xl sm:text-2xl">{t('Meet_The_Team')}</h1>
                    <div className="bg-TEXT_GRAY w-16 h-1 mx-auto mt-2" ></div>
               </div>

               <Swiper
                    style={{ height: "fit-content" }}
                    slidesPerView={3}
                    breakpoints={{
                         "300": {
                              "slidesPerView": 1,
                         },
                         "420": {
                              "slidesPerView": 1,
                         },
                         "640": {
                              "slidesPerView": 1,
                         },
                         "768": {
                              "slidesPerView": 2,
                         },
                         "1024": {
                              "slidesPerView": 3,
                         }
                    }}
                    spaceBetween={0}
                    loop={true}
                    autoplay={{ "delay": 2500 }}

               >
                    {
                         members.map(m => <SwiperSlide key={m.id} className='flex flex-col items-center'>
                              <MemberCard data={m} />
                         </SwiperSlide>)
                    }
               </Swiper>
          </div>
     )
}

export default Team
