import axios from "axios";
import React from "react";
import { genuka_api_2021_10 } from "../utils/configs";

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
  console.log("Getting new page", collection_list_pagination);
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

async function getProductById(dispatch, company_id, product_id) {
  dispatch({ type: "loading" });
  try {
    const response = await axios.get(`${genuka_api_2021_10}/companies/${company_id}/products/${product_id}`);
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
    case "error":
      return { ...state, error: action.payload, loading: { company: false } };
    case "loading":
      return { ...state, loading: action.payload };
    default: {
      console.log("Default > ", action.type);
      state[action.type] = action.payload;
      return { ...state };
      // throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GenukaProvider({ children }) {
  const [state, dispatch] = React.useReducer(commentReducer, {
    loading: { company: false },
    collections: {},
    products: {},
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

export { GenukaProvider, useGenukaState, useGenukaDispatch, getCompany, getCompanyById, getCollection, getProduct, getProductById, getPaginatedCollections, getCollectionProducts };
