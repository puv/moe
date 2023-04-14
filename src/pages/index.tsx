import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

import Drawer from '@/components/partials/Drawer';
import Footer from '@/components/partials/Footer';
import Notifications from '@/components/partials/Notifications';
import Auth from '@/components/web/auth/index';

import Home from '@/components/web/others/Home';
// import User from './(web)/user/[username]/page';

import Database from '@/database/db';

async function getServerSideProps() {
  // const db = new Database();

  Database();
  
  return {
    props: {},
  };
}

export default function Application() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  // getServerSideProps();

  return (
    <Router>
      <Drawer
        open={open}
        setOpen={setOpen}
        submenuOpen={submenuOpen}
        setSubmenuOpen={setSubmenuOpen}
      />
      <main className={`${!open && "ml-20"} ${open && "ml-56"} duration-300`}>
        <section className='px-5 min-h-[100vh] grid bg-base-100'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
          </Switch>
        </section>
        <Footer />
      </main>
      <Notifications />
    </Router>
  );
}