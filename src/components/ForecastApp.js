import React, { Component } from 'react';
import axios from 'axios';
import Forecast from './Forecast';
import RaisedButton from 'material-ui/RaisedButton';

class ForecastApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        step:0,
        forecastData:[]
    }
  }
  componentWillMount(){
    axios.get('http://api.wunderground.com/api/44539645ac11cd74/forecast10day/q/CA/San_Francisco.json')
      .then(function(response){
        var forecastResponse = response.data.forecast.simpleforecast.forecastday;
        this.setState({forecastData:forecastResponse});
        console.log(forecastResponse);
      }.bind(this));
  }
  increaseStep(){
    var stepPlus = this.state.step;
    if (stepPlus >= this.state.forecastData.length - 1){
      return
    };
    stepPlus++;
    this.setState({step:stepPlus});
  }
  decreaseStep(){
    var stepMinus= this.state.step;
    if (stepMinus <= 0){
      return
    };
    stepMinus--;
    this.setState({step:stepMinus});
  }
  render(){
    return (
      <div>
        <div className="container forecast-app">
          <div className="row">
            <div className="col-8">
              <Forecast forecastData={this.state.forecastData} step={this.state.step} />
              <RaisedButton className="button-previous" onClick={this.decreaseStep.bind(this)} label="Previous" />
              <RaisedButton onClick={this.increaseStep.bind(this)} label="Next" />
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default ForecastApp;
