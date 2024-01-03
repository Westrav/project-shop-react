import React from 'react'
import styles from './pagination.module.css'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Pagination = ({buttons,page, contrlPag}) => {

    const pageChange = (p) => {
		page.set(p)
	}

	const nextPage = ()=>{
		page.set(page.get() + 1)
	}

	const prevPage = ()=>{
		page.set(page.get() - 1)
	}

    if (contrlPag) {
        return (
            <div>
                <div className={styles.pagination}>
                    {	
                        contrlPag.backPage ?
                        <button className={styles.btn_contrl} onClick={prevPage}><NavigateBeforeIcon/></button>:<></>
                    }	
                    {
                        buttons.map(btn => <button className={page.get() == btn ? styles.active : styles.btn} key={btn} onClick={()=>pageChange(btn)}>{btn}</button>) 
                    }
                    {
                        contrlPag.nextPage ?
                        <button className={styles.btn_contrl} onClick={nextPage}><NavigateNextIcon style={{fontSize:'22px'}} /></button>:<></>
                    }
                </div>
            </div>
        )
    } else {
        return ('')
    }


}

export default Pagination
