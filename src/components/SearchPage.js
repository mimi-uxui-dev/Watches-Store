import React, { Component } from 'react'
import BreadCrumbs from './BreadCrumbs'
import axios from 'axios'
import { SEARCH, COMPANY_INFORMATION } from '../sevices/globalServices';
import Product from './products/Product'
import Pagination from 'react-js-pagination'
import Loader from './Loader'
import cookies from 'js-cookie'

export default class SearchPage extends Component {
     searchData = this.props.location.state

     state = {
          productsSearch: [],
          ci: [],
          isLoading: false
     }

     search = async (perPage = 15, pageNumber = 1) => {
          this.setState({ isLoading: true })
          await axios.post(`${SEARCH()}?perpage=${perPage}?page=${pageNumber}`, this.searchData).then(res => this.setState({ productsSearch: res.data.data }))
          this.setState({ isLoading: false })
     }

     fetchCi = async () => {
          await axios.get(`${COMPANY_INFORMATION(1)}`).then(res => this.setState({ ci: res.data.data }))
     }

     componentDidMount() {
          this.search()
          this.fetchCi()
     }

     render() {
          const { isLoading, ci, productsSearch } = this.state

          if (isLoading) {
               return <Loader />
          }

          return (
               <div>
                    <BreadCrumbs img={ci.length === 0 ? 'null' : ci.photo.find(i => i.type === "FAQ's Cover").link} path={'products'} />
                    <div className="px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 w-full flex flex-col gap-8">
                         <h1 className="font-serif 2xl:text-5xl xl:text-5xl sm:text-3xl">
                              {cookies.get('i18next') === 'ar' ? "نتائج البحث" : (cookies.get('i18next') == 'fr' ? "Resultats de Recherche" : "Search Results")}
                         </h1>
                         <div className='bg-black w-14 h-1' ></div>
                         <div className="grid 2xl:grid-cols-3 1xl:grid-cols-3 xl:grid-cols-3 sm:grid-cols-2  gap-4 my-4">
                              {
                                   productsSearch.length === 0 ? null : productsSearch.data.map(p => <Product key={p.id} product={p} />)
                              }
                         </div>
                         <ul className="list-group mt-16">
                              <Pagination
                                   totalItemsCount={parseInt(productsSearch.total)}
                                   activePage={productsSearch.current_page}
                                   itemsCountPerPage={productsSearch.per_page}
                                   onChange={(pageNumber = 1) => this.search(pageNumber)}
                                   itemClass='page-item'
                                   linkClass='page-link'
                                   previousLabel={''}
                                   nextLabel={''}
                                   activeLinkClassName='activePaginate'
                              />
                         </ul>
                    </div>
               </div>
          )

     }
}
