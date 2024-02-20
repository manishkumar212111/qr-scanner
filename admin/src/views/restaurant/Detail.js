import React from "react";
import { BASE_URL } from "src/API/config";

const Detail = ({ content, approveCb }) => {
  console.log({ content });
  if (!content) {
    return null;
  }
  return (
    <div class="container emp-profile">
      <div class="row">
        <div class="col-md-4">
          <div class="profile-img">
            <img
              src={BASE_URL + content.logo_url}
              alt="coverImage"
              width="240"
              height="180"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile-head">
            <h5>{content.name}</h5>
            <h6>
              {content.user.email}
              {/* {content.mobile} */}
            </h6>
            <h6>{content.email}</h6>
            <p class="proile-rating">
              Place :{" "}
              <span>
                {content.city} , {content.state}
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-2">
          <button
            class={`profile-edit-btn btn ${
              content.status ? "btn-danger" : "btn-success"
            }`}
            name="btnAddMore"
            onClick={() => approveCb(content.status, content.id)}
          >
            {content.status ? "Disable this restaurant" : "Enable"}
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="profile-work">
            <br></br>
            <p>Documents</p>
            Business Doc. :{" "}
            <a target="_blank" href={BASE_URL + content.businessDoc}>
              View
            </a>
            <br />
          </div>
        </div>
        <div class="col-md-8">
          <div class="tab-content profile-tab" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div class="row">
                <div class="col-md-6">
                  <label>ID</label>
                </div>
                <div class="col-md-6">
                  <p>{content.id}</p>
                </div>
                <div class="col-md-6">
                  <label>Manager Name</label>
                </div>
                <div class="col-md-6">
                  <p>{content.manager_name}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Full Address</label>
                </div>
                <div class="col-md-6">
                  <p>{content.full_address}</p>
                </div>
              </div>
              {/* <div class="row">
                <div class="col-md-6">
                  <label>Opening Time</label>
                </div>
                <div class="col-md-6">
                  <p>{content.openingTime}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Closing Time</label>
                </div>
                <div class="col-md-6">
                  <p>{content.closingTime}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
