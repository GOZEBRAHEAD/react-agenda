
export const verifyDuplicateContact = (contacts, contactName) => {

  return contacts.find(actualContact => actualContact.name === contactName);
};

export const verifyDuplicateAppointment = (appointments, appointmentTitle) => {

  return appointments.find(actualAppointment => actualAppointment.title === appointmentTitle);
};

export const calculateIdFromArray = (arr) => (arr.length > 0) ? arr[arr.length - 1].id + 1 : 1;