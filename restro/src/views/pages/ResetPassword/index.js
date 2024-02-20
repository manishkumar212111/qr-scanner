import React, { useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CLink,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";

import { resetPassword } from "../../../actions/auth";
import t from "src/utils/language";

const ResetPassword = (props) => {
  const token = props.match.params.token;

  const [fieldobj, setFieldObj] = useState({
    password: "",
    repeat_password: "",
  });
  const [errorObj, setErrorObj] = useState({
    repeat_password: { error: true, msg: t("Repeated password is not same") },
    password : { error : true , msg : t("Please enter min 6 chars") }
  });
  const validateField = (key, value) => {
    value = value ? value : fieldobj[key];
    switch (key) {
      case "password":
        return  validateUtility.required(value) && value.length > 5;
      case "repeat_password":
        return validateUtility.required(value) && fieldobj.password == value;
      default:
        return true;
    }
  };
  const handleChange = (e) => {
    let field = fieldobj;
    field[e.target.name] = e.target.value;
    setFieldObj((fieldOb) => ({ ...fieldOb, ...field }));

    let errOb = errorObj;
    errOb[e.target.name].error = validateField(e.target.name);

    setErrorObj((errorOb) => ({ ...errorOb, errOb }));
  };

  const handleClick = () => {
    let requiredObj = ["password", "repeat_password"];
    let errOb = errorObj;

    let status = true;
    requiredObj.forEach((element) => {
      let errorStatus = validateField(element);
      errOb[element].error = errorStatus;
      status = status && errorStatus;
    });
    setErrorObj((errorOb) => ({ ...errorOb, errOb }));
    if (!status) return;

    props.resetPassword(token, fieldobj.password);
  };
  console.log(token, props.match);

  if (!token) {
    return <div>No token found</div>;
  }
  return (
    <section class="main-form-wrapper">
      <div class="container-fluid">
        <div class="form-inner">
          <div class="form-logo">
            <img
              class="img-fluid"
              src="/images/logo.png"
              alt=""
            />
          </div>
          <div class="main-form">
            <h5>{t("Create New Password")}</h5>
            <div class="row">
              <span className="error">
                {!errorObj.password.error && errorObj.password.msg}
              </span>

              <CInputGroup className="col-md-12 form-group mb-4">
                <CInput
                  type="password"
                  className="form-input"
                  placeholder={t("Enter Password")}
                  name="password"
                  value={fieldobj.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </CInputGroup>
              <span className="error">
                {!errorObj.repeat_password.error &&
                  errorObj.repeat_password.msg}
              </span>
              <br></br>

              <CInputGroup className="col-md-12 form-group mb-2">
                <CInput
                  className="form-input"
                  type="password"
                  placeholder={t("Repeat Password")}
                  name="repeat_password"
                  value={fieldobj.repeat_password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </CInputGroup>
            </div>
            <div class="connect-btn mt-4">
              <button
                class="trans-btn"
                disabled={props.login_user_loading}
                onClick={handleClick}
              >
                {t("Reset Password")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <section class="main-form-wrapper">
    // <div class="container-fluid">
    // <div class="form-inner">
    //     <div class="form-logo">
    //     <img class="img-fluid" src="assets/img/logo.svg" alt="">
    //     </div>
    //     <div class="main-form">
    //     <h5>Create New Password</h5>
    //     <form action="">
    //         <div class="row">
    //         <div class="col-md-12 form-group mb-4">
    //             <input placeholder="New Password" type="password" class="form-input">
    //         </div>
    //         <div class="col-md-12 form-group mb-2">
    //             <input placeholder="Confirm New Password" type="password" class="form-input">
    //         </div>
    //         </div>
    //         <div class="connect-btn mt-4">
    //         <a class="trans-btn" href="#">SEND</a>
    //         </div>
    //     </form>
    //     </div>
    // </div>
    // </div>
    // </section>
  );
};

const mapStateToProps = (state) => ({
  login_user_loading: state.auth.login_user_loading,
});

const mapDispatchToProps = {
  resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
