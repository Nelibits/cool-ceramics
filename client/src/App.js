import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Store from './components/Store';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';
import Auth from './components/Auth';
import Manage from './components/Manage';
import EditProduct from './components/EditProduct'; 
import AddProduct from './components/AddProduct';

import './App.css';

// ProtectedRoute component to restrict access
const ProtectedRoute = ({ isAdminConnected, children }) => {
  return isAdminConnected ? children : <Navigate to="/auth" />;
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAdminConnected, setIsAdminConnected] = useState(false);

  // Handle admin disconnect
  const handleAdminDisconnect = async () => {
    try {
      await fetch('/api/disconnectAdmin');
      setIsAdminConnected(false); // Disconnect admin state
    } catch (error) {
      console.error('Failed to disconnect admin:', error);
    }
  };

    return (
      <BrowserRouter>
        <Header cart={cart} isAdminConnected={isAdminConnected} onAdminDisconnect={handleAdminDisconnect}/>

        <main className="flex-shrink-0">
          <div class Name="container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/store" element={<Store cart={cart} setCart={setCart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
              <Route path="/thank-you" element={<ThankYou/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/auth" element={<Auth setIsAdminConnected={setIsAdminConnected} />} />
              <Route
                path="/manage"
                element={
                  <ProtectedRoute isAdminConnected={isAdminConnected}>
                    <Manage />
                  </ProtectedRoute>
                }
              />
              <Route path="/manage/edit/:id" element={
                  <ProtectedRoute isAdminConnected={isAdminConnected}>
                    <EditProduct />
                  </ProtectedRoute>
                } />
                <Route path="/manage/add" element={
                  <ProtectedRoute isAdminConnected={isAdminConnected}>
                    <AddProduct />
                  </ProtectedRoute>
                } />
              <Route path="*" element={<NotFound/>} />

              
            </Routes>
          </div>
        </main>

        <Footer/>
      </BrowserRouter>
    )
}

export default App;