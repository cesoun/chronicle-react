import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './partials/Navbar';
import Footer from './partials/Footer';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />
      {/* Main */}
      <main className="flex flex-col md:flex-row h-screen p-10 font-mono">
        {/* Gutter */}
        <div className="p-4 md:p-8 lg:p-10"></div>
        <section className="h-full w-full mx-auto flex p-8">
          {/* Routes Outlet */}
          <Routes>
            <Route
              path={'/'}
              element={<Home />}
            />
          </Routes>
        </section>
        {/* Gutter */}
        <div className="p-4 md:p-8 lg:p-10"></div>
      </main>
      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
