import React from "react";
import styledComponents from "styled-components";
import AccountHome from ".";
import Checkbox from "../../components/common/Checkbox";
import DesignedButton from "../../components/common/DesignedButton";
import DesignedTitle from "../../components/common/DesignedTitle";
import Divider from "../../components/common/Divider";
import EmptyList from "../../components/common/EmptyList";
import Modal from "../../components/common/Modal";
import { getAddresses, updateAddress, useGenukaDispatch, useGenukaState } from "../../store/genukaStore";

const Pill = styledComponents.div`
  display: inline-block;
  background: var(--secondary-color);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
`;
const ContainerAddressCard = styledComponents.div`  
  padding: 20px;
  box-shadow: 0 2px 5px #AAA;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
    margin: 1rem; 
  @media (max-width: 600px) {
        & {
        margin: 0 10px; 
          margin-top: 1rem; 
          display: block;
          box-shadow: 0 2px 2px #AAA;
        }
    }
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

const AddOrEditAddress = ({ opened_modal, set_opened_modal, address, update_address }) => {
  const [new_address, set_new_address] = React.useState(address);
  return (
    <Modal
      isVisible={opened_modal}
      setIsVisible={set_opened_modal}
      footer={
        <>
          <DesignedButton
            className="btn btn-primary"
            onClick={() => {
              update_address(new_address);
            }}
          >
            Save
          </DesignedButton>
        </>
      }
    >
      <div>
        <Center>
          <DesignedTitle style={{ marginBottom: "2rem", textAlign: "left" }}>{new_address ? "Edit the address " + address.label : "Add a new address"}</DesignedTitle>
          <div className="row">
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="First name"
                onChange={(e) => {
                  set_new_address({ ...new_address, given_name: e.target.value });
                }}
                value={new_address.given_name}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Last name"
                onChange={(e) => {
                  set_new_address({ ...new_address, family_name: e.target.value });
                }}
                value={new_address.family_name}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="tel"
                placeholder="Phone number"
                onChange={(e) => {
                  set_new_address({ ...new_address, attributes: { ...(new_address.attributes || {}), tel: e.target.value } });
                }}
                value={new_address.attributes?.tel}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Street"
                onChange={(e) => {
                  set_new_address({ ...new_address, street: e.target.value });
                }}
                value={new_address.street}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="City"
                onChange={(e) => {
                  set_new_address({ ...new_address, city: e.target.value });
                }}
                value={new_address.city}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="number"
                min="0"
                max="999999"
                step="1"
                placeholder="Postal code"
                onChange={(e) => {
                  set_new_address({ ...new_address, postal_code: parseInt(e.target.value) });
                }}
                value={new_address.postal_code}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Country"
                onChange={(e) => {
                  set_new_address({ ...new_address, country: e.target.value });
                }}
                value={new_address.country}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Give this address a label"
                onChange={(e) => {
                  set_new_address({ ...new_address, label: e.target.value });
                }}
                value={new_address.label}
              />
            </div>
            <div className="col-md-12 text-left">
              <Checkbox
                label="Is a shipping address"
                onCheck={(value) => {
                  set_new_address({ ...new_address, is_shipping: value ? 1 : 0 });
                }}
                checked={new_address.is_shipping}
              />
            </div>
            <div className="col-md-12">
              <Checkbox
                label="Is a billing address"
                onCheck={(value) => {
                  set_new_address({ ...new_address, is_billing: value ? 1 : 0 });
                }}
                checked={new_address.is_billing}
              />
            </div>
            <div className="col-md-12">
              <Checkbox
                label="Is a primary address"
                onCheck={(value) => {
                  set_new_address({ ...new_address, is_primary: value ? 1 : 0 });
                }}
                checked={new_address.is_primary}
              />
            </div>
          </div>
        </Center>
      </div>
    </Modal>
  );
};

const AddressCard = ({ address, update_address }) => {
  const [opened_modal, set_opened_modal] = React.useState(false);
  React.useEffect(() => {
    set_opened_modal(false);
  }, [address]);
  return (
    <ContainerAddressCard
      onClick={() => {
        set_opened_modal(true);
      }}
    >
      <AddOrEditAddress update_address={update_address} opened_modal={opened_modal} set_opened_modal={set_opened_modal} address={address} />({address.is_shipping ? "Shipping address" : ""} {address.is_billing ? "Billing address" : ""})<br />
      <strong>{address.label}</strong>
      <div>
        {address.given_name}
        {address.family_name}
        {address.attributes?.tel}
      </div>
      <div>
        {address.street}
        <br />
        {address.city}
        <br />
        {address.postal_code}, {address.country}
        <br />
        {address.is_primary === 1 && <Pill>Main address</Pill>}
      </div>
    </ContainerAddressCard>
  );
};

function AccountAddresses({ company }) {
  // addresses = []
  const { addresses, loading } = useGenukaState();
  const dispatch = useGenukaDispatch();

  React.useEffect(() => {
    getAddresses(dispatch);
  }, []);

  return (
    <AccountHome company={company}>
      <h2>Addresses</h2>
      <Divider />
      {!addresses || addresses.length === 0 ? (
        <EmptyList>No address here</EmptyList>
      ) : (
        <div className="mt-4">
          {addresses.map((address) => {
            return (
              <AddressCard
                key={address.id || Math.random()}
                address={address}
                update_address={(new_address) => {
                  updateAddress(dispatch, { ...new_address, address_id: new_address.id });
                }}
              />
            );
          })}
        </div>
      )}
    </AccountHome>
  );
}

export async function getServerSideProps(context) {
  let company, company_url;
  const { req } = context;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();
  const token = req.cookies.access_token;
  if (!token || token === "")
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };

  return {
    props: {
      company,
    },
  };
}

export default AccountAddresses;
