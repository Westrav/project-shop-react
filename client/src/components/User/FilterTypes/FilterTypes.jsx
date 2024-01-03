import React, { useEffect, useState } from 'react'
import styles from './filterTypes.module.css'

const FilterTypes = ({types ,products, setVisibalProduct,typeSortProduct}) => {

	const [typesBox, setTypesBox] = useState({})

    useEffect(() => {
		if (types) {
			const typesGenerate = {}
			types.forEach(type => typesGenerate[type.name] = false)
			setTypesBox(typesGenerate)
		}
	}, [types])

    const clickBox = (type) => {
		const tmp = {} 
		tmp[type] = !typesBox[type]
		setTypesBox({ ...typesBox, ...tmp }) 
	}
    useEffect(() => {
		const activeIds = []
		Object.entries(typesBox).forEach(([type, value]) => {
			if (value == true) {
				const t = types.find(t => t.name == type)
				if (t) {
					activeIds.push(t.id)
				}
			}
		})
	
		let sortedProducts = [...products.rows]
		
		if (typeSortProduct === 'ascending price') {
			sortedProducts.sort((productOne, productTwo) => productOne.price - productTwo.price)
		}
		if (typeSortProduct === 'descending price') {
			sortedProducts.sort((productOne, productTwo) => productTwo.price - productOne.price)
		}
		if (activeIds.length > 0) {
			sortedProducts = sortedProducts.filter(product => activeIds.includes(product.typeId))
		}
		setVisibalProduct(sortedProducts)

	}, [typesBox, typeSortProduct, products.rows, types ])
  return (
    <div className={styles.container_type}>
        <h4>Types</h4>
        {
            Object.entries(typesBox).map(([type, value]) => {
                return (
                    <div className={styles.container_type_checkbox} key={type}>
                        <label htmlFor={type}>{type}</label>
                        <input id={type} type='checkbox' onChange={() => clickBox(type)} checked={typesBox[type]}/>
                    </div>
                )
            })
        }
    </div>

  )
}

export default FilterTypes