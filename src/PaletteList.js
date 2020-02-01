import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteListStyles';


class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.goToPalette = this.goToPalette.bind(this);
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() { 
        const { classes, palettes } = this.props;
        return ( 
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to={'/palette/new/'}>Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                    {palettes.map(palette => (
                        <MiniPalette {...palette} handleClick={() => this.goToPalette(palette.id)}/>
                    ))}
                    </div>
                </div>
            </div>
          );
    }
}
 
export default withStyles(styles)(PaletteList);