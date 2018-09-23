// Tanımlar > Profiller > Profil Ekle..

import React from 'react';
import axios from 'axios';
import {SelectBox} from './fields.js';
import {tanimlarID} from '../../../config/config';


export default class SSKurumEkle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: false
    }
  }

  componentDidMount() {

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

    axios({
      method: 'POST',
      url: this.state.url_add_sskurumlar,
      data: formData,
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
    .then(result=>{
        this.setState({ error: false, message: this.state.name+ ' başarıyla eklendi'});
    })
    .then(()=>
      {
        const {data, store} = this.props;
        // const dataCopy = data.concat([{"name":formData.get("name")}])
        // store.dispatch(gfox.updateStoreData(dataCopy))
      }
    )
    .catch(error => {
      this.setState({ error: true, message: "Veritabanı Hatası!"})
      console.log(error);
    });
  }

  render() {
  return (
    <form onSubmit={this.handleSubmit}>

        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Paylaşılan Kurumlar
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                        <span>Süreç Sahibi</span>
                        <SelectBox id={tanimlarID.birimler}/>
                        <span>Kişisel Veri Paylaşılan Kurum</span>
                        <SelectBox id={tanimlarID.kurumlar}/>

                    </div>
                  </div>
                </div>

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
