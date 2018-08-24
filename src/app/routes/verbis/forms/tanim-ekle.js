// Tanımlar > Profiller > Profil Ekle..

import React from 'react';

// Form Profil Ekle
export default (props) => {
  return (
        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  {props.title+" Ekle"}
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">

                  {props.title==="Saklama Süresi"?
                       <select name="form_saklamasuresi" className="form-control">
                          <option value="2">2 ay</option>
                          <option value="6">6 ay</option>
                          <option value="12">12 ay</option>
                          <option value="24">24 ay</option>
                          <option value="60">60 ay</option>
                          <option value="120">120 ay</option>
                       </select>:
                      <input type="text" name="form_adi" className="form-control" placeholder={props.title+" Adı"} required />
                  }
                    </div>
                  </div>
                </div>

              {props.title==="Güvenli Ülkeler"?
                        <div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <input type="text" name="form_telkodu" className="form-control" placeholder="Telefon Kodu" required />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="checkbox pull-right">
                                        <input type="checkbox" name="form_guvenliulke" /><span>Güvenli Ülke</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                      </div>:""
              }


              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Vazgeç
                </button>
                <button type="button" className="btn btn-primary">
                  Ekle
                </button>
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>
            )
}

