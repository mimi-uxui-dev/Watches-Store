import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import img1 from "../../assets/imgs/products/01.jpg"
import img2 from "../../assets/imgs/products/02.jpg"
import img3 from "../../assets/imgs/products/03.jpg"
import img4 from "../../assets/imgs/products/04.jpg"
import emptyHeart from "../../assets/imgs/icons/Heart.svg"
import fullHeart from "../../assets/imgs/icons/Heart-1.svg"
import fcb from "../../assets/imgs/icons/FacebookLogo.svg"
import tw from "../../assets/imgs/icons/TwitterLogo.svg"
import pi from "../../assets/imgs/icons/PinterestLogo.svg"
import { PRODUCT } from '../../sevices/globalServices'
import axios from 'axios'
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import BreadCrumbs from './../BreadCrumbs'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import ReactImageMagnify from 'react-image-magnify'
import {
     FacebookShareButton,
     TwitterShareButton,
     PinterestShareButton
} from "react-share"
import { ROOT } from './../../sevices/globalServices'


function ProductDetails() {
     SwiperCore.use([Autoplay, Navigation])
     const params = useParams()
     const { t } = useTranslation()
     const [product, setProduct] = useState([])
     const [mainImg, setMainImg] = useState(img1)

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(PRODUCT(params.id))
                    .then(res => setProduct(res.data.data))
          }
          fetchData()
     }, [])

     const ci = useSelector(state => state.account)
     const productCover = ci.length === 0 ? null : ci.photo.find(i => i.type === 'Product Cover').link

     const data = [
          { id: 1, source: img2 },
          { id: 2, source: img3 },
          { id: 3, source: img4 }
     ]

     const setImg = (data) => {
          setMainImg(data.source)
     }

     return (
          <div>
               <BreadCrumbs img={productCover} path={'products'} />

               <div className='grid grid-cols-2 2xl:grid-cols-2 1xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 px-52 py-8 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4'>
                    <div>
                         {/* <img src={mainImg} style={{ width: "100%", height: '80%', objectFit: "cover", maxHeight: "70vh" }} alt="" /> */}
                         <ReactImageMagnify {...{
                              smallImage: {
                                   alt: 'Wristwatch by Ted Baker London',
                                   isFluidWidth: true,
                                   src: mainImg
                              },
                              largeImage: {
                                   src: mainImg,
                                   width: 1000,
                                   height: 1000
                              }
                         }}
                         />

                         <div className='flex flex-row justify-between my-4'>
                              <Swiper
                                   loop={true}
                                   navigation={true}
                                   className="flex justify-center h-full w-full flex-col "
                                   slidesPerView={4}
                                   spaceBetween={0}
                                   autoplay={{ "delay": 1000, "disableOnInteraction": false }}
                              >
                                   {
                                        data.map(d => <SwiperSlide key={d.id} className="flex flex-col my-auto justify-center ">
                                             <img onClick={() => setImg(d)} src={d.source} className="mx-auto hoverClass" style={{ width: "100%", height: '100%', objectFit: "cover", maxWidth: "100px", maxHeight: '100px' }} alt="" />
                                        </SwiperSlide>
                                        )
                                   }
                              </Swiper>
                         </div>
                    </div>

                    <div className="2xl:py-14 1xl:py-14 xl:py-14 lg:py-2 md:py-2 sm:py-2 2xl:px-14 1xl:px-14 xl:px-14 lg:px-2 md:px-2 sm:px-2 sm:mt-4 flex flex-col  my-auto">
                         <h1 className="font-serif 2xl:text-5xl xl:text-5xl sm:text-3xl">{cookies.get('i18next') === 'ar' ? product.name__ar : (cookies.get('i18next') == 'fr' ? product.name__fr : product.name__en)}</h1>
                         <div className="my-4">
                              <h3 className="font-medium text-lg" > DA {product.price}</h3>
                              <p className="text-xs text-gray-400"> {t('Delivery_Tax_Included')} </p>
                         </div>
                         <p className='text-sm w-full text-justify '> {cookies.get('i18next') === 'ar' ? product.description__ar : (cookies.get('i18next') == 'fr' ? product.description__fr : product.description__en)} </p>

                         <div className="mt-6 w-full">
                              <form className="w-full flex">
                                   <input type="number" className="w-1/3 text-center p-2" placeholder='01' />
                                   <button className="bg-black w-2/3 hover:bg-REDD transition-all text-white py-3 text-center" type="submit"> {t('ADD_TO_CART')} </button>
                              </form>
                              <div className="bg-black hover:bg-REDD transition-all text-white py-3 text-center">
                                   <a href="/cart" >{t('BUY_IT_NOW')}</a>
                              </div>
                         </div>

                         <div className="flex flex-row items-center gap-2 mt-6 mb-4 " >
                              <img src={emptyHeart} width="24" alt="" />
                              <a href="/wishlist"> {t('ADD_TO_WISHLIST')} </a>
                         </div>
                         <div className="flex flex-row gap-4 tems-center mt-4">
                              <FacebookShareButton
                                   quote={cookies.get('i18next') === 'ar' ? product.name__ar : (cookies.get('i18next') == 'fr' ? product.name__fr : product.name__en)}
                                   url={`${ROOT}/products`}
                              >
                                   <div className="flex flex-row gap-2 text-xs items-center hover:text-REDD transition-all" >
                                        <img width="20" src={fcb} alt="" />
                                        Share
                                   </div>
                              </FacebookShareButton>

                              <TwitterShareButton
                                   title={cookies.get('i18next') === 'ar' ? product.name__ar : (cookies.get('i18next') == 'fr' ? product.name__fr : product.name__en)}
                                   via={cookies.get('i18next') === 'ar' ? product.name__ar : (cookies.get('i18next') == 'fr' ? product.name__fr : product.name__en)}
                                   url={`${ROOT}/products`}
                              >
                                   <div className="flex flex-row gap-2 text-xs items-center hover:text-REDD transition-all">
                                        <img width="20" src={tw} alt="" />
                                        Tweet
                                   </div>
                              </TwitterShareButton>

                              <PinterestShareButton
                                   url={product.name__en}
                                   description={product.description__en}
                                   media={product.photo}
                              >
                                   <div className="flex flex-row gap-2 text-xs items-center hover:text-REDD transition-all">
                                        <img width="20" src={pi} alt="" />
                                        Pin It
                                   </div>
                              </PinterestShareButton>

                         </div>
                    </div>
               </div>
          </div>
     )
}

export default ProductDetails