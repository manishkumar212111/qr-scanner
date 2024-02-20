import React , { useState } from "react";
import validateUtility from "../../../utils/ValidateUtility"
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";

import {sendResetLink} from "../../../actions/auth"  
import { CSpinner } from "@coreui/react";
import t from "src/utils/language";

const ForgotPassword = (props) => {

    const history = useHistory()
    const [fieldobj , setFieldObj] = useState({ email: ""});
    const [errorObj , setErrorObj] = useState({ email : { error : true , msg : "Please enter valid email" } })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "email" :
                return  validateUtility.email(value);
            default :
                return true;
        }
    }
    const handleChange = (e) => {
      console.log(e.target.value)
        let field = fieldobj;
        field[e.target.name] = e.target.value;
        setFieldObj(fieldOb => ({...fieldOb , ...field}))

        let errOb = errorObj;
        errOb[e.target.name].error = validateField(e.target.name);

        setErrorObj( errorOb => ( { ...errorOb , errOb}))
    }
    
    const handleClick = () => {
        let requiredObj = ['email'];
        let errOb = errorObj;

        let status = true;
        requiredObj.forEach(element => {
            let errorStatus = validateField(element);
            errOb[element].error = errorStatus;
            status = status && errorStatus;
        })
        setErrorObj( errorOb => ( { ...errorOb , errOb}))
        if(!status)
            return;
        
        props.sendResetLink(fieldobj)  

    }
    console.log(fieldobj)
    return (
      <div class="form-page">
        <section class="main-form-wrapper">
            <div class="container-fluid">
              <div class="form-inner">
                <div class="form-logo">
                  <img class="img-fluid" src="/images/logo.png" alt="" />
                </div>
                <div class="main-form">
                  <h5>{t("Forgot Password ?")}</h5>
                    <div class="row">
                      <div class="col-md-12 form-group mb-1">
                        <p>{t("Get password reset link")}</p>
                      </div>
                      <div class="col-12 col-md-12 form-group mb-4">
                        <input type="email" type="text" placeholder={t("Enter your email")} name="email" value={fieldobj.email} onChange={(e) => handleChange(e)} class="form-input" />
                      </div>
                    </div>
                    {props.login_user_loading ? <div style={{ marginLeft : "45%"}}><CSpinner /></div> : <>
                      {fieldobj.email && <div class="connect-btn mt-4">
                      <button class="trans-btn" onClick={handleClick}>{t("SEND")}</button>
                    </div>}
                    </>}                    
                </div>
              </div>
            </div>
          </section>
        </div>

    )
}


const mapStateToProps = ( state ) => ( {
    login_user_loading: state.auth.login_user_loading,
  } );
  
  const mapDispatchToProps = {
    sendResetLink
  };
  
export default connect( mapStateToProps, mapDispatchToProps )( ForgotPassword );
