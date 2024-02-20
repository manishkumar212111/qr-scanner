import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { getUsers, updateStatus, updateExpiryDate } from "../../actions/user";
import { connect } from "react-redux";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CSpinner,
  CSwitch,
  CModal,
  CModalHeader,
  CModalBody,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
} from "@coreui/react";

import usersData from "./UsersData";
import moment from "moment";

const getBadge = (status) => {
  if (status) {
    return "success";
  } else {
    return "danger";
  }
};

const Users = (props) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [users, setUser] = useState(props.users);
  const [expiryDate, setExpiryDate] = useState(null);
  const [upgardeId, setUpgradeId] = useState(false);
  console.log(props.users);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    setUser(props.users);
    setExpiryDate(null);
    setUpgradeId(null)
  }, [props.users]);

  useEffect(() => {
    props.getUsers(currentPage);
  }, [props.getUsers, currentPage]);

  const handleStatusChange = (status, id) => {
    console.log(id);
    props.updateStatus(id, { status: !status });
  };
  
  const handleViewOrderChange = (viewOrder, id) => {
    props.updateStatus(id, {features: {viewOrder: !viewOrder}});
  };

  const handleExpiry = () => {
    props.updateExpiryDate({userId:upgardeId, expiry: new Date(expiryDate).toISOString()}, currentPage);
  };
  if (props.loading) {
    return (
      <CSpinner
        color="primary"
        style={{ width: "4rem", height: "4rem", margin: "30% 50%" }}
      />
    );
  }
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={users}
              fields={[
                { key: "name", label: "Name", _classes: "font-weight-bold" },
                {
                  key: "expires",
                  label: "Expiring on",
                  _classes: "font-weight-bold",
                },
                "email",
                "role",
                "createdAt",
                "Order View",
                "status",
              ]}
              hover
              striped
              // itemsPerPage={1}
              // activePage={currentPage}
              // columnFilter
              // tableFilter
              // clickableRows
              // onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CSwitch
                      onChange={(e) => handleStatusChange(item.status, item.id)}
                      variant="3d"
                      checked={item.status}
                      color="success"
                      size="lg"
                      shape="pill"
                    />
                  </td>
                ),
                full_name: (item, index) => {
                  return (
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                  );
                },
                expires: (item, index) => {
                  return (
                    <td>
                      {item.expiry ? moment(item.expiry).format("ll"):" Not set"}
                      <span
                        style={{ color: "blue", cursor: "pointer", marginLeft:10 }}
                        onClick={() => setUpgradeId(item.id)}
                      >
                        (Modify)
                      </span>
                    </td>
                  );
                },
                "Order View": (item , index) => {
                  return (
                    <td>
                      <CSwitch
                        onChange={(e) => handleViewOrderChange(item.features?.viewOrder, item.id)}
                        variant="3d"
                        checked={item.features?.viewOrder}
                        color="success"
                        size="lg"
                        shape="pill"
                      />
                    </td>
                  );
                }
              }}
            />
            <CPagination
              activePage={currentPage}
              onActivePageChange={pageChange}
              pages={props.totalPages}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>

      {upgardeId && (
        <CModal show={upgardeId} className="temp" onClose={setUpgradeId}>
          <CModalHeader closeButton>
            <div class="col add-dish-header">Upgrade Expiry</div>
          </CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="name">Select Expiry Date</CLabel>
              <CInput
                type="date"
                id="title"
                name="title"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </CFormGroup>
            {expiryDate && (
              <CButton
                block
                color="primary"
                variant="outline"
                onClick={handleExpiry}
                value="Submit"
              >
                {"Submit"}
              </CButton>
            )}
            {/* <Add id={activeId} /> */}
          </CModalBody>
        </CModal>
      )}
    </CRow>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  totalPages: state.user.totalPages,
  loading: state.Home.loading,
});

const mapDispatchToProps = {
  getUsers,
  updateStatus,
  updateExpiryDate
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
