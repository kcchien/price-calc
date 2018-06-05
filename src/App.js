import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
  Input,
  GridColumn,
  Label
} from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      b_height: 0,
      b_width: 0,
      b_edition: 0,
      b_unitPrice: 0,
      b_totalPrice: 0,
      s_height: 0,
      s_width: 0,
      s_edition: 0,
      s_unitPrice: 0,
      s_totalPrice: 0,
      estimate_price: 0,
      unit_price: 0,
      b_s_ratio: 0.0,
      b_ratio: 0.0,
      total_price: 0
    };
    this.handleBigHeightChange = this.handleBigHeightChange.bind(this);
    this.handleCalc = this.handleCalc.bind(this);
  }

  handleCalc(event, data) {
    this.setState(prevState => {
      const { b_height, b_width, b_edition, s_height, s_width, s_edition, unit_price, b_s_ratio } = prevState;

      // 大小版面積佔比(小版面積 / 大版面積)
      const _b_s_ratio = (s_height * s_width) / (b_height * b_width);

      // 大版面積總佔比 (大版版次+(小版版次*大小版面積佔比))
      const _b_ratio = s_edition * _b_s_ratio + b_edition;

      // 預估總價格 (大版面積*大版版次*每平方米單價)
      const _esti_price = b_height * b_width * b_edition * unit_price;

      // 大版單張價格 (預估總價格/大版面積總佔比)
      const _b_unitPrice = _esti_price / _b_ratio;

      // 大版總價格 (大版版次 * 大版單張價格)
      const _b_totalPrice = b_edition * _b_unitPrice;

      // 小版單張價格 (預估總價格 / 大版面積總佔比 * 大小版面積佔比)
      const _s_unitPrice = (_esti_price / _b_ratio) * _b_s_ratio;

      // 小版總價格 (小版版次 * 小版單張價格)
      const _s_totalPrice = s_edition * _s_unitPrice;

      const _total_price = _s_totalPrice + _b_totalPrice;

      return {
        b_s_ratio: _b_s_ratio,
        b_ratio: _b_ratio,
        estimate_price: _esti_price,
        b_unitPrice: _b_unitPrice.toFixed(2),
        b_totalPrice: _b_totalPrice.toFixed(2),
        s_unitPrice: _s_unitPrice.toFixed(2),
        s_totalPrice: _s_totalPrice.toFixed(2),
        total_price: _total_price.toFixed(2)
      };
    });
  }

  handleBigHeightChange(event, data) {
    const { name, value } = data;
    this.setState(() => {
      return { [name]: Number.parseFloat(value) };
    });
  }

  render() {
    return (
      <div className="App">
        <Container style={{ marginTop: '3em' }}>
          <Header as="h1">Price Caculatr</Header>
          <Grid columns={1} stackable>
            <GridColumn>
              <Header as="h2" dividing>
                大版次每平方米單位價格
              </Header>
              <Input name="unit_price" placeholder="每平方米價格" onChange={this.handleBigHeightChange} />
            </GridColumn>
          </Grid>
          <Grid columns={1} stackable>
            <Grid.Column>
              <Header as="h2" dividing>
                大版次作品資訊
              </Header>
              <Input
                name="b_height"
                label={{ basic: true, content: 'm' }}
                labelPosition="right"
                placeholder="大版次作品的高度, 例如：1.2"
                onChange={this.handleBigHeightChange}
              />
              <br />
              <br />
              <Input
                name="b_width"
                label={{ basic: true, content: 'm' }}
                labelPosition="right"
                placeholder="大版次作品的寬度, 例如：1.2"
                onChange={this.handleBigHeightChange}
              />
              <br />
              <br />
              <Input
                name="b_edition"
                label={'發行版次'}
                labelPosition="right"
                placeholder="大版次的發行版次, 例如：1.2"
                onChange={this.handleBigHeightChange}
              />
              <br />
              <br />
              <Divider />
              <div>
                <Label pointing="right">大版次單張價格</Label>
                <input type="input" value={this.state.b_unitPrice} disabled />
              </div>
              <br />
              <div>
                <Label pointing="right">大版次總價格</Label>
                <input type="input" value={this.state.b_totalPrice} disabled />
              </div>
              <Header as="h2" dividing>
                小版次作品資訊
              </Header>
              <Input
                name="s_height"
                label={{ basic: true, content: 'm' }}
                labelPosition="right"
                placeholder="小版次作品的高度, 例如：1.2"
                onChange={this.handleBigHeightChange}
              />
              <br />
              <br />
              <Input
                name="s_width"
                label={{ basic: true, content: 'm' }}
                labelPosition="right"
                placeholder="小版次作品的寬度, 例如：1.2"
                onChange={this.handleBigHeightChange}
              />
              <br />
              <br />
              <Input
                name="s_edition"
                label={'發行版次'}
                labelPosition="right"
                placeholder="小版次的發行版次, 例如：5"
                onChange={this.handleBigHeightChange}
              />
              <Divider />
              <div>
                <Label pointing="right">小版次單張價格</Label>
                <input type="input" value={this.state.s_unitPrice} disabled />
              </div>
              <br />
              <div>
                <Label pointing="right">小版次總價格</Label>
                <input type="input" value={this.state.s_totalPrice} disabled />
              </div>
            </Grid.Column>
          </Grid>
          <Divider />
          <Grid columns={1} stackable>
            <Grid.Column>
              <div>
                <Label pointing="right">總價格</Label>
                <input type="input" value={this.state.total_price} disabled />
              </div>
            </Grid.Column>
          </Grid>
          <Grid columns={1} stackable>
            <Grid.Column>
              <Button primary onClick={this.handleCalc}>
                {' '}
                GO{' '}
              </Button>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
