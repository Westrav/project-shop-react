import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './layout.module.css'


const Layout = () => {
	return (
		<>
			<Header/>
			<main className={styles.main}>
				<Outlet/>
			</main>
			<Footer/>
		</>
	)
}

export default Layout