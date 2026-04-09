import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import LoginForm from './Components/JsFiles/LoginForm';
import RegisterForm from './Components/JsFiles/RegisterForm';
//import Dashboard from './Components/JsFiles/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
    <div className="App">
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />
      </Routes>
    </div>
    </AuthProvider>
    </Router>
  );
}

export default App;
