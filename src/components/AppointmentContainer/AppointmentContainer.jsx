import React from 'react';
import { useState } from 'react';
import { Route, Link } from 'react-router-dom';

import './AppointmentContainer.css';

const AppointmentContainer = ({ contacts, appointments, addAppointments }) => {

  const [title, setTitle] = useState('');
  const [contact, setContact] = useState(contacts.length > 0 ? contacts[0].name : '');
  const [date, setDate] = useState('');
  const [importance, setImportance] = useState('');

  const handleSubmitAppointment = (e) => {
    e.preventDefault();

    addAppointments(title, contact, date, importance);

    setTitle('');
    setContact('');
    setDate('');
    setImportance('');
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChangeContact = (e) => {
    setContact(e.target.value);
  }

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  }

  const handleChangeImportance = (e) => {
    setImportance(e.target.value);
  }

  return (
    
    <>

      <h2>Appointments</h2>

      <section className='content__create-appointments'>
        <form onSubmit={handleSubmitAppointment}>

          <label htmlFor="appointmentTitle">Title:</label>
          <input
            type="text"
            min="2"
            max="25"
            placeholder="Title"
            name="appointmentTitle"
            value={title}
            onChange={handleChangeTitle}
            required
          />

          <label htmlFor="appointmentContact">Contact:</label>
          <select name="appointmentContact" onChange={handleChangeContact}>
            <option value="-" key={-1} defaultValue="selected">No contact selected</option>
            {
              contacts.map((actualContact, i) => {

                return (
                  <option key={i} value={actualContact.name}>{actualContact.name}</option>
                )
              })
            }
          </select>

          <label htmlFor="appointmentDate">Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={date}
            onChange={handleChangeDate}
            required
          />
          
          <label htmlFor="appointmentImportance">Importance:</label>
          <select name="appointmentImportance" onChange={handleChangeImportance}>
            <option value="Low" key={-1} defaultValue="selected">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input type="submit" value="Add appointment" />
          
        </form>
      </section>

      <section className='content__see-appointments'>
        <h3>Your appointments:</h3>

        <div className='info__wrapper'>

          <Route>            
            {
              appointments.map((actualAppointment, i) => {
              
                return (
                  <Link key={i} to={`/appointments/${actualAppointment.title}`}>
                    <div key={i} className='info__card'>
                      
                      <p>{actualAppointment.title}</p>

                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-big-right-line" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-6v-6h6z"></path>
                        <path d="M3 9v6"></path>
                      </svg>
                    </div>
                  </Link>
                )
              })
            }
          </Route>

        </div>
      </section>

    </>
    
  );
}

export default AppointmentContainer;