import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

import { verifyDuplicateContact } from '../../utils/func_utils.js';

import './ContactContainer.css';

const ContactContainer = ({ contacts, addContacts, setContacts }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [socialType, setSocialType] = useState('');
  const [duplicate, setDuplicate] = useState(false);

  useEffect(() => {

    setDuplicate(verifyDuplicateContact(contacts, name));

  }, [contacts, name]);

  const handleSubmitContact = (e) => {
    e.preventDefault();

    if (duplicate) {
      return;
    }

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

  const handleDelete = (id) => {
    
    const updatedContacts = contacts.filter(actualCont => actualCont.id !== id);

    setContacts(updatedContacts);
  }

  return (
    
    <>
    
      <h2>Contacts</h2>
      { duplicate && <p>Contact already exists</p>}

      <div className='content__wrapper'>

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

            <input className='submit-button' type="submit" value="Add contact" />
            
          </form>
        </section>

        <section className='content__see-contacts'>
          <h3>Your contacts:</h3>

          <div className='info__wrapper'>

            <Route>
            {
              contacts.map(actualContact => {
              
                return (
                  <div key={actualContact.id} className='info__card'>
                    
                    <Link to={`/contacts/${actualContact.id}`}>
                      <div className='card__text'>
                        <p>{actualContact.name}</p>
                      </div>
                    </Link>

                    <div onClick={() => handleDelete(actualContact.id)} className='card__delete'>
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

export default ContactContainer;