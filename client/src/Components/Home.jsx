import React from 'react'
import Create from './Create'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './Nav'
import View from './View'
import Group from './Group'
import Edit from './Edit'

import { Provider } from 'react-redux'
import store from '../store/store'

const Home = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route path='/' element={<View />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/group' element={<Group />} />
                        <Route path='/edit/:id' element={<Edit />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    )
}

export default Home