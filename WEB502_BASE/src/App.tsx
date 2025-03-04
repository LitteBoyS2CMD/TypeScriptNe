import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List'
import Add from './pages/Add'
import Update from './pages/Update'
import Register from './pages/Register'
import Login from './pages/Login'
import Layout from './pages/Layout'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/students' element={<List/>}/>
        <Route path='/students/add' element={<Add/>}/>
        <Route path='/students/update/:id' element={<Update/>}/>
      </Route>
    </Routes>
      <Toaster/>
    </>
  )
}

export default App
