import React from 'react'
import c from '../../assets/imgs/icons/Clock.svg'
import cookies from 'js-cookie'
import moment from 'moment'
import { Link } from 'react-router-dom'
import parser from "html-react-parser"
import { useTranslation } from 'react-i18next'

function BlogCard({ blog }) {
     const { t } = useTranslation()
     return (
          <div className=' max-w-max' >
               <Link to={`blogs/${blog.id}`} className='hover:cursor-pointer' >
                    <img src={blog.photo} alt="LS" />
               </Link>
               <div className="flex flex-row gap-3 items-center py-2 border-b-2 border-TEXT_GRAY border-opacity-40">
                    <img src={c} alt="LS" className="w-6 scale-95 hover:scale-100 transition-all" />
                    <p className="text-sm text-TEXT_GRAY" >{moment(blog.created_at).format('DD.MMMM.YYYY')}</p>
               </div>
               <div>
                    <Link to={`blogs/${blog.id}`} >
                         <h2 className="text-BLACK hover:text-REDD transition-all font-sans pt-4 text-2xl">
                              {cookies.get('i18next') === 'ar' ? blog.title__ar : (cookies.get('i18next') == 'fr' ? blog.title__fr : blog.title__en)}
                         </h2>
                    </Link>
                    <div className="w-96 text-sm text-TEXT_GRAY py-2 max-w-full">
                         {cookies.get('i18next') === 'ar' ? parser(`${blog.text__ar}`.slice(0, 90)) : (cookies.get('i18next') == 'fr' ? parser(`${blog.text__fr}`.slice(0, 90)) : parser(`${blog.text__en}`.slice(0, 90)))}
                    </div>

                    <Link to={`blogs/${blog.id}`} className="font-bold mt-4 border-b-2 hover:text-REDD transition-all hover:border-REDD border-BLACK" > {t('READ_MORE')} </Link>
               </div>
          </div>
     )
}

export default BlogCard