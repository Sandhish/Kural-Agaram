import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main/main'
import Update from './components/Update/update'
import Create from './components/Create/create'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} ></Route>
          <Route path='/create' element={<Create />} ></Route>
          <Route path='/update/:id' element={<Update />} ></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
