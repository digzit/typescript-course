import React, { Component } from 'react'

type DashboardProps = {}
type DashboardState = {}

export default class Dashboard extends Component<DashboardProps, DashboardState> {

  constructor(props : DashboardProps){
    super(props);
    this.state = {}
  }

  public render() {
    return (
      <div>Dashboard</div>
    );
  }
}
