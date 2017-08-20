import React, { Component } from 'react';
import { Grid, Icon, Button, Modal, Header, Image, Table } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';
import update from 'immutability-helper';
import './App.css';
import Item from './Item';

// gotta change stock to an object or array based on sizes
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
      cart: [],
      showCheckoutModal: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleCheckoutModal = this.handleCheckoutModal.bind(this);
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

  addToCart(info, size, quantity) {
    const { cart } = this.state;
    let newCart = update(cart, {
      $push: [{info, size, quantity}]
    });
    this.setState({
      cart: newCart
    });
  }

  removeFromCart(index) {
    const { cart } = this.state;
    let newCart = update(cart, {
      $unset: [index]
    });
    this.setState({
      cart: newCart
    });
  }

  handleCheckoutModal(e, open) {
    this.setState({ showCheckoutModal: open });
  }

  onToken(token) {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    })
  }

  render() {
    const { cart } = this.state;
    let totalPrice = cart.reduce((sum, item) => sum + item.quantity*item.info.price, 0);
    return (
      <div className="App">
        <div className="App-header">
          <img src={require('./imgs/logo.png')} className="App-logo" alt="logo" />
          <h2>Welcome to Haru the Shiba Inu's Shop!</h2>
          <Modal
            trigger={ 
              <Button 
                animated='vertical'
                disabled={cart.length === 0}
                floated='right'
                icon
                labelPosition='left'
                color='yellow'
                size={window.innerWidth >= 450 ? 'large' : 'small'}
                onClick={e=> this.handleCheckoutModal(e, true)}
              >
                <Icon name='shop' size='large' />
                <Button.Content hidden>Thank you!</Button.Content>
                <Button.Content visible>Proceed to Checkout</Button.Content>
              </Button>
            }
            closeIcon='close'
            open={this.state.showCheckoutModal}
            onClose={e => this.handleCheckoutModal(e, false)}
          >
            <Header>
              Checkout
            </Header>
            <Modal.Content>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={1} />
                    <Table.HeaderCell width={2} />
                    <Table.HeaderCell width={6}>Name</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Size</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Price</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    cart.map((item, index) => (
                      <Table.Row key={item.info.name + '-' + index}>
                        <Table.Cell>
                          <Button icon='remove' color='red' size='tiny' onClick={e => this.removeFromCart(index)}/>
                        </Table.Cell>
                        <Table.Cell>
                          <Image shape='rounded' src={item.info.imageUrl} />
                        </Table.Cell>
                        <Table.Cell>
                          {item.info.name}
                        </Table.Cell>
                        <Table.Cell>
                          {item.size}
                        </Table.Cell>
                        <Table.Cell>
                          {item.info.price}
                        </Table.Cell>
                        <Table.Cell>
                          {item.quantity}
                        </Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan='13'>
                      Total Price: $ 
                      {
                        totalPrice
                      }
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Modal.Content>
            <Modal.Actions>
              <StripeCheckout
                stripeKey="pk_test_vvZ5hoVS2njWOMhKCEpufe3h"
                name="Stripe" // the pop-in header title
                panelLabel="Pay" // prepended to the amount in the bottom pay button
                amount={totalPrice*100} // cents
                currency="USD"
                locale="en"
                // Note: Enabling either address option will give the user the ability to
                // fill out both. Addresses are sent as a second parameter in the token callback.
                shippingAddress
                billingAddress
                // Note: enabling both zipCode checks and billing or shipping address will
                // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                zipCode={false}
                alipay // accept Alipay (default false)
                bitcoin // accept Bitcoins (default false)
                allowRememberMe // "Remember Me" option (default true)
                token={this.onToken} // submit callback
                closed={e => this.handleCheckoutModal(e, false)}
                // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
                // you are using multiple stripe keys
                reconfigureOnUpdate={false}
                // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                // useful if you're using React-Tap-Event-Plugin
                triggerEvent="onClick"
              >
                <Button color='green' disabled={totalPrice === 0}>
                  <Icon name='checkmark' /> Purchase with Stripe
                </Button>
              </StripeCheckout>
            </Modal.Actions>
          </Modal>
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