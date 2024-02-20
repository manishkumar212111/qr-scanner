import React, { useEffect } from "react";
import Footer from "src/containers/Footer";
import Header from "src/containers/Header";
import Contact from "src/views/components/contact";
import t from "../../../utils/language";
import { HashLink } from "react-router-hash-link";

const faq = [
  {
    question: "I have menu made of paper why your digital menu is better -",
    answer:
      "<p>Our digital QR code menu is contactless and it’s always on the table. Guests don’t have to wait for the waiter to bring them a menu or search for the menu on their own. The less waiting time and actions needed to make an order, the more orders will be made. <p>Paper menus can’t be edited, there is no way to create promotions and discounts quickly.</p><p> To maintain the relevance and presentable look of a paper menu, it has to be reprinted from time to time.</p>",
  },
  {
    question:
      "I have QR code menu in PDF file, how digital menu is differ from this - ",
    answer:
      "<p>The PDF file is not interactive. It inherits all the disadvantages of a paper menu. Your QR code menu looks like a text based price list, and not like a modern store page that is made to increase your sales.</p><p>You cannot add photos and descriptions for every item to the PDF menu, it will immediately become huge and unreadable.</p><p>When you scan QR code of a PDF menu, you need to download it to your phone, which can be problematic with low Internet connection speed or if your guests just doesn't like to download anything to their phones.</p><p>PDF menus, once again, cannot be quickly edited. You have a new type of cheesecake? Now you have to redo the entire PDF and re-upload it to your hosting. In our digital menu, a similar operation takes 20 seconds and is easily performed even with your Android or iPhone.</p>",
  },
  {
    question: "Is is possible to try your digital menu First -",
    answer:
      "<p>Of course. You can try our digital menu service first, and then decide, does it suits your business or not. To try it you don’t need to add your credit card info or pay for a subscription. Our QR code menu is free of charge for a full month.</p> <p>All you need to do is to create an account and we will automatically add a free month for you.</p>",
  },
  {
    question:
      "Do i need to contact Table frog for making any changes in my digital menu ?",
    answer:
      "<p>No, you don’t have to. You are able to edit your QR code menu whenever you want to. We have designed an administrator interface that makes it easy to edit your menu from both desktop and mobile devices.</p> <p>We can also give your employees an access to your digital menu so that they were able to keep it up to date on their own, without any action from you.</p>",
  },
  {
    question: "Can I share the menu link on social media or my website?",
    answer:
      "<p>Sure, our menu pages are fully mobile optimized and prepared for social media sharing, you can even place it on your Facebook page or website so it's publicly available.</p>",
  },
  {
    question: "Do my guests need an app to scan the QR Code menu?",
    answer:
      "<p>No, they do not. Diners can scan QR Codes using their phone cameras, Google lens, or the QR Code scanner on the control panel.</p>",
  },
];

