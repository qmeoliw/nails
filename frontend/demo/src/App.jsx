
import './App.css'
import { Routes, Route } from 'react-router-dom';
import First from './components/first';
import Autor from './components/autor';
import Registor from './components/regist';
import Profile from './components/profile';

function App() {


  return (
    <Routes>
      <Route path='/' element={<First/>}/>
      <Route path='/first/regist' element={<Registor/>}/>
      <Route path='/first/autor' element={<Autor/>}/>
      <Route path='/regist' element={<Registor/>}/>
      <Route path='/autor' element={<Autor/>}/>
      {/* <Route path='/autor/regist' element={<Registor/>}/> */}
      <Route path='profile' element={<Profile/>}/>
      <Route path='/regist/profile' element={<Profile/>}/>
    <Route path='/regist/autor' element={<Autor/>}/>
    <Route path='/first' element={<First/>}/>
    </Routes>
  )
}

export default App
