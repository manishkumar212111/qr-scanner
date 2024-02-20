import React, { useEffect, useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/auth";
import { CSpinner } from "@coreui/react";
import t from "../../../utils/language";
import { Link } from "react-router-dom";

const Register = (props) => {
  console.log(props);
  const [terms, setTerms] = useState(true);
  const [planName, setPlanName] = useState(
    props.location && props.location.search
      ? props.location.search.split("=")[1]
      : "free"
  );
  const [fieldobj, setFieldObj] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorObj, setErrorObj] = useState({
    email: { error: true, msg: t("Please enter valid email") },
    password: { error: true, msg: t("Please enter min 6 chars") },
    name: { error: true, msg: t("Please enter valid name") },
  });
  const validateField = (key, value) => {
    value = value ? value : fieldobj[key];
    switch (key) {
      case "name":
        return validateUtility.required(value);
      case "email":
        return validateUtility.email(value);
      case "password":
        return value.length >= 6;
      // console.log(validateUtility.required(value) && validateUtility.minLength(value , 8) , value) && (!value.match(/\d/) || !value.match(/[a-zA-Z]/));
      // return  validateUtility.required(value) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      default:
        return true;
    }
  };

  useEffect(() => {
    console.log(props.userDetail);
  }, [props.userDetail]);
  const handleChange = (e) => {
    let field = fieldobj;
    field[e.target.name] = e.target.value;
    setFieldObj((fieldOb) => ({ ...fieldOb, ...field }));

    let errOb = errorObj;
    errOb[e.target.name].error = validateField(e.target.name);

    setErrorObj((errorOb) => ({ ...errorOb, errOb }));
  };

  const handleClick = () => {
    let requiredObj = ["name", "email", "password"];
    let errOb = errorObj;

    let status = true;
    requiredObj.forEach((element) => {
      let errorStatus = validateField(element);
      errOb[element].error = errorStatus;
      status = status && errorStatus;
    });
    setErrorObj((errorOb) => ({ ...errorOb, errOb }));
    if (!status) return;

    console.log(fieldobj);
    props.registerUser({ ...fieldobj, planName: planName, acceptTermCondition:terms? true:false });
  };

  return props.userDetail &&
    props.userDetail.user &&
    !props.userDetail.user.status ? (
    <div class="form-page">
      <section class="main-form-wrapper">
        <div class="container-fluid">
          <div class="form-inner">
            <div class="form-logo">
              <img className="img-fluid" src="/images/logo.png" alt="" />
            </div>
            <div class="main-form thank-you-page">
              <img
                src="https://ik.imagekit.io/lcq5etn9k/restro/tick_bHZRtBg2f1.png?updatedAt=1628352123585"
                class="img-fluid mb-5"
                alt=""
              />
              <h3>{t("THANK YOU !")}</h3>
              <p>
                {t(
                  "for your registration, your account will be activated in less than 24 hours"
                )}
              </p>
              <Link to="/">Back to home</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div className="form-page">
      <section className="main-form-wrapper">
        <div className="container-fluid">
          <div className="form-inner">
            <div className="form-logo">
              <img className="img-fluid" src="/images/logo.png" alt="" />
            </div>
            <form>
              <div className="main-form">
                <h5>
                  {t("Register Yourself")} ({planName})
                </h5>
                <div className="row">
                  <div className="col-md-12 form-group mb-4">
                    <input
                      placeholder={t("Your Name")}
                      type="text"
                      className="form-input"
                      name="name"
                      value={fieldobj.name}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="error">
                      {!errorObj.name.error && errorObj.name.msg}
                    </span>
                  </div>
                  <div className="col-md-12 form-group mb-4">
                    <input
                      placeholder={t("Email")}
                      type="text"
                      className="form-input"
                      name="email"
                      value={fieldobj.email}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="error">
                      {!errorObj.email.error && errorObj.email.msg}
                    </span>
                  </div>
                  <div className="col-md-12 form-group mb-2">
                    <input
                      placeholder={t("Password")}
                      type="password"
                      className="form-input"
                      name="password"
                      value={fieldobj.password}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="error">
                      {!errorObj.password.error && errorObj.password.msg}
                    </span>
                  </div>
                  <div className="col-md-12 form-group mb-2">
                    <input
                      type="checkbox"
                      style={{marginRight:10, marginTop:10}}
                      // className="form-input"
                      name="password"
                      checked={terms}
                      onChange={(e) => setTerms(!terms)}
                    />
                     I accept <a target="_blank" href={"/#/term-condition"}>terms & condition</a> and <a target="_blank" href={"/#/privacy-policy"}>pricavy policy</a>
                  </div>
                </div>
                {terms && <div className="connect-btn mt-4">
                  {props.registerLoading ? (
                    <div style={{ width: "60%", marginLeft: "40%" }}>
                      <CSpinner color="info" />{" "}
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="trans-btn"
                      onClick={handleClick}
                    >
                      {t("REGISTER")}
                    </button>
                  )}
                </div>}
                <p className="login-bot mt-4 mb-0">
                  {t("Already have an account?")}{" "}
                  <a href="/#/login">{t("Login")}</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetail: state.auth.userDetail,
  registerLoading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { registerUser })(Register);
