import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {
  constructor(props) {
    super(props);
    this.savePalette = this.savePalette.bind(this);
    this.state = {
      palettes: seedColors
    }
  }
  findPalette(id){
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    })
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  }
  render() {
    return (
      <Switch>
        <Route 
          exact
          path='/palette/new'
          render={(routeProps) => <NewPaletteForm  savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes}/>}
        />
        <Route 
          exact 
          path='/' 
          render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />}
        />
        <Route 
          exact 
          path='/palette/:id' 
          render={routeProps => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
          )} />
          <Route 
            exact 
            path='/palette/:paletteId/:colorId'
            render={routeProps => (
              <SingleColorPalette 
                palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                colorId={routeProps.match.params.colorId} />
            )}
          />

          {/* <div className="App">
            <Palette palette={generatePalette(seedColors[4])}/>
          </div> */}
      </Switch>
    );
  }
}

export default App;
