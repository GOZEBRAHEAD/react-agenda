import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';

import {
  verifyDuplicateAppointment,
  calculateIdFromArray
} from '../../utils/func_utils.js';

import './AppointmentContainer.css';

const AppointmentContainer = ({ contacts, appointments, addAppointments, setAppointments }) => {

  const [title, setTitle] = useState('');
  const [contact, setContact] = useState(contacts.length > 0 ? contacts[0].name : '');
  const [date, setDate] = useState('');
  const [importance, setImportance] = useState('');
  const [duplicate, setDuplicate] = useState(false);

  const history = useHistory();  

  useEffect(() => {

    setDuplicate(verifyDuplicateAppointment(appointments, title));

  }, [appointments, title]);

  const handleSubmitAppointment = (e) => {
    e.preventDefault();

    if (!contact || !importance || duplicate) {
      return;
    }

    addAppointments(title, contact, date, importance);

    setTitle('');
    setContact('');
    setDate('');
    setImportance('');

    const newIdAppointment = calculateIdFromArray(appointments);

    if (newIdAppointment) {
      history.push(`/appointments/${newIdAppointment}`);
    }
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

  const handleDelete = (id) => {
    
    const updatedAppointments = appointments.filter(actualAp => actualAp.id !== id);

    setAppointments(updatedAppointments);
  }

  return (
    
    <>

      <h2>Appointments { duplicate && "- duplicated appointment" }</h2>

      <div className='content__wrapper'>

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
              <option value="" defaultValue="selected">No contact selected</option>
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
              <option value="" defaultValue="selected">-</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input className='submit-button' type="submit" value="Add appointment" />
            
          </form>
        </section>

        <section className='content__see-appointments'>
          <h3>Your appointments:</h3>

          <div className='info__wrapper'>

            <Route>
            {
              appointments.map(actualAppointment => {
              
                return (
                  <div key={actualAppointment.id} className='info__card'>
                    
                    <Link to={`/appointments/${actualAppointment.id}`}>
                      <div className='card__text'>
                        <p>{actualAppointment.title}</p>
                      </div>
                    </Link>

                    <div onClick={() => handleDelete(actualAppointment.id)} className='card__delete'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="4" y1="7" x2="20" y2="7"></line>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                      </svg>
                    </div>
                  </div>
                )
              })
            }
            </Route>

          </div>
        </section>

      </div>

    </>
    
  );
}

export default AppointmentContainer;