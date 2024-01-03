import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './basket.module.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { toggleBasket, delProductIdBasket, delProductBasket, setBasketProducts} from '../../store/slice/BasketSlice'
import axios from 'axios';




const Basket = () => {
	const dispatch =useDispatch()
	const basketStoreId = useSelector((store) => store.basketReducer)

	const initBasket = async () => {
		const resp = await axios.post('http://127.0.0.1:5000/api/device/byIds',{
			ids: JSON.parse(localStorage.getItem('basket'))
		})
		dispatch(setBasketProducts(resp.data))
	}
	useEffect(()=>{
		initBasket()
	},[])

	const toggleBasketOpen = (e) => {
		e.stopPropagation()
		dispatch(toggleBasket())
	}

	const removeProductBasket = (e,productId)=>{
		e.stopPropagation()
		dispatch(delProductIdBasket(productId))
		dispatch(delProductBasket(productId))
	}
	

	return (
			<div className={styles.container_basket} onClick={(e)=>toggleBasketOpen(e)}>
				<ShoppingBagIcon style={{fontSize:'30px'}}/>

				<span className={styles.count}>{basketStoreId.basketCount}</span>
				{
					basketStoreId.openBasket ?  
					
					<div className={styles.container_basket_product} >
						<div className={styles.container_basket_header}>
							<span  className={styles.basket_header_span}>Basket</span>
							<button className={styles.basket_header_btn} onClick={(e)=>toggleBasketOpen(e)}><CloseIcon style={{fontSize:'32px'}}/></button>
						</div>
						<div className={styles.container_basket_main}>
							<ul>
								{
										basketStoreId.products.map((product,idx)=>(
										<li key={product.id} className={styles.container_basket_main_product} >

											<img  src={`http://127.0.0.1:5000/${product.img}`} alt={product.name} width='55px' height='55px'/>
											<span >{product.name}</span> 

											<div className={styles.container_basket_main_product_span} >
												<span >{product.price} grn</span>
												<button className={styles.container_basket_main_btn} onClick={(e)=>{removeProductBasket(e,product.id,idx)}}><DeleteForeverIcon/></button>
											</div>
										</li>))
								}
							</ul>
							
						</div>
						{basketStoreId.products.length > 0 ? 
							<div className={styles.container_basket_footer}>
								<button className={styles.container_basket_main_btn_order} onClick={()=>{console.log('buy all')}}>Payment all</button>
							</div>
						: 
							<div className={styles.container_basket_main_empty} >
								<ShoppingCartIcon style={{fontSize:'100px', color:'rgb(221, 217, 217)'}}/>
								<p>Cart is empty!</p>
							</div>
						}
					</div>
				:<></>
				}
			</div>
	)
}

export default Basket