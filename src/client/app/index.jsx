import React from 'react';
import {render} from 'react-dom';
import PDFDocument from './prebuilt/pdfkit/pdfkit.js';
import blobStream from 'blob-stream';
import SAMTHYKKT from './samthykkt.js';

const App = React.createClass({

  getInitialState: function() {
    return {
      companyName: 'JohnCo ltd.'
    }
  },

  makePDF: function() {
    const doc = new PDFDocument;
    const stream = doc.pipe(blobStream());

    //Heading
    doc.fontSize(30);
    doc.text(SAMTHYKKT.title.title);

    //Company name
    doc.fontSize(15);
    doc.text(SAMTHYKKT.articles[0].number + 'gr.');
    doc.moveDown();
    doc.fontSize(12);
    doc.text(SAMTHYKKT.articles[0].text + this.state.companyName + '.');

    doc.end()
    stream.on('finish', function() {
      const url = stream.toBlobURL();
      window.open(url);
    });

    console.log(this.state.companyName);
  },

  _handleChange: function(event) {
    this.setState({companyName: event.target.value});
  },

  render() {
    return (
      <div>
        <p>SUP?</p>
        <div>
          <p>Enter company name</p>
          <input type="text" onChange={this._handleChange} /></div>
        <div><button onClick={() => this.makePDF()}>Save PDF</button></div>
      </div>
    );
  }
});

render(<App/>, document.getElementById('app'));
