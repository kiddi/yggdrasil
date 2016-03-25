import React from 'react';
import {render} from 'react-dom';
import PDFDocument from './prebuilt/pdfkit/pdfkit.js';
import blobStream from 'blob-stream';

const App = React.createClass({

  makePDF: function() {
    const doc = new PDFDocument;
    const stream = doc.pipe(blobStream());

    doc.text('Hello world!');

    doc.end()
    stream.on('finish', function() {
      const url = stream.toBlobURL();
      window.open(url); 
    });

    console.log('you should now have a pdf');
  },

  render() {
    return (
      <div>
        <p>SUP?</p>
        <div><button onClick={() => this.makePDF()}>Save PDF</button></div>
      </div>
    );
  }
});

render(<App/>, document.getElementById('app'));
