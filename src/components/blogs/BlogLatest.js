import React from 'react'
import BlogLatestCard from './BlogLatestCard';

function BlogLatest({ blogs }) {
     const size = blogs.length
     const beforeLast = blogs[size - 2]
     const last = blogs[size - 1]

     return (
          <div className='flex flex-col gap-8'>
               <BlogLatestCard blog={last} />
               <BlogLatestCard blog={beforeLast} />

          </div>
     )
}

export default BlogLatest
