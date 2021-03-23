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
    const location = await axios.get(url);
    const latitude=location.data[0].lat;
    const longitude=location.data[0].lon;
    console.log(latitude);
    console.log(longitude);
    this.setState({display: true,
                   srclink: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${latitude},${longitude}&zoom=13`})
    console.log(this.state.srclink);
    console.log(this.state.display);


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
