import React, { useState } from 'react'
import axios from 'axios';
import BreadCrumbs from './BreadCrumbs';
import { useSelector } from 'react-redux';
import cookies from 'js-cookie'
import MapContact from './MapContact';
import { toast } from 'react-toastify';
import { CONTACT_POST } from './../sevices/globalServices';
import { useTranslation } from 'react-i18next'

function Contact() {
     const { t } = useTranslation()

     const ci = useSelector(state => state.account)
     const contactCover = ci.length === 0 ? null : ci.photo.find(i => i.type === 'Contact Cover').link

     const [email, setEmail] = useState('')
     const [name, setName] = useState('')
     const [message, setMessage] = useState('')
     const [tel, setTel] = useState('')
     const [subject, setSubject] = useState('')

     const onsubmit = async (e) => {
          e.preventDefault()

          const values = new FormData()

          values.append('email', email)
          values.append('name', name)
          values.append('message', message)
          values.append('phone', tel)
          values.append('subject', subject)

          try {
               await axios.post(CONTACT_POST(), values)
                    .then(d => toast.success("Message sent with Success.", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true
                    }))
                    .catch(err => toast.error("Try again in a second", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true
                    })
                    )
          } catch (error) {
               console.error('SUBSCRIBE error', error)
          }
     }

     return (
          <div>
               <BreadCrumbs img={contactCover} path={'contact'} />

               <div className='px-52 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 '>
                    <div className='py-8'>
                         <MapContact lat={ci.latitude} lng={ci.longtitude} />
                    </div>
                    <div className='grid grid-cols-2 gap-16 py-8 px-52 2xl:px-52 1xl:px-52 xl:grid-cols-1 xl:px-10 sm:grid-cols-1 sm:px-4'>
                         <div>
                              <h1 className="text-3xl pb-2 sm:text-2xl "> {t('SubmitRequest')} </h1>
                              <div className='bg-black w-14 h-1' ></div>
                              <form onSubmit={onsubmit} className='flex flex-col gap-5 mt-8' action="">
                                   <div className="grid grid-cols-2 gap-4">
                                        <input
                                             placeholder={t('Email')}
                                             className="w-full border-2 border-TEXT_GRAY px-3 py-3 bg-transparent text-BLACK placeholder-gray-500"
                                             value={email}
                                             onChange={e => setEmail(e.target.value)}
                                             type="email"
                                             required
                                        />
                                        <input
                                             placeholder={t('Phone')}
                                             className="w-full border-2 border-TEXT_GRAY px-3 py-3 bg-transparent text-BLACK placeholder-gray-500"
                                             value={tel}
                                             onChange={e => setTel(e.target.value)}
                                             type="text"
                                             required
                                        />
                                        <input
                                             placeholder={t('Name')}
                                             className="w-full border-2 border-TEXT_GRAY px-3 py-3 bg-transparent text-BLACK placeholder-gray-500"
                                             value={name}
                                             onChange={e => setName(e.target.value)}
                                             type="text"
                                             required
                                        />
                                        <input
                                             placeholder={t('Subject')}
                                             className="w-full border-2 border-TEXT_GRAY px-3 py-3 bg-transparent text-BLACK placeholder-gray-500"
                                             value={subject}
                                             onChange={e => setSubject(e.target.value)}
                                             type="text"
                                             required
                                        />
                                   </div>

                                   <textarea rows='8' placeholder={t('YourMessage')} required className="w-full border-2 border-TEXT_GRAY px-3 py-3 bg-transparent text-BLACK placeholder-gray-500" value={message} onChange={e => setMessage(e.target.value)} ></textarea>

                                   <button onClick={onsubmit} type='submit' className="text-base font-sans w-max text-WHITE bg-black  py-3 px-10  hover:bg-REDD transition-all"> {t('SUBMIT')} </button>
                              </form>
                         </div>

                         <div className="flex flex-col gap-16">
                              <div>
                                   <h3 className='2xl:text-3xl xl:text-3xl pb-2 sm:text-2xl'>{t('Address')}</h3>
                                   <div className='bg-black w-14 h-1' ></div>
                                   <p className='pt-8 text-TEXT_GRAY'>{t('Adr_p')} </p>
                                   <br />
                                   <p className='text-gray-600'>{cookies.get('i18next') === 'ar' ? ci.address__ar : (cookies.get('i18next') == 'fr' ? ci.address__fr : ci.address__en)}</p>
                              </div>
                              <div>
                                   <h3 className='2xl:text-3xl xl:text-3xl pb-2 sm:text-2xl'> {t('ContactInformation')} </h3>
                                   <div className='bg-black w-14 h-1' ></div>
                                   <p className="pt-8 text-TEXT_GRAY">{t('ContactInfo_p')}</p>
                                   <br />
                                   <p className='text-gray-600' > {t('adr_email')} <span className="pt-8 text-TEXT_GRAY">{ci.email}</span></p>
                                   <p className='text-gray-600'> {t('phone_num')}  <span className="pt-8 text-TEXT_GRAY">{ci.phone} </span> </p>
                                   <p className='text-gray-600'> {t('fax_num')} <span className="pt-8 text-TEXT_GRAY">{ci.fax}</span></p>
                              </div>
                         </div>
                    </div>
               </div>
          </div >
     )
}

export default Contact
