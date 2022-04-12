import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './partials/Navbar';
import Footer from './partials/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Post from './pages/Post';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />
      {/* Main */}
      <main className="font-mono flex flex-col md:flex-row">
        {/* Gutter */}
        <div className="p-4 md:p-8 lg:p-10"></div>
        <section className="min-h-screen w-full mx-auto justify-center p-8 flex">
          {/* Routes Outlet */}
          <Routes>
            <Route
              path={'/'}
              element={<Home />}
            />
            <Route
              path={'/posts'}
              element={<Posts />}
            />
            <Route
              path={'/post/:id'}
              element={<Post />}
            />
            <Route
              path={'/post/:id/edit'}
              element={<EditPost />}
            />
            <Route
              path={'/post/new'}
              element={<NewPost />}
            />
            <Route
              path={'/login'}
              element={<Login />}
            />
            <Route
              path={'/signup'}
              element={<SignUp />}
            />
            <Route
              path={'/profile/:username'}
              element={<Profile />}
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
