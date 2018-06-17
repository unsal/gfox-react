// Tanim > Profiller
import React from 'react';
import {Stats, WidgetGrid, JarvisWidget}  from '../../../components';
import UiDialogLauncher from "../../../components/ui/UiDialogLauncher";
import axios from "axios";
import FormEkle from "../forms/profiller-form";
import {gfoxConfig}  from '../../../config/config';
import { MyErrorMessage, MyIcon } from '../unsal.js';


// import data from "./data-data.json";
class SilDialogKutusu extends React.Component {
  _submitDialog = e => {
    console.log("submit stuff");
    this.props.closeDialog(e);
  };
  render() {
    return (
      <div id="dialog_simple">
        <form>
          <p>
            Eğer bu key kişisel veri ve süreç envanteri
            ile ilişkilendirilmişse silinemeyecektir.
            Öncelikle tüm ilişkileri silmeniz gerekir.
          </p>

          <div>
            <button className="btn btn-default" onClick={this._submitDialog}>
              <i className="fa fa-trash-o" />&nbsp; Vazgeç
            </button> {' '}
            <button
              className="btn btn-danger"
              onClick={this.props.closeDialog}
            >
              <i className="fa fa-times" />&nbsp; Sil
            </button>
          </div>
        </form>
      </div>
    );
  }
}


export class SSKurumlar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      apiServiceUP: true, //render fonksyinu ilk anda diğer kırmı errmessage durumunu da render ettiği için true olarak başlattım.
      searchString: ""
    }
  }

  dbToState() {
    const url = gfoxConfig.apiURL+this.props.data;
    // console.log(url)
    axios.get(url)
        .then(res => {
              const api = { data: res.data, apiServiceUP: true }
              this.setState({ ...api});
        })
        .catch(err => {
          console.log(err);
          this.setState({ apiServiceUP: false, errorMessage: err })
        });
  }

  componentDidMount() {

        this.dbToState();
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
                          <h2>{this.props.title}</h2>
                          <h2>
                            <button className="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal">
                              Ekle
                            </button>
                          </h2>

                        </header>
                        <div>
                          <div className="widget-body no-padding">
                            <div className="table-responsive">
                              <table className="table table-bordered table-striped table-condensed table-hover smart-form has-tickbox">
                                <thead>
                                  <tr>
                                    <th>Kodu</th>
                                    <th> Süreç Sahibi </th>
                                    <th> Paylaşılan Kurum </th>
                                    <th>Zaman Damgası</th>
                                    <th>Aksiyon</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {

                                    data
                                      .map(key => {
                                              return <tr key={key.id}>
                                                  <td style={{ textAlign: "right" }}>
                                                    {key.id}
                                                  </td>
                                                  <td> {key.birim} </td>
                                                  <td> {key.kurum} </td>
                                                  <td> {key.timestamp}</td>
                                                  <td>
                                                    <UiDialogLauncher header="<h4><i className='fa fa-warning'/> Bu keyi silmek istediğinizden emin misiniz?</h4>" content={<SilDialogKutusu />} className="btn btn-default">
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

                <FormEkle id="myModal"/>
                </div>
    }

  }

  render() {
    const apiServiceUP = this.state.apiServiceUP;
    return <this.Render apiServiceUP={apiServiceUP} />
  }

}



export class SSDokumanlar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      apiServiceUP: true, //render fonksyinu ilk anda diğer kırmı errmessage durumunu da render ettiği için true olarak başlattım.
      searchString: ""
    }
  }

  dbToState() {
    const url = gfoxConfig.apiURL+this.props.data;
    // console.log(url)
    axios.get(url)
        .then(res => {
              const api = { data: res.data, apiServiceUP: true }
              this.setState({ ...api});
        })
        .catch(err => {
          console.log(err);
          this.setState({ apiServiceUP: false, errorMessage: err })
        });
  }

  componentDidMount() {
        this.dbToState();
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
                          <h2>{this.props.title}</h2>
                          <h2>
                            <button className="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal">
                              Ekle
                            </button>
                          </h2>

                        </header>
                        <div>
                          <div className="widget-body no-padding">
                            <div className="table-responsive">
                              <table className="table table-bordered table-striped table-condensed table-hover smart-form has-tickbox">
                                <thead>
                                  <tr>
                                    <th>Kodu</th>
                                    <th>Süreç Sahibi </th>
                                    <th>Doküman </th>
                                    <th>Zaman Damgası</th>
                                    <th>Aksiyon</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {

                                    data
                                      .map(key => {
                                              return <tr key={key.id}>
                                                  <td style={{ textAlign: "right" }}>
                                                    {key.id}
                                                  </td>
                                                  <td> {key.birim} </td>
                                                  <td> {key.dokuman} </td>
                                                  <td> {key.timestamp}</td>
                                                  <td>
                                                    <UiDialogLauncher header="<h4><i className='fa fa-warning'/> Bu keyi silmek istediğinizden emin misiniz?</h4>" content={<SilDialogKutusu />} className="btn btn-default">
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

                <FormEkle id="myModal"/>
                </div>
    }

  }

  render() {
    const apiServiceUP = this.state.apiServiceUP;
    return <this.Render apiServiceUP={apiServiceUP} />
  }

}