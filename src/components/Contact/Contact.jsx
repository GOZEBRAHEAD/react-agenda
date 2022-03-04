import React from 'react';
import { useParams } from 'react-router-dom';

const Contact = ({ contacts }) => {

  const { name } = useParams();

  const getContactFromName = (contactName) => {
    return contacts.find(actualContact => actualContact.name === contactName);
  }

  const contact = getContactFromName(name);

  return (

    <div>
      <h2>{ contact.name }</h2>
      <h3>{ contact.email }</h3>
      <h3>{ contact.socialType }</h3>
    </div>
  );
}

export default Contact;