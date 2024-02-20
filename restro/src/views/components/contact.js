import React, { useEffect, useState } from "react";
import validateUtility from "src/utils/ValidateUtility";
import { connect } from "react-redux";
import { submitContact } from "src/actions/contact";
import { CSpinner } from "@coreui/react";

const Contact = (props) => {
  const [fieldobj, setFieldObj] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    description: "",
  });
  const [errorObj, setErrorObj] = useState({
    name: { error: true, msg: "Please enter valid name" },
    email: { error: true, msg: "Please enter correct email" },
    mobile: { error: true, msg: "Please enter valid mobile number" },
    subject: { error: true, msg: "Please enter valid subject" },
    description: { error: true, msg: "Please enter atleast 10 chars" },
  });
  const validateField = (key, value) => {
    value = value ? value : fieldobj[key];
    switch (key) {
      case "name":
        return validateUtility.required(value);
      case "email":
        return validateUtility.required(value) && validateUtility.email(value);
      case "mobile":
        return (
          validateUtility.required(value) && validateUtility.minLength(value, 8)
        );
      case "subject":
        return validateUtility.required(value);
      case "description":
        return (
          validateUtility.required(value) &&
          validateUtility.minLength(value, 10)
        );
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
    let requiredObj = ["name", "mobile", "email", "subject", "description"];
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
    props.submitContact({ ...fieldobj });
  };
  return (
    <div className="row" style={{marginBottom:40}}>
      <div className="col-md-12 pb-4 six-bg-image">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-5">
              <h2 className="banifit-heading">Contact Us</h2>
              <div className="Work-under"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 contact-form col-md-6">
              <div className="connect-form-wrapper">
                <h5>Write To Us</h5>
                <div className="row">
                  <div className="col-md-6 form-group mb-4">
                    <span className="error">
                      {!errorObj.name.error && errorObj.name.msg}
                    </span>
                    <input
                      placeholder="Full Name"
                      type="text"
                      className="form-input"
                      name="name"
                      value={fieldobj.name}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-4">
                    <span className="error">
                      {!errorObj.email.error && errorObj.email.msg}
                    </span>
                    <input
                      placeholder="Email Id"
                      type="email"
                      className="form-input"
                      name="email"
                      value={fieldobj.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-4">
                    <span className="error">
                      {!errorObj.mobile.error && errorObj.mobile.msg}
                    </span>
                    <input
                      placeholder="Phone Number"
                      type="text"
                      data-vu-type="number"
                      onKeyPress={(e) => validateUtility.stopDefault(e)}
                      className="form-input"
                      name="mobile"
                      value={fieldobj.mobile}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6 form-group mb-4">
                    <span className="error">
                      {!errorObj.subject.error && errorObj.subject.msg}
                    </span>
                    <input
                      placeholder="Subject"
                      type="text"
                      className="form-input"
                      name="subject"
                      value={fieldobj.subject}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <span className="error">
                      {!errorObj.description.error && errorObj.description.msg}
                    </span>
                    <textarea
                      placeholder="Your Message"
                      className="form-input"
                      name=""
                      style={{height:"250px"}}
                      id=""
                      cols="30"
                      rows="10"
                      name="description"
                      value={fieldobj.description}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>
                <div className="connect-btn">
                  {props.submitLoading ? (
                    <div style={{ width: "60%", marginLeft: "40%" }}>
                      <CSpinner color="info" />{" "}
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="contact_button"
                      onClick={handleClick}
                    >
                      Send <i class="fa fa-paper-plane ml-3"></i>
                    </button>
                  )}
                </div>

                {props.message && (
                  <span style={{ color: "green" }}>{props.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-5 ifrm-box">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {/* <iframe
                      src="https:www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.8841190945673!2d51.1103886!3d17.0286323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db36c532202fb%3A0x86a44eb0c07e48e0!2sWooden%20Tech!5e0!3m2!1sen!2sin!4v1637504833163!5m2!1sen!2sin"
                      style={{ border: 0 }}
                      allowfullscreen=""
                      loading="lazy"
                    ></iframe> */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5009.790955912891!2d17.0286323!3d51.1103886!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc27505290393%3A0x36c138edd5a238df!2sRynek%208%2C%2050-529%20Wroc%C5%82aw%2C%20Poland!5e0!3m2!1sen!2sin!4v1638883990022!5m2!1sen!2sin"
                      style={{border:0}}
                      height="600"
                      allowfullscreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="col-md-12 address">
                    <p>
                      {" "}
                      <i className="fa fa-map-marker mr-2"></i> Scopewit
                      Sp.zo.o. Polna 38, Gajkow{" "}
                    </p>
                  </div>
                  <div className="col-md-12 address">
                    <p>
                      {" "}
                      <i className="fa fa-envelope mr-2"></i>{" "}
                      contact@tablefrog.com{" "}
                    </p>
                  </div>
                  <div className="col-md-12 address">
                    <p>
                      {" "}
                      <i className="fa fa-phone mr-2"></i> +48 788 899 112{" "}
                    </p>
                  </div>
                  <div className="col-md-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  message: state.contact.message,
  submitLoading: state.contact.submitLoading,
});

const mapDispatchToProps = {
  submitContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
