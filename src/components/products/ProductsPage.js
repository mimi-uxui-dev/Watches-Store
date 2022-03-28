import React from 'react'
import { PRODUCTS, PRODUCT_CA, PRODUCTS_CA, SEARCH, FILTERPRICE, COMPANY_INFORMATION } from './../../sevices/globalServices'
import axios from 'axios'
import Product from './Product'
import s from "../../assets/imgs/icons/Search.svg"
import cookies from 'js-cookie'
import arrow from '../../assets/imgs/icons/arr.svg'
import BreadCrumbs from '../BreadCrumbs'
import Pagination from 'react-js-pagination'
import Loader from './../Loader';

class ProductsPage extends React.Component {

     state = {
          products: [],
          productCA: [],
          isFiltering: false,
          show: false,
          minPrice0: 0,
          maxPrice0: 0,
          filterTitle: 'ALL',
          isLoading: false,
          isSearch: false,
          isCategoryFetching: false,
          searchTerm: '',
          categoryId: 0,
          productsCategory: [],
          ci: []
     }

     filterByPrice = async (e, perPage = 1, pageNumber = 1) => {
          e.preventDefault()
          const data = {
               min: this.state.minPrice0,
               max: this.state.maxPrice0,
          }
          this.setState({ isSearch: true })
          await axios.post(`${FILTERPRICE()}?perpage=${perPage}&page=${pageNumber}`, data).then(res => this.setState({ products: res.data.data }))
          // console.log('FILTER BY PRICE ---->', this.state.products)
          this.setState({ isLoading: false })
     }

     reset = async (e, pageNumber = 1, filterBy = 'all', perPage = 15) => {
          e.preventDefault()
          this.setState({ isCategoryFetching: false })
          await axios.get(`${PRODUCTS()}?filtre=${filterBy}&perpage=${perPage}&page=${pageNumber}`).then(res => this.setState({ products: res.data.data }))
     }

     filterByCategory = async category => {
          const categoryId = category.id
          this.setState({ isCategoryFetching: true })

          await axios.get(`${PRODUCT_CA(categoryId)}`).then(res => {
               res.data.data && res.data.data.hasOwnProperty('prodcuts') ?
                    this.setState({ productsCategory: res.data.data })
                    :
                    console.log("No products in category", categoryId)
          })

          this.setState({ isLoading: false })
     }

     search = async (event, pageNumber = 1, perPage = 15) => {
          event.preventDefault()

          const data = {
               title: this.state.searchTerm
          }

          this.setState({ isSearch: true })
          await axios.post(`${SEARCH()}?perpage=${perPage}?page=${pageNumber}`, data).then(res => this.setState({ products: res.data.data }))
          //console.log('---->', this.state.products)
          this.setState({ isLoading: false })
     }

     fetchProducts = async (pageNumber = 1, filterBy = 'all', perPage = 15) => {
          this.setState({ isLoading: true })
          await axios.get(`${PRODUCTS()}?filtre=${filterBy}&perpage=${perPage}&page=${pageNumber}`).then(res => this.setState({ products: res.data.data }))
          this.setState({ isLoading: false })
          // console.log('prdd', this.state.products)
     }

     fetchFilterProducts = async (pageNumber = 1, filterBy, perPage = 15) => {
          this.setState({ isLoading: true })
          this.setState({ filterTitle: filterBy })
          await axios.get(`${PRODUCTS()}?filtre=${filterBy}&perpage=${perPage}&page=${pageNumber}`).then(res => this.setState({ products: res.data.data }))
          this.setState({ isLoading: false })
          this.setState({ show: !this.state.show })
     }

     fetchCi = async () => {
          await axios.get(`${COMPANY_INFORMATION(1)}`).then(res => this.setState({ ci: res.data.data }))
     }

     fetchProductsCA = async (pageNumber = 1) => {
          this.setState({ isLoading: true })
          await axios.get(PRODUCTS_CA()).then(res => this.setState({ productCA: res.data.data }))
          this.setState({ isLoading: false })
     }

