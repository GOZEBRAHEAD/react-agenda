import React from 'react';
import { useState } from 'react';

import './ContactContainer.css';

const ContactContainer = ({ contacts, addContacts }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [socialType, setSocialType] = useState('');

  const handleSubmitContact = (e) => {
    e.preventDefault();

    addContacts(name, email, socialType);

    setName('');
    setEmail('');
    setSocialType('');
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangeSocialType = (e) => {
    setSocialType(e.target.value);
  }

  return (
    
    <>

      <h2>Contacts</h2>

      <section className='content__create-contacts'>
        <form onSubmit={handleSubmitContact}>

          <label htmlFor="contactName">Name:</label>
          <input
            type="text"
            min="2"
            max="20"
            placeholder="Name"
            name="contactName"
            value={name}
            onChange={handleChangeName}
            required
          />

          <label htmlFor="contactEmail">E-mail:</label>
          <input
            type="email"
            max="20"
            pattern="^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            placeholder="E-mail"
            name="contactEmail"
            value={email}
            onChange={handleChangeEmail}
            required
          />

          <label htmlFor="contactSocialType">Social type (friend, family, etc):</label>
          <input
            type="text"
            max="20"
            name="contactSocialType"
            value={socialType}
            onChange={handleChangeSocialType}
            required
          />

          {/* <select name="contactSocialType">
            <option value="-" key={-1} defaultValue="selected">-</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="coworker">Coworker</option>
            <option value="partner">Partner</option>
          </select> */}

          <input type="submit" value="Submit" />
          
        </form>
      </section>

      <section className='content__see-contacts'>
        <h3>Your contacts:</h3>

        <div>
        {
          contacts.map((actualContact, i) => {
          
          return <div key={i}>
              <p>Name: {actualContact.name}</p> 
              <p>E-mail: {actualContact.email}</p>
              <p>Type: {actualContact.socialType}</p>
              <br />
            </div>
          })
        }
        </div>
      </section>

    </>

  );
}

export default ContactContainer;