
import { Container, Heading, SimpleGrid, Box, Center } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

import { useState } from "react";

import { useForm } from "react-hook-form";

import exchangeIcon from "../icons/exchange.gif";
import CurrencyConversionCard from "../CurrencyConvertCard";

import RecentConversionsTable from "../RecentConversionsTable";
import { setLocalStorage_RecentConversions } from "../helperFuncs/setLocalStorage_RecentConversions"


// import "./Currency.css";
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

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem("RecentConversions")) || []);


  // form
  const formSubmitHandler = (e) => {
    // e.preventDefault();

    console.log(e);

    setIsLoadingBtn(true);

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
      `https://api.apilayer.com/fixer/convert?to=${e.toRequired}&from=${e.fromRequired}&amount=${e.amountRequired}`,
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

        const updatedTableData = setLocalStorage_RecentConversions(
          `${data.query.amount} (${data.query.from})`,
          `${data.result} (${data.query.to})`,
          `${data.info.rate} on ${data.date}`);

        setTimeout(() => {
          setCurrencyRate(resultRate);
          setExchangedRate(resultExchangedRate);
          setFetchMsg("Request completed");
          setErrorMsg("");
          setTableData(updatedTableData);
          setIsLoadingBtn(false)
        }, 5000);
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
    <Container size="md" p="10px" maxW="90vw" as="section" className="currencyMain">

      <Heading as="h2" mb="8" textAlign="center">Currency Convertor</Heading>

      <SimpleGrid columns={[1, 2]}>
        <Box m="2" display="flex" justifyContent="center" alignItems="center">
          <form as="form" onSubmit={handleSubmit(formSubmitHandler)}>
            <Box px="2" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2">
              <FormLabel w="300px">Amount
                <Input
                  id="amount"
                  isRequired={true}
                  {...register("amountRequired", { required: true })}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  placeholder="0"
                />
              </FormLabel>

              <FormLabel w="300px">From
                <Input
                  id="from"
                  isRequired={true}
                  {...register("fromRequired", { required: true })}
                  onChange={(e) => {
                    setCountryFrom(e.target.value.toUpperCase());
                  }}
                  type="text"
                  placeholder="EUR"
                /></FormLabel>

              <FormLabel w="300px">To
                <Input
                  id="to"
                  isRequired={true}
                  {...register("toRequired", { required: true })}
                  onChange={(e) => {
                    setCountryTo(e.target.value.toUpperCase());
                  }}
                  type="text"
                  placeholder="GBP"
                /></FormLabel>

              <Button
                colorScheme="whiteAlpha"
                maxW="350px"
                isLoading={isLoadingBtn}
                loadingText="Fetching Data..."
                spinnerPlacement="end"
                my="5"
                type="submit"
                value="Convert"
                spinner={<img style={{ maxHeight: "3ch" }} src={exchangeIcon} alt="loading" />}
              >Submit</Button>
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
            </Box>
          </form>
        </Box>

        {/* currency dashboard */}
        <Center>
          <CurrencyConversionCard
            fromCurrency={countryFrom || "USD"}
            toCurrency={countryTo || "GBP"}
            amount={amount || 0}
            result={exchangedRate || 0}
            exRate={currencyRate || 0}
          /></Center>
        {/* <div className="dashboardContainer">
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
        </div> */}
      </SimpleGrid>
      <Center mx="auto" my="10" maxW="800px"><RecentConversionsTable tableData={tableData} /></Center>
    </Container>
  );
}

export default Currency;
