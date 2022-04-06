import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ContactList from './Components/Contacts/ContactList/ContactList';
import AddContact from './Components/Contacts/AddContacts/AddContact';
import EditContact from './Components/Contacts/EditContacts/EditContact'
import NavBar from './Components/NavBar/NavBar';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={ <Navigate to={'/contacts/list'}/>} />
        <Route path='/contacts/list' element={<ContactList />}/>
        <Route path='/contacts/add' element={<AddContact />}/>
        <Route path='/contacts/edit/:contactId' element={<EditContact />}/>
      </Routes>
    </div>
  );
}

export default App;
