// Tanim > Birimler
import React from 'react';
import {Stats, WidgetGrid, JarvisWidget}  from '../../../components';
import UiDialogLauncher from "../../../components/ui/UiDialogLauncher";
import axios from "axios";
// import FormEkle from "./form";
import {gfoxConfig}  from '../../../config/config';


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


class Datagrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchString: ""
    }
  }

  // jsonToState() {
  //   axios
  //         .get("assets/data/profiller.json")
  //         .then(res => {
  //           const data = res.data;
  //           this.setState({ data });
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  // }

  dbToState() {
    const url = gfoxConfig.apiURL+"/birimler";
    // console.log(url)
    axios.get(url)
        .then(res => {
              const data = res.data;
              this.setState({ data });
              // console.log(data);
        })
        .catch(err => {
          console.log(err);
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

  render() {

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
          {/* <a className="btn btn-info btn-xs" href="#">key Ekle</a> */}

          <div className="row">
            <article className="col-sm-12">
              <JarvisWidget editbutton={false} color="light" colorbutton={false}>
                <header>
                  <h2>Birimler</h2>
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
                            <th>
                              <input autoFocus type="text" placeholder="" onChange={this.handleChange} />
                              <i className="fa fa-fw fa-xs fa-search" />
                            </th>
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
                                          <td>
                                            {/* <i className="fa fa-fw fa-xs fa-user" /> */}
                                            {key.name}
                                          </td>
                                          <td>{key.timestamp}</td>
                                          <td>
                                            <UiDialogLauncher header="<h4><i className='fa fa-warning'/> Bu keyi silmek istediğinizden emin misiniz?</h4>" content={<SilDialogKutusu />} className="btn btn-default">
                                              keyi Sil
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



      </div>;
  }

}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Tanımdata.js kodunda Hata alındı!!</h1>;
    }
    return this.props.children;
  }
}

export default class Response extends React.Component {
  render() {
    return (
        <ErrorBoundary>
          <Datagrid />
        </ErrorBoundary>
    );
  }
}