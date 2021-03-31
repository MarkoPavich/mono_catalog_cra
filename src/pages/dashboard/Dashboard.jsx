import React from 'react';
import './Dashboard.css';
import FiltersSidebar from './components/FiltersSidebar';
import CarsGrid from './components/CarsGrid';

function Dashboard() {
  return (
    <main className="c-dashboard-container">
      <FiltersSidebar />
      <CarsGrid />
    </main>
  );
}

export default Dashboard;
