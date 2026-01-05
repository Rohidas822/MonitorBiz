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
import Expenses from './components/dashboard/Accounts/Expenses';
import CreateCustomer from './components/dashboard/Billing/CreateCustomer';
import ViewCustomer from './components/dashboard/Billing/ViewCustomer';
import EditCustomer from './components/dashboard/Billing/EditCustomer';
import NewCommodity from './components/dashboard/Billing/NewCommodity';
import ViewCommodity from './components/dashboard/Billing/ViewCommodity';
import EditCommodity from './components/dashboard/Billing/EditCommodity';
import CreateQuote from './components/dashboard/Billing/CreateQuote';
import CreateInvoice from './components/dashboard/Billing/CreateInvoice';
import Team from './components/dashboard/Management/Team';
import BusinessProfile from './components/dashboard/Management/BusinessProfile';
import Reports from './components/dashboard/Management/Reports';
import AgingReport from './components/dashboard/Management/AgingReport';
import ActivityLog from './components/dashboard/Management/ActivityLog';
import Performance from './components/dashboard/Management/Performance';
import CreateExpense from './components/dashboard/Accounts/CreateExpense';
import ViewQuote from './components/dashboard/Billing/ViewQuote';
import ViewInvoice from './components/dashboard/Billing/ViewInvoice';
import EditInvoice from './components/dashboard/Billing/EditInvoice';
import ViewExpense from './components/dashboard/Accounts/ViewExpense';
import EditExpense from './components/dashboard/Accounts/EditExpense';

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

        {/* Billing Section */}
        <Route path="billing/customer" element={<Customer />} />
        <Route path="billing/customer/create" element={<CreateCustomer/>} />
        <Route path="billing/customer/view/:id" element={<ViewCustomer />} />
        <Route path="billing/customer/edit/:id" element={<EditCustomer />} />
        <Route path="billing/commodity" element={<Commodity />} />
        <Route path="billing/commodity/new" element={<NewCommodity/>} />
        <Route path="billing/commodity/view/:id" element={<ViewCommodity />} />
        <Route path='billing/commodity/edit/:id' element={<EditCommodity/>} />
        <Route path="billing/quote" element={<Quote />} />
        <Route path="billing/quote/new" element={<CreateQuote />} />
       <Route path="billing/quote/view/:id" element={<ViewQuote />} />
        <Route path="billing/invoice" element={<Invoice />} />
        <Route path="billing/invoice/new" element={<CreateInvoice />} />
        <Route path="billing/invoice/view/:id" element={<ViewInvoice />} />
        <Route path="billing/invoice/edit/:id" element={<EditInvoice />} />
        
        {/* Management Section */}
        <Route path="management/team" element={<Team/>} />
        <Route path="management/business" element={<BusinessProfile/>} />
        <Route path="management/reports" element={<Reports/>} />
        <Route path="management/aging-report" element={<AgingReport/>} />
        <Route path="management/activity-log" element={<ActivityLog/>} />
        <Route path='management/performance' element={<Performance/>} />

        {/* Accounts Section */}
        <Route path="accounts/expenses" element={<Expenses />} />
        <Route path="accounts/expenses/new" element={<CreateExpense />} />
        <Route path='accounts/expenses/view/:id' element={<ViewExpense />} />
        <Route path='accounts/expenses/edit/:id' element={<EditExpense />} />
      </Route>

      {/* Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
    
  );
} 
export default App;