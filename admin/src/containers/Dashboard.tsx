import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';

type DashboardProps = {}
type DashboardState = {}

export default class Dashboard extends Component<DashboardProps, DashboardState> {

  constructor(props : DashboardProps){
    super(props);
    this.state = {}
  }

  public render() {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Dashboard
      </Typography>
    );
  }
}
