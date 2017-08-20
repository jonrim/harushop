import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react';
import './Layout.scss'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.object,
    dispatch: PropTypes.func
  }

  render () {
    const { children, dispatch } = this.props;

    return (
      <div>
        { children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  
}

export default Layout;

