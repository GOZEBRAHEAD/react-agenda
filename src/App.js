import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  saveContactsInLocalStorage, getContactsFromLocalStorage,
  saveAppointmentsInLocalStorage, getAppointmentsFromLocalStorage
} from './utils/local-storage.js';

import { calculateIdFromArray } from './utils/func_utils.js';

import Contact from './components/Contact/Contact';
import ContactContainer from './components/ContactContainer/ContactContainer';
import AppointmentContainer from './components/AppointmentContainer/AppointmentContainer';
import Appointment from './components/Appointment/Appointment';

import './App.css';

import { ReactComponent as SVG_GITHUB } from './assets/img/github_icon.svg';
import { ReactComponent as SVG_INSTAGRAM } from './assets/img/instagram_icon.svg';
import { ReactComponent as SVG_LINKEDIN } from './assets/img/linkedin_icon.svg';

function App() {

  const [contacts, setContacts] = useState(getContactsFromLocalStorage());
  const [appointments, setAppointments] = useState(getAppointmentsFromLocalStorage());

  useEffect(() => {

    saveContactsInLocalStorage(contacts);
    saveAppointmentsInLocalStorage(appointments);

  }, [contacts, appointments]);

  const addContacts = (name, email, socialType) => {

    const id = calculateIdFromArray(contacts);

    setContacts(prevContacts => [...prevContacts, { id, name, email, socialType } ]);    
  }

  const addAppointments = (title, contact, date, importance) => {

    const id = calculateIdFromArray(appointments);

    setAppointments(prevAppointments => [...prevAppointments, { id, title, contact, date, importance }]);
  }

  return (

    <Router>
    
      <div className="layout">      

        <nav className='layout__navbar'>
          <NavLink exact to='/' activeClassName="active">Agenda</NavLink>
          <NavLink to='/contacts' activeClassName="active">Contacts</NavLink>
          <NavLink to='/appointments' activeClassName="active">Appointments</NavLink>
        </nav>
        
        <div className='layout__content'>

          <Switch>

            <Route exact path='/'>
              <div className='content__hero'>

                <h1>Welcome to the agenda!</h1>
                <h4>Made by Luciano Nieves</h4>
                <p>Check it out adding some contacts or appointments :)</p>

                <div className='hero__socials'>
                  <a href="https://github.com/GOZEBRAHEAD" aria-label="GitHub" target="_blank" rel="noreferrer">
                    <SVG_GITHUB />
                  </a>
                  <a href="https://www.linkedin.com/in/luciano-nieves/" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                    <SVG_LINKEDIN />
                  </a>
                  <a href="https://www.instagram.com/lucho_nieves/" aria-label="Instagram" target="_blank" rel="noreferrer">
                    <SVG_INSTAGRAM />
                  </a>
                </div>

              </div>
            </Route>

            <Route path='/contacts/:id'>
              {
                (contacts.length === 0) ? 
                  <Redirect to='/contacts' />
                  :
                  <Contact contacts={contacts} />
              }
            </Route>

            <Route path='/contacts'>
              <ContactContainer
                contacts={contacts}
                addContacts={addContacts}
                setContacts={setContacts}
              />
            </Route>

            <Route path='/appointments/:id'>
              {
                (appointments.length === 0) ? 
                  <Redirect to='/appointments' />
                  :
                  <Appointment appointments={appointments} />
              }
            </Route>

            <Route path='/appointments'>
              <AppointmentContainer
                contacts={contacts}
                appointments={appointments}
                addAppointments={addAppointments}
                setAppointments={setAppointments}
              />
            </Route>

          </Switch>

        </div>

      </div>

    </Router>
  );
}

export default App;
