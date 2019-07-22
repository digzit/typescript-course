import React, { Component } from 'react'

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';

type ContactsProps = {}
type ContactState = {}


function createData(id, firstName, lastName, email, phone, company) {
  return { id, firstName, lastName, email, phone, company };
}

const rows = [
  createData(0, 'John', 'Doe', 'blabla@gmail.com', 5145679837, 'Google'),
  createData(0, 'John', 'Doe', 'blabla@gmail.com', 5145679837, 'Google'),
  createData(0, 'John', 'Doe', 'blabla@gmail.com', 5145679837, 'Google'),
  createData(0, 'John', 'Doe', 'blabla@gmail.com', 5145679837, 'Google')
];

export default class Contacts extends Component<ContactsProps, ContactState> {

  constructor(props : ContactsProps){
    super(props);
    this.state = {}
  }

  public render() {
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
              <TableCell>Company</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell >{row.company}</TableCell>
                <TableCell>
                <Fab color="secondary" aria-label="Edit">
                  <EditIcon />
                </Fab>
                </TableCell>
                <TableCell>
                <Fab aria-label="Delete">
                  <DeleteIcon />
                </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box mt={3} mb={2}>
          <Fab color="primary" aria-label="Add">
            <AddIcon />
          </Fab>
        </Box>
      </div>
    );
  }
}
