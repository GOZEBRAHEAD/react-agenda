import React from 'react';
import { useState } from 'react';

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
                  <option key={i} value={actualContact}>{actualContact.name}</option>
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
          
          <label htmlFor="appointmentImportance" onChange={handleChangeImportance}>Importance:</label>
          <select name="appointmentImportance">
            <option value="Low" key={-1} defaultValue="selected">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input type="submit" value="Add appointment" />
          
        </form>
      </section>

      <section className='content__see-appointments'>
        <h3>Your appointments:</h3>

        <div>
        {
          appointments.map((actualAppointment, i) => {
          
          return <div key={i}>
              <p>Title: {actualAppointment.title}</p> 
              <p>Contact: {actualAppointment.contact}</p>
              <p>Date: {actualAppointment.date}</p>
              <p>Importance: {actualAppointment.importance}</p>
              <br />
            </div>
          })
        }
        </div>
      </section>

    </>
    
  );
}

export default AppointmentContainer;