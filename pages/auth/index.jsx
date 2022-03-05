import React from 'react'
import router, { useRouter } from 'next/router'
import styles from '../../SASS/auth.module.scss'
import { Button, Col, Container, Row } from 'react-bootstrap'

const Login = () => {


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
                <div className='w-75'>
                  <h2>Login</h2>

                  <div>
                    <div className={styles.input_group}>
                      <p className={styles.input_lable}>Email</p>
                      <input type='email' placeholder='Enter email' className={styles.input_field} />
                    </div>

                    <div className={styles.input_group}>
                      <p className={styles.input_lable}>Password</p>
                      <input type='password' placeholder='Enter password' className={styles.input_field} />
                    </div>
                  </div>
                </div>

                <div className='w-75'>
                  <Button className={styles.login_btn} >Login</Button>

                  <p onClick={() => router.push('/signup')} className={styles.create_acc_txt}>Don't have an account? <span>Signup</span></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div >
  )
}

export default Login