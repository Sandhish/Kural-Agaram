import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home'
import Update from './components/Update/update'
import Create from './components/Create/create'
import LandingPage from './components/LandingPage/landingPage';
import Thirukkurals from './components/KuralList/kuralList';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/kuralList' element={<Thirukkurals />} ></Route>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/create' element={<Create />} ></Route>
          <Route path='/update/:id' element={<Update />} ></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
