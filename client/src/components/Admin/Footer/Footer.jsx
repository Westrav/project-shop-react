import React from 'react'
import styles from './footerAdmin.module.css'
import { useSelector } from 'react-redux'

const Footer = () => {
	const {openSideBar, widthOpenSideBar, widthCloseSideBar} = useSelector((store) => store.settingReducer)
	return (
		<div className={styles.footer}  style={openSideBar ? widthOpenSideBar : widthCloseSideBar}>
		<h4>© 2023 All Rights Reserved.</h4>
		</div>
	)
}

export default Footer