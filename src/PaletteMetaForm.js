import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: "form",
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(({ paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    showEmojiPicker = () => {
      this.setState({ open: "emoji"});
    }
    savePalette = (emoji) => {
      const newPalette = {
        paletteName: this.state.newPaletteName,
        emoji: emoji.native
      };
      this.props.handleSubmit(newPalette);
    }
  
    render() {
        const { newPaletteName, open } = this.state;
        const { hideForm } = this.props;
      return (
          <Fragment>
            <Dialog open={open === "emoji"} onClose={hideForm}>
              <DialogTitle>
                Choose a Palette Emoji
              </DialogTitle>
              <Picker onSelect={this.savePalette} title="Pick a Palette Emoji"/>
            </Dialog>
            <Dialog
            open={open === "form"}
            onClose={hideForm}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
            <ValidatorForm onSubmit={this.showEmojiPicker}>
              <DialogContent>
                <DialogContentText>
                  Please enter a name for your new beautiful palette...make sure it is unique.
                </DialogContentText>
                      <TextValidator
                          name="newPaletteName"
                          value={newPaletteName}
                          fullWidth
                          label="Palette Name"
                          onChange={this.handleChange}
                          validators={["required", "isPaletteNameUnique"]}
                          errorMessages={["Enter Palette Name", "Palette Name already taken"]}
                      />
              </DialogContent>
              <DialogActions>
                <Button onClick={hideForm} color="primary">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">Save Palette</Button>
              </DialogActions>
            </ValidatorForm>
          </Dialog>
          </Fragment>
      );
    }
  }
 
export default PaletteMetaForm;