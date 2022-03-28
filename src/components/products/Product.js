import React from 'react'
import { Link } from 'react-router-dom'
import cookies from 'js-cookie'

function Product({ product }) {
     return (
          <div className="relative z-0 top-0 bg-BG_GRAY left-0" style={{ width: "fit-content", height: "100%" }} >
               <p className="text-TEXT_GRAY text-lg absolute right-3 top-3 z-10" >DA {product.price} </p>
               <Link to={`/products/${product.id}`}>
                    <img className="onScale transition-all" width="100%" style={{ maxWidth: "350px" }} height="auto" src={product.photo} alt="LS" />
               </Link>
               <Link
                    to={`/products/${product.id}`} className="text-BLACK text-base relative bottom-3 left-4 font-sans hover:text-REDD cursor-pointer rtl_text"
                    style={{ width: "fit-content" }}
               >
                    {cookies.get('i18next') === 'ar' ? product.name__ar : (cookies.get('i18next') == 'fr' ? product.name__fr : product.name__en)}
               </Link>
          </div>
     )
}

export default Product
