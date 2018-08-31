// Tanim > Profiller
import React from 'react';
import {Stats, WidgetGrid, JarvisWidget}  from '../../../components';
import UiDialogLauncher from "../../../components/ui/UiDialogLauncher";
import axios from "axios";

// Tanım Ekle
import TanimEkle from "../forms/tanim-ekle"

import {gfoxConfig}  from '../../../config/config';
import { MyErrorMessage, MyIcon, MySpinner } from '../unsal.js';


// import data from "./data-data.json";
class SilBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      message: ''
    }
  }

  componentDidMount() {
    this.setState ({
      url: gfoxConfig.apiURL+'/tanimlar/del/profiller',
      message: ''
    });
  }

  handleVazgec = (event) => {
    console.log("Vazgeçildi..");
    this.props.closeDialog(event);
  };


  // Sil
  handleSubmit = (event) => {

    event.preventDefault();

    const formData = new FormData(event.target);
    formData.set('pidm', "68");

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
        this.setState({ error: false, message: this.props.pidm+ ' başarıyla silindi'});
        console.log(result);
    })
    .catch(error => {
      this.setState({ error: true, message: "Başarısız işlem!"})
      console.log(error);
    });
  }

  render() {
    return (
      <div id="dialog_simple">
        <form onSubmit={this.handleSubmit}>
          <p>{this.props.pidm+ " Eğer bu key kişisel veri ve süreç envanteri ile ilişkilendirilmişse silinemeyecektir. Öncelikle tüm ilişkileri silmeniz gerekir."}
          </p>
          <p>{this.state.message}</p>

          <div>
            <button className="btn btn-default" onClick={this.handleVazgec}>
              <i className="fa fa-trash-o" />&nbsp; Vazgeç
            </button> {' '}
            <button type="submit" className="btn btn-danger">
              <i className="fa fa-times" />&nbsp; Onaylıyorum
            </button>
          </div>
        </form>
      </div>
    );
  }
}


export default class Tanimlar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      apiServiceUP: true, //render fonksyinu ilk anda diğer kırmı errmessage durumunu da render ettiği için true olarak başlattım.
      searchString: "",
      isLoading: true,
      didMount: false
    }
  }

  dbToState() {
    const url = gfoxConfig.apiURL+this.props.datasource;
    // console.log(url)
    axios.get(url)
        .then(res => {
              const api = { data: res.data, apiServiceUP: true }
              this.setState({ ...api, didMount: true});
        })
        .catch(err => {
          console.log(err);
          this.setState({ apiServiceUP: false, errorMessage: err })
        });
  }

  componentDidMount() {
        this.dbToState();
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevState.didMount !== this.state.didMount) {
        this.setState({ isLoading: false })
      }
  }

  handleChange = e => {
    e.preventDefault();
    console.log("Key pressed");
    this.setState({ searchString: e.target.value })
  }

  Render = (props) => {
    if (!props.apiServiceUP)
        return <MyErrorMessage><MyIcon name="fa-ban" />Veri Servisine Erişilemiyor</MyErrorMessage>
    else {
          // !!!because the component is rendered before the async data arrived, you should control before to render
          let data = this.state.data;

          // Sistemler ve Ulkerler'deki ekstra kolonları basmak için kontrol
          const isSistemler = this.props.title==="Sistemler";
          const isUlkeler = this.props.title==="Güvenli Ülkeler";

          let searchString = this.state.searchString.trim().toLowerCase();

          if (searchString.length > 0) {
            data = data.filter(key => {
              return key.name.toLowerCase().match(searchString);
            }
            )
          }

          return <div id="content">
                <WidgetGrid>
                  <div className="row">
                    <article className="col-sm-12">
                      <JarvisWidget editbutton={false} color="light" colorbutton={false}>
                        <header>
                          <MySpinner title={this.props.title} isLoading={this.state.isLoading} />
                          <h2>
                            {this.state.isLoading?'':
                            <button className="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal">
                                  Ekle
                            </button>
                            }
                          </h2>

                        </header>
                        <div>
                          <div className="widget-body no-padding">
                            <div className="table-responsive">
                              <table className="table table-bordered table-striped table-condensed table-hover smart-form has-tickbox">
                                <thead>
                                  <tr>
                                    <th style={{width:'60%'}}>
                                      <input autoFocus type="text" placeholder="" onChange={this.handleChange} />
                                      <i className="fa fa-fw fa-xs fa-search" />
                                    </th>

                                    {isSistemler?<th>Dahili</th>:""}
                                    {isUlkeler?<th>Tel Kodu</th>:""}
                                    {isUlkeler?<th>Güvenli</th>:""}

                                    <th>Zaman Damgası</th>
                                    <th>Aksiyon</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {

                                    data
                                      .map(key => {
                                              return <tr key={key.pidm}>
                                                  <td><b> {key.name} </b></td>

                                                  {isSistemler?<th>{key.type==="1"?<MyIcon name="fa-hdd-o"/>:<MyIcon name="fa-cloud"/>}</th>:""}
                                                  {isUlkeler?<th>{key.phone_area}</th>:""}
                                                  {isUlkeler?<th>{key.secure?<MyIcon name="fa-check-circle" />:""}</th>:""}

                                                  <td>{key.timestamp}</td>
                                                  <td>
                                                    {/* TODO: SIL BOX */}
                                                    <UiDialogLauncher
                                                      header={"'"+key.pidm+"' için <h4><i className='fa fa-warning'/>Silme işlemini onaylıyor musunuz?</h4>"}
                                                      content={<SilBox pidm={key.pidm} />}
                                                      className="btn btn-default">
                                                      Sil
                                                    </UiDialogLauncher>
                                                  </td>
                                                </tr>;
                                            })
                                }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </JarvisWidget>
                    </article>
                  </div>
                </WidgetGrid>
                {
                   this.props.title == "Profiller"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Birimler"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Kişisel Veriler"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "İşlenme Amacı"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Toplama Kanalları"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "KV Sistemler"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "KV Dokümanlar"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Dayanaklar"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Arşiv Ortamlar"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Saklama Süresi"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Kurumlar"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Paylaşım Amaçları"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Paylaşım Şekilleri"?<TanimEkle title={this.props.title} id="myModal"/>:
                   this.props.title == "Güvenli Ülkeler"?<TanimEkle title={this.props.title} id="myModal"/>:""

                }
                </div>
    }

  }

  render() {
    const apiServiceUP = this.state.apiServiceUP;
    return <this.Render apiServiceUP={apiServiceUP} />
  }

}

