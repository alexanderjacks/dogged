import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdSense from 'react-adsense';
import SortMenu from './components/SortMenu.js';
import PopupTile from './components/PopupTile.js';
import Button from '@material-ui/core/Button';
import logo from './img/logo.png';
import './App.css';
import full from './full.json';
import Forage from './components/Forage.js';
import Crops from './components/Crops.js';
import Minerals from './components/Minerals.js';
import Fish from './components/Fish.js';
import Bundles from './components/Bundles.js';
import caveCarrot from './components/caveCarrot.js';
import Recipes from './components/Recipes.js';
import People from './components/People.js';
const forage = full.filter(thing => thing.Category == 'forage');
const crops = full.filter(thing => thing.Category == 'crop');
const bundles = full.filter(thing => thing.Category == 'bundle');
const fish = full.filter(thing => thing.Category == 'fish');
const minerals = full.filter(thing => thing.Category == 'mineral');
const recipes = full.filter(thing => thing.Category == 'recipe');
const people = full.filter(thing => thing.Category == 'NPC');
const url_ = '..'

function Index() {
  {/* these 3 req for basic Button UX*/}
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) { setAnchorEl(event.currentTarget); }
  function handleClose() { setAnchorEl(null); }

  const urlH = '..'
  const url0 = '../bundles'
  const url1 = '../forage'
  const url2 = '../crops'
  const url3 = '../minerals'
  const url4 = '../fish'
  const url5 = '../recipes'
  const url6 = '../people'

  return(
    <div className="homepage-route">
      <h1><span alt="exclamation-upside-down">¡</span>Stardewdex!</h1>
      <section>

      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        variant="contained"
        className="pulse2"
      >
        <Link to={url1}>
          <img src={require('./img/Blackberry.png')} className='exploding-icon-ux' />
          Forage
        </Link>
      </Button>

      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        variant="contained"
        className="pulse2"
      >
        <Link to={url2}>
          <img src={require('./img/Melon.png')} className='exploding-icon-ux' />
          Crops
        </Link>
      </Button>

      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        variant="contained"
        className="pulse2"
      >
        <Link to={url3}>
          <img src={require('./img/Geode.png')} className='exploding-icon-ux' />
          Minerals
        </Link>
      </Button>

      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        variant="contained"
        className="pulse2"
      >
        <Link to={url4}>
          <img src={require('./img/Dorado.png')} className='exploding-icon-ux' />
          Fish
        </Link>
      </Button>

      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        variant="contained"
        className="pulse2"
      >
        <Link to={url0}>
          <img src={require('./img/Apple.png')} className='exploding-icon-ux' />
          Bundles
        </Link>
      </Button>

      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        variant="contained"
        className="pulse2"
      >
        <Link to={url5}>
          <img src={require('./img/Sashimi.png')} className='exploding-icon-ux' />
          Recipes
        </Link>
      </Button>

      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        variant="contained"
        className="pulse2"
      >
        <Link to={url6}>
          <img src={require('./img/DialogueBubbleLove.png')} className='exploding-icon-ux' />
          People
        </Link>
      </Button>
      </section>
      <h3>Open Settings Menu (⠇) & Add To Your Home Screen</h3>
      <hr/>
      <AdSense.Google
          client='ca-pub-1699472970547311'
          slot='6359860180'
      />
      <hr/>
    </div>
  );
}
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      forage: forage,
      crops: crops,
      minerals: minerals,
      fish: fish,
      bundles: bundles,
      recipes: recipes,
      people: people,
    }
  }
  componentDidMount() { console.log("here's the app shell"); }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="rowed">
            <Link to={'/'}>
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <SortMenu/>
            <h1><span alt="exclamation-upside-down">¡</span>Stardewdex!</h1>
          </div>

          <h3>Stardew Valley Quick Guide</h3>
        </header>
        {/* BODY components, active content chosen by <NavMenu/>  */}
        <section className="App-body">
          <Route path="/" exact component={Index} />
          <Route path="/cave-carrot" exact component={caveCarrot} />

          <Route path="/bundles/"
            render={props =>
            (<Bundles {...props}
              key={this.state.bundles[0]}
              categoricals={this.state.bundles} />)
            }
          />
          <Route path="/forage/"
            render={props =>
            (<Forage {...props}
              key={this.state.forage[0]}
              categoricals={this.state.forage} />)
            }
          />
          <Route path="/crops/"
            render={props =>
            (<Crops {...props}
              key={this.state.crops[0]}
              categoricals={this.state.crops} />)
            }
          />
          <Route path="/minerals/"
            render={props =>
            (<Minerals {...props}
              key={this.state.minerals[0]}
              categoricals={this.state.minerals} />)
            }
          />
          <Route path="/fish/"
            render={props =>
            (<Fish {...props}
              key={this.state.fish[0]}
              categoricals={this.state.fish} />)
            }
          />
          <Route path="/recipes/"
            render={props =>
            (<Recipes {...props}
              key={this.state.recipes[0]}
              categoricals={this.state.recipes} />)
            }
          />
          <Route path="/people/"
            render={props =>
            (<People {...props}
              key={this.state.people[0]}
              categoricals={this.state.people} />)
            }
          />
        </section>
        <section className="App-footer coled">
          <h5>
            Use the STUFF menu!
            &nbsp;
            <SortMenu/>
          </h5>
          <ul className="rowed">
            <li>
              <a href="https://stardew.info/">
                Stardew Planner 📚
              </a>
            </li>
            <li>
              <a href="https://mouseypounds.github.io/stardew-checkup/">
                Stardew Checkup 🛰
              </a>
            </li>
          </ul>
          <h6>
            Most images copyright <a href="https://twitter.com/concernedape?lang=en" target="_blank" rel="noopener noreferrer">ConcernedApe</a>. Content available under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike.</a>
          </h6>
        </section>

      </div>
    );
  }
}
export default App;
