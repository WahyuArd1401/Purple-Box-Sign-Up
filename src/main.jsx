import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { FormDataProvider } from './FormDataContext';
import FormDataScreen from './FormDataScreen';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <FormDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/form-data" element={<FormDataScreen />} />
        </Routes>
      </Router>
    </FormDataProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);
