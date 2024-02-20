import React, { useCallback, useEffect, useState } from "react";
import { getProductByUserId, getRestaurantById } from "../../actions/product";
import { useDispatch } from "react-redux";
import Shimmer from "../widgets/shimmerEffect";
import { useHistory } from "react-router-dom";
import TopImg from "../../scss/img/restaurant-interior.jpg";
import logo from "../../scss/img/rest-logo.png";
import orderTable from "../../scss/img/order-table.png";
import telePhone from "../../scss/img/telephone.png";
import restTime from "../../scss/img/rest-time.png";
import foodImg from "../../scss/img/food-img-1.png";
import { setLanguage } from "../../actions/language";
import { t } from "../language";
import { connect } from "react-redux";
import { BASE_URL } from "../../API/config";
import Modifier from "./modifier";

var delayTimer;
const Home = (props) => {
  const [restaurant, setRestaurant] = useState({});
  const [products, setProducts] = useState({});
  const [tableNo, setTableNo] = useState(props.match.params.tableNo);
  const [active, setActive] = useState(0);
  const [cart, setCart] = useState({});
  const [modifier, setModifiers] = useState(false);
  const [activeProduct, setActiveProduct] = useState(false);
  const [language, setLanguage] = useState("en");
  const [langSelect, setLangSelect] = useState(false);

  const [activeReadMore, setActiveReadMore] = useState("t");
  useEffect(() => {
    props.getRestaurantById(props.match.params.restaurantId, props?.match?.params?.clientId);
  }, [props.getRestaurantById]);

  useEffect(() => {
    localStorage.setItem("baseUrl" , window?.location.href);

    if(props?.match?.params?.clientId && (props?.match?.params?.clientId != localStorage.getItem("clientId"))){
      localStorage.setItem("clientId" , props?.match?.params?.clientId);
      localStorage.setItem("cart", JSON.stringify({}));
    }
  }, [props?.match?.params?.clientId])
  useEffect(() => {
    setRestaurant(props.restaurant);
    if(props.restaurant && props.restaurant?.menu){
      props.getProductByUserId({
        menu: props.restaurant?.menu.id,
        restaurant: props.match.params.restaurantId,
        limit: 5000,
      });
      localStorage.setItem("currency", props.restaurant?.currency);
      localStorage.setItem("language",localStorage.getItem("language") || props.restaurant?.menu?.settings?.language);
      setLanguage(localStorage.getItem("language") || props.restaurant?.menu?.settings?.language);
      
    }
    localStorage.setItem("tableNo" , props.match.params.tableNo);

  }, [props.restaurant]);

  useEffect(() => {
    if (props.productList && props.productList.length) {
      setProducts(groupBy(props.productList));
      setActive(Object.keys(groupBy(props.productList))[0]);
      setCart(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {})
    }
  }, [props.productList, props.language]);

  const handleScroll = (e) => {
    document.querySelectorAll("#menu-list ul").forEach(function (itm) {
      if (isScrolledIntoView(itm)) {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
          setActive(itm.id.replace("_", " "));
        }, 50);
      }
    });
  };

  const handleCartAdd = (itm) => {
      setModifiers(itm.modifierGroup);
      if(itm.modifierGroup.length){
        
        setModifiers(itm.modifierGroup.map((itm) => ({
          id: itm?.id?.id,
          isRequired: itm?.id?.isRequired,
          max: itm?.id?.max,
          min: itm?.id?.min,
          modifiers: itm?.id?.modifiers,
          name: itm?.id?.name,
          restaurant: itm?.id?.restaurant,
          status: itm?.id?.status          
        })))
      } else{
        setModifiers([])

      }
      setActiveProduct(itm);

      document.body.style.overflow = "hidden"


    // let field = cart[itm.id] || {};
    // if (!field.qty) {
    //   field = {
    //     categroyName: itm.category.name,
    //     productTitle: itm.title,
    //   };
    // }

    // field.qty = (field.qty || 0) + 1;
    // field.price = itm.sellingPrice;

    // setCart((crt) => ({ ...crt, [itm.id]: field }));
  };

  const handleCartAddCb = (product, id) => {

      console.log(product)
      setCart((crt) => ({ ...crt, [id] :product }));
      setActiveProduct(false);
      setModifiers([]);
      document.body.style.overflow = ""
      
      setTimeout(() => {
        localStorage.setItem("cart", JSON.stringify({ ...cart, [id] :product }));
      },100)

  };

  const changeLang = (key, item) =>{
    if(!item){
      return;
    }

    let lang = localStorage.getItem("language");
    return lang == "en" ? item[key] : item[key + "_"+lang]
  }
  const handleCartRemove = (itm) => {
    console.log(cart);
    let field = cart[itm.id] || {};
    let totalFieldCount = Object.keys(field).length;
    let keyName = Object.keys(field)[totalFieldCount -1];

    field[keyName].qty = field[keyName].qty -1;
    if(field[keyName].qty == 0){
      delete field[keyName];
    }
    setCart({
      ...cart,
      [itm.id]: field
    });
    localStorage.setItem("cart", JSON.stringify({
      ...cart,
      [itm.id] :field
    }));
    console.log(field, totalFieldCount);


    // field.qty = (field.qty || 0) - 1;
    // if (field.qty == 0) {
    //   field[itm.id] = null;
    // }
    // setCart((crt) => ({ ...crt, [itm.id]: field }));
  };
  const isScrolledIntoView = (ele) => {
    const { top, bottom } = ele.getBoundingClientRect();
    const vHeight = window.innerHeight || document.documentElement.clientHeight;

    return (top > 0 || bottom > 0) && top < vHeight;
  };

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const groupBy = function (xs, key) {
    xs = xs.sort((a, b) => a.category?.sort - b.category?.sort);
    return xs.reduce(function (rv, x) {
      (rv[changeLang("name", x.category)] = rv[changeLang("name", x.category)] || []).push(x);
      return rv;
    }, {});
  };

  const handleCategoryClick = (id) => {
    let doc = document.getElementById(id.replace(" ", "_"));
    if (id) {
      doc.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    // let i = document.getElementById(id.replace(" ", "_")).getBoundingClientRect().top + window.scrollY - 50;
    // window.scroll({
    //   top: i,
    //   behavior: 'smooth'
    // });

    // setTimeout(() => {
      setActive(id);
    // },50)
  };
  if (props.product_detail_loading || props.product_list_loading) {
    return <Shimmer />;
  }

  const renderCartPopup = () => {
    let price = getPriceCountInCart();
    // let itemCount = 0;
    // Object.keys(cart).map((itm) => {
    //   if (cart[itm] && cart[itm].qty) {
    //     itemCount += cart[itm].qty;
    //     price += cart[itm].qty * parseInt(cart[itm].price);
    //   }
    // });
    return price > 0 ? (
      <div className="view-cart order-btn">
        <div className="container-fluid">
          <a href="/cart">
            <p>
              {getTotalProductCount()} {t("items in cart")} <span> {price.toFixed(2)} {localStorage.getItem("currency") || "USD"}</span>
            </p>
            <h5>
              {t("view cart")} <i className="bx bx-chevron-right"></i>
            </h5>
          </a>
        </div>
      </div>
    ) : (
      <></>
    );
  };

  const getProductCountInCart = (id) => {
    let cartObj = cart[id];
    if(!cartObj){
      return "";
    } else{
      let temp = 0;
      Object.keys(cartObj).map(itm => {
        temp += cartObj[itm].qty;
      })
      return temp;
    }
  }

  const getTotalProductCount = () => {
    let count = 0;
    Object.keys(cart).map(itm => {
      count += getProductCountInCart(itm)
    })
    return count;
  }

  const getPriceCountInCart = () => {
    if(!cart){
      return 0;
    } else{
      let temp = 0;
      Object.keys(cart).map(itm => {
        Object.keys(cart[itm]).map(item => {
          temp += cart[itm][item].price * cart[itm][item].qty;
          if(cart[itm][item].modifiers){
            Object.keys(cart[itm][item].modifiers).map(data => {
              cart[itm][item].modifiers[data].map(dta => {
                temp += dta.price * cart[itm][item].qty
              }) 
            })
          }
        })
      })
      return temp;
    }
  }
  const tConvert= (time) => {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  console.log(props)
  if(props.restaurantExpire){
    return (
    <section style={{textAlign:"center", marginTop:170}} data-select-name className="restaurant-header">
      <h2>Sorry !</h2>
      <p>You don't have active plan to use this serrvice, please contact admin at 8797987987</p>
    </section>) 
  }
  if(props.restaurantAlreadyUsed) {
    return (
      <section style={{textAlign:"center", marginTop:170}} data-select-name className="restaurant-header">
        <h2>Sorry !</h2>
        <p>This scan is already used please re-scan to order again</p>
      </section>)
  }
  return (
    <>
      <section data-select-name className="restaurant-header">
        <div className="restaurant-image">
          <img height="160" src={restaurant.banner_url ? (BASE_URL + restaurant.banner_url) : restaurant?.menu?.bannerImage} alt="" />
          <div className="lang-select select_location">
          <div class="lang-select select_location">
            <div class="select">
              <select id="mounth" class="select-hidden">
                <option value="en">EN</option>
                <option value="po">PL</option>
                <option value="ru">RU</option>
              </select>
            <div class={`select-styled ${langSelect?  "active" : ""}`} onClick={() => setLangSelect(!langSelect)}>{localStorage.getItem("language") == "en" ? "EN" : (localStorage.getItem("language") == "ru" ? "RUS" :"PL")}</div>
            <ul class="select-options" style={{display: langSelect ? "" : "none"}}>
              <li onClick={(e) =>{props.setLanguage("en"); setLangSelect(false)}}>EN</li>
              <li onClick={(e) =>{props.setLanguage("po"); setLangSelect(false)}}>PL</li>
              <li onClick={(e) =>{props.setLanguage("ru"); setLangSelect(false)}}>RU</li></ul></div>
          </div>
            {/* <select id="mounth" value={localStorage.getItem("language") || "en"}  onChange={(e) => props.setLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select> */}
          </div>
        </div>
        <div className="restaurant-details">
          <div className="container-fluid">
            <div className="restaurant-logo">
              <img
                className="img-fluid"
                width="75"
                height="75"
                src={
                  BASE_URL + (restaurant?.logo_url)
                }
                alt=""
              />
            </div>
            <div className="rest-name">
              <h4>{changeLang("name", restaurant)}</h4>
              <h3>{restaurant.full_address}</h3>
              <div style={{display:"flex", width:"100%"}}>
                {restaurant.mobile && <div className="rest-contact">
                  <div style={{marginTop:10}} className="contact-item">
                  <img src={telePhone} alt="" /> 
                    <p>
                      {restaurant.mobile ? restaurant.ccode+" - "+ restaurant.mobile : ""}
                    </p>
                  </div>
                </div>}
                {tableNo && <div className="rest-contact">
                  <div style={{marginTop:10}} className="contact-item">
                  <img src={orderTable} alt="" />
                    <p>
                       {t("Table")}{" "}
                      {tableNo ? tableNo : ""}
                    </p>
                  </div>
                </div>}
                {restaurant.openingTime && restaurant.closingTime && <div className="rest-contact">
                  <div style={{marginTop:10}} className="contact-item">
                  <img src={restTime} alt="" />
                    <p>
                    {restaurant.openingTime ? tConvert(restaurant.openingTime) +"-"+ tConvert(restaurant.closingTime) : ""}
                    </p>
                  </div>
                </div>}
                
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section className="menu-wrapper">
        <div className="container-fluid">
          <h3>{t("MENU")}</h3>
          <nav className="navigation" id="mainNav">
            {Object.keys(products).map((itm, index) => (
              <span
                onClick={() => handleCategoryClick(itm)}
                className={`navigation__link ${itm === active ? "active" : ""}`}
              >
                {itm}
              </span>
            ))}
          </nav>
          <div className="menu-list" id="menu-list">
            {Object.keys(products).map((item, index) => (
              <ul className="page-section hero" id={item.replace(" ", "_")}>
                {products[item] &&
                  products[item].map((itm, index) => (
                    <li>
                      <div className="dish-name">
                        <h4>{changeLang("title", itm)}</h4>
                
                        {activeReadMore !== itm.id ? <p className="more">{changeLang("description", itm).slice(0,80)} {changeLang("description", itm).length > 80 ? <span onClick={() => setActiveReadMore(itm.id)} style={{color:"blue"}}>... read more</span> : ""}</p>
                                    : <p className="more">{changeLang("description", itm)} <span onClick={() => setActiveReadMore("t")} style={{color:"blue"}}> read less</span> </p>}
                      
                        <h5>{itm.sellingPrice} {localStorage.getItem("currency") || "USD"}</h5>
                      </div>
                      <div className="dish-img">
                        {itm.imageUrl && <img
                          width="35"
                          height="40"
                          src={BASE_URL + itm.imageUrl}
                          alt=""
                        />}
                        {getProductCountInCart(itm.id) == 0 ? <div className="add-dish">
                          <div
                            id="two"
                            className="button"
                            onClick={() => handleCartAdd(itm)}
                          >
                            {t("ADD")}
                          </div>
                            <>
                              {getProductCountInCart(itm.id) ? <span>{getProductCountInCart(itm.id)}</span> : ""}
                            </>
                          
                        </div> : <div class="quantity-wraper">
                          <div class="value-button" id="decrease" value="Decrease Value" onClick={() => handleCartRemove(itm)}>-</div>
                            <input type="number" id="number1" disabled="" value={getProductCountInCart(itm.id)} />
                          <div onClick={() => handleCartAdd(itm)} class="value-button" id="increase" value="Increase Value">+</div></div>
                      }
                       </div> 
                    </li>
                  ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {cart && renderCartPopup()}
      <Modifier 
        modifier={modifier}
        activeProduct={activeProduct}
        handleClose={() => {
         setActiveProduct("");
         setModifiers("")
         document.body.style.overflow = ""
        }
        
        }
        handleCartAdd={handleCartAddCb}
        alreadyInCart = { cart[activeProduct.id] ? cart[activeProduct.id] : {}}
      />                      
    </>
  );
};
const mapStateToProps = (state) => ({
  productList: state.product.productList,
  product_detail_loading: state.product.product_detail_loading,
  product_list_loading: state.product.product_list_loading,
  restaurant: state.product.restaurant,
  language: state.language.language,
  restaurantExpire: state.product.restaurantExpire,
  restaurantAlreadyUsed: state.product.restaurantAlreadyUsed
});

const mapDispatchToProps = {
  getProductByUserId,
  getRestaurantById,
  setLanguage

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
