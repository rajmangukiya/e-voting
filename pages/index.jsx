import React, { useState, useEffect } from 'react'
import { Button, Image } from 'react-bootstrap'
import styles from '../SASS/dashboard/dashboard.module.scss'
import { ApiGet } from '../utils/ApiData'
import CurrentEle from './components/CurrentEle'
import PastEle from './components/PastEle'
import UpcomingEle from './components/UpcomingEle'

const Dashboard = () => {


  const [selectedTab, setSelectedTab] = useState('Current');
  const [userData, setUserData] = useState();

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

  useEffect(() => {
    getUserData()
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
          <h3>{userData?.fullName}</h3>
          <p>x0 abc...hag</p>
        </div>
        <div>
          <Button className={styles.logout_btn}>Logout</Button>
        </div>
      </div>

    </div>
  )
}

export default Dashboard