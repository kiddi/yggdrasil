import React from 'react';
import {render} from 'react-dom';

import PDFDocument from './prebuilt/pdfkit/pdfkit.js';
import blobStream from 'blob-stream';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import SAMTHYKKT from './samthykkt.js';

const Yggdrasil = React.createClass({

  getInitialState: function() {
    return {
      companyName: '',
      companyPurpose: ''
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
      color: '#5cb85c',
    };

    const pStyle = {
      textSize: '3em',
      fontFamily: 'Roboto',
      color: '#999',
    };

    return (
      <div>
        <p style={headingStyle}>Welcome to Yggdrasil</p>
        <p style={pStyle}>
          Yggdrasil is a tool that helps founder with the paperwork needed to incorporate a company in Iceland. Fill out the form, choose the paperwork you need, and click Generate PDF.
        </p>
        <p style={pStyle}>Please note that all fields should be filled out in Icelandic.</p>
        <div>
          <TextField
            hintText="i.e. Death Star ehf."
            floatingLabelText="Company Name"
            onChange={this._handleChangeName}
            />
        </div>
        <div>
          <TextField
            hintText="i.e. ráða heiminum"
            floatingLabelText="Company Purpose"
            onChange={this._handleChangePurpose}
            />
        </div>
        <div>
          <RaisedButton
            label="Generate PDF"
            onMouseDown={() => this.makePDF()} />
        </div>
        <p style={pStyle}>Yggdrasil is created and maintained by <a href="http://nordurskautid.is">Norðurskautið.</a></p>
      </div>
    );
  }
});

export default Yggdrasil;
