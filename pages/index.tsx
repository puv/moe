import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NextLink from 'next/link';

import Drawer from '../app/(partials)/Drawer';
import Footer from '../app/(partials)/Footer';
import Notifications from '../app/(partials)/Notifications';

import Home from '../app/(web)/(others)/Home';
// import User from '../app/(web)/user/[username]/page';


export default function App() {
  return (
    <html lang="en">
      <body>
        <Router>
          <Drawer />
          <main style={{
            marginLeft: 14 + "rem"
          }} className='px-5'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/user" element={<User />} />
              <Route path="/discover" element={<h1>Discover</h1>} />
              <Route path="/schedule" element={<h1>Schedule</h1>} /> */}
            </Routes>
          </main>
          <Footer />
          <Notifications />
        </Router>
      </body>
    </html>
  );
}