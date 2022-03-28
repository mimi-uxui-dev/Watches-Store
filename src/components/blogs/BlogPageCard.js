import React from 'react'
import c from '../../assets/imgs/icons/Clock.svg'
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Link } from 'react-router-dom'
import parser from "html-react-parser"
import arrow from '../../assets/imgs/blog/arr.svg'
import line from '../../assets/imgs/blog/line.svg'

function BlogCard({ blog }) {
     const { t } = useTranslation()

     return (
          <div className='pb-10 mb-12 border-b-2 border-TEXT_GRAY border-opacity-40' >
               <Link to={`blogs/${blog.id}`} className='hover:cursor-pointer' >
                    <img src={blog.photo} className="w-full object-cover transition-all" style={{ maxHeight: "450px" }} alt="LS" />
               </Link>

               <div className="flex flex-row gap-3 items-center mt-9 ">
                    <p className="text-sm" style={{ color: "#AF7F66" }} > {blog.author} &nbsp; &bull; </p>
                    <span className="text-sm text-TEXT_GRAY" >{moment(blog.created_at).format('DD.MMMM.YYYY')}</span>
               </div>

               <div>
                    <Link to={`blogs/${blog.id}`} >
                         <h2 className="text-BLACK hover:text-REDD transition-all font-sans pt-1 text-2xl">{cookies.get('i18next') === 'ar' ? blog.title__ar : (cookies.get('i18next') == 'fr' ? blog.title__fr : blog.title__en)}</h2>
                    </Link>
                    <div className="text-sm text-TEXT_GRAY py-2 my-4 max-w-full">
                         {cookies.get('i18next') === 'ar' ? parser(`${blog.text__ar.slice(0, 360)}`) : (cookies.get('i18next') === 'fr' ? parser(`${blog.text__fr.slice(0, 360)}`) : parser(`${blog.text__en.slice(0, 360)}`))}
                    </div>
                    <Link to={`blogs/${blog.id}`} className="font-bold transition-all  flex flex-row gap-2" >
                         <img src={line} className='pr-3' alt="Light.services" />
                         <span>{t('READ_MORE')}</span>
                         <img src={arrow} className="dir_rtl pl-1" alt="light.services" />
                    </Link>
               </div>

          </div>
     )
}

export default BlogCard
