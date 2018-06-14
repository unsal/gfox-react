// Tanımlar > Profiller

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
                  Profil Ekle
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Kodu" disabled />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Profil Adı" required />
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" placeholder="Açıklama" rows="5" required />
                    </div>
                  </div>
                </div>
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

