import React, { useState, useEffect } from 'react'
import { PRODUCTS_CA_LIMIT, PRODUCT_CA, PRODUCTS_LIMIT } from '../../sevices/globalServices'
import axios from 'axios'
import Product from './Product'
import Loader from './../Loader';
import cookies from 'js-cookie'

function ProductsSection() {
     const [products_CA_Limit, setProducts_CA_Limit] = useState([])
     const [products, setProducts] = useState([])
     const [productsInCat, setProductsInCat] = useState([])
     const [isLoading, setIsLoading] = useState(false)
     const [isCategoryFetching, setIsCategoryFetching] = useState(false)
     const [isAll, setIsAll] = useState(false)

     const filterByCategory = async category => {
          const categoryId = category.id
          setIsCategoryFetching(true)
          await axios.get(`${PRODUCT_CA(categoryId)}`).then(res => {
               res.data.data && res.data.data.hasOwnProperty('prodcuts') ?
                    setProductsInCat(res.data.data)
                    :
                    console.log("No products in category section", categoryId)
          })

          setIsCategoryFetching(false)
     }

     const fetchData = async () => {
          await axios.get(PRODUCTS_CA_LIMIT()).then(res => setProducts_CA_Limit(res.data.data))
     }

     const fetchData2 = async () => {
          setIsCategoryFetching(false)
          await axios.get(PRODUCTS_LIMIT()).then(res => setProducts(res.data.data))
     }

     const reset = async () => {
          setIsCategoryFetching(false)
          setIsAll(true)
          await axios.get(PRODUCTS_LIMIT()).then(res => setProducts(res.data.data))
          setIsAll(false)
          console.log('ppp', products)
     }

     useEffect(async () => {
          setIsLoading(true)
          fetchData()
          fetchData2()
          setIsCategoryFetching(false)
          setIsLoading(false)
     }, [])

     if (isLoading) {
          return <Loader />
     }

     return (
          <div className="px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 w-full xl:px-10 sm:px-4">
               <div className='flex flex-row w-full gap-8 justify-center 2xl:text-lg xl:text-lg sm:text-base py-4 mb-4 '>
                    <h3 onClick={() => reset()} className='hover:text-REDD' >All</h3>

                    {products_CA_Limit.map(p => <h3 key={p.id} onClick={() => filterByCategory(p)}>
                         {cookies.get('i18next') === 'ar' ? p.name__ar : (cookies.get('i18next') == 'fr' ? p.name__fr : p.name__en)}
                    </h3>)}
               </div>
               <div className="grid gap-4 2xl:grid-cols-4 1xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ">
                    {
                         !isAll ?
                              isCategoryFetching ?
                                   products.map(p => <Product key={p.id} product={p} />)
                                   :
                                   (productsInCat.length !== 0 && productsInCat.hasOwnProperty('prodcuts')) ? productsInCat.prodcuts.map(p => <Product key={p.id} product={p} />) : products.length === 0 ? <Loader /> : products.map(p => <Product key={p.id} product={p} />)
                              :
                              products.map(p => <Product key={p.id} product={p} />)
                    }
               </div>
          </div>
     )
}

export default ProductsSection