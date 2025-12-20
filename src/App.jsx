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
import Payment from './components/dashboard/Billing/Payment';
import EmployeeExpense from './components/dashboard/ExpenseTracking/Employee';
import CompanyClient from './components/dashboard/ExpenseTracking/Company';
import Credit from './components/dashboard/ExpenseTracking/Credit';
import Miscellaneous from './components/dashboard/ExpenseTracking/Miscellaneous';
import Dynamic from './components/dashboard/ExpenseTracking/Dynamic';
import Accounting from './components/dashboard/Accounting'; // Create this component
import ProtectedRoute from './components/layout/ProtectedRoutes';
import Items from './components/dashboard/Billing/Items';

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
        <Route path="billing/quote" element={<Quote />} />
        <Route path="billing/invoice" element={<Invoice />} />
        <Route path="billing/payment" element={<Payment />} />
        <Route path="billing/items" element={<Items/>} />
        <Route path="expense/employee" element={<EmployeeExpense />} />
        <Route path="expense/company" element={<CompanyClient />} />
        <Route path="expense/credit" element={<Credit />} />
        <Route path="expense/miscellaneous" element={<Miscellaneous />} />
        <Route path="expense/dynamic" element={<Dynamic />} />
        <Route path="accounting" element={<Accounting/>} />
        
        
      </Route>

      {/* Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
    
  );
}

export default App;