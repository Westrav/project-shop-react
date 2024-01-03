import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProduct } from '../../store/slice/ProductSlice'
import { loadTypes } from '../../store/slice/TypesSlice'
import { useParams } from 'react-router-dom'


const InfoProduct = () => {
	const dispatch = useDispatch()

    const {id} = useParams()
	const {product} = useSelector((store)=>store.productReducer)

    useEffect(()=>{
		dispatch(loadTypes())
	},[])

    useEffect(() => {
        dispatch(loadProduct(id))
    }, []); 
   
  return (
        <>
            <h2>Info Product</h2>
            {
                <div >
                    <div>Name: {product.name}</div>
                    <div><input type="text" placeholder='name' /></div>
                    <div>Price: {product.price}</div>
                    <div><input type="text" placeholder='price' /></div>
                    <div>Brand: {product.brandId}</div>
                    <div>Type: {product.typeId}</div>
                    {
                        product.info ?
                        product.info.map((itemInfo) => (<div>{itemInfo.title}:{itemInfo.description}</div>))
                        :
                        ''
                    }
                    <div>Image: <img src={`http://127.0.0.1:5000/${product.img}`} width={30} /></div>
                    <button>change product</button>
                </div>
            }
        </>
    )
}

export default InfoProduct 













// <>
    //     
    //     {
    //         
    //         // Object.keys(user).length != 0  ?
    //         <div>
    //     }
    // </>