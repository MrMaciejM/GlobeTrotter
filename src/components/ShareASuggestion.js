
import { Box, CardHeader, Card, CardBody, FormLabel, Textarea, Button, Heading, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { writeData } from "./helperFuncs/writeData";
import { getData } from "./helperFuncs/readData";
import compassIcon from "./icons/compass.gif"




function ShareASuggestion() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const formSubmitHandler = (data) => {

        setIsLoadingBtn(true);

        setTimeout(() => {
            writeData(data.message);
            console.log(getData);
            setIsLoadingBtn(false);
        }, 5000);

        console.log(data);

    }

    return (
        <Center m={2}>
            <Card bgColor="blue.200" size={["sm", "md", "lg"]} p="1">
                <CardHeader>
                    <Heading textAlign="center" size={["sm", "md"]}>Suggest an Adventure to the next visitor!</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <FormLabel>
                                <Textarea
                                    minW="275px"
                                    minH="200px"
                                    mt="3"
                                    id="amount"
                                    isRequired={true}
                                    {...register("message", { required: true })}
                                    type="text"
                                    placeholder="Propose a thrilling trip full of adventure!"
                                />
                            </FormLabel>
                            <Button
                                colorScheme="whiteAlpha"
                                minW="200px"
                                maxW="350px"
                                isLoading={isLoadingBtn}
                                loadingText="Submitting..."
                                spinnerPlacement="end"
                                my="3"
                                type="submit"
                                spinner={<img style={{ maxHeight: "3ch" }} src={compassIcon} alt="loading" />}
                            >Submit</Button>
                        </Box>
                    </form>
                </CardBody>
            </Card>
        </Center>
    )
}

export default ShareASuggestion;