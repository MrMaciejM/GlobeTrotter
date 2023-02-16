import { useState } from "react";
import "./Currency.css";
//import { useState } from "react";
// API key for APILayer currency:
// hZn9Q1SDwhkak9rt1BHg0Iw018U8OgTl
// to make a call
// fetch("https://api.apilayer.com/fixer/convert?to=to&from=from&amount=amount", requestOptions)

// IMPORTANT NOTE: while testing please be mindful of API calls - monthly limit is 100! I made < 15 calls. If we run out, sign up with an account on
// https://fixer.io/
// and update the API key.

function Currency() {
  var l = console.log;
  const [amount, setAmount] = useState("");
  const [countryFrom, setCountryFrom] = useState("");
  const [countryTo, setCountryTo] = useState("");
  let [currencyRate, setCurrencyRate] = useState("");
  let [exchangedRate, setExchangedRate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fetchMsg, setFetchMsg] = useState("");

  // form
  const formSubmitHandler = (e) => {
    e.preventDefault();

    // api call
    var myHeaders = new Headers();
    myHeaders.append("apikey", "hZn9Q1SDwhkak9rt1BHg0Iw018U8OgTl");
    // API keys in order of usage:
    // hZn9Q1SDwhkak9rt1BHg0Iw018U8OgTl - <= 20 times used

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/fixer/convert?to=${countryTo}&from=${countryFrom}&amount=${amount}`,
      requestOptions,
      setFetchMsg("Fetching... please wait")
    )
      .then((response) => response.json())
      .then((data) => {
        l(data);
        //l(result.info.rate);
        //l(data.result);
        let resultRate = data.info.rate;
        let resultExchangedRate = data.result;
        setCurrencyRate(resultRate);
        setExchangedRate(resultExchangedRate);
        setFetchMsg("Request completed");
        setErrorMsg("");
      })
      .catch((error) => {
        // error msg
        console.log(error);
        setErrorMsg("Error: failed to fetch, please try again in a moment.");
      });

    setAmount(amount);
    setCountryFrom(countryFrom);
    setCountryTo(countryTo);
  };

  return (
    <main className="currencyMain">
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>Amount</label>
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="number"
            placeholder="0"
          />
        </div>
        <div>
          <label>From</label>
          <input
            onChange={(e) => {
              setCountryFrom(e.target.value.toUpperCase());
            }}
            type="text"
            placeholder="EUR"
          />
        </div>
        <div>
          <label>To</label>
          <input
            onChange={(e) => {
              setCountryTo(e.target.value.toUpperCase());
            }}
            type="text"
            placeholder="GBP"
          />
        </div>
        <button type="submit">Submit</button>
        <p
          className="fetchMsg"
          onChange={() => {
            setFetchMsg(fetchMsg);
          }}
        >
          {fetchMsg}
        </p>
        <p
          className="errorMsg"
          onChange={() => {
            setErrorMsg(errorMsg);
          }}
        >
          {errorMsg}
        </p>
      </form>

      {/* currency dashboard */}
      <div className="dashboardContainer">
        <div>
          <h5>Amount</h5>
          <p>{amount}</p>
        </div>
        <div>
          <h5>From</h5>
          <p>{countryFrom}</p>
        </div>
        <div>
          <h5>Rate</h5>
          <p>{currencyRate}</p>
        </div>
        <div>
          <h5>To</h5>
          <p>{countryTo}</p>
          <p>{exchangedRate}</p>
        </div>
      </div>
    </main>
  );
}

export default Currency;
