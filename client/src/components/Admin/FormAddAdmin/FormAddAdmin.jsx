import React, {  useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'

const FormAddAdmin = () => {
   
	return (
		<div>
			{/* <form onSubmit={submit}>
				<div>
					<label htmlFor="E-Mail">E-Mail</label>
					<input type="text" placeholder='E-Mail' value={admin.email} onChange={(e)=>setAdmin({...admin,email:e.target.value})}/>
				</div>
				<div>
					<label htmlFor="Password">Password</label>
					<input type="text" placeholder='Password' value={admin.password} onChange={(e)=>setAdmin({...admin,password:e.target.value})}/>
				</div>
				<button>add admin</button>
			</form> */}
		</div>
	)
    
}

export default FormAddAdmin




























// const submit = () => {
    //     e.preventDefault()
    // }

    // return (
    //     <div>
    //         <form onSubmit={submit}>
    //             <div>
    //                 <label htmlFor="email">email</label>
    //                 <input type="text" placeholder='email' />
    //             </div>
    //             <div>
    //                 <label htmlFor="password">password</label>
    //                 <input type="text" placeholder='passsword' />
    //             </div>
    //             <button>add user</button>
    //         </form>
    //     </div>
    // )