import React from "react";
import styled from "styled-components";

const DropdownContent = styled.option`
	position: absolute;
	background-color: black;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);
	padding: 12px 16px;
	z-index: 1;
`;

const Dropdown = styled.select`
	position: absolute;
	display: inline-block;
	left: 0;
	width: 20%;
	height: 50%;
	background: transparent;
	border: none;
	font-size: xx-large;
	color:white;
`;

const CurrencySelector = ({ doChange,options }) => {
	return (
		<Dropdown onChange={({target}) => doChange(target.value)}>
			{options.map((option, index) => (
				<DropdownContent key={index}>{option}</DropdownContent>
			))}
		</Dropdown>
	);
};

export default CurrencySelector;
