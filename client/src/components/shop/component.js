import React, { Component, PropTypes } from 'react'
import { Grid, Icon, Button, Modal, Header, Image, Table, Input, Message } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';
import Slider from 'react-slick';
import update from 'immutability-helper';
import AlertContainer from 'react-alert';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Item from './Item';
import 'whatwg-fetch';
import objectFitImages from 'object-fit-images';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' ?
"pk_live_rKdUDjlzDrNmQenJd1pGaWfH" : "pk_test_vvZ5hoVS2njWOMhKCEpufe3h";

const CURRENCY = 'USD';

const information = [
  {display: 'Full Name', name: 'fullName'},
  {display: 'Street', name: 'street'},
  {display: 'City', name: 'city'},
  {display: 'State', name: 'state'},
  {display: 'Zip Code', name: 'zip'}
];

const LOGO_URL='//dslv9ilpbe7p1.cloudfront.net/Cwu3H_1rBMO8fh-xZoHCJg_store_logo_image.png';
const BANNER_URL='//dslv9ilpbe7p1.cloudfront.net/SQc816rmr16ri_f9P9zxFg_store_banner_image.png';

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      showCheckoutModal: false,
      numSlides: 3,
      items: [],
      fullName: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    };
    this.changeNumSlides = this.changeNumSlides.bind(this);
  }

  componentDidMount() {
    objectFitImages();
    window.addEventListener('resize', e => {
      let checkoutButton = document.querySelector('.navbar').querySelector('.button');
      if (window.innerWidth < 450) {
        checkoutButton.classList.add('small');
        checkoutButton.classList.remove('large');
      }
      else {
        checkoutButton.classList.add('large');
        checkoutButton.classList.remove('small');
      }
    });
    fetch('/items', {
      credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(items => {
      items.forEach(item => {
        item.stock = JSON.parse(JSON.stringify(eval("(" + item.stock + ")")));
      })
      this.setState({ items })
    })
  }

  addToCart = (info, size, quantity) => {
    const { cart } = this.state;
    let newCart = update(cart, {
      $push: [{info, size, quantity}]
    });
    this.setState({
      cart: newCart
    });
    this.msg.success(info.name + '(s) added to cart!', {
      time: 2000
    });
  }

  removeFromCart = index => {
    const { cart } = this.state;
    let newCart = cart.slice();
    newCart.splice(index, 1);
    this.setState({
      cart: newCart
    });
  }

  handleCheckoutModal = (e, open) => {
    this.setState({ showCheckoutModal: open });
  }

  onToken = amount => token => {
    const { fullName, street, city, state, zip, cart } = this.state;
    token.source = token.id;
    token.currency = CURRENCY;
    token.amount = Math.round(amount);
    token = {
      ...token,
      fullName,
      street,
      city,
      state,
      zip,
      cart
    };
    fetch('/save-stripe-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token),
    })
    .then(res => res.json())
    .then(res => {
      if (res instanceof Error || res.error_code) {
        throw new Error('Payment Error - ' + res.message);
      }
      this.msg.success('Payment Successful', {
        time: 4000
      });
      this.forceUpdate();
    })
    .catch(err => {
      this.msg.error(err.message, {
        time: 8000
      });
    });
  }

  alertOptions = {
    offset: 14,
    position: 'top left',
    theme: 'light',
    time: 5000,
    transition: 'scale'
  }

  changeNumSlides() {
    let numSlides = Math.floor(window.innerWidth / 260);
    numSlides = (numSlides > 3) ? 3 : numSlides;
    this.setState({ numSlides });
  }

  componentWillMount() {
    this.changeNumSlides();
    window.addEventListener('resize', this.changeNumSlides);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeNumSlides);
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { cart, items, fullName, street, city, state, zip, numSlides } = this.state;
    let totalPrice = cart.reduce((sum, item) => sum + item.quantity*item.info.price, 0);
    let client = {
      sandbox:    'ARKWITL-coNrHSGbt8_WR5WWuINAGEkw6pFP_K-UieX5As0Mwva_y2uVNeUoX5EdO8rPUYuothHLFup3',
      production: process.env.PAYPAL_PRODUCTION_ID
    };
    return (
      <div className="app">
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="navbar">
          <img src={LOGO_URL} className="haru-logo" alt="logo" />
          <Modal
            trigger={ 
              window.innerWidth >= 656 ?
              (
                <Button 
                  className='desktop-checkout'
                  animated='vertical'
                  disabled={cart.length === 0}
                  icon
                  labelPosition='left'
                  color='yellow'
                  size={'large'}
                  onClick={e=> this.handleCheckoutModal(e, true)}
                >
                  <Icon name='shop' size='large' />
                  <Button.Content hidden>Thank you!</Button.Content>
                  <Button.Content visible>Proceed to Checkout</Button.Content>
                </Button>
              ) : (
                <Button 
                  className='mobile-checkout'
                  animated='vertical'
                  disabled={cart.length === 0}
                  color='yellow'
                  size={'large'}
                  onClick={e=> this.handleCheckoutModal(e, true)}
                >
                  <Icon name='shop' size='large' />
                </Button>
              )
            }
            closeIcon='close'
            open={this.state.showCheckoutModal}
            onClose={e => this.handleCheckoutModal(e, false)}
            className='checkout-modal'
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
                        <Table.Cell className='remove-item-td'>
                          <Button icon='remove' color='red' size='tiny' onClick={e => this.removeFromCart(index)}/>
                        </Table.Cell>
                        <Table.Cell className='item-img-td'>
                          <Image shape='rounded' src={item.info.imageUrls.split(',')[0]} />
                        </Table.Cell>
                        <Table.Cell>
                          {item.info.name}
                        </Table.Cell>
                        <Table.Cell>
                          {item.size}
                        </Table.Cell>
                        <Table.Cell>
                          ${parseFloat(item.info.price).toFixed(2)}
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
                        parseFloat(totalPrice).toFixed(2)
                      }
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
              <div>
                <Grid columns={2} divided>
                  <Grid.Column className='paypal-col'>
                    <div className='paypal-div'>
                      <PaypalExpressBtn client={client} currency={CURRENCY} total={totalPrice} />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <p><b>Contact Information</b></p>
                    {
                      information.map(field => (
                        <Input
                          key={field.name}
                          className={'fieldSpan ' + field.name}
                          name={field.name}
                          placeholder={field.display}
                          onChange={this.handleChange}
                        />
                      ))
                    }
                    <StripeCheckout
                      stripeKey={STRIPE_PUBLISHABLE}
                      name="Stripe" // the pop-in header title
                      panelLabel="Pay" // prepended to the amount in the bottom pay button
                      amount={totalPrice*100} // cents
                      currency={CURRENCY}
                      locale="en"
                      allowRememberMe={false} // "Remember Me" option (default true)
                      token={this.onToken(totalPrice*100)} // submit callback
                      closed={e => this.handleCheckoutModal(e, false)}
                      // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
                      // you are using multiple stripe keys
                      reconfigureOnUpdate={false}
                      // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                      // useful if you're using React-Tap-Event-Plugin
                      triggerEvent="onClick"
                    >
                      <Button
                        disabled={totalPrice === 0 || !fullName || !street || !state || !zip || !city}
                        className='stripe-btn'
                      >
                        <Image 
                          src='https://wptravel.io/wp-content/uploads/edd/2018/02/stripe.png' 
                          size='small' 
                          centered
                        />
                      </Button>
                    </StripeCheckout>
                  </Grid.Column>
                </Grid>
              </div>
            </Modal.Content>
          </Modal>
        </div>
        <div className="body-container">
          <img src={BANNER_URL} className="banner" />
          <Grid columns={3} stackable doubling>
            {
              items.map((shirt, index) => (
                <Grid.Column key={shirt.name+index}>
                  <div className='hl-top'></div>
                  <div className='vl-left'></div>
                  <Item addToCart={this.addToCart} shirt={shirt} cart={cart} index={index}/>
                  <div className='vl-right'></div>
                  <div className='hl-bot'></div>
                </Grid.Column>
              ))
            }
          </Grid>
        </div>
      </div>
    );
  }
}