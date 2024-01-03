import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../store/slice/ProductsSlice'
import SelectBrandForm from '../SelectBrandForm/SelectBrandForm'
import styles from './formAddProducts.module.css'

const FormAddProducts = ({ types, brands }) => {

    const dispatch = useDispatch()

    const [product, setProduct] = useState({
        name: '',
        price: '',
        brand: '',
        type: '',
        info: [],
        img: {}
    })
    const [info, setInfo] = useState({title:'',description:''})

    useEffect(() => {
        if (brands.length > 0 && types.length > 0) {
            setProduct({ ...product, brand: brands[0].id, type: types[0].id })
        }
    }, [brands, types])
    const addInfo = (e) => {
        e.preventDefault()
        const infoList = [...product.info]
        const newInfo = { title: info.title, description: info.description }
        infoList.push(newInfo)
        setProduct({...product, info: infoList})
        setInfo({ title: '', description: '' })
    }
    const submit = (e) => {
        e.preventDefault();
        dispatch(addProduct(product))
        setProduct({
            name: '',
            price: '',
            brand: brands[0].id,
            type: types[0].id,
            info: [],
            img: {}
        })
    }

    const setBrand = (idBrand) => setProduct({ ...product, brand: idBrand })
    const setType = (idType) => setProduct({ ...product, type: idType })

    return (
        <div className={styles.main}>
            <form onSubmit={submit} className={styles.form}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id='name' placeholder='Name' value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="text" id='price' placeholder='Price' value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="brandId">Brand:</label>
                    <SelectBrandForm setter={setBrand} elements={brands} />
                </div>
                <div>
                    <label htmlFor="typeId">Type:</label>
                    <SelectBrandForm setter={setType} elements={types} />
                </div>
                <div className={styles.info}>
                    <label htmlFor="info">Info:</label>
                    <input type="text" id='info' placeholder='title' value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} />
                    <input type="text" id='info' placeholder='description' value={info.description} onChange={(e) => setInfo({ ...info, description: e.target.value })} />
                    <button onClick={addInfo}>add info</button>
                </div>
                <div>
                    {
                        product.info.map((item) => (
                            <div key={item.title}>{item.title}:{item.description}</div>
                        ))
                    } 
                </div>
                 
                <div className={styles.img}>
                    <label htmlFor="img">Image</label>
                    <input type="file" id='img' className={styles.btnImg} onChange={(e) => setProduct({ ...product, img: e.target.files[0] })} />
                </div>
                <button>add product</button>
            </form>
           
        </div>
    )
}

export default FormAddProducts