import React from "react";
import t from "src/utils/language";
import "./detail.scss";
const Detail = (props) => {
  const getSingleProductCount = (finalProduct) => {
    console.log(finalProduct);
    let obj = {
      count: 0,
      price: 0,
    };
    obj.price = parseFloat(finalProduct.price);
    finalProduct &&
      finalProduct.modifiers &&
      Object.keys(finalProduct.modifiers).map((itm) =>
        finalProduct.modifiers[itm].map((item) => {
          obj.price += parseFloat(item.price);
        })
      );
    obj.price = (obj.price * finalProduct.qty).toFixed(2);
    return obj;
  };
  console.log(props);
  return (
    <div className="row justify-content-center order">
      <div className="col-12 col-sm-12 py-3 order-details-container">
        <div className="row py-4">
          <div className="col-2 text-center order-col-heading">{t("Quantity")}</div>

          <div className="col-3 text-center order-col-heading">{t("Dish")}</div>

          <div className="col-5 text-center order-col-heading">{t("Addons")}</div>

          <div className="col-2 text-center order-col-heading">{t("Price")}</div>
        </div>
        {props.productDetail &&
          Object.keys(props.productDetail.products).map((itm) =>
            Object.keys(props.productDetail.products[itm]).map((item) => (
              <div className="row py-4 mb-3">
                <div className="col-2 text-center order-col-value">
                  {props.productDetail.products[itm][item].qty}
                </div>

                <div className="col-3 text-center order-col-value">
                  {localStorage.getItem("language") == "ar" ?  props.productDetail.products[itm][item].titleAr : props.productDetail.products[itm][item].title}
                </div>

                <div className="col-5 text-center order-col-value">
                  {/* Size- Medium Toppings- Extra Cheese, Tomato, Onion, Corn */}
                  {props.productDetail.products[itm][item].modifiers &&
                    Object.keys(
                      props.productDetail.products[itm][item].modifiers
                    ).map((data) => (
                      <>
                        {data} :{" "}
                        {props.productDetail.products[itm][item].modifiers[data]
                          .map((dta) => localStorage.getItem("language") == "ar" ? dta.titleAr : dta.title)
                          .join(", ")}
                        ,{" "}
                      </>
                    ))}
                </div>

                <div className="col-2 text-center order-col-value">
                {localStorage.getItem("currency") || "USD"}{" "}
                  {
                    getSingleProductCount(
                      props.productDetail.products[itm][item]
                    ).price
                  }
                </div>
              </div>
            ))
          )}
        <hr />
        <div class="row">

          <div class="col-8 text-center order-col-value"></div>

          <div class="col-2 text-right order-col-value">{t("Sub Total")}</div>

          <div class="col-2 text-center ">
             {props.productDetail.subTotalAmount.toFixed(2)} {localStorage.getItem("currency") || "USD"}
          </div>
        </div>

        <div class="row">

          <div class="col-8 text-center order-col-value"></div>

          {/* <div class="col-2 text-right order-col-value">{t("Tax")}</div> */}

          {/* <div class="col-2 text-center ">
            $ {props.productDetail.tax}
          </div> */}
        </div>

        <div class="row py-4">
          <div class="col-8 text-center order-col-value"></div>

          <div class="col-2 text-right order-col-value"><b>{t("Total")}</b></div>

          <div class="col-2 text-center order-col-total">
            {props.productDetail.totalAmount.toFixed(2)} {localStorage.getItem("currency") || "USD"}
          </div>
        </div>

        {/* <div className="mb-2 order-last-heading px-3">{t("Payment Method")}</div>
        <div className="order-last-value px-3 mb-4">
          {props.productDetail.paymentType}
        </div> */}

        {props.productDetail.orderNote && <div className="mb-2 order-last-heading px-3">{t("Comments")}</div>}
        <div className="order-last-value px-3 mb-4">
          {props.productDetail.orderNote}
        </div>
      </div>
    </div>
  );
};

export default Detail;
