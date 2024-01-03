import React, { useEffect, useState, useMemo } from 'react'
import SelectSortPrice from '../SelectSortPrice/SelectSortPrice'

import styles from './filterPanel.module.css'


const FilterPanel = ({products, types,brands, setVisibalProduct}) => {
 
    const [searchText, setSearchText] = useState('')
	const [typesBox, setTypesBox] = useState({})
	const [brandsBox, setBrandsBox] = useState({})

    const [selectControlers, setSelectControlers] = useState([
		{ value: 'default', text: 'default' },
		{ value: 'ascending price', text: 'ascending price' },
		{ value: 'descending price', text: 'descending price' }
	])
	const [typeSortProduct, setTypeSortProduct] = useState('default')
    
    const searchProduct = useMemo(()=>{
        if(searchText.length > 0){
           return products.rows.filter((product) => product.name.startsWith(searchText.toUpperCase()))
        }
         return products.rows        
    },[products.rows, searchText])

    const searchProductSort = useMemo(()=>{
      	let sortedProducts = [...searchProduct]
          if (typeSortProduct === 'default') {
            return sortedProducts;
        }
        if (typeSortProduct === 'ascending price') {
            sortedProducts.sort((productOne, productTwo) => productOne.price - productTwo.price)
        }
        if (typeSortProduct === 'descending price') {
            sortedProducts.sort((productOne, productTwo) => productTwo.price - productOne.price)
        }
        return sortedProducts
    },[searchProduct,typeSortProduct])

    useEffect(() => {
		if (types) {
			const typesGenerate = {}
			types.forEach(type => typesGenerate[type.name] = false)
			setTypesBox(typesGenerate)
		}
	}, [types])
    useEffect(()=>{
            const activeIds = []
            Object.entries(typesBox).forEach(([type, value]) => {
                if (value == true) {
                    const t = types.find(t => t.name == type)
                    if (t) {
                        activeIds.push(t.id)
                    }
                }
            })
            const activeBrandIDs = []
            Object.entries(brandsBox).forEach(([brand ,value])=>{
                console.log(brand)
                if(value== true){
                    const b = brands.find(b =>b.name == brand)
                    if(b){
                        activeBrandIDs.push(b.id)
                    }
                }
            })
            
            
            let filteredProducts = searchProductSort;
            
            if (activeIds.length > 0) {
                filteredProducts = filteredProducts.filter(product => activeIds.includes(product.typeId));
            }
            
            if (activeBrandIDs.length > 0) {
                filteredProducts = filteredProducts.filter(product => activeBrandIDs.includes(product.brandId));
            }
            setVisibalProduct(filteredProducts);
        },[searchProductSort,typesBox, brandsBox])
    const clickBox = (type) => { 
		const tmp = {} 
		tmp[type] = !typesBox[type] 
		setTypesBox({ ...typesBox, ...tmp })
	}
    const clickBrand = (brand)=>{
		const tmp = {}
		tmp[brand] = !brandsBox[brand]
		setBrandsBox({...brandsBox, ...tmp})
	}
    const sortedProductsPrice = (typeSort) => {
		setTypeSortProduct(typeSort)
	}   
    return (
        <div>
            <div className={styles.input_container_search}>
                <input className={styles.input_search}  type="text" placeholder=' Search ...' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
        <div className={styles.container_type_brand} >

                <h4>Types</h4>
            <div className={styles.container_type}>
                {
                    Object.entries(typesBox).map(([type, value]) => {
                        return (
                            <div  className={styles.container_type_checkbox} key={type}>
                                <label htmlFor={type}>{type}</label>
                                <input id={type} type='checkbox' onChange={() => clickBox(type)} checked={typesBox[type]}/>
                            </div>
                        )
                    })
                }
            </div>
                <h4>Brands</h4>
            <div className={styles.container_brand}>
                {
                    brands.map(({ id, name }) => (
                        <div className={styles.container_brand_checkbox} key={name}>
                            <label htmlFor={name}>{name}</label>
                            <input id={name} type='checkbox' onChange={() => clickBrand(name)} checked={brandsBox[name]} />
                        </div>
                    ))
                }
            </div>
        </div>
            <SelectSortPrice selectControlers={selectControlers} sortedProductsPrice={sortedProductsPrice} />
        </div>
    )
}

export default FilterPanel