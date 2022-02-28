import React from 'react'
import styledComponents from 'styled-components';


const Hr = styledComponents.hr`
  background-color: #AAA;
  margin: 0;
`;


function Divider(props) {
  return <Hr {...props} />;
}

export default Divider