import React, { Component } from 'react'
import queryString from 'query-string'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

enum actionType {
  add = 'Add',
  edit = 'Edit'
}

interface ContactsProps {}
interface ContactState {
  contacts: Array<IContact>,
  modalIsOpen: boolean,
  action: string,
  formData: {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
    company: string,
    phone: number | null
  }
}

export default class Contacts extends Component<ContactsProps, ContactState> {
  state = {
    contacts: [],
    modalIsOpen: false,
    action: '',
    formData: {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: null
    }
  }

  constructor(props : ContactsProps){
    super(props);
  }

  componentDidMount() {
    fetch('http://localhost:8080/contact')
      .then(response => response.json())
      .then(data => this.setState({contacts: data}))
  }

  cleanFormData(){
    this.setState({
      formData: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: null
      }
    })
  }

  handleAdd = () =>  {
    this.setState({
      action: actionType.add,
      modalIsOpen: true
    })
  }

  handleEdit = (contact: IContact) =>  {
    this.setState({
      action: actionType.edit,
      modalIsOpen: true,
      formData: contact
    })
  }

  handleDelete = (contactToDelete: IContact) => {
    fetch('http://localhost:8080/contact/'+contactToDelete._id, {
      method: 'DELETE',
    }).then(response => response.json())
      .then(data => {
        if(!data.errors) {
          this.setState({
            contacts: this.state.contacts.filter((row: IContact) => row._id !== contactToDelete._id),
          })
        }
      })
  }

  handleSave = () => {
    const { action, formData } = this.state;
    if(action === actionType.add) {
      let newState = Object.assign({}, formData)
      delete newState._id
      fetch('http://localhost:8080/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: queryString.stringify(newState)
      }).then(response => response.json())
        .then((data: IContact) => {
          this.setState({
            contacts: [...this.state.contacts, data]
          })
        })
    }
    if(action === actionType.edit) {
      fetch('http://localhost:8080/contact/'+formData._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: queryString.stringify(formData)
      }).then(response => response.json())
        .then(data => {
          let newArray: Array<IContact> = this.state.contacts.filter((row: IContact) => row._id !== formData._id)
          newArray.push(formData)
          this.setState({
            contacts: newArray
          })
        })
    }
    this.cleanFormData()
    this.closeModal()
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleChange = event => {
    this.setState({
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    });
  };

  public render() {
    const { contacts, modalIsOpen, action, formData } = this.state
    return (
      <div>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Contacts
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((row: IContact) => (
              <TableRow key={row._id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell >{row.phone}</TableCell>
                <TableCell>
                <Fab color="secondary" aria-label="Edit" onClick={() => this.handleEdit(row)}>
                  <EditIcon />
                </Fab>
                </TableCell>
                <TableCell>
                <Fab aria-label="Delete" onClick={() => this.handleDelete(row)}>
                  <DeleteIcon />
                </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box mt={3} mb={2}>
          <Fab color="primary" aria-label="Add" onClick={this.handleAdd}>
            <AddIcon />
          </Fab>
        </Box>
        <Dialog open={modalIsOpen} onClose={this.closeModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{action}</DialogTitle>
          <DialogContent>

            <TextField
              id="firstName"
              name="firstName"
              label="First name"
              type="text"
              fullWidth
              value={formData.firstName}
              onChange={this.handleChange}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Last name"
              type="text"
              fullWidth
              value={formData.lastName}
              onChange={this.handleChange}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={this.handleChange}
            />
            <TextField
              id="company"
              name="company"
              label="Company"
              type="text"
              fullWidth
              value={formData.company}
              onChange={this.handleChange}
            />
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              type="number"
              fullWidth
              value={formData.phone}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
