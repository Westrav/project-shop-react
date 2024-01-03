import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBrand, deleteBrand, loadBrands,} from '../../store/slice/BrandsSlice'
import FormAdd from '../../components/Admin/FormAddBrand/FormAdd'
import styles from './brands.module.css'


const Brands = () => {

	const dispatch = useDispatch()
	const {brands, stateLoading} = useSelector((store) => store.brandsReducer)

	useEffect(() => {
		dispatch(loadBrands())
	}, [])

	if(stateLoading.load){
		return <h2>Идет загрузка ....</h2>
	}
	return (
		<div className={styles.brands} >
			<h4>Add brand</h4>
			<FormAdd type={"Brand"} action={addBrand}/>
			<h4>Brands list:</h4>
			{
				brands.map(brand => <p key={brand.id}>{brand.name}  
					<button onClick={()=>dispatch(deleteBrand(brand.id))}>remove brand</button></p> 
				)
			}
			<h2>{stateLoading.error}</h2>
		</div>
	)
}

export default Brands