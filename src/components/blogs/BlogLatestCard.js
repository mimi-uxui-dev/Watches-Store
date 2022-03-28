import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';
import cookies from 'js-cookie'

function BlogLatestCard({ blog }) {

     return (
          <div className="flex flex-row gap-4">
               <Link to={`blogs/${blog.id}`} className='hover:cursor-pointer' >
                    <img className="w-24 h-24 object-cover" src={blog.photo} alt="Light.Services" />
               </Link>
               <div className='flex flex-col justify-between'>
                    <Link to={`blogs/${blog.id}`} className='hover:cursor-pointer' >
                         <h6 className='text-lg'>{cookies.get('i18next') === 'ar' ? blog.title__ar : (cookies.get('i18next') == 'fr' ? blog.title__fr : blog.title__en)}</h6>
                    </Link>
                    <small className='text-TEXT_GRAY'> {moment(blog.created_at).format('DD.MMMM.YYYY')} </small>
               </div>
          </div>
     )
}

export default BlogLatestCard
