import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {registration} from '../../store/slice/UserSlice'
import { useNavigate, Link } from 'react-router-dom'

import styles from './registration.module.css'


const Registration = () => {

    const dispatch = useDispatch()
    const userState = useSelector((store)=>store.userReducer)


    console.log(userState)
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    useEffect(()=>{
        if (userState.id != -1) {
            navigate('/profile')
        }
    }, [userState])

    const submit = (e)=>{
        e.preventDefault()
        dispatch(registration(user))
        setUser({
            email:'',
            password:''
        })
    }

    return (
        <div>
            <form onSubmit={submit} className={styles.regist_form}>
                    <h1>Register account</h1>
                <div>
                    <label htmlFor="E-Mail">E-Mail</label>
                    <input type="text" id='E-Mail' placeholder='E-Mail' onChange={(e)=>setUser({...user, email:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="Password">Password</label>
                    <input type="text" id='Password' placeholder='Password' onChange={(e)=>setUser({...user, password:e.target.value})}/>
                </div>
                <button>Register</button>
                <div className={styles.btn}>
					<button onClick={()=>navigate('/home')}>Back home</button>	
					<Link to='/auth/authorization'>Authorization</Link>
				</div>
            </form>
        </div>
    )
}

export default Registration