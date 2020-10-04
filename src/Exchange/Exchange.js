import React, { useState } from "react";
import CurrencySelector from "./CurrencySelector";
import styled from "styled-components";
import axios from "axios";

const CurrInput = styled.input`
	min-width: 70%;
	display: inline-block;
	height: 95%;
	float: right;
	background: transparent;
	border: none;
	text-align: right;
	font-size: 5vw;
	margin-right: 1%;
`;

const ExchangeRate = styled.div`
	font-size: 1vw;
	z-index: 1;
	width: 20%;
	position: absolute;
	left: 25%;
	top: 48%;
	border-style: solid;
	border-radius: 10px;
	background-color: green;
`;

let rates = {
	EGP: 15.747138,
	ERN: 15.000119,
	ETB: 36.8,
	EUR: 0.853457,
	FJD: 2.135,
	FKP: 0.773186,
	GBP: 0.773186,
	USD: 1,
	UYU: 42.549964,
	UZS: 10325,
};

//https://openexchangerates.org/api/latest.json?app_id=
export const doGet = (endpoint, param) => {
	const url =
		"https://openexchangerates.org/api/latest.json?app_id=9e1e881ef0cf48b183b19294921c27e3";
	axios.get(url).then((response) => {
		console.log(response);
	});
};

const setExchangeVal = () => {};

const Exchange = () => {
	const [currencies, setCurrencies] = useState({ top: "GBP", bottom: "EUR" });
	const setAmount = (e) => {
		let val = e.target.value;
		if (isNaN(val)) {
			val = val.replace(/[^0-9.]/g, "");
			if (val.split(".").length > 2) val = val.replace(/\.+$/, "");
		}
		if (val.includes(".")) {
			const arr = val.split(".");
			val = arr[0] + "." + arr[1].substring(0, 2);
			console.log(val);
		}
		e.target.value = val;
		doGet();
		//setExchangeVal();
	};

	const ratio = () => {
		return "1 = 1";
	};

	return (
		<div className="exchange-container">
			<div className="top">
				<CurrencySelector
					doChange={(newCurr) => {
						setCurrencies({
							top: newCurr,
							bottom: currencies.bottom,
						});
					}}
				/>
				<CurrInput onChange={setAmount}></CurrInput>
			</div>
			<ExchangeRate>{ratio()}</ExchangeRate>
			<div className="bottom">
				<CurrencySelector
					doChange={(newCurr) => {
						setCurrencies({
							top: currencies.top,
							bottom: newCurr,
						});
					}}
				/>
				<CurrInput onChange={setAmount}></CurrInput>
			</div>
		</div>
	);
};

export default Exchange;
