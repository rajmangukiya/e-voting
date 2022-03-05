import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import styles from '../SASS/dashboard/dashboard.module.scss'
import CurrentEle from './components/CurrentEle'
import PastEle from './components/PastEle'
import UpcomingEle from './components/UpcomingEle'

const Dashboard = () => {

  const [selectedTab, setSelectedTab] = useState('Current');


  return (
    <div className={styles.container} >
      <div className={styles.center_container}>
        <ui className={styles.nav_container}>
          <li className={selectedTab === 'Current' ? styles.selected_tab : styles.nav_option} onClick={() => setSelectedTab('Current')}><p>Current Election</p></li>
          <li className={selectedTab === 'Past' ? styles.selected_tab : styles.nav_option} onClick={() => setSelectedTab('Past')}><p>Past Election</p></li>
          <li className={selectedTab === 'Upcoming' ? styles.selected_tab : styles.nav_option} onClick={() => setSelectedTab('Upcoming')}><p>Upcoming Election</p></li>
        </ui>
        <div className={styles.pages_container}>
          {
            selectedTab === 'Current' ? <CurrentEle /> : selectedTab === 'Past' ? <PastEle /> : <UpcomingEle />
          }
        </div>
      </div>

      <div className={styles.profile_container}>
        <img className={styles.porifle_img} src="./images/auth.png" alt='user' />
        <div className={styles.profile_details}>
          <h3>Krunal Mungalpara</h3>
        </div>
      </div>

    </div>
  )
}

export default Dashboard