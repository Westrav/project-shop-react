import React from 'react'
import styles from './selectSortPrice.module.css'


const SelectSortPrice = ({selectControlers, sortedProductsPrice}) => {

  return (
    <div className={styles.container}>
        <select  onChange={(e) => sortedProductsPrice(e.target.value)} className={styles.select}>
			{
				selectControlers.map(controller =>
					<option value={controller.value} key={controller.value}>
						{controller.text}
					</option>)
			}
		</select>
    </div>
  )
}

export default SelectSortPrice