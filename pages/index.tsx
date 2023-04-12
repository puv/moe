import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

import Drawer from './(partials)/Drawer';
import Footer from './(partials)/Footer';
import Notifications from './(partials)/Notifications';
import Auth from './(web)/auth/index';

import Home from './(web)/(others)/Home';
// import User from './(web)/user/[username]/page';


export default function Application() {
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
        <section className='px-5 h-screen bg-base-100'>
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