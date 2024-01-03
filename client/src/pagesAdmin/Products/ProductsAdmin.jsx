import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from '../../store/slice/ProductsSlice'
import { loadBrands } from '../../store/slice/BrandsSlice'
import { loadTypes } from '../../store/slice/TypesSlice'
import FormAddProducts from '../../components/Admin/FormAddProducts/FormAddProducts'
import TableProducts from '../../components/Admin/TableProducts/TableProducts'
import Pagination from '../../components/Pagination/Pagination'
import usePagination from '../../Hooks/usePagination'

import styles from './productsAdmin.module.css'


const ProductsAdmin = () => {

	const dispatch = useDispatch()

	const {products, stateLoading} = useSelector((store)=>store.productsReducer)
	const {brands} = useSelector((store) => store.brandsReducer)
	const {types} = useSelector((store) => store.typesReducer)

	const [buttons, conrlPag, page, limit, setCountItems] = usePagination(1,5)

	useEffect(()=>{
		dispatch(loadBrands())
		dispatch(loadTypes())
	},[])
	useEffect(()=>{ 
		setCountItems(products.count)
	},[products])
	useEffect(()=>{ 
		if(page && limit){
			dispatch(loadProducts({page:page.get(),limit:limit.get()}))
		}
	},[page.get(), limit.get()])



	if(stateLoading.load){
		return <h2>Идет загрузка ....</h2>
	}
	return (
		<div className={styles.content}>
			<h4>Add product</h4>
			<FormAddProducts brands={brands} types={types} />
			<TableProducts products={products} brands={brands} types={types}/>
			<Pagination 
				buttons={buttons}
				contrlPag={conrlPag}
				page={page}
			/>
			<h2>{stateLoading.error}</h2>
		</div>
	)
}

export default ProductsAdmin

