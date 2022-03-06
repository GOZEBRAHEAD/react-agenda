import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Contact = ({ contacts }) => {

  const { id } = useParams();

  const history = useHistory();

  const handleGoBack = () => {
    history.push('/contacts/');
  }

  const getContactFromID = () => {
    return contacts.find(actualContact => actualContact.id === +id);
  }

  const selectedContact = getContactFromID();

  return (

    <>
      {
      (!selectedContact || contacts.length === 0) ?
        <h2>You don't have any contacts :(</h2>
        :
        <div className='specific-info'>
          <h2>{ selectedContact.name }</h2>
          <h3>E-mail: { selectedContact.email }</h3>
          <h3>Type: { selectedContact.socialType }</h3>
        </div>
      }

      <button className='button-back' onClick={handleGoBack}>Go back</button>
    </>
  );
}

export default Contact;