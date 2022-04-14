import axios from "axios";
import React from "react";
import { genuka_api_2021_10 } from "../utils/configs";
import { deleteCookie, setCookie } from "../utils/cookies";

const GenukaStateContext = React.createContext();
const GenukaDispatchContext = React.createContext();

async function getCompanyById(dispatch, company_id) {
  dispatch({ type: "loading", payload: true });
  try {
    const response = await axios.get(`${genuka_api_2021_10}/companies/details/${company_id}`);
    if (response.data) {
      dispatch({ type: "company_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting company",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting company",
    });
  }
}
async function getCompany(dispatch, domain_url) {
  dispatch({ type: "loading", payload: true });
  try {
    const response = await axios.get(`${genuka_api_2021_10}/companies/byurl?url=${domain_url}`);
    if (response.data) {
      dispatch({ type: "company_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting company",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting company",
    });
  }
}

async function getPaginatedCollections(dispatch, company_id, collection_list_pagination) {
  // dispatch({ type: "loading" });
  try {
    const response = await axios.get(`${genuka_api_2021_10}/companies/${company_id}/collections?per_page=${collection_list_pagination.per_page}&page=${collection_list_pagination.page}&sort_by=${collection_list_pagination.sort_by}&sort_dir=${collection_list_pagination.sort_dir}`);
    if (response.data) {
      dispatch({ type: "collections_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting collection",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting collection",
    });
  }
}
async function getCollection(dispatch, company_id, collection_id) {
  dispatch({ type: "loading" });
  try {
    const response = await axios.get(`${genuka_api_2021_10}/companies/${company_id}/collections/${collection_id}?per_page=12`);
    if (response.data) {
      dispatch({ type: "collection_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting collection",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting collection",
    });
  }
}
async function getCollectionProducts(dispatch, company_id, collection_id, collection_product_list_pagination) {
  dispatch({ type: "loading" });
  try {
    const response = await axios.get(`${genuka_api_2021_10}/companies/${company_id}/collections/${collection_id}?per_page=${collection_product_list_pagination.per_page}&page=${collection_product_list_pagination.page}&sort_by=${collection_product_list_pagination.sort_by}&sort_id=${collection_product_list_pagination.sort_dir}`);
    if (response.data) {
      dispatch({ type: "collection_products_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting collection",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting collection",
    });
  }
}

async function getProduct(dispatch, product_slug) {
  dispatch({ type: "loading" });
  try {
    const response = await axios.get(`${genuka_api_2021_10}/products/slug/${product_slug}`);
    if (response.data) {
      dispatch({ type: "product_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting product",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting product",
    });
  }
}

async function getProductById(dispatch, company_id, product_slug) {
  dispatch({ type: "loading" });
  try {
    const response = await axios.get(`${genuka_api_2021_10}/companies/${company_id}/products/${product_slug}`);
    if (response.data) {
      dispatch({ type: "featured_product_success", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting product",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting product",
    });
  }
}

async function registerUser(dispatch, company_id, user) {
  try {
    let data = {
      ...user,
      fromApi: true,
      company_id: company_id,
    };

    const response = await axios.post(`${genuka_api_2021_10}/clients/register`, data);
    if (response.data) {
      dispatch({ type: "user_register", payload: { ...response.data.user, access_token: response.data.access_token } });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when login user",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "notification", payload: error.response.data.message, color: "red" });
    }
    dispatch({
      type: "error",
      payload: "An error occur when login user",
    });
  }
}

async function loginUser(dispatch, company_id, { email, password }) {
  try {
    let data = {
      password,
      fromApi: true,
      company_id: company_id,
    };
    if (email.includes("@")) {
      data.email = email;
    } else {
      data.tel = email;
    }
    const response = await axios.post(`${genuka_api_2021_10}/clients/login`, data);
    if (response.data) {
      dispatch({ type: "user_login", payload: { ...response.data.user, access_token: response.data.access_token } });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when login user",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "notification", payload: "Email/Tel or password invalid", color: "red" });
    }
    dispatch({
      type: "error",
      payload: "An error occur when login user",
    });
  }
}

async function getAddresses(dispatch) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${genuka_api_2021_10}/customers/addresses`, { headers: { Authorization: "Bearer " + token } });
    if (response.data) {
      dispatch({ type: "list_addresses", payload: response.data });
    } else {
      dispatch({
        type: "error",
        payload: "An error occur when getting addresses",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting addresses",
    });
  }
}

async function getUser(dispatch) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${genuka_api_2021_10}/user`, { headers: { Authorization: "Bearer " + token } });
    if (response.data) {
      dispatch({ type: "get_user", payload: response.data });
    } else {
      dispatch({
        type: "notification",
        color: "red",
        payload: "An error occur when getting user",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: "notification",
      color: "red",
      payload: error.message,
    });
  }
  return false;
}

async function updateUser(dispatch, user) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(`${genuka_api_2021_10}/customers/account/update`, { ...user, fromApi: true }, { headers: { Authorization: "Bearer " + token } });
    if (response.data) {
      dispatch({
        type: "notification",
        payload: "Informations updated successfully",
      });
      dispatch({ type: "updated_user", payload: response.data });
      return true;
    } else {
      dispatch({
        type: "notification",
        color: "red",
        payload: "An error occur when updating user",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: "notification",
      color: "red",
      payload: error.message,
    });
  }
  return false;
}

async function updatePassword(dispatch, user) {
  const token = localStorage.getItem("access_token");
  try {
    // TPDP : Update user
    const response = await axios.put(`${genuka_api_2021_10}/clients/password/update`, { ...user, fromApi : true }, { headers: { Authorization: "Bearer " + token } });
    if (response.data) {
      if (response.data.success) {
        dispatch({ type: "notification", payload: response.data.message });
        return true;
      } else {
        dispatch({ type: "notification", payload: response.data.message, color: "red" });
      }
    } else {
      dispatch({
        type: "notification",
        color: "red",
        payload: "An error occur when updating password",
      });
    }
  } catch (error) {
    dispatch({
      type: "notification",
      color: "red",
      payload: error.message,
    });
  }
  return false;
}
async function updateAddress(dispatch, address) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(`${genuka_api_2021_10}/customers/addresses`, { ...address }, { headers: { Authorization: "Bearer " + token } });
    if (response.data) {
      dispatch({ type: "updated_address", payload: response.data });
      return true;
    } else {
      dispatch({
        type: "notification",
        color: "red",
        payload: "An error occur when getting addresses",
      });
    }
  } catch (error) {
    dispatch({
      type: "notification",
      color: "red",
      payload: "An error occur when getting addresses",
    });
  }
}

async function loginWithToken(dispatch) {
  const token = localStorage.getItem("access_token");
  try {
    if (token) {
      const response = await axios.get(`${genuka_api_2021_10}/user`, { headers: { Authorization: "Bearer " + token } });
      if (response.data) {
        dispatch({ type: "user_login", payload: response.data });
      }
    }
  } catch (error) {
    dispatch({
      type: "error",
      payload: "An error occur when getting addresses",
    });
  }
}

async function placeOrder(dispatch, cart, company) {
  const token = localStorage.getItem("access_token");
  dispatch({ type: "loading", payload: { order: true } });
  try {
    let subtotal = cart.items.reduce((total, currentItem) => {
      return total + currentItem.price * currentItem.quantity;
    }, 0);
    if (token) {
      const response = await axios.post(
        `${genuka_api_2021_10}/commands`, // TO REPLACE WITH THE UPDATE
        {
          client_email: cart.customer.email,
          customer_details: cart.customer,
          company_id: company.id,
          subtotal,
          shipping: company.shipping_fee || 0,
          total: subtotal + (company.shipping_fee || 0),
          note: cart.note,
          source: "Website",
          payment: {
            date: new Date(),
            mode: cart.payment_mode.slug,
            state: 0,
          },
          shipping: {
            address: cart.shipping_address,
            address_type: 2,
            date: Date.now(),
            mode: "shipping",
            state: 0,
          },
          produits: cart.items.map((item) => {
            return {
              id: item.product.id,
              quantity: item.quantity,
              price: item.price,
              add_to_cart_date: item.add_to_cart_date,
              properties: item.properties,
              complement: item.complement,
              note: item.note,
            };
          }),
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      if (response.data) {
        dispatch({ type: "loading", payload: undefined });
        dispatch({ type: "order_placed", payload: response.data });
      }
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: "error",
      payload: "An error occur when getting addresses",
    });
  }
}

function commentReducer(state, action) {
  switch (action.type) {
    case "company": {
      return { ...state, company: action.payload };
    }
    case "product_success": {
      return { ...state, product: action.payload };
    }
    case "collections_success": {
      return { ...state, collections_list: action.payload.data, collection_list_pagination: { ...action.payload.meta, ...action.payload.links, page: state.collection_list_pagination.page } };
    }
    case "collection_success": {
      let collections = state.collections;
      collections[action.payload.collection.id] = action.payload;
      return { ...state, collections };
    }
    case "featured_product_success": {
      let products = state.products;
      products[action.payload.id] = action.payload;
      return { ...state, products };
    }
    case "collection_products_success": {
      return { ...state, collection: action.payload.collection, products: action.payload.products.data, collection_product_list_pagination: { ...action.payload.products.meta, ...action.payload.products.links, page: state.collection_product_list_pagination.page } };
    }
    case "company_success": {
      return { ...state, company: action.payload, loading: { company: false } };
    }
    case "cart": {
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return { ...state, cart: action.payload, current_order: undefined };
    }
    case "add_product": {
      let cart = state.cart;
      let productCart = { ...action.payload, add_to_cart_date: new Date(), note: "", complement: "" };
      if (cart.items.map((item) => item.product.id).includes(productCart.product.id)) {
        cart.items = cart.items.map((item) => {
          if (item.product.id === productCart.product.id) {
            return { ...item, quantity: item.quantity + productCart.quantity };
          }
          return item;
        });
      } else {
        cart.items.push(productCart);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart };
    }
    case "get_user": {
      return { ...state, user: action.payload };
    }
    case "user_login": {
      let notifications = state.notifications;
      if (action.payload.access_token) {
        localStorage.setItem("access_token", action.payload.access_token);
        setCookie("access_token", action.payload.access_token);
        notifications = [...state.notifications, { value: Date.now(), label: "Welcome back " + action.payload.first_name }];
      }
      return { ...state, user: action.payload, isLogged: true, notifications };
    }
    case "user_register": {
      let notifications = state.notifications;
      if (action.payload.access_token) {
        localStorage.setItem("access_token", action.payload.access_token);
        setCookie("access_token", action.payload.access_token);
        notifications = [...state.notifications, { value: Date.now(), label: "Welcome  " + action.payload.first_name }];
      }
      return { ...state, user: action.payload, isLogged: true, notifications };
    }
    case "updated_user": {
      return { ...state, user: { ...state.user, ...action.payload } };
    }

    case "list_addresses": {
      return { ...state, addresses: action.payload };
    }
    case "updated_address": {
      return {
        ...state,
        addresses: state.addresses.map((address) => {
          if (address.id === action.payload.id) {
            return action.payload;
          }
          return address;
        }),
        notifications: [...state.notifications, { value: Date.now(), label: "Address updated with success." }],
      };
    }
    case "order_placed": {
      let cart = {
        created_at: new Date(),
        items: [],
      };
      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart, current_order: action.payload, notifications: [...state.notifications, { value: Date.now(), label: "Order " + action.payload.reference + " with success." }] };
    }
    case "logout": {
      localStorage.removeItem("access_token");
      deleteCookie("access_token");
      return { ...state, isLogged: false, user: undefined };
    }
    case "notification": {
      return { ...state, notifications: [...state.notifications, { label: action.payload, value: Date.now(), color: action.color || "black" }] };
    }
    case "notifications": {
      return { ...state, notifications: action.payload };
    }
    case "error":
      return { ...state, error: action.payload, loading: { company: false } };
    case "loading":
      return { ...state, loading: action.payload };
    default: {
      state[action.type] = action.payload;
      return { ...state };
      // throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GenukaProvider({ children }) {
  const [state, dispatch] = React.useReducer(commentReducer, {
    loading: { company: false },
    notifications: [],
    isLogged: false,
    user: undefined,
    collections: {},
    products: {},
    cart:
      typeof window !== "undefined" && localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {
            created_at: new Date(),
            items: [],
          },
    error: undefined,
    company: undefined,
    collections_list: undefined,
    collection_list_pagination: {
      current_page: 1,
      page: 1,
      per_page: 12,
      sort_by: "created_at",
      sort_dir: "desc",
    },
    collection_product_list_pagination: {
      current_page: 1,
      page: 1,
      per_page: 12,
      sort_by: "created_at",
      sort_dir: "desc",
    },
  });
  return (
    <GenukaStateContext.Provider value={state}>
      <GenukaDispatchContext.Provider value={dispatch}>{children}</GenukaDispatchContext.Provider>
    </GenukaStateContext.Provider>
  );
}

function useGenukaState() {
  const context = React.useContext(GenukaStateContext);
  if (context === undefined) {
    throw new Error("useGenukaState must be used within a GenukaProvider");
  }
  return context;
}

function useGenukaDispatch() {
  const context = React.useContext(GenukaDispatchContext);
  if (context === undefined) {
    throw new Error("useGenukaDispatch must be used within a GenukaProvider");
  }
  return context;
}

export { GenukaProvider, useGenukaState, useGenukaDispatch, getCompany, getCompanyById, getCollection, getProduct, getProductById, getPaginatedCollections, getCollectionProducts, loginUser, registerUser, getAddresses, loginWithToken, placeOrder, updateAddress, updateUser, updatePassword, getUser };
