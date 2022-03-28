import React from 'react'
import { PRODUCTS, PRODUCT_CA, PRODUCTS_CA } from './../../sevices/globalServices'
import axios from 'axios'
import Product from './Product'
import cookies from 'js-cookie'
import Loader from './../Loader'
import styled from 'styled-components'


const Tab = styled.button`
     display: flex;
     flex-direction: row;
     text-align: center;
     justify-content: center;
     align-items: center;
     padding: 8px 32px;
     border-bottom: 2px solid transparent;
     cursor: pointer;
  ${({ active }) =>
          active &&
          `
          border-bottom: 2px solid red;
  `}
`;


class ProductsSection extends React.Component {

     state = {
          products: [],
          productCA: [],
          show: false,
          isLoading: false,
          isCategoryFetching: false,
          categoryId: 0,
          productsCategory: [],
          setBorder: false,
          active: 0
     }

     reset = async (e, pageNumber = 1, filterBy = 'all', perPage = 8) => {
          e.preventDefault()
          this.setState({ isCategoryFetching: false, setBorder: true })
          await axios.get(`${PRODUCTS()}?filtre=${filterBy}&perpage=${perPage}&page=${pageNumber}`).then(res => this.setState({ products: res.data.data }))
     }

     filterByCategory = async category => {
          const categoryId = category.id
          this.setState({ isCategoryFetching: true, setBorder: true })

          await axios.get(`${PRODUCT_CA(categoryId)}`).then(res => {
               res.data.data && res.data.data.hasOwnProperty('prodcuts') ?
                    this.setState({ productsCategory: res.data.data })
                    :
                    console.log("No products in category", categoryId)
          })

          this.setState({ isLoading: false })
     }

     fetchProducts = async (pageNumber = 1, filterBy = 'all', perPage = 8) => {
          this.setState({ isLoading: true })
          await axios.get(`${PRODUCTS()}?filtre=${filterBy}&perpage=${perPage}&page=${pageNumber}`).then(res => this.setState({ products: res.data.data }))
          this.setState({ isLoading: false })
          // console.log('prdd', this.state.products)
     }

     fetchFilterProducts = async (pageNumber = 1, filterBy, perPage = 8) => {
          this.setState({ isLoading: true })
          this.setState({ filterTitle: filterBy })
          await axios.get(`${PRODUCTS()}?filtre=${filterBy}&perpage=${perPage}&page=${pageNumber}`).then(res => this.setState({ products: res.data.data }))
          this.setState({ isLoading: false })
          this.setState({ show: !this.state.show })
     }

     fetchProductsCA = async (pageNumber = 1) => {
          this.setState({ isLoading: true })
          await axios.get(PRODUCTS_CA()).then(res => this.setState({ productCA: res.data.data }))
          this.setState({ isLoading: false })
     }

     async componentDidMount() {
          this.fetchProducts()
          this.fetchProductsCA()
     }

     render() {
          const { isLoading, active } = this.state

          if (isLoading) {
               return <Loader />
          }

          return (
               <div className="px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 w-full xl:w-full sm:w-full flex flex-col-reverse ">
                    <div className="w-full ">
                         <div className="grid 2xl:grid-cols-4 1xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
                              {
                                   !this.state.isCategoryFetching ?
                                        this.state.products.length === 0 ? null : this.state.products.data.map(p => <Product key={p.id} product={p} />)
                                        :
                                        this.state.productsCategory.length === 0 ? null : this.state.productsCategory.prodcuts.map(p => <Product key={p.id} product={p} />)
                              }
                         </div>
                    </div>
                    <div className="w-full flex flex-row gap-5 text-lg py-4 mb-6 items-center">
                         <Tab
                              active={active === 0}
                              onClick={() => this.setState({ active: 0 })}
                         >
                              <p onClick={this.reset} className='hover:cursor-pointer hover:text-REDD hoverClass'> {cookies.get('i18next') === 'ar' ? "جميع المنتجات" : (cookies.get('i18next') == 'fr' ? "Tous" : "All")}</p>
                         </Tab>
                         {
                              this.state.productCA.map(category => <Tab
                                   key={category.id}
                                   active={active === category.id}
                                   onClick={() => this.setState({ active: category.id })}
                              >
                                   <p
                                        onClick={() => this.filterByCategory(category)}
                                        key={category.id}
                                        className='hover:text-REDD hoverClass'
                                   >
                                        {cookies.get('i18next') === 'ar' ? category.name__ar : (cookies.get('i18next') == 'fr' ? category.name__fr : category.name__en)}
                                   </p>
                              </Tab>
                              )
                         }
                    </div>
               </div>
          )
     }
}

export default ProductsSection