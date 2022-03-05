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

function App() {

  const [contacts, setContacts] = useState(getContactsFromLocalStorage() || []);
  const [appointments, setAppointments] = useState(getAppointmentsFromLocalStorage() || []);

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
              <h1>Welcome to the agenda!</h1>
              <h4>Made by Luciano Nieves</h4>
              <p>Check it out adding some contacts or appointments :)</p>
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
