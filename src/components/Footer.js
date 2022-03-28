import React, { useEffect, useState } from 'react'
import phone from "../assets/imgs/icons/phone.svg"
import email from "../assets/imgs/icons/email.svg"
import pin from "../assets/imgs/icons/pin.svg"
import ls from "../assets/imgs/ls.svg"
import yt from "../assets/imgs/ci/yt.svg"
import tw from "../assets/imgs/ci/tw.svg"
import ig from "../assets/imgs/ci/ig.svg"
import fcb from "../assets/imgs/ci/fcb.svg"
import { useSelector, useDispatch } from 'react-redux';
import { COMPANY_INFORMATION, SUBSCRIBE } from './../sevices/globalServices';
import axios from "axios"
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Footer() {
     const { t } = useTranslation()

     const ci = useSelector(state => state.account)
     const [subsc, setSubsc] = useState('')
     const dispatch = useDispatch()

     // const { setCI } = bindActionCreators(actionCreators, dispatch)
     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(COMPANY_INFORMATION(1))
                    .then(res => dispatch({ type: "SET_CI", payload: res.data.data }))
          }
          fetchData()
     }, [])

     const onsubmit = async (e) => {
          e.preventDefault()
          const formData = new FormData()
          formData.append('email', subsc)

          try {
               await axios.post(SUBSCRIBE(), formData)
                    .then(d => toast.success("Subscribed with Success.", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true
                    }))
                    .catch(err => toast.error("Email Already exists. Try another one", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true
                    })
                    )

          } catch (error) {
               console.error('SUBSCRIBE error', error)
          }
     }

     return (
          ci.length === 0 ? null :
               <div className="px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 bg-BG_GRAY">
                    <div className="grid 2xl:grid-cols-3 1xl:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1   ">
                         <div>
                              <h6 className="text-base text-black pb-4 font-sans font-medium"> {t('ABOUT_US')} </h6>
                              <p className='text-sm text-gray-500  pb-2 w-80 text-justify'></p>
                              <p className="flex flex-row items-center gap-2"><img src={pin} alt="LS" className="w-4" /> <span className="text-sm text-gray-500">
                                   {cookies.get('i18next') === 'ar' ? ci.address__ar : (cookies.get('i18next') == 'fr' ? ci.address__fr : ci.address__en)}
                              </span> </p>
                              <p className="flex flex-row items-center gap-2"><img src={phone} alt="LS" className="w-4" /> <span className="text-sm text-gray-500"> {ci.phone} </span> </p>
                              <p className="flex flex-row items-center gap-2"><img src={email} alt="LS" className="w-4" /> <span className="text-sm text-gray-500"> {ci.email}</span> </p>
                         </div>

                         <div className="flex flex-col">
                              <h6 className="text-base text-black pb-4 font-sans font-medium">{t('INFORMATION')}</h6>
                              <Link to={'/'}>{t('Home')}</Link>
                              <Link to={'/contact'}> {t('ContactUs')} </Link>
                              <Link to={'/about'}> {t('AboutUs')} </Link>
                              <Link to={'/products'}> {t('Shop')} </Link>
                         </div>

                         <div>
                              <h6 className="text-base text-black pb-4 font-sans font-medium"> {t('NEWSLETTER')} </h6>
                              <p className="text-sm pb-1 text-gray-500"> {t('Newsletter_p')} </p>
                              <form onSubmit={onsubmit} >
                                   <div className="flex mt-3 flex-row gap-2 border-2 border-gray-500 w-max">
                                        <input
                                             value={subsc}
                                             onChange={e => setSubsc(e.target.value)}
                                             type="email"
                                             className="w-80 w-full px-3 py-3 bg-transparent text-BLACK placeholder-gray-500"
                                             placeholder={t('YourEmail')}
                                             required
                                        />
                                        <img className="w-5 mx-3" onClick={onsubmit} src={email} alt="LS" />
                                   </div>
                              </form>
                         </div>
                    </div>

                    <div className="flex flex-col self-center items-center text-center text-xs mt-10 border-t-2 pt-6" >
                         <div className="flex flex-row gap-2 mb-4" >
                              <a href={ci.facebook}><img className="w-4" src={fcb} alt="" /></a>
                              <a href={ci.twitter}><img className="w-4" src={tw} alt="" /></a>
                              <a href={ci.instagram}><img className="w-4" src={ig} alt="" /></a>
                              <a href={ci.youtube}><img className="w-4" src={yt} alt="" /></a>
                         </div>
                         <p className="pb-3 text-gray-500">@CopyRights 2022 Light.</p>
                         <p className="text-gray-500 flex flex-row items-center gap-3 ">Powered By <a href="https://light.services/" className="flex flex-row"><img className="w-32" src={ls} alt="Light Services ⚡" /> </a></p>
                    </div>
               </div>

     )
}

export default Footer
