import {Routes, Route} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<HomePage/>}/> 
        <Route path='/about' element = {<About/>}/> 
        <Route path='/register' element = {<Register/>}/> 
        <Route path='/login' element = {<Login/>}/> 
        <Route path='/*' element = {<Pagenotfound/>}/> 
      </Routes>
    </>
  );
}

export default App;
