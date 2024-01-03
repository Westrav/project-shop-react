import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './order.module.css'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';



const Order = ({user , product, open, close}) => {

	const [quantity, setQuantity] = useState(1)
	const [sumPrice, setSumPrice] = useState(0)
	const [emailFastBuy, setEmailFastBuy] = useState('')

    useEffect(()=>{
        if (product) {
            setSumPrice(product.price)
        }
    },[product])

	const closeOrder = ()=> {
		setQuantity(1)
		setSumPrice(0)
        close()
	}
	
	const plusProduct = () => {
		setQuantity(quantity + 1)
		setSumPrice(product.price * (quantity+1))
		
	}
	
	const minusProduct = () => {
		if(quantity > 1){
			setQuantity(quantity - 1)
			setSumPrice(product.price * (quantity-1))
		}
	}

	const buyProductOnClick = () => {
        console.log(user)
        let textSend = `email: ${emailFastBuy !== '' ? emailFastBuy : user.email}%0A`;
        textSend += `name product: ${product.name}%0A`;
        textSend += `price: ${product.price}%0A`;
        textSend += `quantity: ${quantity}%0A`
        textSend += `all price: ${sumPrice}%0A`;
		if(user.id === -1){
            if(emailFastBuy !== ''){
                axios.post(`https://api.telegram.org/bot6267013752:AAGoWSqGgaTxLKsX2xvTD8fuJ53f0vekwOc/sendMessage?chat_id=596654719&text=${textSend}`)
			}else{
				console.log('error email');
			}
		    setEmailFastBuy('')
        }else{
            axios.post(`https://api.telegram.org/bot6267013752:AAGoWSqGgaTxLKsX2xvTD8fuJ53f0vekwOc/sendMessage?chat_id=596654719&text=${textSend}`)
		    setEmailFastBuy('')
		}
        closeOrder()
	}


    if (open && product) {
        return (
            <div>
                <div className={styles.buyOrder} >
                    <div className={styles.modal }>
                        <div>
                            <div>
                                <div className={styles.container_close_btn}>
                                    <span className={styles.close_btn} onClick={closeOrder}><CloseIcon style={{fontSize:'32px'}}/></span>
                                </div>
                                <div>
                                    <img src={`http://127.0.0.1:5000/${product.img}`} width='150px'/>
                                    <div><h3>{product.name}</h3></div> 
                                    <div>Price: {product.price} <span>grn</span></div> 
                                    <div>Quantity: {quantity}</div>
                                </div>
                                <div className={styles.container_controler_price}>
                                    <button className={styles.container_controler_price_btn} onClick={()=>plusProduct(product.price)}><AddIcon/></button>
                                    <span style={{fontSize:'30px', margin:'5px'}}>{quantity}</span>
                                    <button className={styles.container_controler_price_btn} onClick={()=>minusProduct(product.price)}><RemoveIcon/></button>
                                </div>
                                <div>
                                    <span>All price : {sumPrice} <span>grn</span> </span>
                                </div>
                            </div>       
                        </div>
                        { user.id != -1 ? 
                            <div >
                                <button className={styles.container_btn_fast} onClick={()=>buyProductOnClick()}>buy</button>
                            </div>
                            :
                            <div className={styles.container_input_btn}>
                                <input type="text" placeholder='Email' value={emailFastBuy} onChange={(e)=> setEmailFastBuy(e.target.value)} />
                                <button className={styles.container_btn_fast} onClick={buyProductOnClick} >buy</button>
                            </div>
                        }
                    </div>
                </div>    
            </div>
        )
    } else {
        return <></>
    }
}

export default Order