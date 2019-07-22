import React, { Component } from 'react'

type ContactsProps = {}
type ContactState = {}

export default class Contacts extends Component<ContactsProps, ContactState> {

  constructor(props : ContactsProps){
    super(props);
    this.state = {}
  }

  public render() {
    return (
      <div>Contacts</div>
    );
  }
}
