import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Admin/Header/Header'
import Footer from '../Admin/Footer/Footer'
import SideBar from '../Admin/SideBar/SideBar'
import styles from './LayoutAdmin.module.css'
import { useSelector } from 'react-redux'

const LayoutAdmin = () => {
	const {openSideBar, widthOpenSideBar, widthCloseSideBar} = useSelector((store) => store.settingReducer)



	return (
		<>
			<Header/>
				<SideBar />
				<main className={styles.main} style={openSideBar ? widthOpenSideBar: widthCloseSideBar}>
					<Outlet />
				</main>
			<Footer/>
		</>
	)
}

export default LayoutAdmin