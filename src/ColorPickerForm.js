import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = {
    picker: {
        width: "100% !important",
        marginTop: "2rem"
    },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    colorNameInput: {
        width: "100%",
        height: "70px",

    }
}

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentColor: "teal",
            newColorName: ""
         }
         this.updateCurrentColor = this.updateCurrentColor.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
          this.props.colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
          this.props.colors.every(({color}) => color !== this.state.currentColor)
        );
    }
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex});
    }
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({
            newColorName: ""
        });
    }
    render() { 
        const {paletteIsFull, classes} = this.props;
        const {currentColor, newColorName} = this.state;
        return ( 
            <div>
                <ChromePicker 
                    className={classes.picker}
                    color={ currentColor } 
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                        className={classes.colorNameInput}
                        placeholder="Color Name"
                        name="newColorName"
                        value={newColorName}
                        margin="normal"
                        onChange={this.handleChange}
                        variant="filled"
                        validators={[
                            "required", 
                            "isColorNameUnique", 
                            "isColorUnique"
                        ]}
                        errorMessages={[
                            "This field is required", 
                            "Color name must be unique",
                            "Color must be unique"
                        ]}
                    />
                    <Button 
                        className={classes.addColor}
                        variant="contained" 
                        color="primary" 
                        style={{background: currentColor}}
                        type="submit"
                        disabled={paletteIsFull}
                    >
                    {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>
            </ValidatorForm>
            </div>
         );
    }
}
 
export default withStyles(styles)(ColorPickerForm);