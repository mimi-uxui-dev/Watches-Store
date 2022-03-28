import './index.scss';
import './index.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Skeleton from 'react-loading-skeleton';
import AOS from 'aos';
import 'aos/dist/aos.css'

import { Provider } from 'react-redux';
import store from './state/store'

AOS.init({
  offset: 20,
  delay: 500,
  duration: 3000,
  easing: 'ease-out-back',
  once: false,
  mirror: false,
});


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'ar'],
    fallbackLng: "en",
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
    react: { useSuspense: false }
  });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();