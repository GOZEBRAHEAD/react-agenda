import React from 'react';
import { useParams } from 'react-router-dom';

const Contact = ({ contacts }) => {

  const { name } = useParams();

  if (!name || contacts.length === 0) {

    return (
      <h2>Contact not found :(</h2>
    );
  }

  const getContactFromName = () => {
    return contacts.find(actualContact => actualContact.name === name);
  }

  const selectedContact = getContactFromName();

  return (

    <>
      <div>
        <h2>{ selectedContact.name }</h2>
        <h3>{ selectedContact.email }</h3>
        <h3>{ selectedContact.socialType }</h3>
      </div>
    </>
  );
}

export default Contact;