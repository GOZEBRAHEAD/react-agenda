import React from 'react';
import { useParams } from 'react-router-dom';

const Contact = ({ contacts }) => {

  const { id } = useParams();

  if (!id || contacts.length === 0) {

    return (
      <h2>Contact not found :(</h2>
    );
  }

  const getContactFromID = () => contacts.find(actualContact => actualContact.id === +id);

  const selectedContact = getContactFromID();

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