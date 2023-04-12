import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

import Drawer from '../app/(partials)/Drawer';
import Footer from '../app/(partials)/Footer';
import Notifications from '../app/(partials)/Notifications';

import Home from '../app/(web)/(others)/Home';
// import User from '../app/(web)/user/[username]/page';


export default function App() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <Router>
      <Drawer
        open={open}
        setOpen={setOpen}
        submenuOpen={submenuOpen}
        setSubmenuOpen={setSubmenuOpen}
      />
      <main className={`${!open && "ml-20"} ${open && "ml-56"} duration-300`}>
        <section className='px-5 h-screen bg-base-200'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/user" element={<User />} />
                <Route path="/discover" element={<h1>Discover</h1>} />
                <Route path="/schedule" element={<h1>Schedule</h1>} /> */}
          </Routes>
        </section>
        <Footer />
      </main>
      <Notifications />
    </Router>
  );
}