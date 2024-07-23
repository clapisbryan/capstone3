import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserProvider } from './hooks/UserContext';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch/NoMatch';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Logout from './pages/Logout/Logout';

const App = () => {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
  };

  useEffect(() => {
    fetch('http://localhost:4000/users/details', {
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
