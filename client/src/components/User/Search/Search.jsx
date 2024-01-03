import React, { useEffect, useState } from 'react'
import styles from './search.module.css'


const Search = ({products, setVisibalProduct , visibalProduct}) => {
    
    const [searchText, setSearchText] = useState('')

    useEffect(()=>{
		if (products) {
		    setVisibalProduct(products.rows)
		}
	},[products])
   

    useEffect(()=>{
		const searchProduct =  visibalProduct.filter(product => product.name.startsWith(searchText))
		setVisibalProduct(searchProduct)
	},[searchText])


    return (
        <div className={styles.input_container}>
            <input className={styles.input_search} type="text" placeholder=' Search ...' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
    )
}

export default Search