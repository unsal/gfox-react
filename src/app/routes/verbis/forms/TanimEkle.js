// Tanımlar > Profiller > Profil Ekle..

import React from 'react';
import {gfoxConfig}  from '../../../config/config';
import axios from 'axios';
import { updateStoreDataGfox } from "../../../components/_gfox/GfoxActions";

// Form Profil Ekle

// export default (props) => {
// bunun yerine state için class kullandım

export default class TanimEkle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      phone_area: '',
      secure:'',
      url: '',
      message: '',
      error: false
    }
  }

  componentDidMount() {
    this.setState ({
      url: gfoxConfig.apiURL+'/tanimlar/add',
    });

  }

  handleChange = (event) => {

    // event.target.name == "name"?this.setState({ name: event.target.value}):
    // event.target.name == "phone_area"?this.setState({ phone_area: event.target.value}):
    // event.target.name == "secure"?this.setState({ secure: event.target.value}):"";

    // Yukardaki yerine bu daha pratik iş görür. objeyi değişken ismine çevirmek için [obje] kulan
    this.setState({ [event.target.name]: event.target.value, message: '', error: false});

    event.preventDefault();
  }

  handleSubmit = (event) => {

    event.preventDefault();
    const formData = new FormData(event.target);

    // form yerine arg için:
    // const {id, name, url } = this.state;
    // axios.post(url, {id, name})

    axios({
      method: 'POST',
      url: this.state.url,
      data: formData,
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
    .then(result=>{
        this.setState({ error: false, message: this.state.name+ ' başarıyla eklendi'});
        console.log(result);
    })
    .catch(error => {
      this.setState({ error: true, message: "Veritabanı Hatası!"})
      console.log(error);
    });
  }

  render() {
  return (
    <form onSubmit={this.handleSubmit}>

      <input type="hidden" name="id" value={this.props.id} />

        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  {this.props.title+" Ekle"}
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">

                  {this.props.id==="saklamasuresi"?
                       <select name="name" className="form-control" onChange={this.handleChange} >
                          <option value="2">2 ay</option>
                          <option value="6">6 ay</option>
                          <option value="12">12 ay</option>
                          <option value="24">24 ay</option>
                          <option value="60">60 ay</option>
                          <option value="120">120 ay</option>
                       </select>:
                      <input autoFocus type="text" name="name" className="form-control" placeholder={this.props.title+" Adı"} onChange={this.handleChange} required />
                  }
                    </div>
                  </div>
                </div>

              {this.props.id==="guvenliulkeler"?
                        <div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <input type="text" name="phone_area" className="form-control" placeholder="Telefon Kodu" required onChange={this.handleChange} />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="checkbox pull-right">
                                        <input type="checkbox" name="secure" onChange={this.handleChange} /><span>Güvenli Ülke</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                      </div>:""
              }


              </div>

              <div className="modal-footer">

              {/*  alert: dager, info, success, warning */}


              <div className="widget-body no-padding">
                  {this.state.error?<p className="alert alert alert-danger">{this.state.message}</p>:
                   this.state.message!=''?<p className="alert alert alert-success">{this.state.message}<i className="fa fa-check"/></p>:''}
              </div>

                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Kapat
                </button>

                <button type="submit" className="btn btn-primary" >
                  Ekle
                </button>
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>

        </form>
            )
          }
}

