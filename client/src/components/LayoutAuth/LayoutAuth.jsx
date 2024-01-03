import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'


import styles from './layoutAuth.module.css'

const LayoutAuth = () => {
	const navigate = useNavigate()
	return (
	<>
		<main className={styles.main}>
			<Outlet/>
		</main>
	</>
	)
	}

export default LayoutAuth