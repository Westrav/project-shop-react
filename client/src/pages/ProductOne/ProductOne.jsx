import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadProduct } from '../../store/slice/ProductSlice'
import { loadTypes } from '../../store/slice/TypesSlice'
import { useParams } from 'react-router-dom'
import { addBasket, addProducts } from '../../store/slice/BasketSlice'

import styles from './productOne.module.css'

const ProductOne = () => {
    const dispatch = useDispatch()

    const {id} = useParams()
	const {product} = useSelector((store)=>store.productReducer)
    const {brands} = useSelector((store)=> store.brandsReducer)
	const {types} = useSelector((store)=>store.typesReducer)

    useEffect(()=>{
		dispatch(loadTypes())
	},[])

    useEffect(() => {
        dispatch(loadProduct(id))
    }, []); 

    function getNameBrand(brandId) {
        const brand = brands.find(brand => brand.id == brandId)
        if (brand) {
            return brand.name
        }
        return ''
    }
    function getNameType(typesId) {
        const type = types.find(type => type.id == typesId)
        if (type) {
            return type.name
        }
        return ''
    }

    const addBasketProduct = (e, productId) => {
		e.stopPropagation()
		dispatch(addProducts(product))
		dispatch(addBasket(productId))

	}
     return (
        <div className={styles.container_product}>
            <div className={styles.container_product_img}>
                <img src={`http://127.0.0.1:5000/${product.img}`} alt={product.name} width={300} />
            </div>
            
            <div className={styles.container_product_main}>
                <div className={styles.container_product_text}>
                    <h1>Name: {product.name}</h1>
                    <ul>
                        <li>Brand: {getNameBrand(product.brandId)}</li>
                        <li>Type: {getNameType(product.typeId)}</li>
                    </ul>
                    <div className={styles.container_product_btn_basket}>
                        <button  onClick={(e)=>addBasketProduct(e,product.id)}>add basket</button>   
                    </div> 
                </div>
                <div className={styles.container_product_price}>
                    <span >{product.price} grn</span>
                </div>
            </div>
            
            <div>
                {
                    product.info ?
                    product.info.map((itemInfo) => (<div>{itemInfo.title}:{itemInfo.description}</div>))
                    :
                    ''
                }
            </div>
        </div>
    )
}

export default ProductOne