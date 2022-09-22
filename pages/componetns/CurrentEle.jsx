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

const CurrentEle = ({ userData }) => {

  const [candidates, setCandidates] = useState([])
  const [resultStorageState, setResultStorageState] = useState(new Map())
  const [electionData, setElectionData] = useState([])
  const [isVoted, setIsVoted] = useState(false)

  let votingContract, provider, signer, web3Modal, connection;

  const getElection = async () => {
    try {
      const { data } = await ApiGet('election/getElections?filter=CURRENT')
      if (data) {
        setElectionData(data[0])
        const _candidates = await ApiGet(`candidate/get?electionId=${data[0]._id}`)
        if (_candidates) {
          console.log(_candidates);
          setCandidates(_candidates.data)
        }

        web3Modal = new Web3Modal()
        connection = await web3Modal.connect()
        provider = new ethers.providers.Web3Provider(connection)
        signer = provider.getSigner()
        votingContract = new ethers.Contract(votingAddress, Voting.abi, signer)

        _candidates.data.map(async candidate => {
          let resutlTransaction = await votingContract.getResult(candidate.regNo)
          // let tx = await resutlTransaction.wait()
          // let event = resutlTransaction.events[0]
          // let value = event.args[2]
          // let tokenId = value.toNumber()
          resultStorage.set(candidate.regNo, parseInt(resutlTransaction._hex))
          setResultStorageState(resultStorage)
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  const voteHandler = async (regNo) => {

    /* next, create the item */
    web3Modal = new Web3Modal()
    connection = await web3Modal.connect()
    provider = new ethers.providers.Web3Provider(connection)
    signer = provider.getSigner()
    votingContract = new ethers.Contract(votingAddress, Voting.abi, signer)
    let transaction = votingContract.voteCandidate(
      userData.email,
      regNo
    )
    .then(getElection)
    .catch(() => {
      setIsVoted(true);
    })
    // console.log(resutlTransaction._hex);

    // const price = ethers.utils.parseUnits(formInput.price, 'ether')
  }

  useEffect(() => {
    getElection();
  }, [])
  

  return (
    <>
      {
        isVoted
          ?
          <div>
            <h1 style={{ paddingLeft: 500, paddingTop: 20 }}>
              Not Allowed
            </h1>
          </div>
          :
          <></>
      }
      <div className={styles.current_ele}>
        {/* {electionData.electionName} */}
        {candidates.map((i, key) => (
          <div key={key} className={styles.party_card}>
            <div className={styles.blur}>
              <h1>{resultStorageState.get(i.regNo) ?? 0}</h1>

              <h4>{i.fullName}</h4>
              {
                !isVoted
                  ?
                  <Button onClick={() => { voteHandler(i.regNo) }} className={styles.vote_btn}>Vote</Button>
                  :
                  <></>
              }
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default CurrentEle