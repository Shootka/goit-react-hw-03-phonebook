import React, { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('contacts')) || [],
    filter: '',
  };

  onFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  submitHandler = (data) => {
    this.setState(state => {
      localStorage.setItem('contacts',
        JSON.stringify([...state.contacts, { id: Math.floor(Math.random() * 999293).toString(10), ...data }]))
      if (state.contacts
        .map(el => el.name)
        .includes(data.name)
      ) {
        return alert('already in cotacts');
      } else {
        return {
          contacts: [...state.contacts, { id: Math.floor(Math.random() * 999293).toString(10), ...data }],
        };
      }
    });

  };
  onHandleDelete = (event) => {
    this.setState(state => {
      return {contacts: state.contacts.filter(el => el.id !== event.target.id) }
    })
    console.log(this.state.contacts);
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts.filter(el => el.id !== event.target.id)))
  }
  render() {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}>
        Phonebook
        <Form submitData={this.submitHandler} />
        <Filter onChange={this.onFilterChange} />
        <ContactList title={'Contacts'}
                     filter={this.state.filter}
                     contacts={this.state.contacts} deleteItem={this.onHandleDelete} />
      </div>
    );
  }
}

export default App;
