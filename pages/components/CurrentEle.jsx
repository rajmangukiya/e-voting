import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ethers } from 'ethers'
import styles from '../../SASS/dashboard/dashboard.module.scss'
import { ApiGet } from '../../utils/ApiData'
import Web3Modal from 'web3modal'

import {
  votingAddress
} from '../../config.address.js'

import Voting from '../../artifacts/contracts/Voting.sol/Voting.json'

const resultStorage = new Map()

const CurrentEle = ({ user }) => {

  const [candidates, setCandidates] = useState([])
  const [resultStorageState, setResultStorageState] = useState(new Map())
  const [electionData, setElectionData] = useState([])

  const voteHandler = async (regNo) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    let votingContract = new ethers.Contract(votingAddress, Voting.abi, signer)
    let transaction = await votingContract.voteCandidate(
      '19ce001@charusat.edu.in',
      regNo
    )
    let resutlTransaction = await votingContract.getResult(regNo)
    // let tx = await resutlTransaction.wait()
    // let event = resutlTransaction.events[0]
    // let value = event.args[2]
    // let tokenId = value.toNumber()
    resultStorage.set(regNo, resutlTransaction._hax)
    setResultStorageState(resultStorage)
    getElection()
    // console.log(resutlTransaction._hex);

    // const price = ethers.utils.parseUnits(formInput.price, 'ether')
  }

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
            <h1>{resultStorageState.get(i.regNo) ?? 0}</h1>

            <h4>{i.fullName}</h4>

            <Button onClick={() => {voteHandler(i.regNo)}} className={styles.vote_btn}>Vote</Button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default CurrentEle