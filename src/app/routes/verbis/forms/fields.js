// Tanımlar > Profiller > Profil Ekle..

import React from 'react';
import {getApi4}  from '../../../config/config';
import axios from 'axios';
import Select from 'react-select';

export class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [], //pure data from api
      data: [], //Options Data..
    }
  }

  componentDidMount() {

    const api = getApi4(this.props.id)
    let data = [];
    axios
      .get(api)
      .then(res => {
        this.setState({ apiData: res.data });
      })
      .then(()=>{
        this.state.apiData.map(key => {
          data = data.concat({"value":key.pidm, "label":key.name})
        });
      }
      )
      .then(()=>{
        this.setState({ data })
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    return (
      this.props.isMulti?
      <Select
          isMulti
          name={this.props.id}
          className="basic-multi-select"
          classNamePrefix="select"
          options={this.state.data}
      />:
      <Select
        name={this.props.id}
        className="basic-single"
        classNamePrefix="select"
        options={this.state.data}
      />

    )
  }

}