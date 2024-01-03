import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usePagination from '../../Hooks/usePagination'
import { loadProducts } from '../../store/slice/ProductsSlice'
import { loadBrands } from '../../store/slice/BrandsSlice'
import { loadTypes } from '../../store/slice/TypesSlice'
import { Alert, Snackbar } from '@mui/material';

import styles from './products.module.css'
import FilterPanel from '../../components/User/FilterPanel/FilterPanel'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'

import { addBasket, addProducts } from '../../store/slice/BasketSlice'
import Order from '../../components/Order/Order'


const Products = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const products = useSelector((store) => store.productsReducer.products)
	const { brands } = useSelector((store) => store.brandsReducer)
	const { types } = useSelector((store) => store.typesReducer)
	const user = useSelector((store) => store.userReducer)

	const [visibalProduct, setVisibalProduct] = useState([])
	const [alert, setAlert] = useState(false)
	const [buttons,contrlPag, page, limit, setCountItems] = usePagination(1, 6)
	
	useEffect(()=>{
		setCountItems(products.count)
	},[products])
	
	useEffect(() => {
		if (page && limit) {
			dispatch(loadProducts({page:page.get(),limit:limit.get()}))
		}
	}, [page.get(), limit.get()])

	useEffect(()=>{
		dispatch(loadBrands())
		dispatch(loadTypes())
	},[])
	
	
	function getNameType(typesId) {
		const type = types.find(type => type.id === typesId)
		if (type) {
			return type.name
		}
		return ''
	}
	function getNameBrand(brandId) {
		const brand = brands.find(brand => brand.id === brandId)
		if (brand) {
			return brand.name
		}
		return ''
	}

	const addBasketProduct = (e, productId, product) => {
		e.stopPropagation()
		dispatch(addProducts(product))
		dispatch(addBasket(productId))
		setAlert(true)
	}


	const [openBuyModal, setOpenBuyModal] = useState(false)
	const [productByBuy, setProductBuy] = useState(null) 
	
	return (
		<div className={styles.container}>
			<div>
				<FilterPanel products={products} types={types} brands={brands} setVisibalProduct={setVisibalProduct} />
			</div>
			<div>
				<h4>Products</h4>
				<div className={styles.container_cards}>
					{
						visibalProduct.map(product => 
							<div className={styles.container_cards_product} 
								key={product.id} >
								<div className={styles.container_image}>
									<Link to={`/change/${product.id}`}><img src={`http://127.0.0.1:5000/${product.img}`} width='30px'/></Link>
								</div>

								<div className={styles.container_card_main}>
									<div className={styles.container_text}>
										<Link to={`/change/${product.id}`}><span>{getNameType(product.typeId)}</span> <span>{getNameBrand(product.brandId)}</span> {product.name}</Link>
									</div>
								
									<div className={styles.container_price_btn}>
											<button className={styles.btn_buy} onClick={()=>{
												setProductBuy(product);
												setOpenBuyModal(true);
											}}>Buy</button>
											<span className={styles.price}>{product.price} grn</span>  
									</div>

									<div className={styles.container_btn}>
										<button className={styles.container_btn_basket} onClick={(e)=>addBasketProduct(e,product.id,product)}>Basket</button>
									</div>
								</div>
							</div>
						)
					}
				</div>
			</div>
			<div className={styles.pagination}>
				<Pagination 
					buttons = {buttons}
					page = {page}
					contrlPag = {contrlPag}
				/>
			</div>
			<Snackbar open={alert} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={1500} onClose={()=>setAlert(false)}>
				<Alert severity='success' onClose={()=>setAlert(false)}>Successfully added !</Alert>
			</Snackbar>
			<Order user={user} product={productByBuy} close={()=>setOpenBuyModal(false)} open={openBuyModal}/>
		</div>
	)
}

export default Products