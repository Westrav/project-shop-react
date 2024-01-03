import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Profile from './pages/Profile/Profile'
import PageNotFound from './pages/PageNotFound/PageNotFound' 
import LayoutAdmin from './components/LayoutAdmin/LayoutAdmin'
import ProductsAdmin from './pagesAdmin/Products/ProductsAdmin'
import Brands from './pagesAdmin/Brands/Brands'
import Types from './pagesAdmin/Types/Types'
import Users from './pagesAdmin/Users/Users'
import Authorization from './pagesAdmin/Authorization/Authorization'
import Registration from './pagesAdmin/Registration/Registration'
import LayoutAuth from './components/LayoutAuth/LayoutAuth'
import InfoProduct from './pagesAdmin/InfoProduct/InfoProduct'
import { useDispatch, useSelector } from 'react-redux'
import { authAndRefresh } from './store/slice/UserSlice'
import ProductOne from './pages/ProductOne/ProductOne'
import HomeAdmin from './pagesAdmin/HomeAdmin/HomeAdmin'

// test project
const App = () => {

	const dispatch = useDispatch()
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(authAndRefresh())
		}
	})

	const user = useSelector((store) => store.userReducer)
	// console.log(user)

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route path='products' element={<Products />} />
				<Route path='profile' element={<Profile />} />
				<Route path='/change/:id' element={<ProductOne />} />
			</Route>
			<Route path='/auth' element={<LayoutAuth />}>
				<Route path='authorization' element={<Authorization />} />
				<Route path='registration' element={<Registration />} />
			</Route>
			{user.role == 'ADMIN' ? 
				<Route path='/admin' element={<LayoutAdmin />}>
					<Route path='homeAdmin' element={<HomeAdmin />} />
					<Route path='products' element={<ProductsAdmin />} />
					<Route path='brands' element={<Brands />} />
					<Route path='types' element={<Types />} />
					<Route path='users' element={<Users />} />
					<Route path='/admin/products/change/:id' element={<InfoProduct />} />
				</Route>
				: 
				<></>
			}
			<Route path='*' element={<PageNotFound />}/>
		</Routes>
	)
}

export default App	