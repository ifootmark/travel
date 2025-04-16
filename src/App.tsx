import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AllPlans from './pages/Plans/AllPlans';
import CompletedPlans from './pages/Plans/CompletedPlans';
import InProgressPlans from './pages/Plans/InProgressPlans';
import NotStartedPlans from './pages/Plans/NotStartedPlans';
import PlanDetail from './pages/Plans/PlanDetail';
import NewPlan from './pages/Plans/NewPlan';
import Profile from './pages/Profile';
import { observer } from 'mobx-react-lite';
import { authStore } from './stores/authStore';
import AIChat from './components/AIChat';

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout>
        <Sidebar />
        <Content className="p-6 bg-gray-50">
          {children}
          <AIChat />
        </Content>
      </Layout>
    </Layout>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return authStore.isAuthenticated ? (
    <MainLayout>{children}</MainLayout>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/plans"
            element={
              <PrivateRoute>
                <AllPlans />
              </PrivateRoute>
            }
          />
          <Route
            path="/plans/new"
            element={
              <PrivateRoute>
                <NewPlan />
              </PrivateRoute>
            }
          />
          <Route
            path="/plans/completed"
            element={
              <PrivateRoute>
                <CompletedPlans />
              </PrivateRoute>
            }
          />
          <Route
            path="/plans/in-progress"
            element={
              <PrivateRoute>
                <InProgressPlans />
              </PrivateRoute>
            }
          />
          <Route
            path="/plans/not-started"
            element={
              <PrivateRoute>
                <NotStartedPlans />
              </PrivateRoute>
            }
          />
          <Route
            path="/plans/:id"
            element={
              <PrivateRoute>
                <PlanDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default observer(App);