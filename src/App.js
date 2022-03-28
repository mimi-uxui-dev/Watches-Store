import './App.scss';
import React, { useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import Home from './components/Home'
import FourZeroFour from './components/FourZeroFour'
import Navbar from './components/Navbar';
import ProductDetails from './components/products/ProductDetails';
import BlogDetails from './components/blogs/BlogDetails';
import About from './components/About';
import ProductsPage from './components/products/ProductsPage';
import Footer from './components/Footer';
import BlogsPage from './components/blogs/BlogsPage';
import Contact from './components/Contact';
import SearchPage from './components/SearchPage';

function App() {
  const { t } = useTranslation()

  const languages = [
    {
      code: 'fr',
      name: 'Français',
      country_code: 'fr',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      country_code: 'sa',
    },
  ]

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find(l => l.code === currentLanguageCode)

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr"
    document.title = t('app_title')
  }, [currentLanguage, t])

  return (
    <>
      <div id='App'>
        <Navbar languages={languages} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/blogs/:id" component={BlogDetails} />
          <Route exact path="/blogs" > <BlogsPage t={t} /> </Route>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/products"> <ProductsPage t={t} /> </Route>
          <Route exact path="/results" component={SearchPage} />
          <Route path="*" exact component={FourZeroFour} />
        </Switch>
        <Footer />

        <ToastContainer />
      </div>
    </>
  );
}

export default App