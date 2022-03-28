import React from 'react'
import BreadCrumbs from './../BreadCrumbs'
import BlogPageCard from './BlogPageCard'
import { BLOGS, BLOG_LIMIT, COMPANY_INFORMATION } from './../../sevices/globalServices'
import axios from 'axios'
import s from "../../assets/imgs/icons/Search.svg"
import BlogLatestCard from './BlogLatestCard'
import Pagination from 'react-js-pagination'
import Loader from './../Loader';


export default class BlogsPage extends React.Component {
     state = {
          searchTerm: '',
          blogs: [],
          isLoading: false,
          blogsLimit: [],
          ci: []
     }

     fetchCi = async () => {
          await axios.get(`${COMPANY_INFORMATION(1)}`).then(res => this.setState({ ci: res.data.data }))
     }

     fetchProducts = async (perPage = 3, pageNumber = 1) => {
          this.setState({ isLoading: true })
          await axios.get(`${BLOGS()}?perpage=${perPage}&page=${pageNumber}`).then(res => this.setState({ blogs: res.data.data }))
          this.setState({ isLoading: false })
     }

     fetchProductsLimit = async () => {
          await axios.get(`${BLOG_LIMIT(3)}`).then(res => this.setState({ blogsLimit: res.data.data }))
     }

     async componentDidMount() {
          this.fetchCi()
          this.fetchProducts()
          this.fetchProductsLimit()
     }

     render() {
          const { ci, searchTerm, blogs, isLoading, blogsLimit } = this.state
          const { t } = this.props

          if (isLoading) {
               return <Loader />
          }

          return (

               <div>
                    <BreadCrumbs img={ci.length === 0 ? 'null' : ci.photo.find(i => i.type === 'Blog Cover').link} path={'blogs'} />

                    <div className="px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 w-full flex gap-8 2xl:flex-row 1xl:flex-row xl:flex-row lg:flex-col-reverse md:flex-col-reverse sm:flex-col-reverse">
                         <div className="2xl:w-2/3 1xl:w-2/3 xl:w-2/3 lg:w-full md:w-full sm:w-full">
                              <div className="grid grid-cols-1 ">
                                   {
                                        blogs.length === 0 ? console.log(blogs.length) :
                                             blogs.data.filter(blog => blog && (blog.title__fr.toLowerCase().includes(searchTerm.toLowerCase()) || blog.title__en.toLowerCase().includes(searchTerm.toLowerCase()) || blog.title__ar.toLowerCase().includes(searchTerm.toLowerCase()))
                                             ).map(filteredblog => <BlogPageCard key={filteredblog.id} blog={filteredblog} />)
                                   }
                                   <Pagination
                                        totalItemsCount={parseInt(this.state.blogs.total)}
                                        activePage={this.state.blogs.current_page}
                                        itemsCountPerPage={this.state.blogs.per_page}
                                        onChange={(pageNumber = 1) => this.fetchProducts(pageNumber)}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                        activeLinkClassName='activePaginate'
                                        previousLabel={''}
                                        nextLabel={''}
                                   />
                              </div>
                         </div>

                         <div className="2xl:w-1/3 1xl:w-1/3 xl:w-1/3 lg:w-full md:w-full sm:w-full flex flex-col gap-8">
                              <div className="bg-BLACK 2xl:px-16 1xl:px-16 xl:px-8 sm:px-8 2xl:py-16 1xl:py-16 xl:py-8 sm:py-8">
                                   <h1 className="font-serif text-WHITE mb-9 2xl:text-3xl xl:text-3xl sm:text-2xl"> {t('SEARCH')} </h1>
                                   <form className="flex flex-row">
                                        <input
                                             value={searchTerm}
                                             onChange={e => this.setState({ searchTerm: e.target.value })}
                                             type="text"
                                             placeholder="Search"
                                             className="w-full bg-gray-500 px-3 py-3 bg-transparent text-BLACK placeholder-gray-400" />
                                        <img src={s} alt="" className="bg-WHITE px-2" />
                                   </form>
                              </div>

                              <div className="bg-BG_GRAY 2xl:px-16 1xl:px-16 xl:px-8 sm:px-8 2xl:py-16 1xl:py-16 xl:py-8 sm:py-8 hidden 2xl:block 1xl:block xl:block ">
                                   <h1 className="font-serif text-BLACK mb-9  2xl:text-3xl xl:text-3xl sm:text-2xl">{t('LATEST_POSTS')} </h1>
                                   <div className='flex flex-col gap-4'>
                                        {
                                             blogsLimit.length === 0 ? console.log(blogsLimit.length) :
                                                  blogsLimit.map(b => <BlogLatestCard key={b.id} blog={b} />)
                                        }
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          )

     }
}
