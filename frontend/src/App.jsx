import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pagine/Login';
import Register from './pagine/Register';
import TaskList from './componenti/TaskList';
import PrivateRoute from './componenti/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column bg-light">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}> {/* PrivateRoute as a parent route */}
            <Route path="/" element={<TaskList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
