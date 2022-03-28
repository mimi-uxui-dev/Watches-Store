import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { BLOG_LIMIT } from './../../sevices/globalServices'
import BlogCard from './BlogCard'

function BlogsSection() {
     const [blogs, setBlogs] = useState([])
     const { t } = useTranslation()
     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(BLOG_LIMIT(3))
                    .then(res => setBlogs(res.data.data))
          }
          fetchData()
     }, [])

     return (
          <div data-aos="fade-up" className="px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4">
               <div>
                    <h1 className="text-BLACK text-center font-sans text-3xl"> {t('OurLastNews')}</h1>
                    <div className="bg-TEXT_GRAY w-16 h-1 mx-auto mt-2" ></div>
               </div>
               <div className="grid 2xl:grid-cols-3 1xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-16 mt-12">
                    {blogs.map(b => <BlogCard key={b.id} blog={b} />)}
               </div>
          </div>
     )
}

export default BlogsSection