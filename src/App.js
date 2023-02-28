import React, { useState } from "react";
// import logo from './logo.svg';
import './App.css';
import contacts from "./contacts.json";
// mostrar 5 contactos
function App() {
  const [contactList, setContactList] = useState(contacts.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(
    contacts.slice(5)
  );
// agregar contacto aleatorio
  const addRandomContact = () => {
    if (remainingContacts.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    setContactList((list) => [...list, randomContact]);
    setRemainingContacts((list) =>
      list.filter((contact) => contact.id !== randomContact.id)
    );
  };
// eliminar contacto
  const deleteContact = (id) => {
    setContactList((list) => list.filter((contact) => contact.id !== id));
    setRemainingContacts((list) => [
      ...list,
      contacts.find((contact) => contact.id === id),
    ]);
  };
// mostrar si ganó un premio 
  const showTrophy = (wonTrophy) => {
    return wonTrophy ? <span role="img" aria-label="trophy">🏆</span> : null;
  };
// ordenar por nombre
  const sortByName = () => {
    setContactList((list) =>
      [...list].sort((a, b) => a.name.localeCompare(b.name))
    );
  };
// ordenar por popularidad
  const sortByPopularity = () => {
    setContactList((list) =>
      [...list].sort((a, b) => b.popularity - a.popularity)
    );
  };
  return (
    <div className="container">
      <h1>IronContacts</h1>

      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{showTrophy(contact.wonOscar)}</td>
              <td>{showTrophy(contact.wonEmmy)}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App;
