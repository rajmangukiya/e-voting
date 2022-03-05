import React, { useState } from 'react'
import router, { useRouter } from 'next/router'
import styles from '../../SASS/auth.module.scss'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ApiPostNoAuth } from '../../utils/ApiData'
import AuthStorage from '../../utils/AuthStorage'
import { STORAGEKEY } from '../../config'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInVoter = async () => {
    try {
      // console.log("data", { email, password });

      const { data } = await ApiPostNoAuth('voter/signIn', {
        email,
        password
      });

      // dispatch(setUserData(resData.data));
      // dispatch(toggleLoading(false));

      if (data) {
        AuthStorage.setStorageData(STORAGEKEY.token, data.token, true);
        router.push('/')
      }
    } catch (error) {
      console.error(error);
    }
  }

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
                      <input type='email' placeholder='Enter email' className={styles.input_field} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className={styles.input_group}>
                      <p className={styles.input_lable}>Password</p>
                      <input type='password' placeholder='Enter password' className={styles.input_field} onChange={e => setPassword(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className='w-75'>
                  <Button className={styles.login_btn} onClick={signInVoter} >Login</Button>

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