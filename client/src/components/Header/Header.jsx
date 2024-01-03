import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import styles from './header.module.css'
import PersonIcon from '@mui/icons-material/Person';

import Basket from '../Basket/Basket'


const Header = () => {
	const user = useSelector((store)=> store.userReducer)

	
  	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<nav className={styles.navbar}>
					<div className={styles.logo}>
						<Link to='/'>LOGO</Link>
					</div>
					<div>
						<ul className={styles.menu_list}>
							<li><Link to='/home'>Home</Link></li>
							<li><Link to='/products'>Products</Link></li>
						</ul>
					</div>
					<div className={styles.container_container}>
						<ul className={styles.container_profile_list}>
							<li>
								<Link to='/profile'>
									<div className={styles.container_profile}>
										<div className={styles.profile}>
											<PersonIcon style={{fontSize:'32px'}}/>
										</div>
									</div>Profile
								</Link>
							</li>
							{user.role === 'ADMIN' ? <li><Link to='/admin'>Admin</Link></li> : <></> }
						</ul>
						<Basket/>
					</div>
				</nav>
			</div>
		</header>
    ) 
}

export default Header