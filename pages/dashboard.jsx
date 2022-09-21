import React, { useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import styles from '../SASS/dashboard/dashboard.module.scss'
import AuthStorage from '../utils/AuthStorage'
import CurrentEle from './componetns/CurrentEle'
import PastEle from './componetns/PastEle'
import UpcomingEle from './componetns/UpcomingEle'
import router from 'next/router'
import { STORAGEKEY } from '../config'
import { ApiGet } from '../utils/ApiData'

const Dashboard = () => {

  const [selectedTab, setSelectedTab] = useState('Current');
  const [currentAccount, setCurrentAccount] = useState('0x00000000000000000000000000000000');

  const logout = () => {
    AuthStorage.deauthenticateUser();
    router.push('/')
  }

  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      const { data } = await ApiGet('voter/authenticate')
      if (data) {
        setUserData(data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(async () => {
    getUserData()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setCurrentAccount(accounts[0])
  }, [])



  return (
    <div className={styles.container} >
      <div className={styles.center_container}>
        <ui className={styles.nav_container}>
          <li onClick={() => setSelectedTab('Current')}>
            <h5 className={selectedTab === 'Current' ? styles.selected_tab : styles.nav_option}>Current Election</h5>
          </li>
          <li onClick={() => setSelectedTab('Past')}>
            <h5 className={selectedTab === 'Past' ? styles.selected_tab : styles.nav_option}>Past Election</h5>
          </li>
          <li onClick={() => setSelectedTab('Upcoming')}>
            <h5 className={selectedTab === 'Upcoming' ? styles.selected_tab : styles.nav_option}>Upcoming Election</h5>
          </li>
        </ui>
        <div className={styles.pages_container}>
          {
            selectedTab === 'Current' ? <CurrentEle userData={userData} /> : selectedTab === 'Past' ? <PastEle /> : <UpcomingEle />
          }
        </div>
      </div>

      <div className={styles.profile_container}>
        <div className={styles.profile_details}>
          <img className={styles.porifle_img} src="./images/auth.png" alt='user' />
          <h3>{userData.fullName}</h3>
          <p>{currentAccount.slice(0, 8)} . . .</p>
        </div>
        <div>
          <Button onClick={logout} className={styles.logout_btn}>Logout</Button>
        </div>
      </div>

    </div>
  )
}

export default Dashboard