import React, { useState } from 'react'
import logo from "../assets/imgs/logo.svg"
import Search from "../assets/imgs/icons/Search.svg"
import Handbag from "../assets/imgs/icons/Handbag.svg"
import { useHistory } from 'react-router-dom'
import i18nex from 'i18next'
import globe from "../assets/imgs/icons/globe.svg"
import x from "../assets/imgs/mobile/x.svg"
import hum from "../assets/imgs/mobile/hum.svg"
import { useTranslation } from 'react-i18next';

function Navbar({ languages }) {
     const { t } = useTranslation()
     let history = useHistory();

     const [searchInput, setSearchInput] = useState('')
     const [show, setShow] = useState(false)
     const [showMenu, setShowMenu] = useState(false)
     const [showLang, setShowLang] = useState(false)

     const closeMenu = () => {
          setTimeout(() => {
               setShowMenu(false)
          }, 500);
     }

     const handleSubmit = (e) => {
          e.preventDefault()
          const data = {
               title: searchInput
          }
          setSearchInput('')
          setShow(false)
          history.push('/results', data)
     }

     return (
          <div className="flex flex-col">

               <div className='relative top-0 left-0 2xl:block 1xl:block xl:block lg:block md:hidden sm:hidden '>
                    <div className="flex flex-row justify-between self-center px-52 py-8 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 ">
                         <a href="/"> <img className="w-20" src={logo} alt='Light-Services' /> </a>
                         <div className="flex flex-row self-center space-x-6 font-sans">
                              <a href="/" className="hoverState"> {t('Home')} </a>
                              <a href="/products" className="hoverState"> {t('Shop')} </a>
                              <a href="/about" className="hoverState"> {t('AboutUs')} </a>
                              <a href="/blogs" className="hoverState"> {t('Blog')} </a>
                              <a href="/contact" className="hoverState"> {t('ContactUs')} </a>
                              <a href="#" ><img onClick={() => setShow(!show)} className="w-6" src={Search} alt="Light-Services" /></a>

                              <div className='relative top-0'>
                                   <img src={globe} onClick={() => setShowLang(!showLang)} className="w-7" alt="Light.services" />
                                   <div className="absolute z-10 bg-TEXT_GRAY ">
                                        {
                                             languages.map((lang) => (
                                                  <div key={lang.code} className={!showLang ? "hidden" : "block px-1 py-2 hover:bg-gray-500 hover:cursor-pointer"}>
                                                       <small
                                                            className='dropdown-item px-1 uppercase'
                                                            onClick={() => i18nex.changeLanguage(lang.code)}> {lang.code} </small>
                                                  </div>
                                             ))
                                        }
                                   </div>
                              </div>

                              <a href="/cart" ><img className="w-6" src={Handbag} alt="Light-Services" /></a>

                         </div>
                    </div>
                    <div className={!show ? 'hidden transition-all' : 'block transition-all'}>
                         <br />
                         <form action="" onSubmit={handleSubmit} className='px-52 absolute py-0 transition-all bottom-0 right-0  '>
                              <input
                                   className='border-2 py-0.5 px-4 transition-all'
                                   value={searchInput}
                                   onChange={e => setSearchInput(e.target.value)}
                                   type="text"
                                   placeholder={t('SearchBar')}
                                   required
                              />
                         </form>
                    </div>
               </div>

               <div className='2xl:hidden 1xl:hidden xl:hidden lg:hidden md:flex sm:flex justify-between flex-row w-full items-center p-4 fixed top-0 left-0 bg-WHITE z-10'>
                    <img onClick={() => setShowMenu(!showMenu)} className='hoverClass' src={hum} alt="light.services" />

                    <a href="/">
                         <img className="w-20" src={logo} alt='Light-Services' />
                    </a>

                    <a href="/cart" ><img className="w-6" src={Handbag} alt="Light-Services" /></a>
               </div>

               <div className="2xl:hidden 1xl:hidden xl:hidden lg:hidden md:flex sm:flex bg-gray-100 w-full flex flex-col flex-grow fixed left-0 z-10" style={{ top: "4.5rem" }}>

                    <div className={!showMenu ? "hidden  transition-all" : "flex flex-col justify-between flex-grow transition-all"}>
                         <div className='flex flex-col items-center justify-between gap-4 pt-16 flex-grow'>

                              <a href="/" onClick={() => closeMenu()} className="hoverState 2xl:text-base 1xl:text-base xl:text-base lg:text-base md:text-2xl sm:text-2xl">{t('Home')}</a>
                              <a href="/products" onClick={() => closeMenu()} className="hoverState 2xl:text-base 1xl:text-base xl:text-base lg:text-base md:text-2xl sm:text-2xl">{t('Shop')}</a>
                              <a href="/about" onClick={() => closeMenu()} className="hoverState 2xl:text-base 1xl:text-base xl:text-base lg:text-base md:text-2xl sm:text-2xl">{t('AboutUs')} </a>
                              <a href="/blogs" onClick={() => closeMenu()} className="hoverState 2xl:text-base 1xl:text-base xl:text-base lg:text-base md:text-2xl sm:text-2xl">{t('Blog')}</a>
                              <a href="/contact" onClick={() => closeMenu()} className="hoverState 2xl:text-base 1xl:text-base xl:text-base lg:text-base md:text-2xl sm:text-2xl">{t('ContactUs')}</a>

                              <div className='relative top-0'>
                                   <img src={globe} onClick={() => setShowLang(!showLang)} className="w-7" alt="Light.services" />
                                   <div className="absolute z-10 bg-TEXT_GRAY ">
                                        {
                                             languages.map((lang) => (
                                                  <div key={lang.code} className={!showLang ? "hidden" : "block px-1 2xl:text-base 1xl:text-base xl:text-base lg:text-base md:text-xl sm:text-xl py-2 hover:bg-gray-500 hover:cursor-pointer"}>
                                                       <small
                                                            className='dropdown-item px-1 uppercase'
                                                            onClick={() => i18nex.changeLanguage(lang.code)}> {lang.code} </small>
                                                  </div>
                                             ))
                                        }
                                   </div>
                              </div>

                              <form action="" onSubmit={handleSubmit} className="w-full px-6 flex flex-row gap-4 items-center" >
                                   <input
                                        className='border-0.5 py-0.5 w-full px-4 transition-all h-12'
                                        value={searchInput}
                                        onChange={e => setSearchInput(e.target.value)}
                                        type="text"
                                        placeholder={t('SearchBar')}
                                        required
                                   />
                                   <a href="#" ><img onClick={() => handleSubmit()} className="w-10" src={Search} alt="Light-Services" /></a>
                              </form>
                         </div>

                         <br />
                         <br />
                         <br />
                         <div className="h-12 flex flex-col items-center justify-center bg-gray-300" onClick={() => setShowMenu(!showMenu)}>
                              <h1 className="text-center text-2xl font-serif tracking-widest hoverClass"> {t('XCLOSE')} </h1>
                         </div>

                    </div>


               </div>
          </div>

     )
}

export default Navbar
