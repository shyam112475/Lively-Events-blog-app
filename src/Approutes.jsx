import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Authors from './components/Authors'
import Posts from './components/Posts'
import Authordetails from './components/Autherdetails';
import Home from './components/Home';
import Postdetails from './components/Postdetails';
import Footer from './components/Footer';
import CreatePost from './components/Createpost';
import Autherregister from './components/Autherregister';
function Approutes() {
  return (
    <div style={{background:'#ffffff'}}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/author' element={<Authors/>}/>
          <Route path='/authordetails' element={<Authordetails/>}/>
          <Route path='/post' element={<Posts/>}/>
          <Route path='/postdetails' element={<Postdetails/>}/>
          <Route path='/registerauth' element={<Autherregister/>}/>
          <Route path='/createpost' element={<CreatePost/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default Approutes;