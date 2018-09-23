// Tanımlar > Profiller > Profil Ekle..

import React from 'react';
import {getApi4}  from '../../../config/config';
import axios from 'axios';

export class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {

    const api = getApi4(this.props.id)

    axios
      .get(api)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <select name="Kurum" className="form-control" >
        {
          this.state.data.map(key => {
            return <option key={key.pidm} value={key.pidm}>{key.name}</option>
          })
        }
      </select>
    )
  }

}