import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Segment, Grid, Header, Image, Label, Icon, Form } from 'semantic-ui-react';

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
    stock: 0
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={require('./imgs/logo.png')} className="App-logo" alt="logo" />
          <h2>Welcome to Haru the Shiba Inu's Shop!</h2>
        </div>
        <div className="App-intro">
          <Grid columns={3} doubling>
            {
              shirts.map(shirt => (
                <Grid.Column key={shirt.name}>
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
                  </Segment>
                </Grid.Column>
              ))
            }
          </Grid>
        </div>
      </div>
    );
  }
}
