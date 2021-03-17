import React from 'react';
import './Dashboard.css';
import FiltersSidebar from './sidebars/FiltersSidebar';
import CarsGrid from './grids/CarsGrid';

function Dashboard() {
  return (
    <main className="c-dashboard-container">
      <FiltersSidebar />
      <CarsGrid />
    </main>
  );
}

export default Dashboard;
