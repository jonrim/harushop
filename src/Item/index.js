import React, { Component } from 'react';
import { Segment, Header, Image, Label, Icon, Form, Dropdown, Message } from 'semantic-ui-react';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'Small',
      quantity: 1,
      hideAddedToCartMessage: true
    };
    this.setProp = this.setProp.bind(this);
  }

  setProp(e, {name, value}) {
    this.setState({
      [name]: value
    });
  }

  render() {
    const { size, quantity, hideAddedToCartMessage } = this.state;
    const { addToCart, shirt } = this.props;
    return (
      <div>
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
          (shirt.stock > 0) ? (
            <Label className='item-status' floating color='blue' ribbon>IN STOCK</Label>
          ) : (
            <Label className='item-status' floating color='red' ribbon>SOLD OUT</Label>
          )
        }
        <Label size='large' floating color='green' className='item-price'>
          <Icon name='dollar' />
          { shirt.price }
        </Label>
        <Header size='tiny' attached='top' block>
          { shirt.name }
        </Header>
        <Segment attached>
          <Image shape='rounded' src={shirt.imageUrl} fluid />
          <Form onSubmit={e => {
            addToCart(shirt, size, quantity);
            this.setProp(e, {name: 'hideAddedToCartMessage', value: false});
          }}>
            <Form.Field>
              <label>Size</label>
              <Dropdown fluid disabled={shirt.stock === 0} onChange={(e,data) => this.setProp(e, {...data, name: 'size'})} value={size} selection options={
                [{
                  key: 'sm', value: 'Small', text: 'Small'
                },
                {
                  key: 'md', value: 'Medium', text: 'Medium'
                },
                {
                  key: 'lg', value: 'Large', text: 'Large'
                }]
              } />
              <label>Quantity</label>
              <Dropdown fluid disabled={shirt.stock === 0} onChange={(e,data) => this.setProp(e, {...data, name: 'quantity'})} value={quantity} selection options={
                [{
                  key: 1, value: 1, text: 1
                },
                {
                  key: 2, value: 2, text: 2, disabled: shirt.stock < 2
                },
                {
                  key: 3, value: 3, text: 3, disabled: shirt.stock < 3
                }]
              } />
            </Form.Field>
            <Form.Button
              disabled={shirt.stock === 0}
              floated='right'
              icon
              labelPosition='left'
              color='yellow'
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