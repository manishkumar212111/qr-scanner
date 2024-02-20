import React, { useEffect, useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";
import "./category.scss";

import {
  createCategory,
  getCategoryById,
  updateCategoryById,
} from "../../../actions/category";
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
  CInput,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import t from "src/utils/language";

const defaultProps = {
  fieldObj: {
    name: "",
    name_ru: "",
    name_po: ""
  },
};

const CategoryForm = (props) => {
  const [isEdit, setIsEdit] = useState(
    props.match && props.match.params && props.match.params.id
      ? props.match.params.id
      : false
  );
  console.log(props);

  const [fieldObj, setfieldObj] = useState({
    ...defaultProps.fieldObj,
    name: props.location?.search.split("=")[1],
  });
  const [errorObj, setErrorObj] = useState({
    name: { error: true, msg: t("It should be valid") },
    name_ru: { error: true, msg: t("It should be valid") },
    name_po: { error: true, msg: t("It should be valid") },
  });
  useEffect(() => {
    typeof props.id ? setIsEdit(props.id) : setIsEdit('');
    setfieldObj(ct => ({}));
  }, [props]);

  useEffect(() => {
    if (isEdit) {
      props.getCategoryById(isEdit);
    }
  }, [isEdit]);

  useEffect(() => {
    props.fieldObj && props.fieldObj.id && setfieldObj(props.fieldObj);
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

  const handleFileUpload = (e, key, value) => {
    console.log(e.target.files[0]);

    let field = {};
    field[key] = e.target.files[0];
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));

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
        return validateUtility.required(value);
      case "name_ru":
      case "name_po":
        return validateUtility.required(value);
        default:
        return true;
    }
  };

  const handleClick = () => {
    let requiredObj = ["name", "name_ru", "name_po"];
    let errOb = errorObj;

    let status = true;
    requiredObj.forEach((element) => {
      let errorStatus = validateField(element);
      errOb[element].error = errorStatus;
      status = status && errorStatus;
    });
    setErrorObj((errorOb) => ({ ...errorOb, errOb }));
    console.log(status);
    if (!status) return;

    if (isEdit) {
      delete fieldObj.id;
      delete fieldObj.createdAt;
      props.updateCategoryById(isEdit, { name: fieldObj.name , name_ru: fieldObj.name_ru, name_po : fieldObj.name_po});
      return;
    }
    props.createCategory({ name: fieldObj.name , name_ru: fieldObj.name_ru, name_po : fieldObj.name_po });
  };

  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="form-group mb-4 px-2">
            <label for="category-name" class="input-label">
              {t("Category Name (English)")} *
            </label>

            <CInput
              id="name"
              class="form-control py-3 pl-3 form-input"
              name="name"
              value={fieldObj.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder={t("Enter category name")}
            />
            {!errorObj.name.error && (
              <CFormText className="help-block error">
                {errorObj.name.msg}
              </CFormText>
            )}
          </div>
          <div class="form-group mb-4 px-2">
            <label for="category-name" class="input-label">
              {t("Category Name (Russian)")}*
            </label>

            <CInput
              id="name"
              class="form-control py-1 pl-3 form-input"
              name="name_ru"
              value={fieldObj.name_ru}
              onChange={(e) => handleChange(e, "name_ru")}
              placeholder={t("Enter category name")}
            />
            {!errorObj.name_ru.error && (
              <CFormText className="help-block error">
                {errorObj.name_ru.msg}
              </CFormText>
            )}
          </div>
          
          <div class="form-group mb-4 px-2">
            <label for="category-name" class="input-label">
              {t("Category Name (Polish)")}*
            </label>

            <CInput
              id="name"
              class="form-control py-3 pl-3 form-input"
              name="name_po"
              value={fieldObj.name_po}
              onChange={(e) => handleChange(e, "name_po")}
              placeholder={t("Enter category name")}
            />
            {!errorObj.name_po.error && (
              <CFormText className="help-block error">
                {errorObj.name_po.msg}
              </CFormText>
            )}
          </div>
          
          
          <div class="form-group col-6 mx-auto">
            {props.loading ? (
              <>
                <CSpinner />
              </>
            ) : (
              <CButton
                block
                class="btn add-category-btn"
                color="primary"
                variant="outline"
                onClick={handleClick}
                value="Submit"
              >
                {isEdit ? t("Update") : t("Submit")}
              </CButton>
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.category.category_detail_loading,
  fieldObj: state.category.categoryDetail,
  categoryOnbordingMessage: state.category.categoryOnbordingMessage,
});

const mapDispatchToProps = {
  createCategory,
  getCategoryById,
  updateCategoryById,
};

CategoryForm.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
