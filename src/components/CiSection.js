import React, { useEffect, useState } from 'react'
import axios from "axios"
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux';
import img from '../assets/imgs/ci/img.png'
import { COMPANY_INFORMATION } from './../sevices/globalServices';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../state/index"
import { Link } from 'react-router-dom';

function CiSection() {
     const { t } = useTranslation()

     const ci = useSelector(state => state.account)

     const dispatch = useDispatch()

     // const { setCI } = bindActionCreators(actionCreators, dispatch)

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(COMPANY_INFORMATION(1))
                    .then(res => dispatch({ type: "SET_CI", payload: res.data.data }))
          }
          fetchData()
     }, [])

     const ci_image = ci.length === 0 ? 'null' : ci.photo.find(i => i.type === 'Company Cover').link

     return (
          ci.length === 0 ? null :
               <div className="px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 grid 2xl:grid-cols-2 1xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                    <div data-aos="fade-left">
                         <img src={ci_image} alt="LS" />
                    </div>
                    <div data-aos="fade-right" className="flex justify-center flex-col px-24 2xl:px-24 1xl:px-24 xl:px-24 lg:px-20 md:px-4 sm:px-4 sm:mt-8 ">
                         <h1 className="font-serif 2xl:text-5xl 1xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl">
                              {cookies.get('i18next') === 'ar' ? ci.name__ar : (cookies.get('i18next') == 'fr' ? ci.name__fr : ci.name__en)}&nbsp;{t('Des')} </h1>
                         <p className="text-lg font-sans pt-5 pb-10 text-TEXT_GRAY">
                              {cookies.get('i18next') === 'ar' ? ci.description__ar.slice(0, 200) : (cookies.get('i18next') == 'fr' ? ci.description__fr.slice(0, 200) : ci.description__en.slice(0, 200))}.. </p>
                         <Link to={'/about'} className="text-base font-sans w-max text-TEXT_GRAY border-2 border-TEXT_GRAY py-2 px-4 hover:text-black hover:border-black transition-all" >
                              {t('ReadOurStory')}
                         </Link>
                    </div>
               </div>
     )
}

export default CiSection