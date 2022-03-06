export const LS_CONTACTS = 'react-agenda-contacts';
export const LS_APPOINTMENTS = 'react-agenda-appointments';

export const saveContactsInLocalStorage = (cont) => {
  return localStorage.setItem(LS_CONTACTS, JSON.stringify(cont));
}

export const getContactsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LS_CONTACTS)) || [];
}

export const saveAppointmentsInLocalStorage = (appoint) => {
  return localStorage.setItem(LS_APPOINTMENTS, JSON.stringify(appoint));
}

export const getAppointmentsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LS_APPOINTMENTS)) || [];
}