import React, { useState, useEffect } from 'react'
import { PRODUCTS, PRODUCTS_CA } from './../../sevices/globalServices'
import axios from 'axios'
import Product from './Product'
import s from "../../assets/imgs/icons/Search.svg"
import cookies from 'js-cookie'
import arrow from '../../assets/imgs/icons/arr.svg'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../BreadCrumbs'

function ProductsPage() {
     const [products, setProducts] = useState([])
     const [productCA, setProductCA] = useState([])
     const [searchTerm, setsearchTerm] = useState('')
     const [isFiltering, setIsFiltering] = useState(false)
     const [show, setShow] = useState(false)
     const [filterTitle, setFilterTitle] = useState('ALL')
     const [products0, setProducts0] = useState([])
     const [minPrice0, setMinPrice0] = useState(0)
     const [maxPrice0, setMaxPrice0] = useState(0)

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(PRODUCTS()).then(res => setProducts(res.data.data))
          }
          fetchData()
     }, [])

     useEffect(async () => {
          const fetchData = async () => {
               const result = await axios.get(PRODUCTS_CA())
                    .then(res => setProductCA(res.data.data))
          }
          fetchData()
     }, [])

     const maxPrice = Math.max.apply(Math, products.map(p => p.price))
     const minPrice = Math.min.apply(Math, products.map(p => p.price))

     const filterByPrice = e => {
          e.preventDefault()
          setProducts(products.filter(p => (p.price >= minPrice0 && p.price <= maxPrice0)).map(x => x))
     }

     const reset = async () => {
          setIsFiltering(false)
          await axios.get(PRODUCTS()).then(res => setProducts(res.data.data))
     }

     const filterByCategory = (category) => {
          setProducts0(products)
          setProducts0(products.filter(p => (p.product_categories_id == category.id)).map(x => x))
          setProducts0(products.filter(p => (p.product_categories_id == category.id)).map(x => x))
          console.log(products0)
          setIsFiltering(true)
     }

     const onSorting = (option) => {
          switch (option) {
               case 'ALL':
                    let allList = products.sort((a, b) => { return a.created_at >= b.created_at ? 1 : -1 }).map(x => x)
                    setProducts(allList)
                    setFilterTitle('ALL')
                    setShow(false)
                    break
               case 'A-Z':
                    let nameList = products.sort((a, b) => { return a.name__fr >= b.name__fr ? 1 : -1 }).map(x => x)
                    setProducts(nameList)
                    setFilterTitle('Alphabetically A-Z || Z-A')
                    setShow(false)
                    break
               case 'DATE':
                    let dateList = products.sort((a, b) => { return new Date(a.date_at) >= new Date(b.date_at) ? 1 : -1 }).map(x => x)
                    setProducts(dateList)
                    setFilterTitle('NEWEST')
                    setShow(false)
                    break
               case 'PRICE':
                    let priceList = products.sort((a, b) => { return a.price >= b.price ? 1 : -1 }).map(x => x)
                    setProducts(priceList)
                    setFilterTitle('PRICE')
                    setShow(false)
                    break
               default:
                    console.log('Default')
                    break
          }

          // console.log("Sorted list", sortedList)
     }

     const ci = useSelector(state => state.account)
     const productCover = ci.length === 0 ? null : ci.photo.find(i => i.type === 'Product Cover').link

     return (
          <div className="">
               <BreadCrumbs img={productCover} path={'products'} />

               <div className=" px-52 pt-20 pb-7 2xl:px-52 1xl:px-52 xl:px-10 sm:px-4 w-full flex flex-row gap-8">
                    <div className="w-2/3">
                         <div className="flex items-center flex-row justify-between">
                              <ul className="w-56 bg-BG_GRAY px-3 py-3 bg-transparent text-BLACK placeholder-gray-500 relative top-0 left-0 "  >
                                   <li className='flex flex-row justify-between hoverClass ' onClick={() => setShow(!show)}> {filterTitle} <img className="w-4" src={arrow} alt="12" />   </li>
                                   <div className={show ? "block absolute top-14 left-0 z-10 bg-BG_GRAY w-56 transition-all" : "hidden"} >
                                        <li className="hoverClass hover:text-REDD px-4 py-2 " onClick={() => onSorting('ALL')} >ALL</li>
                                        <li className="hoverClass hover:text-REDD px-4 py-2 " onClick={() => onSorting('A-Z')} >Alphabetically A-Z</li>
                                        <li className="hoverClass hover:text-REDD px-4 py-2 " onClick={() => onSorting('DATE')} >NEWEST</li>
                                        <li className="hoverClass hover:text-REDD px-4 py-2 " onClick={() => onSorting('PRICE')}>PRICE</li>
                                   </div>
                              </ul>

                              <div className="text-sm text-TEXT_GRAY" > <span className="font-bold"> {products.length} </span> Products</div>
                         </div>
                         <div className="grid grid-cols-3 gap-4 my-4">
                              {
                                   isFiltering ?
                                        products0.map(p => <Product key={p.id} product={p} />)
                                        :
                                        products.filter(product => product && (product.name__fr.toLowerCase().includes(searchTerm.toLowerCase()) || product.name__en.toLowerCase().includes(searchTerm.toLowerCase()) || product.name__ar.toLowerCase().includes(searchTerm.toLowerCase()))
                                        ).map(filteredProduct => <Product key={filteredProduct.id} product={filteredProduct} />)
                              }
                         </div>
                    </div>

                    <div className="w-1/3 flex flex-col gap-8">
                         <div className="bg-BLACK px-16 py-16">
                              <h1 className="font-serif text-WHITE text-3xl mb-9">Search</h1>
                              <form className="flex flex-row">
                                   <input
                                        value={searchTerm}
                                        onChange={e => setsearchTerm(e.target.value)}
                                        type="text"
                                        placeholder="Search"
                                        className="w-full bg-gray-500 px-3 py-3 bg-transparent text-BLACK placeholder-gray-400" />
                                   <img src={s} alt="" className="bg-WHITE px-2" />
                              </form>
                         </div>

                         <div className="bg-BG_GRAY px-16 py-16">
                              <h1 className="font-serif text-BLACK text-3xl mb-9">Categories</h1>
                              <div>
                                   <p onClick={reset} className='hover:cursor-pointer hover:text-REDD' >All Products</p>
                                   {
                                        productCA.map(category => <p
                                             onClick={() => filterByCategory(category)}
                                             key={category.id}
                                             className='hover:cursor-pointer hover:text-REDD'
                                        >
                                             {cookies.get('i18next') === 'ar' ? category.name__ar : (cookies.get('i18next') == 'fr' ? category.name__fr : category.name__en)}
                                        </p>)
                                   }
                              </div>
                         </div>

                         <div className="bg-BG_GRAY px-16 py-16">
                              <h1 className="font-serif text-BLACK text-3xl mb-9">Filter by Price</h1>
                              <div className="flex flex-row justify-between text-sm text-TEXT_GRAY">
                                   <p>The highest price is <span> Da {maxPrice} </span> </p>
                                   <p className='border-b-2 hover:text-REDD hover:cursor-pointer ' onClick={reset} >Reset</p>
                              </div>
                              <form onSubmit={filterByPrice} className="flex flex-col gap-4 mt-4">
                                   <div className='flex flex-row gap-4'>
                                        <div>

                                             <small className="text-TEXT_GRAY">MIN</small>
                                             <input
                                                  placeholder="MIN"
                                                  value={minPrice0}
                                                  onChange={e => setMinPrice0(e.target.value)}
                                                  type="number"
                                                  className="w-full bg-gray-200 px-3 py-3 bg-transparent text-BLACK placeholder-gray-400"
                                             />
                                        </div>
                                        <div>

                                             <small className="text-TEXT_GRAY">MAX</small>
                                             <input
                                                  placeholder="MAX"
                                                  value={maxPrice0}
                                                  onChange={e => setMaxPrice0(e.target.value)}
                                                  type="number"
                                                  className="w-full bg-gray-200 px-3 py-3 bg-transparent text-BLACK placeholder-gray-400"
                                             />
                                        </div>
                                   </div>
                                   <button className="w-full px-3 py-3 bg-BLACK text-WHITE placeholder-gray-400" onSubmit={filterByPrice} >FILTER</button>
                              </form>

                         </div>

                    </div>
               </div>
          </div >
     )
}

export default ProductsPage
