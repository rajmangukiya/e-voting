import React from 'react'
import styles from '../../SASS/dashboard/dashboard.module.scss'

const PastEle = () => {
  
  const a = [0,1,2,3,4,5,6,7,7,7,7]

  
  return (
    <div className={styles.current_ele}>

      {a.map(i => (
        <div className={styles.party_card}>
          <div className={styles.blur}>
            <h1>10</h1>

            <h4>Krunal</h4>
          </div>
        </div>
      ))}

    </div>
  )
}

export default PastEle