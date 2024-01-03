import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './sideBar.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TitleIcon from '@mui/icons-material/Title';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import HomeIcon from '@mui/icons-material/Home';

import { useDispatch, useSelector } from 'react-redux';

import { setOpenSideBar } from '../../../store/slice/SettingSlice';


const SideBar = () => {

	const dispatch = useDispatch()
	const sideBar = useSelector((store)=>store.settingReducer.openSideBar)

	useEffect(() => {
		const open = localStorage.getItem('openSideBar')
		if (open == 'false') {
			dispatch(setOpenSideBar(false))
		} else {
			dispatch(setOpenSideBar(true))
		}
	}, [])

	const clickArrow = () => {
		const open = localStorage.getItem('openSideBar')
		
		if (open == 'false') {
			dispatch(setOpenSideBar(true))
			localStorage.setItem('openSideBar',true)
		} else {
			dispatch(setOpenSideBar(false))
			localStorage.setItem('openSideBar',false)
		}
	}

	
	if (!sideBar) {
		return <div className={styles.sidebar_small} >
			<ul className={styles.sidebar_ul}>
				<li><Link to='/admin/homeAdmin' style={{justifyContent:'center'}}><HomeIcon /></Link></li>
				<li><Link to='/admin/products' style={{justifyContent:'center'}}><InventoryIcon /></Link></li>
				<li><Link to='/admin/brands' style={{justifyContent:'center'}}><FormatBoldIcon /></Link></li>
				<li><Link to='/admin/types' style={{justifyContent:'center'}}><TitleIcon /></Link></li>
				<li><Link to='/admin/users' style={{justifyContent:'center'}}><PeopleAltIcon /></Link></li>
				<ArrowForwardIcon className={styles.sidebar_arrow} onClick={clickArrow} />
			</ul>
		</div>
	} else {
		return (
			<div className={styles.sidebar}>
				<ul className={styles.sidebar_ul}>
					<li><Link to='/admin/'><HomeIcon />Home</Link></li>
					<li><Link to='/admin/products'><InventoryIcon />Products</Link></li>
					<li><Link to='/admin/brands'><FormatBoldIcon />Brands</Link></li>
					<li><Link to='/admin/types'><TitleIcon />Types</Link></li>
					<li><Link to='/admin/users'><PeopleAltIcon />Users</Link></li>
					<ArrowBackIcon className={styles.sidebar_arrow} onClick={clickArrow} />
				</ul>
			</div>
		)
	}
}

export default SideBar