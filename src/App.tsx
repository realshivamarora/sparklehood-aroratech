import React from 'react';
import Header from './components/Header';
import IncidentList from './components/IncidentList';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <IncidentList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
