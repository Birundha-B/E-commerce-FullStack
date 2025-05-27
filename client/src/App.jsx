import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
