import React from 'react';
import { useParams } from 'react-router-dom';

const Appointment = ({ appointments }) => {

  const { title } = useParams();

  if (!title || appointments.length === 0) {

    return (
      <h2>Appointments not found :(</h2>
    );
  }

  const getAppointmentFromTitle = () => {
    return appointments.find(actualAppointment => actualAppointment.title === title);
  }

  const selectedAppointment = getAppointmentFromTitle();

  return (

    <>
      <div>
        <h2>{ selectedAppointment.title }</h2>
        <h3>{ selectedAppointment.contact }</h3>
        <h3>{ selectedAppointment.date }</h3>
        <h3>{ selectedAppointment.importance }</h3>
      </div>
    </>
  );
}

export default Appointment;