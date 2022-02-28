import React from 'react'
import styledComponents from 'styled-components';

const CheckboxBloc = styledComponents.div`
    font-family: "Open Sans";
    -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;
    cursor: pointer;
`;

const Label = styledComponents.label`
    margin-left: 10px;
    cursor: pointer;
`;

function Checkbox(props) {
  const { checked, onCheck } = props;
  const [isChecked, setIsChecked] = React.useState(checked);
  const id = props.id || Math.random();
  return (
    <CheckboxBloc>
      <input
        id={id}
        type="checkbox"
        {...props}
        checked={isChecked}
        onChange={(e) => {
          onCheck(!isChecked);
          setIsChecked(!isChecked);
        }}
      />
      <Label htmlFor={id}>{props.label}</Label>
    </CheckboxBloc>
  );
}

export default Checkbox