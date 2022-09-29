const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'db/contacts.json')
console.log(contactsPath)

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.log(error)
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const result = contacts.find((contact) => contact.id === contactId.toString())
  if (!result) {
    return null
  }
  return result
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === contactId)
  if (index === -1) {
    return null
  }
  const [removedContact] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return removedContact
}

async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact }
