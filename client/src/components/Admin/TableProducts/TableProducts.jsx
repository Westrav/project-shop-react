import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './tableProducts.module.css'
import { deleteProduct } from '../../../store/slice/ProductsSlice'
import { useNavigate } from 'react-router-dom'

const TableProducts = ({ products, brands, types }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function getNameBrand(brandId) {
        const brand = brands.find(brand => brand.id == brandId)
        if (brand) {
            return brand.name
        }
        return ''
    }
    function getNameType(typeId) {
        const type = types.find(type => type.id == typeId)
        if (type) {
            return type.name
        }
        return ''
    }
    if (products.rows) {
        return (
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Type</th>
                            <th>Info</th>
                            <th>Image</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.rows.map((product, idx) => (
                                <tr key={product.id} onClick={() => navigate(`/admin/products/change/${product.id}`)}>
                                    <td>{idx + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{getNameBrand(product.brandId)}</td>
                                    <td>{getNameType(product.typeId)}</td>
                                    <td>
                                        {
                                            product.info ?
                                            product.info.map((itemInfo) => (<div>titel: {itemInfo.title}, description:{itemInfo.description}</div>))
                                            :
                                            '1'
                                        }
                                    </td>
                                    <td><img src={`http://127.0.0.1:5000/${product.img}`} /></td>
                                    <td><button onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(deleteProduct(product.id))
                                        }
                                    }>Remove product</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableProducts