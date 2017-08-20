import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react';
import Navbar from '../Navbar'
import './Layout.scss'

class NavbarLayout extends Component {
  static propTypes = {
    children: PropTypes.object,
    dispatch: PropTypes.func
  }

  render () {
    const { children, dispatch } = this.props;

    return (
      <div>
        <Navbar dispatch={dispatch} />
        { children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(NavbarLayout);
