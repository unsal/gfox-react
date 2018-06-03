
import React from 'react';

// // Aşağıdakinin class versiyonu:
// export class ErrorMessage  extends React.Component {
//   render() {
//     return (
//       <div className="alert alert-danger fade in">
//          <button className="close" data-dismiss="alert">
//            ×
//          </button>
//          <i className="fa-fw fa fa-times"/>
//          <strong>Hata!</strong> {this.props.children}
//        </div>
//     )
//   }
// }

export const MyErrorMessage =(props)=> {
   return <div className="alert alert-danger fade in">
          <button className="close" data-dismiss="alert">
            ×
          </button>
          <i className="fa-fw fa fa-ban"/>
          <strong>Hata!</strong> {props.children}
        </div>
}


export const MyIcon = (props)=> {
  return <i className={"fa-fw fa "+props.name}/>

}
