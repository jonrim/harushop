import React, { Component, PropTypes } from 'react'
import { Grid, Icon, Button, Modal, Header, Image, Table } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';
import Slider from 'react-slick';
import update from 'immutability-helper';
import Item from './Item';
import 'whatwg-fetch';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' ?
"pk_live_rKdUDjlzDrNmQenJd1pGaWfH" : "pk_test_vvZ5hoVS2njWOMhKCEpufe3h";

const CURRENCY = 'USD';

class PrevNavButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick} className='fa fa-chevron-circle-left fa-3x' />
  }
}

class NextNavButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick} className='fa fa-chevron-circle-right fa-3x' />
  }
}

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      showCheckoutModal: false,
      numSlides: 3,
      items: []
    };
    this.changeNumSlides = this.changeNumSlides.bind(this);
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
  }

  removeFromCart = index => {
    const { cart } = this.state;
    let newCart = update(cart, {
      $unset: [index]
    });
    this.setState({
      cart: newCart
    });
  }

  handleCheckoutModal = (e, open) => {
    this.setState({ showCheckoutModal: open });
  }

  onToken = amount => token => {
    token.source = token.id;
    token.currency = CURRENCY;
    token.amount = Math.round(amount);
    fetch('/save-stripe-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token),
    })
    .then(data => {
      alert('Payment Successful');
      this.forceUpdate();
    })
    .catch(data => {
      alert('Payment Error');
      this.forceUpdate();
    });
  }

  changeNumSlides() {
    let numSlides = Math.floor(window.innerWidth / 260);
    this.setState({ numSlides });
  }

  componentWillMount() {
    this.changeNumSlides();
    window.addEventListener('resize', this.changeNumSlides);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeNumSlides);
  }

  render() {
    const { cart, items } = this.state;
    let totalPrice = cart.reduce((sum, item) => sum + item.quantity*item.info.price, 0);
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      centerMode: true,
      prevArrow: <PrevNavButton/>,
      nextArrow: <NextNavButton/>
    };
    return (
      <div className="App">
        <div className="App-header">
          <img src={require('./logo.png')} className="App-logo" alt="logo" />
          <span>HARU THE SHIBA INU</span>
          <Modal
            trigger={ 
              
                window.innerWidth >= 656 ?
                (
                  <Button 
                    animated='vertical'
                    disabled={cart.length === 0}
                    floated='right'
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
                    floated='right'
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
                          ${item.info.price % 1 === 0 ? Math.trunc(item.info.price) : item.info.price.toFixed(2)}
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
                stripeKey={STRIPE_PUBLISHABLE}
                name="Stripe" // the pop-in header title
                panelLabel="Pay" // prepended to the amount in the bottom pay button
                amount={totalPrice*100} // cents
                currency={CURRENCY}
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
                token={this.onToken(totalPrice*100)} // submit callback
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
          <Slider {...settings}>
            <div className="banner-picture"><img src={require('./p1.png')} /></div>
            <div className="banner-picture"><img src={require('./p2.jpg')} /></div>
            <div className="banner-picture"><img src={require('./p3.jpg')} /></div>
            <div className="banner-picture"><img src={require('./p4.jpg')} /></div>
            <div className="banner-picture"><img src={require('./p5.jpg')} /></div>
          </Slider>
          <Grid columns={3} stackable doubling>
            {
              items.map(shirt => (
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