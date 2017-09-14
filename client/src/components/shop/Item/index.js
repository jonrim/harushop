import React, { Component } from 'react';
import { Segment, Header, Image, Label, Icon, Form, Dropdown, Message } from 'semantic-ui-react';
import 'ie-array-find-polyfill';
import Slider from 'react-slick';

class PrevNavButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick} className='fa fa-arrow-circle-left fa-3x' />
  }
}

class NextNavButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick} className='fa fa-arrow-circle-right fa-3x' />
  }
}

export default class Item extends Component {
  constructor(props) {
    super(props);
    let shirt = props.shirt;
    this.state = {
      size: shirt.stock['sm'] > 0 ? 'sm' : (shirt.stock['md'] > 0 ? 'md' : 'lg'),
      quantity: 1
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

  componentDidMount() {
    const { index } = this.props;
    let item = document.getElementsByClassName('item')[index];
  }

  render() {
    const { size, quantity } = this.state;
    const { addToCart, shirt, cart } = this.props;
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <PrevNavButton/>,
      nextArrow: <NextNavButton/>
    };
    let totalStock = Object.keys(shirt.stock).map(key => shirt.stock[key]).reduce((total, sizeStock) => total + sizeStock, 0);
    return (
      <div className='item'>
        {
          (totalStock <= 0) && (
            <Label className='item-status' floating color='red' ribbon>SOLD OUT</Label>
          )
        }
        <Segment className={totalStock === 0 ? 'sold-out' : 'in-stock'}>
          <Slider ref={slider => this.slider = slider} {...settings}>
            {
              shirt.imageUrls.split(',').map(imageUrl => (
                <div className="item-image" key={imageUrl}><Image shape='rounded' src={imageUrl} fluid /></div>
              ))
            }
          </Slider>
          <Form onSubmit={e => addToCart(shirt, size, quantity)}>
            <Form.Field>
              <b>{ shirt.name }</b>
              <p>${ shirt.price % 1 === 0 ? Math.trunc(shirt.price) : parseFloat(shirt.price).toFixed(2) }</p>
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
        <Segment className='item-details'>
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
        </Segment>
      </div>
    )
  }
}