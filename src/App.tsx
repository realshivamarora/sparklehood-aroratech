import React from 'react';
import './App.css';
import Header from './components/Header';
import IncidentList from './components/IncidentList';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <IncidentList />
      <Footer />
    </div>
  );
}

export default App;
