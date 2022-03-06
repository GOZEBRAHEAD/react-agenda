import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Appointment = ({ appointments }) => {

  const { id } = useParams();

  const history = useHistory();

  const handleGoBack = () => {
    history.push('/appointments/');
  }

  const getAppointmentFromID = () => {
    return appointments.find(actualAppointment => actualAppointment.id === +id);
  }

  const selectedAppointment = getAppointmentFromID();

  return (

    <>
      {
        (!selectedAppointment || appointments.length === 0) ?
          <h2>You don't have any appointments :(</h2>
          :
          <div className='specific-info'>
            <h2>{ selectedAppointment.title }</h2>
            <h3>Contact: { selectedAppointment.contact }</h3>
            <h3>Date: { selectedAppointment.date }</h3>
            <h3>Importance: { selectedAppointment.importance }</h3>
          </div>
      }

      <button className='button-back' onClick={handleGoBack}>Go back</button>
    </>
  );
}

export default Appointment;