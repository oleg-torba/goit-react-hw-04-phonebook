import { useState } from 'react';
import { Form } from './Form/Form';
import { Section } from './Section/Section';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/FilterContacts';
import { Notification } from './Notification/Notification';
import { UseLocalStorage } from 'hooks/UseLocalStorage';

export function App() {
  const [contacts, setContacts] = UseLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');
  const visibleContacts = contacts.filter(contact =>
    contact.data.name.toLowerCase().includes(filter.toLowerCase())
  );

  const formSubmit = data => {
    const findDublicate = contacts.some(
      contact => contact.data.name.toLowerCase() === data.name.toLowerCase()
    );

    if (findDublicate) {
      alert(`${data.name} already exsist`);
      return;
    }
    const numbers = {
      id: nanoid(),
      data,
    };

    setContacts([numbers, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={formSubmit} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            removeContact={deleteContact}
          />
        ) : (
          <Notification message="There are no contacts" />
        )}
      </Section>
    </>
  );
}
