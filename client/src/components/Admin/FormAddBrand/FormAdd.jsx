import React, {useState} from 'react'
import styles from './FormAdd.module.css'
import { useDispatch } from 'react-redux'

const FormAdd = ({type,action}) => {
	
	const dispatch = useDispatch()
	const [item, setItem] = useState('')

	const submit = (e) => {
		e.preventDefault()	
		dispatch(action(item))
		setItem('')
	}

	return (
		<div className={styles.main}>
			<form onSubmit={submit} className={styles.form}>
				<div className={styles.form_main}>
					<label htmlFor="addItem">Add {type}</label>
					<input type="text" id="addItem" className={styles.form_input} placeholder={type} value={item} onChange={(e) => setItem(e.target.value)}/>
				</div>
				<button className={styles.form_btn}>add {type}</button>
			</form>
		</div>
	)
}

export default FormAdd