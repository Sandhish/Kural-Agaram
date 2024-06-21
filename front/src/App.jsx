import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Update from './components/Update/update';
import Create from './components/Create/create';
import LandingPage from './components/LandingPage/landingPage';
import Thirukkurals from './components/KuralList/kuralList';
import Register from './components/Register/register';
import Login from './components/Login/login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './components/ProtectedRoute/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/kuralList" element={<Thirukkurals />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
