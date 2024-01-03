import React from 'react'

const FormAddUser = () => {

    const submit = () => {
        e.preventDefault()
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" placeholder='email' />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="text" placeholder='passsword' />
                </div>
                <button>add user</button>
            </form>
        </div>
    )
}

export default FormAddUser