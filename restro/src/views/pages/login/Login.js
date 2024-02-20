import React , { useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import { loginUser } from "../../../actions/auth";
import { connect } from "react-redux";
import t from "../../../utils/language";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CRow,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import validateUtility from 'src/utils/ValidateUtility';

const Login = (props) => {
  const [ email , setemail ] = useState('');
  const [ password , setPassword ] = useState("");
  useEffect(() => {
    if(props.userDetail && props.userDetail.user){
        typeof localStorage !== 'undefined' &&  localStorage.setItem('userDetail', JSON.stringify(props.userDetail))
        localStorage.setItem("currency", props.userDetail?.restaurant?.currency);
        let userDetail = props.userDetail.user;
        let restaurantDetail = props.userDetail.restaurant;
        
        if(userDetail.status){
          console.log(userDetail);
          if(restaurantDetail && restaurantDetail.status){
            window.location.href = '/#/dashboard';
          } else if(restaurantDetail && restaurantDetail.status == 0){
            window.location.href = '/#/profile/update';
          } else {
            window.location.href = '/#/profile/update'
          }
        }

      
      }
      
  }, [props.userDetail])
  console.log(props.userDetail)

  const handleLogin = ()=> {
    if(email && password){
      props.loginUser({
        email : email,
        password:password,
        role:"user"
      })
    }
  }
  return (
    <div class="form-page">
      <section class="main-form-wrapper">
        <div class="container-fluid">
          <div class="form-inner">
            <div class="form-logo">
              <img class="img-fluid" src="/images/logo.png" alt="" />
            </div>
            <div class="main-form">
              <h5>{t("Login to your account")}</h5>
              <form>
                <div class="row">
                    <div class="col-12 col-md-12 form-group mb-4">
                      <input placeholder={t("Email")} type="text" data-vu-type="email" onKeyPress={(e) => validateUtility.stopDefault(e)}  class="form-input" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                  <div class="col-md-12 form-group mb-2">
                    <input placeholder={t("Password")} type="password" class="form-input"  value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div class="col-md-12">
                    <a href="/#/forget-password" class="forgot-link">{t("forgot password ?")}</a>
                  </div>
                </div>
                <div class="connect-btn mt-4">
                  {props.loginLoading ? <div style={{width: "60%" , marginLeft: "43%"}}><CSpinner color="info" /> </div> : <button type="button" class="trans-btn" href="#" onClick={handleLogin}>{t("LOGIN")}</button>}
                </div>
                <p class="login-bot mt-4 mb-0">{t("Don’t have an account?")} <a href="/#/register">{t("Register Here")}</a></p>
              </form>
            </div>
          </div>
        </div>
      </section>
  </div>
  )
}


const mapStateToProps = ( state ) => ( {
  userDetail: state.auth.userDetail,
  loginLoading: state.auth.loginLoading
} );

const mapDispatchToProps = {
  loginUser
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );

