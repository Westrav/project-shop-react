import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAdmins, registration } from '../../store/slice/AdminSlice'
import styles from './users.module.css'


const Users = () => {

	const dispatch = useDispatch()

	const adminState = useSelector((store)=> store.adminReducer)
	const [admin , setAdmin] = useState({
		email:'',
		password:''
	})
	useEffect(()=>{
		dispatch(loadAdmins())
	},[])

	const submit = (e)=>{
		e.preventDefault()
		dispatch(registration(admin))
		setAdmin({
			email:'',
			password:''
		})
	}

	return (
		
		<div className={styles.users}>
			<h3>Users</h3>
			<form onSubmit={submit}>
				<div>
					<label htmlFor="E-Mail">E-Mail</label>
					<input type="text" placeholder='E-Mail' onChange={(e)=>setAdmin({...admin,email:e.target.value})}/>
				</div>
				<div>
					<label htmlFor="Password">Password</label>
					<input type="text" placeholder='Password' onChange={(e)=>setAdmin({...admin,password:e.target.value})}/>
				</div>
				<button>add admin</button>
			</form>
			<div>
				{
					adminState.admins.map(admin => <p key={admin.id}>email: {admin.email}</p>)
				}
			</div>
			<h2>{adminState.stateLoading.error}</h2>
		</div>
	)
}

export default Users