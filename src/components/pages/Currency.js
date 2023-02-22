import { Container, Heading, SimpleGrid, Box, Center } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import exchangeIcon from "../icons/exchange.gif";
import CurrencyConversionCard from "../CurrencyConvertCard";

import RecentConversionsTable from "../RecentConversionsTable";
import { setLocalStorage_RecentConversions } from "../helperFuncs/setLocalStorage_RecentConversions";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};

// API key for APILayer currency:
// hZn9Q1SDwhkak9rt1BHg0Iw018U8OgTl
//
// new API Key 22/02/2023
// 8sXMFxCnTN8ltCI7z2CltLT4ConyOUxW
// to make a call
// fetch("https://api.apilayer.com/fixer/convert?to=to&from=from&amount=amount", requestOptions)

// IMPORTANT NOTE: while testing please be mindful of API calls - monthly limit is 100! I made < 20 calls. If we run out, sign up with an account on
// https://fixer.io/
// and update the API key.

function Currency() {
  const [amount, setAmount] = useState("");
  const [countryFrom, setCountryFrom] = useState("");
  const [countryTo, setCountryTo] = useState("");
  const [currencyRate, setCurrencyRate] = useState("");
  const [exchangedRate, setExchangedRate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fetchMsg, setFetchMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  useEffect( () => {
    setIsLoadingBtn(false)
  }, []);

  const [tableData, setTableData] = useState([]);

  useEffect( () => {
    setTableData(JSON.parse(localStorage.getItem("RecentConversions")) || []);
  }, []);

  // form
  const formSubmitHandler = (e) => {
    // e.preventDefault();

    console.log(e);

    setIsLoadingBtn(true);

    // api call for currency
    var myHeaders = new Headers();

    myHeaders.append("apikey", "zc3JTW1T9N9AYev9FEyKGDLryG7QPonb");

    // API keys in order of usage:
    // hZn9Q1SDwhkak9rt1BHg0Iw018U8OgTl - <= 20 times used

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/fixer/convert?to=${e.toRequired}&from=${e.fromRequired}&amount=${e.amountRequired}`,

      requestOptions
      //setFetchMsg("Fetching... please wait")
    )
      .then((response) => response.json())
      .then((data) => {

        console.log(data);
        let resultRate = data.info.rate; // dont know why they are let but dont want to waste api calls testing
        let resultExchangedRate = data.result; // dont know why they are let but dont want to waste api calls testing
        let amount = data.query.amount; // dont know why they are let but dont want to waste api calls testing

        const resultRateRounded = parseFloat(resultRate).toFixed(2);
        const resultExchangedRateRounded = parseFloat(resultExchangedRate).toFixed(2);
        const amountRounded = parseFloat(amount).toFixed(2);

        const updatedTableData = setLocalStorage_RecentConversions(
          `${amountRounded} (${data.query.from})`,
          `${resultExchangedRateRounded} (${data.query.to})`,
          `${resultRateRounded} (${data.date})`
        );

        setTimeout(() => {
          setCurrencyRate(resultRateRounded);
          setExchangedRate(resultExchangedRateRounded);
          setFetchMsg("Request completed");
          setErrorMsg("");
          setTableData(updatedTableData);
          setIsLoadingBtn(false);
        }, 5000);
      })
      .catch((error) => {
        // error msg
        setTimeout(() => {
          console.log(error);
          setFetchMsg("");
          setIsLoadingBtn(false);
          setErrorMsg("Error: failed to fetch, please try again in a moment.");
        }, 5000);
      });

    setAmount(amount);
    setCountryFrom(countryFrom);
    setCountryTo(countryTo);
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container p="10px" maxW="100vw" as="section" className="currencyMain">
        <Heading as="h2" mb="8" textAlign="center">
          Roamer's Rates
        </Heading>

        <SimpleGrid minChildWidth="350px">
          <Box m="2" display="flex" justifyContent="center" alignItems="center">
            <form as="form" onSubmit={handleSubmit(formSubmitHandler)}>
              <Box
                px="2"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2"
              >
                <FormLabel minW="300px">
                  Amount
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

                <FormLabel minW="300px">
                  From
                  <Input
                    id="from"
                    isRequired={true}
                    {...register("fromRequired", { required: true })}
                    onChange={(e) => {
                      setCountryFrom(e.target.value.toUpperCase());
                    }}
                    type="text"
                    placeholder="EUR"
                  />
                </FormLabel>

                <FormLabel minW="300px">
                  To
                  <Input
                    id="to"
                    isRequired={true}
                    {...register("toRequired", { required: true })}
                    onChange={(e) => {
                      setCountryTo(e.target.value.toUpperCase());
                    }}
                    type="text"
                    placeholder="GBP"
                  />
                </FormLabel>

                <Button
                  colorScheme="whiteAlpha"
                  maxW="350px"
                  isLoading={isLoadingBtn}
                  loadingText="Fetching Data..."
                  spinnerPlacement="end"
                  my="5"
                  type="submit"
                  value="Convert"
                  spinner={
                    <img
                      style={{ maxHeight: "3ch" }}
                      src={exchangeIcon}
                      alt="loading"
                    />
                  }
                >
                  Submit
                </Button>
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
            />
          </Center>
        </SimpleGrid>
        <Center mx="auto" my="10" maxW="800px">
          <RecentConversionsTable tableData={tableData} />
        </Center>
      </Container>
    </motion.main>
  );
}

export default Currency;
