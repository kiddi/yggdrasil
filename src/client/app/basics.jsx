import React from 'react';
import {render} from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Basics = React.createClass({

  propTypes: {
    updateCompanyName: React.PropTypes.func,
    updateCompanyPurpose: React.PropTypes.func,
  },

  render() {
    return (
      <div>
        <div>
          <TextField
            hintText="i.e. Death Star ehf."
            floatingLabelText="Company Name"
            onChange={(event) => this.props.updateCompanyName(event.target.value)}
            />
        </div>
        <div>
          <TextField
            hintText="i.e. ráða heiminum"
            floatingLabelText="Company Purpose"
            onChange={(event) => this.props.updateCompanyPurpose(event.target.value)}
            />
        </div>
      </div>
    );
  },

});

export default Basics;

//<CompanyDetails updateCompanyName={(value) => this.setState({companyName: value})} />
