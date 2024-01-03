import React, { useEffect, useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import styles from './header.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slice/UserSlice';
import { setOpenSideBar } from '../../../store/slice/SettingSlice';

const Header = () => {
	const dispatch = useDispatch()
	const {openSideBar, widthOpenSideBar , widthCloseSideBar , mobileSize}  = useSelector((store) => store.settingReducer)
	const [openNavBar, setOpenNavBar] = useState(false)

	console.log(openSideBar)
	const toggleNavBar = () => {
		setOpenNavBar(!openNavBar)
	}

	const [typeDevice, setTypeDevice] = useState(window.innerWidth <= mobileSize ? 'mobile' : 'pc')

	useEffect(()=>{
		const resize = () => {
			if (window.innerWidth <= mobileSize) {
				setTypeDevice('mobile')
			} else {
				setTypeDevice('pc')
			}
		}
		
		window.addEventListener('resize',resize)

		return () => {
			window.removeEventListener('resize',resize)
		}
	},[])

	const logoutUser = ()=>{
		dispatch(logout())
	}
	return (
		<header className={styles.header} style={openSideBar ? widthOpenSideBar : widthCloseSideBar }>
			<div className={styles.container}>
				<nav className={styles.navbar}>
					<div className={styles.logo}>
						<Link to='/'>LOGO</Link>
					</div>

					{
						typeDevice == 'pc' ?
						<ul className={styles.main_menu}>
							<li><Link><PersonIcon/>Profile</Link></li>
							<li><Link>blala</Link></li>
							<li><Link to='/home' onClick={logoutUser}><LogoutIcon/>Logout</Link></li>
						</ul>
						:
						<ul className={styles.main_menu_mobile} style={openNavBar ? {display:'block'} : {}}>
							<li><Link><PersonIcon/>Profile</Link></li>
							<li><Link>blala</Link></li>
							<li><Link to='/home' onClick={logoutUser}><LogoutIcon />Logout</Link></li>
						</ul>
					}

					<div className={styles.menu_btn}>
						<MenuIcon onClick={() =>  toggleNavBar(true)}/>
					</div>
					
				</nav>
			</div>
		</header>
	)
}

export default Header