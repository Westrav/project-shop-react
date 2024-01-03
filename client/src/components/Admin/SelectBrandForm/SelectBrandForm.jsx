import React, { useState } from 'react'
import styles from './selectForm.module.css'


const SelectBrandForm = ({setter, elements}) => {

  return (
        <select onChange={(e)=>setter(e.target.value)} className={styles.select}>
            {
                elements.map(option => <option key={option.id} value={option.id}>{option.name}</option>)
            }
        </select>
    )
}

export default SelectBrandForm
