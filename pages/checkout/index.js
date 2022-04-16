import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import Breadcrumb from "../../components/common/Breadcrumb";
import Checkbox from "../../components/common/Checkbox";
import DesignedButton from "../../components/common/DesignedButton";
import DesignedTitle from "../../components/common/DesignedTitle";
import Modal from "../../components/common/Modal";
import OrderRecap from "../../components/common/OrderRecap";
import EmptyStore from "../../components/EmptyStore";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";
import { getAddresses, loginUser, useGenukaDispatch, useGenukaState } from "../../store/genukaStore";
import Select from "react-select";
import Router from "next/router";

const SecondaryTitle = styledComponents.h3`
    font-family: "Open Sans";
    font-size: 1.5rem;
    margin-top: 1rem;
`;

const StyledLink = styledComponents.span`
    margin: 1rem;
    cursor: pointer;
`;

const Text = styledComponents.div`
    text-align: right;
    font-family: "Open Sans";
    font-size: .81rem;
    a, span{
        color: var(--secondary-color) !important;
    }
`;

const Input = styledComponents.input`
    font-family: "Open Sans";
    width: 100%;
    margin: 10px 0;
    padding: 10px 20px;
    border: 1px solid #CCC;
    border-radius: 4px;

`;

const ErrorText = styledComponents.span`
    color: red;
`;

const LoginModal = ({ company, isLogged }) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [errors, setErrors] = React.useState([]);
  const dispatch = useGenukaDispatch();
  const login = () => {
    setLoading(true);
    setErrors([]);
    if (email && password) {
      loginUser(dispatch, company.id, { email, password });
    } else {
      setErrors(["Enter an email and a password to login"]);
    }
    setLoading(false);
  };

  if (isLogged) {
    // setIsLoginModalVisible(false);
    return <></>;
  }

  return (
    <>
      <Text>
        Already have an account ?
        <StyledLink
          onClick={() => {
            setIsLoginModalVisible(true);
          }}
        >
          login
        </StyledLink>
      </Text>
      <Modal title={"Login"} isVisible={isLoginModalVisible} setIsVisible={setIsLoginModalVisible}>
        <div>
          {errors.map((error) => {
            return <ErrorText key={Math.random()}>{error}</ErrorText>;
          })}
        </div>
        <Input
          type="email"
          placeholder="Email or phone number (with area code)"
          autofocus={isLoginModalVisible}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <DesignedButton style={{ minHeight: "50px", boxShadow: "none", margin: "10px 0" }} onClick={login} isLoading={loading}>
          Login
        </DesignedButton>
      </Modal>
    </>
  );
};
function CheckoutPageInformations({ company }) {
  const [createAccount, setCreateAccount] = React.useState(false);
  const { cart, isLogged, user, addresses } = useGenukaState();
  const [email, setEmail] = React.useState(user?.email);
  const [address, setAddress] = React.useState(cart.shipping_address || { is_shipping: 1 });
  const dispatch = useGenukaDispatch();

  React.useEffect(() => {
    if (user) {
      if (!email) setEmail(user.email);
      getAddresses(dispatch);
      dispatch({ type: "cart", payload: { ...cart, customer: user } });
    }
  }, [user]);

  React.useEffect(() => {
    if (cart?.items?.length === 0) {
    
      Router.push("/cart");
    }
  }, []);

  React.useEffect(()=>{ 
    if(address)
    dispatch({type: "cart", payload: {...cart, shipping_address : address}})
  }, [address])

  React.useEffect(()=>{ 
    if(email)
    dispatch({type: "cart", payload: {...cart, client_email : email}})
  }, [email])

  if (!company) return <EmptyStore />;

  const items = [
    {
      label: "Cart",
      active: true,
      link: "/cart",
    },
    {
      label: "Informations",
      active: true,
      link: "/checkout",
    },
    // {
    //   label: "Shipping",
    //   active: false,
    //   link: "/checkout/shipping",
    // },
    {
      label: "Payment",
      active: false,
      link: "/checkout/payment",
    },
  ];


  return (
    <Main company={company}>
      <SectionContainer>
        <DesignedTitle>Checkout</DesignedTitle>
        <Breadcrumb items={items} />
        <div className="row ">
          {/* VISIBLE SUR PC et INVISIBLE SUR MOBILE */}
          <div className="col-md-5 d-block d-md-none">
            <OrderRecap />
          </div>
          <div className="col-md-7">
            <div className="row ">
              <div className="col-md-12">
                <SecondaryTitle>Informations</SecondaryTitle>
                <LoginModal company={company} isLogged={isLogged} />
              </div>
              <div className="col-md-12">
                <div className="row ">
                  <div className="col-md-12">
                    <Input
                      type="email"
                      value={cart.client_email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Email or phone number (with area code)"
                    />
                  </div>
                  {createAccount && (
                    <div className="col-md-12">
                      <Input type="password" placeholder="Your password" />
                    </div>
                  )}
                  {/* {!isLogged && (
                    <div className="col-md-12">
                      <Checkbox
                        label="Create an account"
                        onCheck={(value) => {
                          setCreateAccount(value);
                        }}
                        checked={createAccount}
                      />
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                <SecondaryTitle>Shipping address</SecondaryTitle>
              </div>
              {addresses && (
                <div className="col-md-12">
                  <Select
                    onChange={(value) => {
                      setAddress({
                        ...value.address,
                        is_shipping: 1,
                      });
                    }}
                    options={addresses.map((address) => {
                      return {
                        value: address.id,
                        address: address,
                        label: (
                          <div style={{ margin: "10px" }}>
                            <h5>{address.label}</h5>
                            <div>
                              {address.given_name} {address.family_name} {address.attributes?.tel}
                              {(address.family_name || address.given_name) && <br />}
                              {address.street}, {address.city}
                              <br />
                              {address.postal_code} {address.country}
                            </div>
                          </div>
                        ),
                      };
                    })}
                  />
                </div>
              )}
              <div className="col-md-12">
                <div className="row ">
                  <div className="col-md-6">
                    <Input
                      type="text"
                      placeholder="First name"
                      value={address.given_name}
                      onChange={(e) => {
                        setAddress({ ...address, given_name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      type="text"
                      placeholder="Last name"
                      value={address.family_name}
                      onChange={(e) => {
                        setAddress({ ...address, family_name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={address.attributes?.tel}
                      onChange={(e) => {
                        setAddress({ ...address, attributes: { ...address.attributes, tel: e.target.value } });
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <Input
                      type="text"
                      placeholder="Street"
                      value={address.street}
                      onChange={(e) => {
                        setAddress({ ...address, street: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      type="text"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => {
                        setAddress({ ...address, city: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      type="text"
                      placeholder="Country"
                      value={address.country}
                      onChange={(e) => {
                        setAddress({ ...address, country: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-2">
                <Link href="/checkout/payment" passHref>
                  <DesignedButton full>Continue to payment</DesignedButton>
                </Link>
              </div>
            </div>
          </div>
          {/* VISIBLE SUR PC et INVISIBLE SUR MOBILE */}
          <div className="col-md-5 d-none d-md-block">
            <OrderRecap />
          </div>
        </div>
      </SectionContainer>
    </Main>
  );
}

export async function getServerSideProps(context) {
  let company, company_url;
  const { req } = context;

  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  return {
    props: {
      company,
    },
  };
}

export default CheckoutPageInformations;
