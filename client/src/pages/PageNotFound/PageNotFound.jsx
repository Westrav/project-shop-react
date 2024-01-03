import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./pageNotFound.module.css"
import img404 from '../../images/404.png'

const PageNotFound = () => {
	
	const navigate = useNavigate()

return (
	<div className={styles.container_main}>
		<div>
			<img src={img404} alt="" width={'300px'} />
		</div>
		<div className={styles.context}>
			<h1>Page not found </h1>
			<p>We haven't written anything here yet, but we still have many other interesting pages.</p>
		</div>
		<div className={styles.container_btn}>
			<button className={styles.btn} onClick={()=>navigate(-1)} >Go back</button>
		</div>
	</div>
)
}

export default PageNotFound