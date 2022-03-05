import styledComponents from "styled-components";
import AccountHome from ".";
import Divider from "../../components/common/Divider";
import EmptyList from "../../components/common/EmptyList";

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
const AddressCard = ({ address }) => {
  return (
    <ContainerAddressCard>
      ({address.is_shipping ? "Shipping address " : ""} {address.is_billing ? "Billing address " : ""})<br />
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

function AccountAddresses({ company, addresses }) {
  return (
    <AccountHome company={company}>
      <h2>Addresses</h2>
      <Divider />
      {addresses.length === 0 ? (
        <EmptyList>No address here</EmptyList>
      ) : (
        <div className="mt-4">
          {addresses.map((address) => {
            return <AddressCard key={address.id || Math.random()} address={address} />;
          })}
        </div>
      )}
    </AccountHome>
  );
}

export async function getServerSideProps(context) {
  let company, company_url, addresses;
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
  try {
    result = await fetch(`https://api.genuka.com/2021-10/customers/addresses`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    addresses = await result.json();
  } catch (error) {
    console.error(error, error.response);
    addresses = [];
  }
  return {
    props: {
      company,
      addresses,
    },
  };
}

export default AccountAddresses;
