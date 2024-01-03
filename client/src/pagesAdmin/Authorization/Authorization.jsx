import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slice/UserSlice'
import { useNavigate,Link } from 'react-router-dom'

import styles from './authorization.module.css'

const Authorization = () => {

	const dispatch = useDispatch()
	const userState = useSelector((store) => store.userReducer)
	const navigate = useNavigate()
	
	const [user, setUser] = useState({
		email: '',
		password: ''
	})

	useEffect(() => {
		if (userState.id !== -1) {
            navigate('/profile')
        }
		if(userState.role === 'ADMIN'){
			navigate('/admin/homeAdmin')
		}
	}, [userState])

	const submit = (e) => {
		e.preventDefault()
		dispatch(login(user))
	}


	return (
		<div>
			<form onSubmit={submit} className={styles.auth_form} >
				<h1>Authorization</h1>
				<div>
					<label htmlFor="E-Mail">E-Mail</label>
					<input type="text" id='E-Mail' placeholder='E-Mail' onChange={(e) => setUser({ ...user, email: e.target.value })} />
				</div>
				<div>
					<label htmlFor="Password">Password</label>
					<input type="text" id='Password' placeholder='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
				</div>
				<button className={styles.btn_login} >Login</button>
				<div className={styles.btn}>
					<button className={styles.btn_48} onClick={()=>navigate('/home')}><span>Back home</span> </button>	
					<Link to='/auth/registration'>Registration</Link>
				</div>
			</form>
		</div>
	)
}

export default Authorization