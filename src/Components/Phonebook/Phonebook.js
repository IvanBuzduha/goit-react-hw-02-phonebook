import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PhoneFilter from "./PhoneFilter/PhoneFilter";
import PhoneForm from "./PhoneForm/PhoneForm";
import PhoneList from "./PhoneList/PhoneList";

export default class Phonebook extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  addContact = (contact) => {
    console.log(contact);
    const someName = this.state.contacts
      .map((cont) => cont.name.toLowerCase())
      .includes(contact.name.toLowerCase());
    const someNum = this.state.contacts
      .map((cont) => cont.number)
      .includes(contact.number);
    if (someName) {
      alert(`${contact.name} is already in contacts`);
      return;
    } else if (someNum) {
      alert(`${contact.number} is already in contacts`);
      return;
    }
    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, { ...contact, id: uuidv4() }],
      };
    });
  };
  deleteContact = (e) => {
    const { id } = e.target;
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };
  setFilter = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };
  getFilteredContacts = () => {
    return this.state.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
        contact.number.includes(this.state.filter)
    );
  };
  render() {
    return (
      <div className="relative mx-auto max-w-md px-8 py-12 bg-white border-0 shadow-lg sm:rounded-3xl ">
        <PhoneForm addContact={this.addContact} />
        <PhoneFilter filter={this.state.filter} setFilter={this.setFilter} />
        <PhoneList
          contacts={this.getFilteredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
