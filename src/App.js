import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import { useState } from 'react';

import ContactContainer from './components/ContactContainer/ContactContainer';
import AppointmentContainer from './components/AppointmentContainer/AppointmentContainer';

import './App.css';

function App() {

  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const addContacts = (name, email, socialType) => {

    setContacts(prevContacts => [...prevContacts, { name, email, socialType }])
  }

  const addAppointments = (title, contact, date, importance) => {

    setAppointments(prevAppointments => [...prevAppointments, { title, contact, date, importance }])
  }

  return (
    
    <div className="layout">

      <Router>

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

            <Route path='/contacts'>
              <ContactContainer
                contacts={contacts}
                addContacts={addContacts}
              />
            </Route>

            <Route path='/appointments'>
              <AppointmentContainer
                contacts={contacts}
                appointments={appointments}
                addAppointments={addAppointments}
              />
            </Route>

          </Switch>

        </div>

      </Router>

    </div>
  );
}

export default App;
