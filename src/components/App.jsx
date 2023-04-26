import { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { Section } from './Section/Section';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/FilterContacts';
import { Notification } from './Notification/Notification';


const UseLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key) ?? defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};



export function App() {
  const [contacts, setContacts] = UseLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');
  const visibleContacts = contacts.filter(contact =>
    contact.data.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
