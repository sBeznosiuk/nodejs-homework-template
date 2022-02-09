const res = require('express/lib/response');
const fs = require('fs/promises');

const listContacts = async () => {
  try {
    const data = await fs.readFile(
      './model/contacts.json',
      'utf8'
    );

    console.log(data);
    if (data) return JSON.parse(data);
  } catch (error) {
    throw error.message;
  }
};

const getContactById = async contactId => {
  try {
    const contactsJSON = await fs.readFile(
      './model/contacts.json',
      'utf8'
    );
    const data = JSON.parse(contactsJSON);
    const exists = data.some(({ id }) => id === contactId);

    if (exists) return data.find(i => i.id === contactId);
  } catch (error) {
    throw error.message;
  }
};

const removeContact = async contactId => {
  try {
    const contactsJSON = await fs.readFile(
      './model/contacts.json',
      'utf8'
    );
    const data = JSON.parse(contactsJSON);
    const exists = data.some(({ id }) => id === contactId);

    if (exists)
      return data.filter(({ id }) => id !== contactId);
  } catch (error) {
    throw error.message;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contactsJSON = await fs.readFile(
      './model/contacts.json',
      'utf8'
    );
    const data = JSON.parse(contactsJSON);
    data.push({ id: data.length + 1, name, email, phone });

    console.log(res);

    fs.writeFile(
      './model/contacts.json',
      JSON.stringify(data),
      'utf8'
    );

    return data;
  } catch (error) {
    console.log('Error: ', error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsJSON = await fs.readFile(
      './model/contacts.json',
      'utf8'
    );
    const data = JSON.parse(contactsJSON);
    const exists = data.some(({ id }) => id === contactId);

    const bodyKeys = Object.keys(body);

    if (exists) {
      const contact = data.find(
        ({ id }) => id === contactId
      );

      console.log(contact);

      bodyKeys.forEach(key => {
        contact[key] = body[key];
      });

      fs.writeFile(
        './model/contacts.json',
        JSON.stringify(data),
        'utf8'
      );

      return contact;
    }
  } catch (error) {
    console.log('Error: ', error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
