import React, { Component } from 'react';
import { Segment, Header, Image, Label, Icon, Form, Dropdown, Message } from 'semantic-ui-react';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'sm',
      quantity: 1,
      hideAddedToCartMessage: true
    };
    this.setProp = this.setProp.bind(this);
  }

  setProp(e, {name, value}) {
    let obj = {
      [name]: value
    };
    if (name === 'size') {
      obj.quantity = 1;
    }
    this.setState(obj);
  }

  render() {
    const { size, quantity, hideAddedToCartMessage } = this.state;
    const { addToCart, shirt } = this.props;
    let totalStock = Object.keys(shirt.stock).map(key => shirt.stock[key]).reduce((total, sizeStock) => total + sizeStock, 0);
    return (
      <div className='item'>
        <Message
          className='added-to-cart-message'
          color='green'
          header= {shirt.name + '(s) added to cart!'}
          compact
          onDismiss={e => this.setProp(e, {name: 'hideAddedToCartMessage', value: true})}
          size='mini'
          hidden={hideAddedToCartMessage}
        />
        {
          (totalStock > 0) ? (
            <Label className='item-status' floating color='blue' ribbon>IN STOCK</Label>
          ) : (
            <Label className='item-status' floating color='red' ribbon>SOLD OUT</Label>
          )
        }
        <Segment className={totalStock === 0 ? 'sold-out' : 'in-stock'}>
          <Image shape='rounded' src={shirt.imageUrl} fluid />
          <Form onSubmit={e => {
            addToCart(shirt, size, quantity);
            this.setProp(e, {name: 'hideAddedToCartMessage', value: false});
          }}>
            <Form.Field>
              <b>{ shirt.name }</b>
              <p>${ shirt.price }</p>
              <label>Size</label>
              <Dropdown fluid disabled={totalStock === 0} onChange={(e,data) => this.setProp(e, {...data, name: 'size'})} value={size} selection options={
                [{
                  key: 'sm', value: 'sm', text: 'Small', disabled: shirt.stock['sm'] === 0
                },
                {
                  key: 'md', value: 'md', text: 'Medium' + (shirt.stock['md'] === 0 ? ' (SOLD OUT)' : ''), disabled: shirt.stock['md'] === 0
                },
                {
                  key: 'lg', value: 'lg', text: 'Large' + (shirt.stock['lg'] === 0 ? ' (SOLD OUT)' : ''), disabled: shirt.stock['lg'] === 0
                }]
              } />
              <label>Quantity</label>
              <Dropdown fluid disabled={totalStock === 0} onChange={(e,data) => this.setProp(e, {...data, name: 'quantity'})} value={quantity} selection options={
                [{
                  key: 1, value: 1, text: 1
                },
                {
                  key: 2, value: 2, text: '2' + (shirt.stock[size] < 2 ? ' (N/A)' : ''), disabled: shirt.stock[size] < 2
                },
                {
                  key: 3, value: 3, text: '3' + (shirt.stock[size] < 3 ? ' (N/A)' : ''), disabled: shirt.stock[size] < 3
                }]
              } />
            </Form.Field>
            <Form.Button
              disabled={shirt.stock[size] === 0}
              floated='right'
              icon
              labelPosition='left'
              color='black'
            >
              <Icon name='add to cart' size='large' />
              Add To Cart
            </Form.Button>
            <div id="clear"></div>
          </Form>
        </Segment>
      </div>
    )
  }
}