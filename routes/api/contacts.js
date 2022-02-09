const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();

    if (!contacts)
      return res
        .status(200)
        .json({ message: 'No contacts yet' });

    res.status(200).json({
      message: 'Contacts list',
      contacts,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(
      req.params.contactId
    );

    if (!contact)
      return res.status(404).json({ message: 'Not found' });
    res.json({
      message: 'GET contacts',
      contact,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = await req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: 'All fields are mandatory!' });
    }

    const contacts = await addContact(body);

    console.log(contacts);

    res.json({
      message: 'POST contacts',
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contacts = await removeContact(
      req.params.contactId
    );

    if (!contacts)
      return res.status(404).json({ message: 'Not found' });

    res.status(200).json({
      message: 'Contact removed',
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch('/:contactId', async (req, res, next) => {
  try {
    const body = await req.body;

    console.log(typeof body);

    if (!Object.keys(body).length)
      return res
        .status(400)
        .json({ message: 'missing fields' });

    const contact = await updateContact(
      req.params.contactId,
      body
    );

    res.json({
      message: 'contact updated',
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
