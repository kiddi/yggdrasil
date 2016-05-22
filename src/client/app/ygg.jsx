import React from 'react';
import {render} from 'react-dom';

import PDFDocument from './prebuilt/pdfkit/pdfkit.js';
import blobStream from 'blob-stream';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

import SAMTHYKKT from './samthykkt.js';
import Basics from './basics.jsx';

const Yggdrasil = React.createClass({

  getInitialState: function() {
    return {
      companyName: '',
      companyPurpose: '',
      stepIndex: 0,
    }
  },

  handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
    console.log(this.state.companyName);
    console.log(this.state.companyPurpose);
  },

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  },

  getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <Basics
            updateCompanyName={(value) => this.setState({companyName: value})}
            updateCompanyPurpose={(value) => this.setState({companyPurpose: value.toLowerCase()})}
            />
        </div>
      );
    default:
      return (
        <div><Basics /></div>
      );
    }
  },

  _today: function() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();

    return (day + '/' + month + '/' + year);
  },

  makePDF: function() {
    const doc = new PDFDocument;
    const stream = doc.pipe(blobStream());

    //Heading
    doc.fontSize(30);
    doc.text(SAMTHYKKT.title.title);

    //1. gr
    doc.fontSize(15);
    doc.text(SAMTHYKKT.articles[0].number + ' gr.');
    doc.fontSize(12);
    doc.text(SAMTHYKKT.articles[0].text + this.state.companyName + '.');
    doc.moveDown();

    //2. gr
    doc.fontSize(15);
    doc.text(SAMTHYKKT.articles[1].number + ' gr.');
    doc.fontSize(12);
    doc.text(SAMTHYKKT.articles[1].text + this.state.companyPurpose + '.');
    doc.moveDown();

    //3 - 23. gr
    for (var i = 2; i < 23; i++) {
      doc.fontSize(15);
      doc.text(SAMTHYKKT.articles[i].number + ' gr.');
      doc.fontSize(12);
      doc.text(SAMTHYKKT.articles[i].text);
      doc.moveDown();
    }

    //Endir
    doc.fontSize(12);
    doc.text(SAMTHYKKT.endnote.endnote + this._today());

    //4. gr

    doc.end()
    stream.on('finish', function() {
      const url = stream.toBlobURL();
      window.open(url);
    });
  },

  _handleChangeName: function(event) {
    this.setState({companyName: event.target.value});
  },

  _handleChangePurpose: function(event) {
    var purp = event.target.value.toLowerCase();
    this.setState({companyPurpose: purp});
  },

  render() {

    const headingStyle = {
      fontSize: '3em',
      fontFamily: 'Roboto',
      fontStyle: 'bold',
      color: '#4CAF50',
    };

    const pStyle = {
      fontSize: '1em',
      fontFamily: 'Roboto',
      color: '#666',
    };

    const stepStyle = {
      fontSize: '0.8em',
      fontFamily: 'Roboto',
      color: '#999',
    };

    const stepIndex = this.state.stepIndex;
    const contentStyle = {margin: '0 16px'};

    return (
      <div>
        <p style={headingStyle}>Welcome to Yggdrasil</p>
        <p style={pStyle}>
          Yggdrasil is a tool that helps founders with the paperwork needed to incorporate a company in Iceland. Fill out the form, choose the paperwork you need, and click Generate PDF.
        </p>
        <p style={pStyle}>Please note that all fields should be filled out in Icelandic.</p>

      <div style={{width: '100%', margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel style={stepStyle}>Company Basics</StepLabel>
          </Step>
          <Step>
            <StepLabel style={stepStyle}>Finalize</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {stepIndex === 1 ? (
            <div>
              <RaisedButton
                label="Generate PDF"
                onMouseDown={() => this.makePDF()} />
            </div>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onMouseDown={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 0 ? 'Finish' : 'Next'}
                  primary={true}
                  onMouseDown={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
        <p style={pStyle}>Yggdrasil is created and maintained by <a href="http://nordurskautid.is">Norðurskautið.</a></p>
      </div>
    );
  }
});

export default Yggdrasil;
