
import React from 'react';

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

export const MySpinner = (props) => {
  return <h2>{props.isLoading?<i className="fa fa-refresh fa-spin" />:props.title}</h2>
}
