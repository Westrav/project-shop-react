import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addType, deleteType, loadTypes } from '../../store/slice/TypesSlice'
import FormAdd from '../../components/Admin/FormAddBrand/FormAdd'
import styles from './types.module.css'


const Types = () => {

	const dispatch = useDispatch()
	const {types, stateLoading} = useSelector((store) => store.typesReducer)

	useEffect(() => {
		dispatch(loadTypes())
	},[])

	if(stateLoading.load){
		return <h2>Идет загрузка ....</h2>
	}
	return (
		<div className={styles.types}>
			<FormAdd type={"Type"} action={addType}/>
			<h4>Types list:</h4>
			{
				types.map(type => <p key={type.id}>{type.name} 
				<button onClick={()=>dispatch(deleteType(type.id))}>remove type</button></p> )
			}
			<h2>{stateLoading.error}</h2>
		</div>
	)
}

export default Types