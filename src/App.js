import React, { Component } from 'react';
import './App.css';
import update from 'immutability-helper';
import { Segment, Grid, Header, Image, Label, Icon, Form, Button, Dropdown } from 'semantic-ui-react';
import Item from './Item';

let shirts = [
  {
    name: 'Orange Haru white shirt',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0505/1057/products/science.jpg?v=1447789931',
    price: 19.99,
    sizes: ['sm', 'md', 'lg'],
    stock: 10
  },
  {
    name: 'Black Haru white shirt',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0601/4169/products/Home-Is-Where-The-Dog-Is-Unisex-Tee-Red.jpg?v=1461351140',
    price: 19.99,
    sizes: ['sm', 'md', 'lg'],
    stock: 5
  },
  {
    name: 'Blue Haru white shirt',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0505/1057/products/science.jpg?v=1447789931',
    price: 19.99,
    sizes: ['sm', 'md', 'lg'],
    stock: 0
  },
  {
    name: 'Red Haru white shirt',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0505/1057/products/science.jpg?v=1447789931',
    price: 19.99,
    sizes: ['sm', 'md', 'lg'],
    stock: 2
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', e => {
      let checkoutButton = document.getElementsByClassName('App-header')[0].getElementsByTagName('button')[0];
      if (window.innerWidth < 450) {
        checkoutButton.classList.add('small');
        checkoutButton.classList.remove('large');
      }
      else {
        checkoutButton.classList.add('large');
        checkoutButton.classList.remove('small');
      }
    });
  }

  addToCart(name, size, quantity) {
    const { cart } = this.state;
    let newCart = update(cart, {
      $push: [{name, size, quantity}]
    });
    this.setState({
      cart: newCart
    });
  }

  render() {
    const { cart, size, quantity } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={require('./imgs/logo.png')} className="App-logo" alt="logo" />
          <h2>Welcome to Haru the Shiba Inu's Shop!</h2>
          <Button 
            animated='vertical'
            disabled={cart.length === 0}
            floated='right'
            icon
            labelPosition='left'
            color='yellow'
            size={window.innerWidth >= 450 ? 'large' : 'small'}
          >
            <Icon name='shop' size='large' />
            <Button.Content hidden>Thank you!</Button.Content>
            <Button.Content visible>Proceed to Checkout</Button.Content>
          </Button>
        </div>
        <div className="App-intro">
          <Grid columns={3} stackable doubling>
            {
              shirts.map(shirt => (
                <Grid.Column key={shirt.name}>
                  <Item addToCart={this.addToCart} shirt={shirt} />
                </Grid.Column>
              ))
            }
          </Grid>
        </div>
      </div>
    );
  }
}
