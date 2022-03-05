import React from 'react'
import router, { useRouter } from 'next/router'
import styles from '../SASS/signup.module.scss'
import { Button, Col, Container, Row } from 'react-bootstrap'

const Signup = () => {

  return (
    <div className={styles.container}>
      <div className={styles.blur}>
        <Container className={styles.center_modal}>
          <Row>
            <Col className={styles.img_container}>
              <img src='./images/auth.png' alt='background' />
            </Col>
            <Col className={styles.form}>
              <div className='w-100 d-flex flex-column justify-contant-center align-items-center'>
                <h2>Sign Up</h2>
                <div className={styles.form_details}>

                  <div>
                    <div className={styles.input_group}>
                      <p className={styles.input_lable}>Full Name</p>
                      <input type='text' placeholder='Enter fullname' className={styles.input_field} />
                    </div>

                    <div className={styles.input_group}>
                      <p className={styles.input_lable}>Date of birth</p>
                      <input type='date' placeholder='DOB' className={styles.input_field} />
                    </div>

                    <div className={styles.input_group}>
                      <p className={styles.input_lable}>Email</p>
                      <input type='email' placeholder='Enter email' className={styles.input_field} />
                    </div>

                    <div className={styles.input_group}>
                      <p className={styles.input_lable}>Password</p>
                      <input type='password' placeholder='Enter password' className={styles.input_field} />
                    </div>

                    <div className={styles.radio_box}>
                      <p className={styles.input_label}>
                        Gender
                      </p>
                      <div className={styles.radio_btn}>
                        <input
                          defaultChecked
                          className={styles.radio}
                          type="radio"
                          name="gender"
                          value="MALE"
                        />
                        <p className={styles.input_label}>Male</p>
                      </div>

                      <div className={styles.radio_btn}>
                        <input
                          className={styles.radio}
                          type="radio"
                          name="gender"
                          value="FEMALE"
                        />
                        <p className={styles.input_label}>Female</p>
                      </div>

                      <div className={styles.radio_btn}>
                        <input
                          className={styles.radio}
                          type="radio"
                          name="gender"
                          value="OTHER"
                        />
                        <p className={styles.input_label}>Other</p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className='w-75'>
                  <Button className={styles.login_btn} >Sign Up</Button>

                  <p onClick={() => router.push('/auth')} className={styles.create_acc_txt}>Already have an account? <span>Login</span></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div >
  )
}

export default Signup