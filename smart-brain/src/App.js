import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import  Navigation from './components/Navigation/Navigation';
import  Logo from './components/Logo/Logo.js';
import  ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import  Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/SignIn/Signin';

const app = new Clarifai.App({
 apiKey: '5d451ba8c2394f23b4ba940f0d6919c6'
});

const particlesOptions = {
                particles: {
                number:{
                  value:80,
                  density:{
                    enable:true,
                    value_area: 800
                    }
                  }
                      
                }
              }



class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box:{},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      letftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow:height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFacebox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {

    this.setState({input:event.target.value});

  }

  onButtonSubmit= () => {

      this. setState({imageUrl: this.state.input})
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>  this.displayFacebox (this.calculateFaceLocation(response))) 
      .catch(err => console.log(err));
  } 

  onRouteChange = () => {

    this.setState({route: 'home'})

  }

  render(){
  return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}

            />

      <Navigation onRouteChange={this.onRouteChange}/>
      { this.state.route === 'signin' ?
      <Signin onRouteChange={this.onRouteChange}/>

      :<div><Logo />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}
      />
      <Rank/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div> 
}
    </div>
  );
}
}

export default App;
