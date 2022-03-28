import React, { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import HeroSection from './HeroSection';
import Partners from './Partners';
import ProductsSection from './products/ProductsSection';
import BlogsSection from './blogs/BlogsSection';
import CiSection from './CiSection';
import HeroSection2 from './HeroSection2';


function Home() {
     const { t } = useTranslation()

     const languages = [
          {
               code: 'fr',
               name: 'Français',
               country_code: 'fr'
          },
          {
               code: 'en',
               name: 'English',
               country_code: 'gb'
          },
          {
               code: 'ar',
               name: 'العربية',
               dir: 'rtl',
               country_code: 'sa'
          },
     ]

     const currentLanguageCode = cookies.get('i18next') || 'en'
     const currentLanguage = languages.find(l => l.code === currentLanguageCode)

     useEffect(() => {
          document.body.dir = currentLanguage.dir || "ltr"
          document.title = t('app_title')
     }, [currentLanguage, t])

     return (
          <div>
               <HeroSection2 />
               <Partners />
               <ProductsSection />
               <BlogsSection />
               <CiSection />
          </div>
     )
}

export default Home
