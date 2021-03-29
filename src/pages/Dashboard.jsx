import React from 'react';
import './Dashboard.css';
import FiltersSidebar from './dashboard/sidebars/FiltersSidebar';
import CarsGrid from './dashboard/grids/CarsGrid';

function Dashboard() {
  return (
    <main className="c-dashboard-container">
      <FiltersSidebar />
      <CarsGrid />
    </main>
  );
}

export default Dashboard;
