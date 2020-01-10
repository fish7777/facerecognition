import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import  Navigation from './components/Navigation/Navigation';
import  Logo from './components/Logo/Logo.js';
import  ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import  Rank from './components/Rank/Rank';


const particlesOptions = {
                particles: {
                number:{
                  value:40,
                  density:{
                    enable:true,
                    value_area: 800
                    }
                  }
                      
                }
              }



class App extends Component {
  render(){
  return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}

            />
      <Navigation />
      <Logo />
      <ImageLinkForm />
      <Rank/>
      {/*
      <FaceRecognition /> */}

    </div>
  );
}
}

export default App;
