import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserProvider } from './hooks/UserContext';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import NoMatch from './pages/NoMatch/NoMatch';
import Products from './pages/Products/Products';
import ProductView from './pages/Products/ProductView';
import Register from './pages/Register/Register';

const App = () => {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
  };

  useEffect(() => {
    fetch('http://localhost:4006/b6/users/details', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        console.log(typeof data !== undefined)
        if (typeof data !== undefined) {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      })
  }, [])

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductView />} />
              <Route path="/cart-view" element={<Cart />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/logout" element={<Logout />}/>
              <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
