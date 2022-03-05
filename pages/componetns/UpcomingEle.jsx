import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styles from '../../SASS/dashboard/dashboard.module.scss'
import { ApiGet } from '../../utils/ApiData'

const UpcomingEle = () => {

  const [electionData, setElectionData] = useState([])

  const getElection = async () => {
    try {
      const { data } = await ApiGet('election/getElections?filter=PAST')
      if (data) {
        setElectionData(data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getElection();
  }, [])


  return (
    <div className={styles.current_ele}>

      {electionData.map(i => (
        <div className={styles.upcoming_ele_card}>
          <div className={styles.blur}>
            <h3>{i?.electionName}</h3>

            <h4>{moment(i?.startTime).format('DD-MM-YYYY')}</h4>
          </div>
        </div>
      ))}

    </div>
  )
}

export default UpcomingEle