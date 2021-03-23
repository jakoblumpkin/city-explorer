import React from 'react';
import axios from 'axios';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      location: {},
      city: ''
    }
  }


  locationSearch = async(e) => {
    e.preventDefault();
    this.setState({ city: e.target.lat.value });
    const url=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=&format=json`;
    console.log(url);
    const location = await axios.get(url);
    console.log(location.data[0]);
  }

  render () {
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={this.locationSearch}>
          <input onChange={(e) => this.setState({city: e.target.value})} 
          name='lat' type='text' />
          <button>Explore!</button>
        </form>
        <p>{this.state.city}</p>
      </header>
    </div>
  )
 }
}
export default App;
