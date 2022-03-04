import React from 'react';
import { useState } from 'react';
import { Route, Link } from 'react-router-dom';

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

          <input type="submit" value="Submit" />
          
        </form>
      </section>

      <section className='content__see-contacts'>
        <h3>Your contacts:</h3>

        <div className='info__wrapper'>

          <Route>            
            {
              contacts.map((actualContact, i) => {
              
                return (
                  <Link key={i} to={`/contacts/${actualContact.name}`}>
                    <div key={i} className='info__card'>
                      
                      <p>{actualContact.name}</p>

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

export default ContactContainer;