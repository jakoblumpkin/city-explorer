import React from 'react';
import axios from 'axios';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      location: {},
      city: '',
      display: false,
      srclink: ''
    }
  }


  locationSearch = async(e) => {
    e.preventDefault();
    const url=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;
    console.log(url);
    const result=await axios.get(url);
    const latitude=result.data[0].lat;
    const longitude=result.data[0].lon;
    console.log(latitude);
    console.log(longitude);
    this.setState({display: true,
                   srclink: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${latitude},${longitude}&zoom=13`})
    console.log(this.state.srclink);
    console.log(this.state.display);

    const SERVER = 'http://localhost:3001';
    axios.get(`${SERVER}/weather`, { params: {lon: longitude, lat: latitude}})
    .then(weather => {
      console.log(weather);
    })
    .catch(err => {
      console.error(err);
    })


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
         <img src={this.state.srclink} alt='map'/>
         </>}
      </header>
    </div>
  )
 }
}
export default App;
