import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styledComponents from "styled-components";
import DesignedButton from "../../components/common/DesignedButton";
import DesignedTitle from "../../components/common/DesignedTitle";
import Divider from "../../components/common/Divider";
import Modal from "../../components/common/Modal";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";
import { updateUser, updatePassword, useGenukaDispatch, useGenukaState, getUser } from "../../store/genukaStore";

const LeftMenu = styledComponents.div`
    border: 1px solid #AAA;
    border-radius: 5px;
`;

const Item = styledComponents.div`
    padding: 1rem;
    border-bottom: 1px solid #AAA;
    cursor: pointer;

    &:hover{
        font-weight: 600;
    }

    ${(props) =>
      props.active
        ? `
    background: var(--primary-color);
    color: white;
    `
        : ""}
`;

const Center = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem auto;
    flex-direction: column;
    width: 100%;

    @media (max-width: 600px) {
        & {
            width: 90%;
        }
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

function AccountHome({ company, children }) {
  const router = useRouter();

  const dispatch = useGenukaDispatch();
  const { user } = useGenukaState();

  useEffect(() => {
    getUser(dispatch);
  }, []);

  const [edit_information_opened, set_edit_information_opened] = React.useState(false);
  const [edit_password_opened, set_edit_password_opened] = React.useState(false);
  const update_user = async (user) => {
    let response = await updateUser(dispatch, user);
    if (response) set_edit_information_opened(false);
  };
  const update_password = async (user) => {
    let response = await updatePassword(dispatch, user);
    if (response) set_edit_password_opened(false);
  };
  return (
    <Main company={company}>
      <SectionContainer>
        <div className="row">
          <div className="col-md-3 mb-5">
            <LeftMenu>
              <Link passHref href="/account/orders">
                <Item active={router.pathname == "/account/orders" || router.pathname == "/account/orders/*"}>🧰 Orders</Item>
              </Link>
              <Link passHref href="/account/addresses">
                <Item active={router.pathname == "/account/addresses" || router.pathname == "/account/addresses/*"}>🏠 Addresses</Item>
              </Link>
              <Link passHref href="/account">
                <Item active={router.pathname == "/account"}>🛠 Informations</Item>
              </Link>
              <Link passHref href="/logout">
                <Item active={router.pathname == "/logout"}>✖ Logout</Item>
              </Link>
            </LeftMenu>
          </div>
          {children && <div className="col-md-9 mb-5">{children}</div>}
          {!children && (
            <div className="col-md-9 mb-5">
              <h2>Informations</h2>
              <Divider />
              {user && (
                <div className="row mt-4">
                  <div className="col-md-12">
                    <p>
                      <strong>First name:</strong> {user.first_name}
                    </p>
                    <p>
                      <strong>Last name:</strong> {user.last_name}
                    </p>

                    <p>
                      <strong>Tel:</strong> {user.phone || user.tel}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Password:</strong> ********
                    </p>
                  </div>
                  <Divider />
                  <div className="col-md-12 mt-4">
                    <span
                      onClick={() => {
                        set_edit_information_opened(true);
                      }}
                    >
                      <strong>📝 Edit informations</strong>
                    </span>
                    <EditUserInformation opened_modal={edit_information_opened} set_opened_modal={set_edit_information_opened} user={user} update_user={update_user} />
                  </div>
                  <div className="col-md-12 mt-4">
                    <span
                      onClick={() => {
                        set_edit_password_opened(true);
                      }}
                    >
                      <strong>🔐 Change my password</strong>
                    </span>
                    <EditUserPassword dispatch={dispatch} opened_modal={edit_password_opened} set_opened_modal={set_edit_password_opened} user={user} update_password={update_password} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SectionContainer>
    </Main>
  );
}

const EditUserInformation = ({ opened_modal, set_opened_modal, user, update_user }) => {
  const [new_user, set_new_user] = React.useState(user);
  return (
    <Modal
      isVisible={opened_modal}
      setIsVisible={set_opened_modal}
      footer={
        <>
          <DesignedButton
            className="btn btn-primary"
            onClick={() => {
              update_user(new_user);
            }}
          >
            Save
          </DesignedButton>
        </>
      }
    >
      <div>
        <Center>
          <DesignedTitle style={{ marginBottom: "2rem", textAlign: "left" }}>Update your informations</DesignedTitle>
          <div className="row">
            <div className="col-md-12">
              <Input
                type="text"
                placeholder="First name"
                onChange={(e) => {
                  set_new_user({ ...new_user, first_name: e.target.value });
                }}
                value={new_user.first_name}
              />
            </div>
            <div className="col-md-12">
              <Input
                type="text"
                placeholder="Last name"
                onChange={(e) => {
                  set_new_user({ ...new_user, last_name: e.target.value });
                }}
                value={new_user.last_name}
              />
            </div>
            <div className="col-md-12">
              <Input
                type="tel"
                placeholder="Phone number"
                onChange={(e) => {
                  set_new_user({ ...new_user, tel: e.target.value });
                }}
                value={new_user.tel || new_user.phone}
              />
            </div>
          </div>
        </Center>
      </div>
    </Modal>
  );
};

const EditUserPassword = ({ opened_modal, set_opened_modal, user, update_password, dispatch }) => {
  const [new_user, set_new_user] = React.useState(user);
  useEffect(() => {
    set_new_user({ ...user, last_password: "", new_password: "", confirm_password: "" });
  }, [opened_modal]);
  return (
    <Modal
      isVisible={opened_modal}
      setIsVisible={set_opened_modal}
      footer={
        <>
          <DesignedButton
            className="btn btn-primary"
            onClick={() => {
              if (new_user.confirm_password === new_user.new_password && new_user.new_password.trim() !== "") {
                update_password(new_user);
              } else {
                dispatch({ type: "notification", payload: "Passwords don't match", color: "red" });
              }
            }}
          >
            Save
          </DesignedButton>
        </>
      }
    >
      <div>
        <Center>
          <DesignedTitle style={{ marginBottom: "2rem", textAlign: "left" }}>Update your password</DesignedTitle>
          <div className="row">
            <div className="col-md-12">
              <Input
                type="password"
                placeholder="Current password"
                onChange={(e) => {
                  set_new_user({ ...new_user, last_password: e.target.value });
                }}
                value={new_user.last_password}
              />
            </div>
            <div className="col-md-12">
              <Input
                type="password"
                placeholder="New password"
                onChange={(e) => {
                  set_new_user({ ...new_user, new_password: e.target.value });
                }}
                value={new_user.new_password}
              />
            </div>
            <div className="col-md-12">
              <Input
                type="password"
                placeholder="Confirm new password"
                onChange={(e) => {
                  set_new_user({ ...new_user, confirm_password: e.target.value });
                }}
                value={new_user.confirm_password}
              />
            </div>
          </div>
        </Center>
      </div>
    </Modal>
  );
};
export async function getServerSideProps(context) {
  let company, company_url;
  const { req } = context;
  const token = req.cookies.access_token;
  if (!token || token === "")
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };

  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();
  result = await fetch(`https://api.genuka.com/2021-10/user`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return {
    props: {
      company,
    },
  };
}

export default AccountHome;
