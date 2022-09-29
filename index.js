const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts')

const argv = require('yargs').argv

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.log(contacts)
      break

    case 'get':
      const contact = await getContactById(id)
      if (!contact) {
        throw new Error(`contact with id ${id} not found`)
      }
      console.log(contact)
      break

    case 'add':
      const newContact = await addContact(name, email, phone)
      console.log('newContact', newContact)
      break

    case 'remove':
      const removedContact = await removeContact(id)
      console.log(removedContact)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
