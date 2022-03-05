import Link from 'next/link'
import "bootstrap/dist/css/bootstrap.min.css";
import AuthStorage from '../utils/AuthStorage';
import { STORAGEKEY } from '../config';
import { ApiGet } from '../utils/ApiData';
import { useEffect } from 'react';
import router from 'next/router';

function Marketplace({ Component, pageProps }) {

  const verify_token = async () => {
    try {

      if (AuthStorage.isUserAuthenticated()) {
        const { data }  = await ApiGet('voter/authenticate');

        if(data){
          AuthStorage.setStorageData(STORAGEKEY.token, data.token, true);
          router.push('/dashboard')
        }
      }else {
        AuthStorage.deauthenticateUser()
        router.push('/')
      }
    } catch (error) {
      console.error(error);
      AuthStorage.deauthenticateUser();
      router.push('/');
    }

  }

  useEffect(() => {
      verify_token(); 
  }, [])

  return (
    <Component {...pageProps} />
  )
}

export default Marketplace