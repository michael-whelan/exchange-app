import React, { useState, useEffect } from "react";
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
	color: white;
`;

const ExchangeRate = styled.div`
	font-size: 1vw;
	z-index: 1;
	width: 20%;
	position: absolute;
	left: 25%;
	top: 48%;
	border-style: solid;
	border-color: #282c34;
	border-radius: 10px;
	background-color: #16181d;
`;

const Exchange = () => {
	const [currencies, setCurrencies] = useState({ top: "GBP", bottom: "GBP" });
	const [ratio, setRatio] = useState(1);
	const [rates, setRates] = useState({
		EUR: 0.853457,
		GBP: 0.773186,
		USD: 1,
	});

	const doGet = () => {
		const url =
			"https://openexchangerates.org/api/latest.json?app_id=9e1e881ef0cf48b183b19294921c27e3";
		axios.get(url).then(({ data: { rates } }) => {
			setRates(rates);
		});
	};

	useEffect(() => {
		calcRatio(currencies.top, currencies.bottom);
	}, [currencies.top, currencies.bottom, rates]);

	useEffect(() => {
		setInterval(() => doGet(), 10000);
	}, []);

	const setAmount = (e) => {
		let val = e.target.value;
		if (isNaN(val)) {
			val = val.replace(/[^0-9.]/g, "");
			if (val.split(".").length > 2) val = val.replace(/\.+$/, "");
		}
		if (val.includes(".")) {
			const arr = val.split(".");
			val = arr[0] + "." + arr[1].substring(0, 2);
		}
		e.target.value = val;
	};

	const calcExchange = ({ target }) => {
		const val = target.value;
		if (target.id === "top-input") {
			document.getElementById("bottom-input").value = val * ratio;
		} else {
			document.getElementById("top-input").value = val / ratio;
		}
	};

	const calcRatio = (fromCur, toCur) => {
		let ev = 100 / rates[fromCur];
		let exch = (rates[toCur] * ev) / 100;
		setRatio(exch);
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
					options={["GBP", "EUR", "USD"]}
				/>
				<CurrInput
					id="top-input"
					onChange={(e) => {
						setAmount(e);
						calcExchange(e);
					}}
				></CurrInput>
			</div>
			<ExchangeRate>{"1 = " + ratio}</ExchangeRate>
			<div className="bottom">
				<CurrencySelector
					doChange={(newCurr) => {
						setCurrencies({
							top: currencies.top,
							bottom: newCurr,
						});
					}}
					options={["GBP", "EUR", "USD"]}
				/>
				<CurrInput
					id="bottom-input"
					onChange={(e) => {
						setAmount(e);
						calcExchange(e);
					}}
				></CurrInput>
			</div>
		</div>
	);
};

export default Exchange;
