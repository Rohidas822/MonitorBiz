// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import DashboardHome from './components/dashboard/DashboardHome';
import Customer from './components/dashboard/Billing/Customer';
import Invoice from './components/dashboard/Billing/Invoice';
import Quote from './components/dashboard/Billing/Quote';
import ProtectedRoute from './components/layout/ProtectedRoutes';
import Commodity from './components/dashboard/Billing/Commodity';
import Expenses from './components/dashboard/Billing/Expenses';
import CreateCustomer from './components/dashboard/Billing/CreateCustomer';
import ViewCustomer from './components/dashboard/Billing/ViewCustomer';
import EditCustomer from './components/dashboard/Billing/EditCustomer';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="billing/customer" element={<Customer />} />
        <Route path="billing/customer/create" element={<CreateCustomer/>} />
        <Route path="billing/customer/view/:id" element={<ViewCustomer />} />
        <Route path="billing/customer/edit/:id" element={<EditCustomer />} />
        <Route path="billing/commodity" element={<Commodity />} />
        <Route path="billing/quote" element={<Quote />} />
        <Route path="billing/invoice" element={<Invoice />} />
        <Route path='billing/expenses' element={<Expenses/>} />
      </Route>

      {/* Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
    
  );
}

export default App;