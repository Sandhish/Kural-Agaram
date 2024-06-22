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
import AdminPage from './components/AdminPage/adminPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/kuralList" element={<Thirukkurals />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} adminOnly />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
