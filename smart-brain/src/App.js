import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import  Navigation from './components/Navigation/Navigation';
import  Logo from './components/Logo/Logo.js';
import  ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import  Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


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
      imageUrl:''
    }
  }

  onInputChange = (event) => {

    this.setState({input:event.target.value});

  }

  onButtonSubmit= () => {

      this. setState({imageUrl: this.state.input})
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      // do something with response
      },
      function(err) {
      // there was an error
    }
  );
  } 

  render(){
  return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}

            />
      <Navigation />
      <Logo />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}
      />
      <Rank/>
      <FaceRecognition imageUrl={this.state.imageUrl}/> 

    </div>
  );
}
}

export default App;