const faq1 = [
  {
    question: "Is PDF menu is applicable to upload ?",
    answer:
      "<p>The PDF file is not interactive. It inherits all the disadvantages of a paper menu. Your QR code menu looks like a text based price list, and not like a modern store page that is made to increase your sales.</p><p>You cannot add images and descriptions for every item to the PDF menu, it will immediately become huge and unreadable.</p><p>To open a PDF menu, you need to download it to your phone, which can be problematic with low Internet connection speed or if a guest just doesn't like to download anything to his phone.</p><p>PDF menus, once again, cannot be quickly edited. You have a new type of cheesecake? Now you have to redo the entire PDF and re-upload it to your hosting. In our menu, a similar operation takes 20 seconds and is easily performed even with your Android or iPhone.</p>",
  },
  {
    question: "Is it possibe to try for free and for how long ?",
    answer:
      "<p>Of course you can try it first, and only then decide do you like it or not. Our QR code menu is free of charge for a month. And to try it you don’t need to add your credit card info or pay for a subscription.</p><p>All you need to do is to create an account and we will automatically add a free month for you.</p>",
  },
  {
    question:
      "If i make changes in Restaurent name will QR code remains same or it has to be replaced",
    answer:
      "<p>Your old QR codes will work if you change the name of your restaurant or anything else in your menu.Even the link, leading to your menu, can be changed at any time, and the old QR code will still work.</p>",
  },
  {
    question: "Can I upload my menu or will you do it?",
    answer:
      "<p>You would have access to the Tablefrog Menu dashboard where you can create or change your menu. We are always there to help when you need it</p>",
  },
  {
    question: "Where should I place the QR Codes for my diners to access it?",
    answer:
      "<p>You can paste QR Codes on tables, table toppers, entry points, at the food pickup zone, or on delivery bags for future orders.</p>",
  },
];
const Index = () => {
  const [active, setActive] = React.useState("t");

  useEffect(() => {
    let userDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).user
        : {};
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};

    if (userDetail.status) {
      console.log(userDetail);
      if (restaurantDetail && restaurantDetail.status) {
        window.location.href = "/#/dashboard";
      } else if (restaurantDetail && restaurantDetail.status == 0) {
        window.location.href = "/#/profile/update";
      } else {
        window.location.href = "/#/profile/update";
      }
    }
  }, []);

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12" style={{ backgroundColor: "#FFFFFF" }}>
            <div
              className="container"
              style={{ marginBottom: "5%", marginTop: "5%" }}
            >
              <div className="row">
                <div className="col-md-8 ">
                  <div className="col-12">
                    <h2 className="banner-text mt-5">
                      {t("Create a contactless QR menu online")}
                    </h2>
                  </div>
                  <div className="col-10">
                    <p className="banner-paragraph">
                      {t(
                        "Get a stylish menu that increases safety, reduces costs and boosts your revenue by up to 20%."
                      )}
                    </p>
                  </div>
                  <div className="col-10">
                    <ul
                      className="btn-list"
                      style={{ paddingLeft: 0, marginLeft: 0 }}
                    >
                      <HashLink to="#contact">
                        <li
                          className="Contact_us-btn"
                          style={{ marginLeft: 0 }}
                        >
                          {t("Contact us")}{" "}
                          <i className="fa fa-arrow-circle-o-right ml-1"></i>
                        </li>{" "}
                      </HashLink>
                      <HashLink to="#pricing">
                        <li
                          className="Contact_us-btn"
                          style={{ marginLeft: 0 }}
                        >
                          {t("Check our offer")}
                          <i className="fa fa-arrow-circle-o-right ml-1"></i>
                        </li>{" "}
                      </HashLink>
                      {/* <a to="/#/register?plan=free">
                        <li
                          className="Contact_us-btn"
                          style={{ backgroundColor: "#000000", color: "white" }}
                        >
                          {t("Check our offer")}
                          <i className="fa fa-arrow-circle-o-right ml-1"></i>
                        </li>
                      </a> */}
                    </ul>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    src="/images/banner_site.png"
                    className="banner-image"
                    alt="Banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" id="benefit">
        <div className="row">
          <div className="col-md-12 first-bg-image">
            <div className="container">
              <div className="row mt-3">
                <div className="col-md-12">
                  <h2 className="banifit-heading">
                    {t("Benefits of using our product")}
                  </h2>
                  <div className="under-first"></div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="icon-box  text-center">
                    <div className="bg-icon-f">
                      <img
                        src="/images/turnover_1.png"
                        width="50px"
                        height="50px"
                      />
                    </div>
                    <div>
                      <h4>{t("Faster table turnover")}</h4>
                      <p>
                        {t(
                          "Faster ordering, quicker table turnover, more occupancy."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="icon-box  text-center">
                    <div className="bg-icon-f">
                      <img
                        src="/images/enhance_1.png"
                        width="50px"
                        height="50px"
                      />
                    </div>
                    <div>
                      <h4>{t("Enhancing customer experience")}</h4>
                      <p>
                        {t(
                          "Get a touch-less digitally enhanced experience for your customers to view your food menu at their fingertips by scanning QR codes, providing instant access to your menu on their phones within seconds."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="icon-box  text-center">
                    <div className="bg-icon-f">
                      <img
                        src="/images/impatient_1.png"
                        width="50px"
                        height="50px"
                      />
                    </div>
                    <div>
                      <h4>
                        {t("Reduce waiting time and promote instore sales")}
                      </h4>
                      <p>
                        {t(
                          "Our remarkable solution got you covered, Guests can scan the QR Code, the moment they sit at the table, rather than waiting for the menu to come, they can view the menu on their phones and order the food without any delay."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="icon-box  text-center">
                    <div className="bg-icon-f">
                      <img
                        src="/images/devices_1.png"
                        width="50px"
                        height="50px"
                      />
                    </div>
                    <div>
                      <h4>{t("Works on all devices")}</h4>
                      <p>
                        {t(
                          "No need to download any specific application, our product is far mode ahead of those chaotic processes, our amazing application is managed in the cloud which serves your customer in a single scan"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="icon-box  text-center">
                    <div className="bg-icon-f">
                      <img
                        src="/images/restaurant-menu_1.png"
                        width="50px"
                        height="50px"
                      />
                    </div>
                    <div>
                      <h4>{t("Easy to change and update menu")}</h4>
                      <p>
                        {t(
                          "No need to reprint the menu after changing prices or items on the list as our cloud solution gives you an edge over others you can edit your menu and see the changes in real-time"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="icon-box  text-center">
                    <div className="bg-icon-f">
                      <img
                        src="/images/qr-code_(3)_1.png"
                        width="50px"
                        height="50px"
                      />
                    </div>
                    <div>
                      <h4>{t("Everything under one scan")}</h4>
                      <p>
                        {t(
                          "Once the QR is scanned Guests will order directly from their mobile devices, as they will get more time for selection and ordering additional items. Our product can reduce operational costs by 25%."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-5 mb-5">
        <div className="row">
          <div className="col-md-12  pb-5">
            <div className="container">
              <div className="row">
                <div className="col-md-12 pb-5">
                  <h2 className="banifit-heading">
                    {t("Features of our product")}
                  </h2>
                  <div className="Features-under"></div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row mb-3">
                <div className="col-md-5">
                  <div className="container-fluid">
                    <div className="row icon-box-s">
                      <div className="col-2">
                        <div className="icon-m ml-4">
                          <img
                            src="/images/language_1.png"
                            width="30px"
                            height="30px"
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <h4>{t("Support multiple languages:")}</h4>
                        <p>
                          {t(
                            "Multilingual solution for creating and managing digital menus"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row icon-box-s">
                      <div className="col-2">
                        <div className="icon-m ml-4">
                          <img
                            src="/images/time.png"
                            width="30px"
                            height="30px"
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <h4>
                          {t("Manage menu as per the time and occasion, ")}
                        </h4>
                        <p>
                          {t(
                            "You are probably serving different menus at different times of the day and days of the week. You can now schedule your menus as per your need."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row icon-box-s">
                      <div className="col-2">
                        <div className="icon-m ml-4">
                          <img
                            src="/images/mobile_1.png"
                            width="30px"
                            height="30px"
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <h4>{t("QR code generator")}</h4>
                        <p>
                          {t(
                            "We offer Static QR Codes generators for your digital Menu and WIFI which never expire, once generated, it’s yours forever."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row icon-box-s">
                      <div className="col-2">
                        <div className="icon-m ml-4">
                          <img
                            src="/images/exam_1.png"
                            width="30px"
                            height="30px"
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <h4>{t("Change menu multiple time")}</h4>
                        <p>
                          {t(
                            "There is absolutely no limit as to how many times you can change the menu in just a few clicks. Our product gives you the power to do so."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="qr-code">
                    <p>Scan the QR code to see sample menu</p>
                    <img
                      src="/images/Group_254.png"
                      width="180px"
                      height="180px"
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="container-fluid">
                    <div className="row icon-box-s">
                      <div className="col-2">
                        <div className="icon-m ml-4">
                          <img
                            src="/images/nutrition.png"
                            width="30px"
                            height="30px"
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <h4>{t("Manage nutritional profile for meals")}</h4>
                        <p>
                          {t(
                            "Add interesting information about food and nutrition it contains"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row icon-box-s">
                      <div className="col-2">
                        <div className="icon-m ml-4">
                          <img
                            src="/images/workflow_1.png"
                            width="30px"
                            height="30px"
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <h4>{t("Track and manage order workflow")}</h4>
                        <p>
                          {t(
                            "With our product, your customer can order in Premises from their table, where you can track and manage all the orders from your Screen."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row icon-box-s">
                      <div className="col-2">
                        <div className="icon-m ml-4">
                          <img
                            src="/images/promotions.png"
                            width="30px"
                            height="30px"
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <h4>{t("Manage promotions and discounts")}</h4>
                        <p>
                          {t(
                            "Product provides full flexibility to our customers, as part of the feature you can categorize your menu into specific sections to manage promotions and discounts"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row icon-box-s">
                      <div className="col-2">
                        <div className="icon-m ml-4">
                          <img
                            src="/images/content.png"
                            width="30px"
                            height="30px"
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <h4>{t("Manage information for meals.")}</h4>
                        <p>
                          {t(
                            "Additional information as the origins contains and allergies for the menus can be managed easily in few click’s"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-5">
                  <div className="menu-btn text-center">
                    <a href="/#/register?plan=free">
                      <p>Get your menu now</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div
            className="col-md-12 third-bg-image pb-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 194, 0, 0.07) 0%, rgba(255, 255, 255, 0.0329) 100%)",
              boxShadow: "2px 4px 10px rgba(255, 255, 255, 0.25)",
            }}
          >
            <div className="container" id="pricing">
              <div className="row mb-3">
                <div className="col-md-12 mb-5">
                  <h2 className="banifit-heading">{t("Choose your plan")}</h2>
                  <div className="Choose-under"></div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4 ">
                  <div className="plan-box p-3">
                    <div className="contact-btn">
                      <a href="/#/register?plan=starter">
                        <p> {t("Get it now")} </p>
                      </a>
                    </div>
                    <div className="p-2 text-center">
                      <img
                        src="/images/kettle.png"
                        alt="Starter"
                        width="80px"
                        height="80px"
                      />
                    </div>
                    <div className="plan-heading mt-3">
                      <h3>{t("Starter")}</h3>
                    </div>
                    <div className="plan-Peragraph">
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        <span>
                          {t("Digital Menu with Unlimited Groups & Items")}
                        </span>
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Mobile & Desktop View of Menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Online Editing of Menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Multilanguage menu (Manual translation)")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Advanced dish settings ( photo, video, allergens, kkcal and much more)"
                        )}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Happy Hours and Business Lunch Features")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Takeaway settings")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Contactless QR Table Order / Room Service")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Analytics Settings (Facebook Pixel / Google Analytics)"
                        )}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Table ordering")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Multiple screens")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Customize menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Number of tables")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Customer support")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="plan-box p-3">
                    <div className="contact-btn">
                      <a href="/#/register?plan=premium">
                        <p> {t("Get it now")} </p>
                      </a>
                    </div>
                    <div className="p-2 text-center">
                      <img
                        src="/images/exec2.png"
                        alt="Starter"
                        width="80px"
                        height="80px"
                      />
                    </div>
                    <div className="plan-heading mt-3">
                      <h3>{t("Premium")}</h3>
                      <h6>{t("(Coming Soon)")}</h6>
                    </div>
                    <div className="plan-Peragraph">
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Digital Menu with Unlimited Groups & Items")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Mobile & Desktop View of Menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Online Editing of Menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Multilanguage menu (Manual translation)")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Advanced dish settings ( photo, video, allergens, kkcal and much more)"
                        )}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Happy Hours and Business Lunch Features")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Own promo settings (Marketing banners")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Takeaway settings")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Contactless QR Table Order / Room Service")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Analytics Settings (Facebook Pixel / Google Analytics)"
                        )}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Table ordering")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Multiple screens")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Customize menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Number of tables")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Customer support")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Chain Features (Multiple Places & Chain Owner Settings)"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 ">
                  <div className="plan-box p-3">
                    <div className="contact-btn">
                      <a href="/#/register?plan=enterprize">
                        <p> {t("Get it now")} </p>
                      </a>
                    </div>
                    <div className="p-2 text-center">
                      <img
                        src="/images/exec1.png"
                        alt="Starter"
                        width="80px"
                        height="80px"
                      />
                    </div>
                    <div className="plan-heading mt-3">
                      <h3>{t("Enterprise")}</h3>
                      <h6>{t("(Coming Soon)")}</h6>
                    </div>
                    <div className="plan-Peragraph">
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Digital Menu with Unlimited Groups & Items")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Mobile & Desktop View of Menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Online Editing of Menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Multilanguage menu (Manual translation)")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Advanced dish settings ( photo, video, allergens, kkcal and much more)"
                        )}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Happy Hours and Business Lunch Features")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Own promo settings (Marketing banners")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Takeaway settings")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Application for Receiving Orders (iOS, Android)")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Contactless QR Table Order / Room Service")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Online / Offline Payments (Credit cards / Apple Pay / Google Pay)"
                        )}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Analytics Settings (Facebook Pixel / Google Analytics)"
                        )}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Table ordering")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Multiple screens")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Customize menu")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Number of tables")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t("Customer support")}
                      </p>
                      <p>
                        <i
                          className="fa fa-check-circle mr-2"
                          style={{ color: "#55EFC4" }}
                        ></i>{" "}
                        {t(
                          "Chain Features (Multiple Places & Chain Owner Settings)"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 fourth-bg-image pb-5">
            <div className="container">
              <div className="row">
                <div className="col-md-12 mb-5">
                  <h2 className="banifit-heading">{t("How it Work’s")}</h2>
                  <div className="Work-under"></div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <p className="qr-p">{t("User side")}</p>
                  <div className="work-box-left-border p-4 m-2 mb-4">
                    <div className="work-heading">
                      <h4>{t("Your customer scans the QR code")}</h4>
                    </div>
                    <div className="work-peragraph">
                      <p>
                        {t(
                          "Print and place the automatically generated QR code so that customers can easily view and scan it"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="work-box-left-border-s p-4 m-2 mb-4">
                    <div className="work-heading">
                      <h4>
                        {t("hey get the digital menu of your restaurant")}
                      </h4>
                    </div>
                    <div className="work-peragraph">
                      <p>
                        {t(
                          "Once your customers scan the QR code, they will immediately get the menu of your restaurant."
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="work-box-left-border-th p-4 m-2 mb-4">
                    <div className="work-heading">
                      <h4>
                        {t(
                          "Diners can order anything they want from their table!"
                        )}
                      </h4>
                    </div>
                    <div className="work-peragraph">
                      <p>
                        {t(
                          "User can view and order from your digital menu on premise"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="imag">
                    <img
                      src="/images/wine.png"
                      width="150px"
                      height="150px"
                      alt="wine"
                    />
                  </div>
                  <div className="imag">
                    <img
                      src="/images/menu_1.png"
                      width="150px"
                      height="150px"
                      alt="wine"
                    />
                  </div>
                </div>
                <div className="col-md-5 qr-work">
                  <p className="qr-p">{t("Restaurant owner side")}</p>
                  <div className="work-box-left-border p-4 m-2 mb-4">
                    <div className="work-heading">
                      <h4>
                        {t("Create and manage your menu online on cloud")}
                      </h4>
                    </div>
                    <div className="work-peragraph">
                      <p>
                        {t(
                          "You can create, update and manage your menu online in the cloud with pictures and related information"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="work-box-left-border-for p-4 m-2 mb-4">
                    <div className="work-heading">
                      <h4>{t("Design and print your QR code")}</h4>
                    </div>
                    <div className="work-peragraph">
                      <p>
                        {t(
                          "Add custom colors and shapes, Make the QR Code menu interesting to scan and match your placement design and brand, Download the new QR code and start the printer"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="work-box-left-border-fiv p-4 m-2 mb-4">
                    <div className="work-heading">
                      <h4>{t("Put the QR code around, and relax")}</h4>
                    </div>
                    <div className="work-peragraph">
                      <p>
                        {t(
                          "Once the QR is scanned Guests will order directly from their mobile devices, as they will get more time for selection and ordering additional items. Our product can reduce operational costs by 25%."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" id="faq">
        <div className="row">
          <div className="col-md-12 fiv-div">
            <div className="container">
              <div className="row">
                <div className="col-md-12 faq">
                  <h2 className="banifit-heading">{t("FAQ")}</h2>
                  <div className="FAQ-under"></div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mb-3">
                  {faq.map((itm, index) => (
                    <>
                      <p
                        onClick={() => setActive(active == index ? "s" : index)}
                        className="faq-p"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="fa fa-plus"
                          style={{ color: "#4200FF", marginRight: "10px" }}
                        ></i>{" "}
                        {t(itm.question)}
                      </p>
                      {active == index && (
                        <p
                          style={{ marginLeft: 25, fontSize: 13, opacity: 0.8 }}
                          dangerouslySetInnerHTML={{ __html: t(itm.answer) }}
                        ></p>
                      )}
                    </>
                  ))}
                </div>
                <div className="col-md-6 mb-3">
                  {faq1.map((itm, index) => (
                    <>
                      <p
                        onClick={() => setActive(active == index ? "s" : index)}
                        className="faq-p"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="fa fa-plus"
                          style={{ color: "#4200FF", marginRight: "10px" }}
                        ></i>{" "}
                        {t(itm.question)}
                      </p>
                      {active == index && (
                        <p
                          style={{ marginLeft: 25, fontSize: 13, opacity: 0.8 }}
                          dangerouslySetInnerHTML={{ __html: t(itm.answer) }}
                        ></p>
                      )}
                    </>
                  ))}
                </div>
                {/* <div className="col-md-6 mb-3">
                  <p className="faq-p">
                    <i
                      className="fa fa-plus"
                      style={{ color: "#4200FF", marginRight: "10px" }}
                    ></i>{" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    semper magna sapien.
                  </p>
                  <p className="faq-p">
                    <i
                      className="fa fa-plus"
                      style={{ color: "#4200FF", marginRight: "10px" }}
                    ></i>{" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    semper magna sapien.
                  </p>
                  <p className="faq-p">
                    <i
                      className="fa fa-plus"
                      style={{ color: "#4200FF", marginRight: "10px" }}
                    ></i>{" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    semper magna sapien.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default Index;
