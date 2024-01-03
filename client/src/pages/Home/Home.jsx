import React from 'react'
import { Link } from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import adidas from '../../images/imgesCarousel/adidas.webp'
import asics from '../../images/imgesCarousel/asics.webp'
import columbia from '../../images/imgesCarousel/columbia.webp'
import levis from '../../images/imgesCarousel/levis.webp'
import zima1 from '../../images/imageHome/zima1.jpg'
import native1 from '../../images/imageHome/native1.jpg'
import puchovik1 from '../../images/imageHome/puchovik1.jpg'

import styles from './home.module.css'


const Home = () => {

	
	return (
			<div className={styles.container}>
				<div className={styles.container_images}>
					<div className={styles.container_main_img}>
						<img src={zima1} alt="" style={{width:'100%', marginBottom:'15px'}} />
					</div>
					<div className={styles.container_main_img2}>
						<img src={native1} alt=""  style={{width:'100%', marginBottom:'15px'}}/>
						<img src={puchovik1} alt=""  style={{width:'100%', marginBottom:'15px'}}/>
					</div>
				</div>
				<div style={{display:'flex'}}>
					<Carousel
					width={150}
					autoPlay={true}
					interval={2000}
					transitionTime={500}
					emulateTouch={true}
					showStatus={false}
					
					//    showArrows={false}
					showIndicators={false}  
					showThumbs={false}   
					thumbWidth={100}
					infiniteLoop={true}
					swipeable={true}
					statusFormatter={false} 
					>
						<div className={styles.carosel_container}>
							<img src={columbia} alt=''/>
							<div className={styles.carosel_container_link}><Link>columbia</Link></div>
						</div>
						<div className={styles.carosel_container}>
							<img src={adidas} alt=''/>
							<div className={styles.carosel_container_link}><Link>adidas</Link></div>
							
						</div>
						<div className={styles.carosel_container}>
							<img src={asics}  alt=''/>
							<div className={styles.carosel_container_link}><Link>asics</Link></div>

						</div>
						<div className={styles.carosel_container}>
							<img src={levis}  alt=''/>
							<div className={styles.carosel_container_link}><Link>levis</Link></div>

						</div>
						
					</Carousel>
					<Carousel
					width={150}
					autoPlay={true}
					interval={2000}
					transitionTime={500}
					emulateTouch={true}
					showStatus={false}
					
					//    showArrows={false}
					showIndicators={false}  
					showThumbs={false}   
					thumbWidth={100}
					infiniteLoop={true}
					swipeable={true}
					statusFormatter={false} 
					>
						<div className={styles.carosel_container}>
							<img src={adidas} alt=''/>
							<div className={styles.carosel_container_link}><Link>adidas</Link></div>
						</div>
						<div className={styles.carosel_container}>
							<img src={columbia} alt=''/>
							<div className={styles.carosel_container_link}><Link>columbia</Link></div>
						</div>
						
						<div className={styles.carosel_container}>
							<img src={asics} alt=''/>
							<div className={styles.carosel_container_link}><Link>asics</Link></div>

						</div>
						<div className={styles.carosel_container}>
							<img src={levis} alt=''/>
							<div className={styles.carosel_container_link}><Link>levis</Link></div>

						</div>
						
					</Carousel>
					<Carousel
					width={150}
					autoPlay={true}
					interval={2000}
					transitionTime={500}
					emulateTouch={true}
					showStatus={false}
					
					//    showArrows={false}
					showIndicators={false}  
					showThumbs={false}   
					thumbWidth={100}
					infiniteLoop={true}
					swipeable={true}
					statusFormatter={false} 
					>
						<div className={styles.carosel_container}>
							<img src={asics} alt='a'/>
							<div className={styles.carosel_container_link}><Link>asics</Link></div>
						</div>
						<div className={styles.carosel_container}>
							<img src={columbia} alt='c'/>
							<div className={styles.carosel_container_link}><Link>columbia</Link></div>
						</div>
						<div className={styles.carosel_container}>
							<img src={adidas} alt='ad'/>
							<div className={styles.carosel_container_link}><Link>adidas</Link></div>
							
						</div>
						
						<div className={styles.carosel_container}>
							<img src={levis} alt='l'/>
							<div className={styles.carosel_container_link}><Link>levis</Link></div>

						</div>
						
					</Carousel>
					<Carousel
					width={150}
					autoPlay={true}
					interval={2000}
					transitionTime={500}
					emulateTouch={true}
					showStatus={false}
					
					//    showArrows={false}
					showIndicators={false}  
					showThumbs={false}   
					thumbWidth={100}
					infiniteLoop={true}
					swipeable={true}
					statusFormatter={false} 
					>
						<div className={styles.carosel_container}>
							<img src={levis} alt=''/>
							<div className={styles.carosel_container_link}><Link>levis</Link></div>
						</div>
						<div className={styles.carosel_container}>
							<img src={columbia} alt=''/>
							<div className={styles.carosel_container_link}><Link>columbia</Link></div>
						</div>
						<div className={styles.carosel_container}>
							<img src={adidas} alt=''/>
							<div className={styles.carosel_container_link}><Link>adidas</Link></div>
						</div>
						<div className={styles.carosel_container}>
							<img src={asics} alt=''/>
							<div className={styles.carosel_container_link}><Link>asics</Link></div>
						</div>
					</Carousel>
				</div>
				<div className={styles.container_map}>
					<iframe title="Map" className={styles.map} src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d41172.43584174698!2d23.99463934833519!3d49.83724805736541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d49.8495912!2d24.0221052!5e0!3m2!1suk!2sua!4v1701420042030!5m2!1suk!2sua" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>
  	)
}

export default Home