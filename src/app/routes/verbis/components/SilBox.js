import React from "react";
import axios from "axios";

import { gfoxConfig } from "../../../config/config";

//Redux
import { updateStoreDataGfox } from "../../../components/_gfox/GfoxActions";

// import data from "./data-data.json";
export default class SilBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      message:
        "Not: Bu kayıt kişisel veri ve süreç envanteri ile ilişkilendirilmişse silinemeyecektir. Öncelikle tüm ilişkileri silmeniz gerekir.",
      record_deleted: false
    };
  }

  componentDidMount() {
    this.setState({
      url: gfoxConfig.apiURL + "/tanimlar/del"
    });
  }

  // Sil
  handleSubmitSil = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {id, pidm, tableData, store} = this.props;
    formData.set("id", id);
    formData.set("pidm", pidm);

    // form yerine arg için:
    // const {id, name, url } = this.state;
    // axios.post(url, {id, name})

    axios({
      method: "POST",
      url: this.state.url,
      data: formData
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(result => {
        this.setState({
          record_deleted: true,
          error: false,
          message: <strong>{pidm+ " başarıyla silindi"}</strong>
        });
        console.log(this.state.message);
      })
      .then (()=> {
        // Delete Table Row
          const dataCopy = tableData.filter((row) => row.pidm !== pidm);
          store.dispatch(updateStoreDataGfox(dataCopy));
      })
      .catch(error => {
        this.setState({
          record_deleted: false,
          error: true,
          message: "!! Başarısız işlem !!"
        });
        console.log(error);
      });
  };

  render() {
    return (
      <div id="dialog_simple">
        <form onSubmit={this.handleSubmitSil}>
          {/* <input type="hidden" name="pidm" value={this.props.pidm} /> */}

          <p>{this.state.message} </p>

          <div>
            {!this.state.record_deleted ?
              ( <button type="submit" className="btn btn-danger"> Onaylıyorum </button> ) :
              ( <span /> )}
          </div>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => (state.gfox); //confiReducerda combineReducer kullanıldığı için
// export default connect(mapStateToProps)(SilBox)


