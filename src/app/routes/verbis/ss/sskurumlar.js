 // Tanim > Profiller
import React from "react";
import { WidgetGrid, JarvisWidget } from "../../../components";
import { smallBox, bigBox, SmartMessageBox } from "../../../components/utils/actions/MessageActions";
import UiDialogLauncher from "../../../components/ui/UiDialogLauncher";
import axios from "axios";

// SSKurum Ekle
import SSKurumEkle from "../forms/sskurumekle";
// import SilBox from "./silboxKurumlar.js";

import { getAPI } from "../../../config/config";
import { MyErrorMessage, MyIcon, MySpinner } from "../unsal";

//Redux
import { connect } from "react-redux";
import store from "../../../store/configureStore";
import { updateStoreData } from "../../../components/_gfox/GfoxActions";

// import data from "./data-data.json";

// FIXME: Tanimar
class Kurumlar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiServiceUP: true, //render fonksyinu ilk anda diğer kırmı errmessage durumunu da render ettiği için true olarak başlattım.
      searchString: "",
      isLoading: true,
      didMount: false,
      url: getAPI.getSSKurumlar
    };
  }

  // load data to redux state
  loadDB() {
    axios
      .get(this.state.url)
      .then(res => {
        const data = res.data;
        store.dispatch(updateStoreData(data)); //store data güncelle

        const api = { apiServiceUP: true, didMount: true };
        this.setState({ ...api });
      })
      .catch(err => {
        console.log(err);
        this.setState({ apiServiceUP: false });
      });
  }

  componentDidMount() {
    this.loadDB();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  handleChange_Search = e => {
    e.preventDefault();
    this.setState({ searchString: e.target.value });
  };

  RenderTable = props => {
    const { apiServiceUP, data } = props; //bu componentin propsları.. aşağıda

    if (!apiServiceUP)
      return (
        <MyErrorMessage>
          <MyIcon name="fa-ban" />
          Veri Servisine Erişilemiyor
        </MyErrorMessage>
      );
    else {
      // !!!because the component is rendered before the async data arrived, you should control before to render

      let searchString = this.state.searchString.trim().toLowerCase();

      let _data = data; //reduxtan getir

      if (searchString.length > 0) {
        _data = _data.filter(key => {
          return key.birim.toLowerCase().match(searchString);
        });
      }

      return (
        <div id="content">
          <WidgetGrid>
            <div className="row">
              <article className="col-sm-12">
                <JarvisWidget
                  editbutton={false}
                  color="light"
                  colorbutton={false}
                >
                  <header>
                    <MySpinner
                      title={this.props.title}
                      isLoading={this.state.isLoading}
                    />
                    <h2>
                      {this.state.isLoading ? (
                        ""
                      ) : (
                        <button
                          className="btn btn-primary btn-xs"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          Ekle
                        </button>
                      )}
                    </h2>
                  </header>
                  <div>
                    <div className="widget-body no-padding">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-condensed table-hover smart-form has-tickbox">
                          <thead>
                            <tr>
                              <th style={{width: "40%"}}>Süreç Sahibi</th>
                              <th style={{width: "40%"}}>Paylaşılan Kurum</th>
                              <th>Kayıt Tarihi</th>
                              <th>Sil</th>
                            </tr>
                          </thead>
                          <tbody>
                            {_data.map(key => {
                              return (
                                <tr key={key.pidm}>
                                  <td> <b>{key.birim}</b> </td>
                                  <td> <b>{key.kurum}</b> </td>
                                  <td>{key.timestamp}</td>
                                  <td>
                                    {/* FIXME: SIL BOX */}

                                    <UiDialogLauncher
                                      header={
                                        "'" +
                                        key.name +
                                        "' kaydı için <h4><i className='fa fa-warning'/>Silme işlemini onaylıyor musunuz?</h4>"
                                      }
                                      // content={<SilBox pidm={key.pidm} data={_data} store={store}/>}
                                      className="btn btn-default"
                                    >
                                      Sil
                                    </UiDialogLauncher>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </JarvisWidget>
              </article>
            </div>
          </WidgetGrid>
          <SSKurumEkle data={_data} store={store} />
        </div>
      );
    }
  };

  render() {
    const apiServiceUP = this.state.apiServiceUP;
    return (
      <this.RenderTable apiServiceUP={apiServiceUP} data={this.props.data} />
    ); //data redux'tan geliyor
  }
}

// 1nci yöntem Redux connect
// const mapStateToProps = state => ({ data: state.gfox.data });
const mapStateToProps = state => (state.gfox);
export default connect(mapStateToProps)(Kurumlar)

// 2nci yöntem

// const mapStateToProps = (state, ownProps) => state.gfox;

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(GfoxActions, dispatch);
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Tanimlar);
