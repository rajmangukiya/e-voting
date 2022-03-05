import React from 'react'
import styles from '../../SASS/dashboard/dashboard.module.scss'

const UpcomingEle = () => {

  const a = [0,1,2,3,4,5,6,7,7,7,7]

  return (
    <div className={styles.current_ele}>

      {a.map(i => (
        <div className={styles.upcoming_ele_card}>
          <div className={styles.blur}>
            <h3>Class cordinator election</h3>

            <h4>12-09-22</h4>
          </div>
        </div>
      ))}

    </div>
  )
}

export default UpcomingEle