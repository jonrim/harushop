import React, { Component } from 'react';
import { Header, Image, Label, Icon, Form, Dropdown, Message } from 'semantic-ui-react';
import 'ie-array-find-polyfill';
import Slider from 'react-slick';

export default class Item extends Component {
  constructor(props) {
    super(props);
    let shirt = props.shirt;
    this.state = {
      size: shirt.stock['sm'] > 0 ? 'sm' : (shirt.stock['md'] > 0 ? 'md' : 'lg'),
      quantity: 1,
      hideDetails: true
    };
    this.setProp = this.setProp.bind(this);
    this.toggleHideDetails = this.toggleHideDetails.bind(this);
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

  toggleHideDetails() {
    const { index } = this.props;
    let itemDetails = document.getElementsByClassName('item-details')[index];
    itemDetails.classList.toggle('show-details');
    this.setState({
      hideDetails: !this.state.hideDetails
    });
  }

  render() {
    const { size, quantity, hideDetails } = this.state;
    const { addToCart, shirt, cart } = this.props;
    let totalStock = Object.keys(shirt.stock).map(key => shirt.stock[key]).reduce((total, sizeStock) => total + sizeStock, 0);
    return (
      <div className='item'>
        {
          (totalStock <= 0) && (
            <Label className='item-status' floating color='red' ribbon>SOLD OUT</Label>
          )
        }
        <div className={totalStock === 0 ? 'sold-out' : 'in-stock'}>
          <div className="item-image" key={shirt.imageUrls}><Image src={shirt.imageUrls} fluid /></div>
          <Form onSubmit={e => addToCart(shirt, size, quantity)}>
            <Form.Field>
              <b>{ shirt.name }</b>
              <p style={{color: 'rgba(0,0,0,0.7)'}}>${ parseFloat(shirt.price).toFixed(2) }</p>
              <div 
                className='show-details-btn'
                onClick={this.toggleHideDetails}
              >
                {hideDetails ? 'Show More Details' : 'Hide Details'}
              </div>
              <div className='mobile-item-details'>
                <p>
                  <i>"{ shirt.description }"</i>
                </p>
                <p>
                  <b>Product Details</b>
                </p>
                <ul>
                  {
                    shirt.productDetails.split(',').map((detail, index) => (
                      <li key={"detail-" + index}>{ detail }</li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <label>Size</label>
                <Dropdown className='size-dropdown' fluid disabled={totalStock === 0} onChange={(e,data) => this.setProp(e, {...data, name: 'size'})} value={size} selection options={
                  [{
                    key: 'sm', value: 'sm', text: 'Small' + (shirt.stock['sm'] === 0 ? ' (SOLD OUT)' : ''), disabled: shirt.stock['sm'] === 0
                  },
                  {
                    key: 'md', value: 'md', text: 'Medium' + (shirt.stock['md'] === 0 ? ' (SOLD OUT)' : ''), disabled: shirt.stock['md'] === 0
                  },
                  {
                    key: 'lg', value: 'lg', text: 'Large' + (shirt.stock['lg'] === 0 ? ' (SOLD OUT)' : ''), disabled: shirt.stock['lg'] === 0
                  }]
                } />
                <span>
                  <label>Quantity</label>
                  <Dropdown className='quantity-dropdown' fluid disabled={totalStock === 0} onChange={(e,data) => this.setProp(e, {...data, name: 'quantity'})} value={quantity} selection options={
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
                </span>
              </div>
            </Form.Field>
            <Form.Button
              disabled={shirt.stock[size] === 0 || cart.find(item => item.info.id === shirt.id && item.size === size) !== undefined}
              icon
              labelPosition='left'
              color='black'
            >
              <Icon name='add to cart' size='large' />
              Add To Cart
            </Form.Button>
            <div id="clear"></div>
          </Form>
        </div>
        <div className='item-details'>
          <p>
            <i>"{ shirt.description }"</i>
          </p>
          <p>
            <b>Product Details</b>
          </p>
          <ul>
            {
              shirt.productDetails.split(',').map((detail, index) => (
                <li key={'detail-' + index}>{ detail }</li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}