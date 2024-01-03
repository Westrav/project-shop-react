import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/slice/UserSlice'

const Profile = () => {
	const user = useSelector((store) => store.userReducer)
	const navigation = useNavigate()
	const dispatch = useDispatch()

	const logoutUser = ()=>{
		dispatch(logout())
	}

	useEffect(() => {
		if (user.id == -1) {
		navigation('/auth/authorization')
		}
		
	}, [user])

	if (user.id != -1) {
		return (
		<div>
			<p>Email: {user.email}</p>
			<button onClick={logoutUser}>logout</button>
		</div>
		)
	}
	return (
		<div></div>
	)
}

export default Profile