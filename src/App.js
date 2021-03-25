import React from 'react';
import axios from 'axios';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      location: {},
      city: '',
      display: false,
      srclink: '',
      weatherData:''
    }
  }


  locationSearch = async(e) => {
    e.preventDefault();
    //first api which graps a map and display
    const url=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;
    const result=await axios.get(url);
    const latitude=result.data[0].lat;
    const longitude=result.data[0].lon;
    this.setState({display: true,
                   srclink: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${latitude},${longitude}&zoom=13`});


    //weather
    const SERVER = `http://localhost:3001`;
    const total=await axios.get(`${SERVER}/weather`, { params: {lon: longitude, lat: latitude}});
    const weatherData=total.data;
    this.setState({weatherData: weatherData});
    


  }

  render () {
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={this.locationSearch}>
          <input onChange={(e) => this.setState({city: e.target.value})} 
          name='lat' type='text' placeholder='city' />
          <button>Explore!</button>
        </form>
        <h2>Welcome</h2>
         {this.state.display &&
         <>
         <h2>{this.state.city}</h2>
         <p>{this.state.weatherData}</p>
         <img src={this.state.srclink} alt='map'/>
         </>}
      </header>
    </div>
  )
 }
}
export default App;
