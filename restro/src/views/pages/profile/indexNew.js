import React, { useEffect, useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";

import ImagUpload from "./upload-image-icon.svg";
import {
  create,
  GetRestaurantById,
  UpdateRestaurantById,
  planUpgradeRequest
} from "../../../actions/restaurant";
import { connect } from "react-redux";
import {
  CButton,
  CSelect,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormText,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
  CSpinner,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";

import { Draggable } from "react-drag-reorder";

import CIcon from "@coreui/icons-react";
import { BASE_URL } from "src/API/config";
import t from "src/utils/language";
import moment from "moment";
import { changeEmail } from "src/actions/restaurant";

const currency = ["EUR",
  "ALL",
  "DZD",
  "USD",
  "AOA",
  "XCD",
  "ARS",
  "AMD",
  "AWG",
  "SHP",
  "AUD",
  "AZN",
  "BSD",
  "BHD",
  "BDT",
  "BBD",
  "BYN",
  "BZD",
  "XOF",
  "BMD",
  "BTN",
  "BOB",
  "BAM",
  "BWP",
  "BRL",
  "BND",
  "BGN",
  "BIF",
  "CVE",
  "KHR",
  "XAF",
  "CAD",
  "KYD",
  "NZD",
  "CLP",
  "CNY",
  "COP",
  "KMF",
  "CDF",
  "none",
  "CRC",
  "HRK",
  "CUP",
  "ANG",
  "CZK",
  "DKK",
  "DJF",
  "DOP",
  "EGP",
  "ERN",
  "SZL",
  "ETB",
  "FKP",
  "FJD",
  "XPF",
  "GMD",
  "GEL",
  "GHS",
  "GIP",
  "GTQ",
  "GGP",
  "GNF",
  "GYD",
  "HTG",
  "HNL",
  "HKD",
  "HUF",
  "ISK",
  "INR",
  "IDR",
  "XDR",
  "IRR",
  "IQD",
  "IMP",
  "ILS",
  "JMD",
  "JPY",
  "JEP",
  "JOD",
  "KZT",
  "KES",
  "KWD",
  "KGS",
  "LAK",
  "LBP",
  "LSL",
  "LRD",
  "LYD",
  "CHF",
  "MOP",
  "MGA",
  "MWK",
  "MYR",
  "MVR",
  "MRU",
  "MUR",
  "MXN",
  "MDL",
  "MNT",
  "MAD",
  "MZN",
  "MMK",
  "NAD",
  "NPR",
  "NIO",
  "NGN",
  "KPW",
  "MKD",
  "NOK",
  "OMR",
  "PKR",
  "PGK",
  "PYG",
  "PEN",
  "PHP",
  "PLN",
  "QAR",
  "RON",
  "RUB",
  "RWF",
  "WST",
  "STN",
  "SAR",
  "RSD",
  "SCR",
  "SLL",
  "SGD",
  "SBD",
  "SOS",
  "ZAR",
  "GBP",
  "KRW",
  "SSP",
  "LKR",
  "SDG",
  "SRD",
  "SEK",
  "SYP",
  "TWD",
  "TJS",
  "TZS",
  "THB",
  "TOP",
  "TTD",
  "TND",
  "TRY",
  "TMT",
  "UGX",
  "UAH",
  "AED",
  "UYU",
  "UZS",
  "VUV",
  "VES",
  "VND",
  "YER",
  "ZMW"
  ]
const defaultProps = {
  fieldObj: {
    name: "",
    name_ru: "",
    name_po: "",
    noOfTable: "",
    coverImage: "",
    full_address: "",
    city: "",
    currency: "",
    taxRate: 15,
    taxStatus: "",
    bankDetail: {},
    logo_url: "",
    banner_url: "",
    currency:"USD"
  },
};

const Profile = (props) => {
  const [isEdit, setIsEdit] = useState(
    props.match && props.match.params && props.match.params.id
      ? props.match.params.id
      : false
  );
  const [fieldObj, setfieldObj] = useState(defaultProps.fieldObj);
  const [previewLogo, setPreviewLogo] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const [previewBanner, setPreviewBanner] = useState("");
  const [plan, setPlan] = useState({});
  const [upgradeMessage, setUpgradeMessage] = useState(false);  
  const [errorObj, setErrorObj] = useState({
    name: { error: true, msg: t("It should be valid") },
    name_ru: { error: true, msg: t("It should be valid") },
    name_po: { error: true, msg: t("It should be valid") },
    noOfTable: { error: true, msg: t("It should be valid") },
    coverImage: { error: true, msg: t("It should be valid") },
    full_address: { error: true, msg: t("It should be valid") },
    openingTime: { error: true, msg: t("It should be valid") },
    closingTime: { error: true, msg: t("It should be valid") },
    city: { error: true, msg: t("It should be valid") },
    ccode: { error: true, msg: t("It should be valid") },
    mobile: { error: true, msg: t("It should be valid") },
    currency: { error: true, msg: t("It should be valid") },
    taxStatus: { error: true, msg: t("It should be valid") },
    taxRate: { error: true, msg: t("It should be valid") },
    bankDetail: { error: true, msg: t("It should be valid") },
    logoImg: { error: true, msg: t("It should be valid") },
    bannerImg: { error: true, msg: t("It should be valid") },
  });
  useEffect(() => {
    setIsEdit(
      props.match && props.match.params && props.match.params.id
        ? props.match.params.id
        : false
    );
  }, [props.match.params]);

  useEffect(() => {
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    if (restaurantDetail && restaurantDetail.id) {
      setIsEdit(restaurantDetail.id);
      props.GetRestaurantById(restaurantDetail.id);
    }
  }, []);

  useEffect(() => {
    props.fieldObj &&
      props.fieldObj.id &&
      setfieldObj({
        name: props.fieldObj?.name,
        id: props.fieldObj?.id,
        name_ru: props.fieldObj?.name_ru,
        name_po: props.fieldObj?.name_po,
        noOfTable: props.fieldObj?.noOfTable,
        full_address: props.fieldObj?.full_address,
        city: props.fieldObj?.city,
        openingTime: props.fieldObj?.openingTime,
        closingTime: props.fieldObj?.closingTime,
        ccode: props.fieldObj?.ccode,
        mobile: props.fieldObj?.mobile,
        currency: props.fieldObj?.currency,
        taxRate: props.fieldObj?.taxRate || 15,
        taxStatus: props.fieldObj?.taxStatus,
        bankDetail: props.fieldObj?.bankDetail,
        logo_url: props.fieldObj?.logo_url,
        banner_url: props.fieldObj?.banner_url,
      });
    setEmail(props.fieldObj?.user?.email);  
    props.fieldObj &&
      props.fieldObj.id &&
      setPlan({
        name: props.fieldObj.user.planName,
        detail: props.fieldObj.user.planDetail,
      });
  }, [props.fieldObj]);

  const handleChange = (e, key, value) => {
    let field = {};
    field[key] = value ? value : e.target.value;
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));

    let errOb = {};
    errOb[key] = {
      error: validateField(key, value ? value : e.target.value),
      msg: errorObj[key].msg,
    };
    setErrorObj((er) => ({ ...er, ...errOb }));
  };
  const handleTaxChange = (e, key, value) => {
    let field = {};
    console.log(e.target.checked);
    field[key] = e.target.checked;
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));
  };
  const handleBankChange = (e, key, value) => {
    let field = fieldObj.bankDetail;
    field[key] = value ? value : e.target.value;
    setfieldObj((fieldOb) => ({ ...fieldOb, bankDetail: field }));

    // let errOb = {}
    // errOb[key] = { error : validateField(key , value ? value : e.target.value) , msg : errorObj[key].msg};
    // setErrorObj( er => ( { ...er , ...errOb}))
  };
  const handleFileUpload = (e, key, value) => {
    console.log(e.target.files[0]);

    let field = {};
    field[key] = e.target.files[0];
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    key == "logoImg" ? setPreviewLogo(objectUrl) : setPreviewBanner(objectUrl);
    let errOb = {};
    errOb[key] = {
      error: validateField(key, value ? value : e.target.value),
      msg: errorObj[key].msg,
    };
    setErrorObj((er) => ({ ...er, ...errOb }));
  };
  const validateField = (key, value) => {
    value = value ? value : fieldObj[key];
    switch (key) {
      case "name":
      case "name_ru":
      case "name_po":
      case "noOfTable":
      case "coverImage":
      case "full_address":
      case "city":
      case "ccode":
      case "currency":
      case "taxRate":
        return validateUtility.required(value);
      case "email":
        return validateUtility.required(value) && validateUtility.email(value);
      case "mobile":
        return validateUtility.required(value) && value.length >=9;

      default:
        return true;
    }
  };

  const handleEmailChange = () => {
    if(validateUtility.email(email) && password) {
      props.changeEmail({email : email, password: password, userId: props.fieldObj.user.id})
    }
  }
  const handleClick = () => {
    console.log("fvdf vdkfj")
    let requiredObj = ["name", "name_ru","name_po", "noOfTable", "full_address", "mobile"];
    let errOb = errorObj;

    let status = true;
    requiredObj.forEach((element) => {
      let errorStatus = validateField(element);
      console.log(errorStatus, element);
      errOb[element].error = errorStatus;
      status = status && errorStatus;
    });
    setErrorObj((errorOb) => ({ ...errorOb, errOb }));
    console.log(status);
    if (!status) return;

    localStorage.setItem("currency", fieldObj.currency);
    if (fieldObj.id) {
      delete fieldObj.id;
      delete fieldObj.createdAt;
      JSON.stringify(fieldObj.bankDetail);

      console.log(isEdit , "vbdfhbjj jh")
      
      let restaurantDetail =
        localStorage.getItem("userDetail") &&
        JSON.parse(localStorage.getItem("userDetail"))
            ? JSON.parse(localStorage.getItem("userDetail")).restaurant
            : {};
        if (restaurantDetail && restaurantDetail.id) {
          props.UpdateRestaurantById(restaurantDetail.id, {
            ...fieldObj,
            bankDetail: JSON.stringify(fieldObj.bankDetail),
          });
        }
        return;
    }
    props.create({
      ...fieldObj,
      bankDetail: JSON.stringify(fieldObj.bankDetail),
    });
  };

  const handleUpgrade = () => {
    props.planUpgradeRequest();
    setTimeout(() => {
        setUpgradeMessage(true)
    }, 3000)
  };
  if (props.loading) {
    return (
      <CSpinner
        color="primary"
        style={{ width: "4rem", height: "4rem", margin: "30% 50%" }}
      />
    );
  }
  // if (props.restaurantOnbordingMessage) {
  //   return (
  //     <>
  //       <CRow>
  //         <CCol xs="12" sm="12" style={{ "margin-top": "10px" }}>
  //           <CCard>
  //             <CCardHeader>
  //               {t("Details Submission")}
  //               {/* <small> Form</small> */}
  //             </CCardHeader>
  //             <CCardBody>
  //               Your restaurant successfully submitted for verification, once verified you can start adding menus and start selling
  //             </CCardBody>
  //           </CCard>
  //         </CCol>
  //       </CRow>
  //     </>
  //   );
  // }
  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="row px-5 px-xl-2 restaurant-details-container1 d-flex">
            <div class="col-12 col-xl-6 restaurant-details-form-container py-3 mb-5 mb-xl-0 bg-white">
              <div class="row restaurant-details-form-heading py-3 px-4">
                {t("Restaurant Details")}
              </div>

              <div class="row py-4">
                <div class="col-12 col-md-6 px-4">
                  <div class="form-group mb-4">
                    <label for="restaurant-name-ar" class="input-label">
                      {t("Restaurant Name (English)")}
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="name"
                      name="name"
                      value={fieldObj.name}
                      onChange={(e) => handleChange(e, "name")}
                      placeholder={t("Restaurant Name (English)")}
                    />
                    {!errorObj.name.error && (
                      <CFormText className="help-block error">
                        {errorObj.name.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <label for="restaurant-name-en" class="input-label">
                      {t("Restaurant Name (Russian)")}
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="name_ru"
                      name="name_ru"
                      value={fieldObj.name_ru}
                      onChange={(e) => handleChange(e, "name_ru")}
                      placeholder={t("Enter restaurant (Russian)")}
                    />
                    {!errorObj.name_ru.error && (
                      <CFormText className="help-block error">
                        {errorObj.name_ru.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <label for="restaurant-name-en" class="input-label">
                      {t("Restaurant Name (Polish)")}
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="name_po"
                      name="name_po"
                      value={fieldObj.name_po}
                      onChange={(e) => handleChange(e, "name_po")}
                      placeholder={t("Enter restaurant {Polish}")}
                    />
                    {!errorObj.name_po.error && (
                      <CFormText className="help-block error">
                        {errorObj.name_po.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <label for="table-no" class="input-label">
                      {t("Number of Tables")}
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="noOfTable"
                      name="noOfTable"
                      value={fieldObj.noOfTable}
                      onChange={(e) => handleChange(e, "noOfTable")}
                    />
                    {!errorObj.noOfTable.error && (
                      <CFormText className="help-block error">
                        {errorObj.noOfTable.msg}
                      </CFormText>
                    )}
                  </div>
                  <div class="form-group mb-4">
                    <label for="table-no" class="input-label">
                      {t("Mobile No")}
                      </label>
                    <CInputGroup className="mb-3">
                        {/* <CDropdown variant="input-group">
                          <CDropdownToggle color="secondary" variant="outline">{fieldObj.ccode}</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={(e) => handleChange(e, "ccode", "+48")} >+48</CDropdownItem>
                            <CDropdownItem onClick={(e) => handleChange(e, "ccode", "+91")}>+91</CDropdownItem>
                            <CDropdownItem onClick={(e) => handleChange(e, "ccode", "+93")}>+93</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown> */}
                        <input
                          type="text"
                          class="form-control py-2 pl-3 form-input"
                          id="ccode"
                          name="ccode"
                          style={{width:100, flex:"initial"}}
                          value={fieldObj.ccode}
                          onChange={(e) => handleChange(e, "ccode")}
                          placeholder="+48"
                      />
                      <input
                      type="number"
                      class="form-control py-2 pl-3 form-input"
                      id="mobile"
                      name="mobile"
                      value={fieldObj.mobile}
                      onChange={(e) => handleChange(e, "mobile")}
                    />
                      
                      </CInputGroup>
                      {!errorObj.mobile.error && (
                      <CFormText className="help-block error">
                        {errorObj.mobile.msg}
                      </CFormText>
                    )}
                    </div>
                </div>
                <div class="col-12 col-md-4 px-4">
                  <div class="form-group mb-4">
                    <label
                      for="restaurantLogoUpload"
                      class="form-label input-label"
                    >
                      {t("Upload Logo")}
                    </label>
                    <div class="imageUploadInput-container">
                      <input
                        class="form-control imageUploadInput"
                        type="file"
                        id="logoImg"
                        name="logoImg"
                        onChange={(e) => handleFileUpload(e, "logoImg")}
                      />
                      <div class="restaurantLogoUploadBackground d-flex justify-content-center align-items-center">
                        <img
                          src={
                            previewLogo
                              ? previewLogo
                              : fieldObj.logo_url
                              ? BASE_URL + fieldObj.logo_url
                              : ImagUpload
                          }
                          alt=""
                          class="restaurantLogoUploadBackground-icon"
                        />
                      </div>
                    </div>
                    {!errorObj.logoImg.error && (
                      <CFormText className="help-block error">
                        {errorObj.logoImg.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <label
                      for="restaurantBannerUpload"
                      class="form-label input-label"
                    >
                      {t("Upload Banner")}
                    </label>
                    <div class="imageUploadInput-container">
                      <input
                        class="form-control imageUploadInput"
                        type="file"
                        id="bannerImg"
                        name="bannerImg"
                        onChange={(e) => handleFileUpload(e, "bannerImg")}
                      />

                      <div class="restaurantLogoUploadBackground d-flex justify-content-center align-items-center">
                        <img
                          src={
                            previewBanner
                              ? previewBanner
                              : fieldObj.banner_url
                              ? BASE_URL + fieldObj.banner_url
                              : ImagUpload
                          }
                          alt=""
                          class="restaurantLogoUploadBackground-icon"
                        />
                      </div>
                    </div>
                    {!errorObj.bannerImg.error && (
                      <CFormText className="help-block error">
                        {errorObj.bannerImg.msg}
                      </CFormText>
                    )}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-6 px-4">
                  <div class="form-group">
                    <div class="form-group mb-4">
                      <label for="table-no" class="input-label">
                        {t("Full Addrss")}
                      </label>
                      <input
                        type="text"
                        class="form-control py-2 pl-3 form-input"
                        id="full_address"
                        name="full_address"
                        value={fieldObj.full_address}
                        onChange={(e) => handleChange(e, "full_address")}
                        placeholder={t("Full Address")}
                      />
                      {!errorObj.full_address.error && (
                        <CFormText className="help-block error">
                          {errorObj.full_address.msg}
                        </CFormText>
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 px-4">
                  <div class="form-group">
                    <div class="mb-4">
                      <div class="form-group mb-4">
                        <label for="table-no" class="input-label">
                          {t("City")}
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={fieldObj.city}
                          onChange={(e) => handleChange(e, "city")}
                          class="form-control py-2 pl-3 form-input"
                          id="city"
                          placeholder={t("Enter City")}
                        />
                        {!errorObj.city.error && (
                          <CFormText className="help-block error">
                            {errorObj.city.msg}
                          </CFormText>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-6 px-4">
                  <div class="form-group">
                    <div class="form-group mb-4">
                      <label for="table-no" class="input-label">
                        {t("Opening Time")}
                      </label>
                      <input
                        type="time"
                        class="form-control py-2 pl-3 form-input"
                        id="openingTime"
                        name="openingTime"
                        value={fieldObj.openingTime}
                        onChange={(e) => handleChange(e, "openingTime")}
                        placeholder={t("Opening time")}
                      />
                      {!errorObj.openingTime.error && (
                        <CFormText className="help-block error">
                          {errorObj.openingTime.msg}
                        </CFormText>
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 px-4">
                  <div class="form-group">
                    <div class="mb-4">
                      <div class="form-group mb-4">
                        <label for="table-no" class="input-label">
                          {t("Closing time")}
                        </label>
                        <input
                          type="time"
                          id="closingTime"
                          name="closingTime"
                          value={fieldObj.closingTime}
                          onChange={(e) => handleChange(e, "closingTime")}
                          class="form-control py-2 pl-3 form-input"
                          id="openingTime"
                          placeholder={t("Enter City")}
                        />
                        {!errorObj.closingTime.error && (
                          <CFormText className="help-block error">
                            {errorObj.closingTime.msg}
                          </CFormText>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 px-4">
                  <div class="form-group">
                    <div class="mb-4">
                      <div class="form-group mb-4">
                        <label for="table-no" class="input-label">
                          {t("Currency")}
                        </label>
                        
                        <select class="form-select" onChange={(e) => handleChange(e, "currency")} value={fieldObj.currency} aria-label="Default select example">
                          {currency.map(itm => 
                          <option value={itm}>{itm}</option>
                          )}
                        </select>
                        {!errorObj.closingTime.error && (
                          <CFormText className="help-block error">
                            {errorObj.closingTime.msg}
                          </CFormText>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>

              <div class="form-group d-flex justify-content-center mt-4">
                <button
                  type="button"
                  onClick={handleClick}
                  class="btn update-btn"
                >
                  {t("UPDATE")}
                </button>
              </div>
            </div>
            <div class="col-12 col-xl-5 restaurant-details-right-container mb-5 mb-xl-0">
              <div class="row restaurant-details-right-container-plan bg-white py-3">
                <div class="restaurant-details-form-heading py-3 px-4">
                  {t("My Plan")}
                </div>
                  <div class="plan-name text-center py-2">{plan?.name}</div>
                  <div class="plan-date text-center py-3">
                    {t("Ending on")} {props.fieldObj?.user?.expiry ? moment(props.fieldObj.user.expiry).format("LL") : "No Active Plan"}
                  </div>
                  <div class="form-group d-flex justify-content-center mt-4">
                    <button type="button" class="btn update-btn" onClick={handleUpgrade}>
                      {t("UPGRADE")}
                    </button><br></br>

                  </div>
                  {upgradeMessage && <div style={{color: "green", textAlign: "center"}}> {t("Your request have been submitted, Soon you will get a call.")}</div>}

              </div>

              <div class="row restaurant-details-right-container-plan bg-white py-3 mt-5">
                <div class="restaurant-details-form-heading py-3 px-4">
                  {t("Update email")}
                </div>
                <form action="" class="row py-4">
                  <div class="col-6 px-4">
                    <div class="form-group mb-4">
                      <label for="bank-name" class="input-label">
                        {t("You email")}
                      </label>
                      <input
                        type="text"
                        class="form-control py-2 pl-3 form-input"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("Enter your email")}
                      />
                    </div>
                  </div>

                    <div class="col-6 px-4">
                  
                      <div class="form-group mb-4">
                        <label for="iban" class="input-label">
                          {t("Current Password")}
                        </label>
                        <input
                          type="password"
                          class="form-control py-2 pl-3 form-input"
                          id="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t("Enter current password")}
                        />
                      </div>
                    </div>
                  
                    {(validateUtility.email(email) && password.length > 5) && <div class="form-group d-flex justify-content-center mt-4">
                      <button
                        type="button"
                        onClick={handleEmailChange}
                        class="btn update-btn"
                      >
                        {t("UPDATE EMAIL")}
                      </button>
                    </div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Home.loading,
  fieldObj: state.restaurant.restaurantDetail,
  restaurantOnbordingMessage: state.restaurant.restaurantOnbordingMessage,
});

const mapDispatchToProps = {
  create,
  GetRestaurantById,
  UpdateRestaurantById,
  planUpgradeRequest,
  changeEmail
};

Profile.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
