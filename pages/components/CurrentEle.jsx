import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import styles from '../../SASS/dashboard/dashboard.module.scss'
import { ApiGet } from '../../utils/ApiData'

const CurrentEle = () => {

  const [candidates, setCandidates] = useState([])
  const [electionData, setElectionData] = useState([])

  const getElection = async () => {
    try {
      const { data } = await ApiGet('election/getElections?filter=CURRENT')
      if (data) {
        setElectionData(data[0])
        const _candidates = await ApiGet(`candidate/get?electionId=${data[0]._id}`)
        if (_candidates) {
          setCandidates(_candidates.data)
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const a = [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7]
  useEffect(() => {
    getElection();

  }, [])


  return (
    <div className={styles.current_ele}>
      {electionData.electionName}
      {candidates.map(i => (
        <div className={styles.party_card}>
          <div className={styles.blur}>
            <h1>10</h1>

            <h4>{i.fullName}</h4>

            <Button className={styles.vote_btn}>Vote</Button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default CurrentEle