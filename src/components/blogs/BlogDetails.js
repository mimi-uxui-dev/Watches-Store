import React, { useEffect, useState } from 'react'
import cookies from 'js-cookie'
import parser from "html-react-parser"
import { useParams } from 'react-router-dom';
import { BLOG } from '../../sevices/globalServices';
import axios from 'axios';
import moment from 'moment'

function BlogDetails() {
     const params = useParams()

     const [blogD, setBlogD] = useState([])

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(BLOG(params.id)).then(res => setBlogD(res.data.data))
          }
          fetchData()
     }, [])


     return (
          <div className="px-52 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 flex flex-col items-center mb-20  ">
               <img src={blogD.photo} className='pb-12 max-h-96' alt="Light.services" />

               <h1 className="font-serif pb-8  2xl:text-5xl 1xl:font-5xl xl:text-5xl md:text-4xl sm:text-3xl" >{cookies.get('i18next') === 'ar' ? blogD.title__ar : (cookies.get('i18next') == 'fr' ? blogD.title__fr : blogD.title__en)} </h1>

               <div className="text-left flex flex-row gap-8 pb-4 text-gray-500">
                    <p className="text-sm"  > {blogD.author} </p>
                    <p className="text-sm" >{moment(blogD.created_at).format('DD.MMMM.YYYY')}</p>
               </div>

               <div className="px-2 xl:px-8 text-lg py-2 max-w-3xl">
                    {cookies.get('i18next') === 'ar' ? parser(`${blogD.text__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${blogD.text__fr}`) : parser(`${blogD.text__en}`))}
               </div>
          </div>
     )
}

export default BlogDetails