     async componentDidMount() {
          this.fetchCi()
          this.fetchProducts()
          this.fetchProductsCA()
     }

     render() {
          const { isLoading, ci } = this.state
          const { t } = this.props

          if (isLoading) {
               return <Loader />
          }

          return (
               <div className="">

                    <BreadCrumbs img={ci.length === 0 ? 'null' : ci.photo.find(i => i.type === 'Product Cover').link} path={'products'} />

                    <div className="px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 w-full xl:w-full sm:w-full flex 2xl:flex-row 1xl:flex-row gap-8 xl:flex-row lg:flex-row md:flex-col sm:flex-col ">
                         <div className="2xl:w-2/3 1xl:w-2/3 xl:w-2/3 lg:w-2/3 md:w-full sm:w-full ">
                              <div className="flex items-center flex-row justify-between">
                                   <ul className="w-56 bg-BG_GRAY px-3 py-3 bg-transparent text-BLACK placeholder-gray-500 relative top-0 left-0 "  >
                                        <li className='flex flex-row justify-between hoverClass ' onClick={() => this.setState({ show: !this.state.show })}> {this.state.filterTitle} <img className="w-4" src={arrow} alt="12" />   </li>
                                        <div className={this.state.show ? "block absolute top-14 left-0 z-10 bg-BG_GRAY w-56 transition-all" : "hidden"} >
                                             <li className="hoverClass hover:text-REDD px-4 py-2" onClick={() => this.fetchFilterProducts(1, 'all', 15)}  > {t('ALL')} </li>
                                             <li className="hoverClass hover:text-REDD capitalize px-4 py-2" onClick={() => this.fetchFilterProducts(1, 'alphabetical', 15)} > {t('Alphabetically')} </li>
                                             <li className="hoverClass hover:text-REDD px-4 py-2" onClick={() => this.fetchFilterProducts(1, 'newest', 15)} > {t('NEWEST')} </li>
                                             <li className="hoverClass hover:text-REDD px-4 py-2" onClick={() => this.fetchFilterProducts(1, 'price', 15)} > {t('PRICE')} </li>
                                        </div>
                                   </ul>
                                   <div className="text-sm text-TEXT_GRAY" > <span className="font-bold"> {this.state.products.total} </span> {t('Products')} </div>
                              </div>
                              <div className="grid 2xl:grid-cols-3 1xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2  gap-4 my-4">
                                   {
                                        !this.state.isCategoryFetching ?
                                             this.state.products.length === 0 ? null : this.state.products.data.map(p => <Product key={p.id} product={p} />)
                                             :
                                             this.state.productsCategory.length === 0 ? null : this.state.productsCategory.prodcuts.map(p => <Product key={p.id} product={p} />)
                                   }
                              </div>
                              <ul className="list-group mt-16">
                                   {
                                        !this.state.isCategoryFetching ?
                                             !this.state.isSearch ?
                                                  <Pagination
                                                       totalItemsCount={parseInt(this.state.products.total)}
                                                       activePage={this.state.products.current_page}
                                                       itemsCountPerPage={this.state.products.per_page}
                                                       onChange={(pageNumber = 1) => this.fetchProducts(pageNumber)}
                                                       itemClass='page-item'
                                                       linkClass='page-link'
                                                       previousLabel={''}
                                                       nextLabel={''}
                                                       activeLinkClassName='activePaginate'

                                                  /> :
                                                  <Pagination
                                                       totalItemsCount={parseInt(this.state.products.total)}
                                                       activePage={this.state.products.current_page}
                                                       itemsCountPerPage={this.state.products.per_page}
                                                       onChange={(pageNumber = 1) => this.search(pageNumber)}
                                                       itemClass='page-item'
                                                       linkClass='page-link'
                                                       activeLinkClassName='activePaginate'
                                                       previousLabel={''}
                                                       nextLabel={''}
                                                  />
                                             :
                                             null
                                   }
                              </ul>
                         </div>

                         <div className="2xl:w-1/3 1xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-full sm:w-full flex flex-col gap-8">
                              <div className="bg-BLACK 2xl:px-16 1xl:px-16 xl:px-8 sm:px-8 2xl:py-16 1xl:py-16 xl:py-8 sm:py-8">
                                   <h1 className="font-serif text-WHITE mb-9  2xl:text-3xl xl:text-3xl sm:text-2xl"> {t('SEARCH')} </h1>
                                   <form className="flex flex-row" onSubmit={this.search} >
                                        <input
                                             value={this.state.searchTerm}
                                             onChange={e => this.setState({ searchTerm: e.target.value })}
                                             type="text"
                                             placeholder="Search"
                                             className="w-full bg-gray-500 px-3 py-3 bg-transparent text-BLACK placeholder-gray-400" />
                                        <img src={s} alt="" onClick={this.search} className="bg-WHITE px-2 hover:bg-gray-300 hover:cursor-pointer" />
                                   </form>
                              </div>

                              <div className="bg-BG_GRAY 2xl:px-16 1xl:px-16 xl:px-8 sm:px-8 2xl:py-16 1xl:py-16 xl:py-8 sm:py-8">
                                   <h1 className="font-serif text-BLACK 2xl:text-3xl xl:text-3xl sm:text-2xl mb-9"> {t('Categories')} </h1>
                                   <div>
                                        <p onClick={this.reset} className='hover:cursor-pointer hover:text-REDD' > {t('All_Products')} </p>
                                        {
                                             this.state.productCA.map(category => <p
                                                  onClick={() => this.filterByCategory(category)}
                                                  key={category.id}
                                                  className='hover:cursor-pointer hover:text-REDD'
                                             >
                                                  {cookies.get('i18next') === 'ar' ? category.name__ar : (cookies.get('i18next') == 'fr' ? category.name__fr : category.name__en)}
                                             </p>)
                                        }
                                   </div>
                              </div>

                              <div className="bg-BG_GRAY 2xl:px-16 1xl:px-16 xl:px-8 sm:px-8 2xl:py-16 1xl:py-16 xl:py-8 sm:py-8">
                                   <div className="mb-9 flex flex-row items-center justify-between">
                                        <h1 className="font-serif text-BLACK 2xl:text-3xl xl:text-3xl sm:text-2xl"> {t('Filter_by_Price')} </h1>
                                        <p className='hover:text-REDD text-sm hover:cursor-pointer' onClick={this.reset} > {t('Reset')} </p>
                                   </div>

                                   <form onSubmit={this.filterByPrice} className="flex flex-col gap-4 mt-4">
                                        <div className='flex flex-row gap-4'>
                                             <div>
                                                  <small className="text-TEXT_GRAY">MIN</small>
                                                  <input
                                                       placeholder="MIN"
                                                       value={this.state.minPrice0}
                                                       onChange={e => this.setState({ minPrice0: e.target.value })}
                                                       type="number"
                                                       className="w-full bg-gray-200 px-3 py-3 bg-transparent text-BLACK placeholder-gray-400"
                                                  />
                                             </div>
                                             <div>
                                                  <small className="text-TEXT_GRAY">MAX</small>
                                                  <input
                                                       placeholder="MAX"
                                                       value={this.state.maxPrice0}
                                                       onChange={e => this.setState({ maxPrice0: e.target.value })}
                                                       type="number"
                                                       className="w-full bg-gray-200 px-3 py-3 bg-transparent text-BLACK placeholder-gray-400"
                                                  />
                                             </div>
                                        </div>
                                        <button className="w-full px-3 py-3 bg-BLACK text-WHITE placeholder-gray-400" onSubmit={this.filterByPrice} > {t('FILTER')} </button>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div >
          )
     }
}

export default ProductsPage