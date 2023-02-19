
import { Box, CardHeader, Card, CardBody, FormLabel, Textarea, Button, Heading, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// https://charming-scarab-378023-default-rtdb.europe-west1.firebasedatabase.app/

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBd0qs1JNbBjIgiitgR9wsiivYkfRzU1d0",
    authDomain: "charming-scarab-378023.firebaseapp.com",
    databaseURL: "https://charming-scarab-378023-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "charming-scarab-378023",
    storageBucket: "charming-scarab-378023.appspot.com",
    messagingSenderId: "265999340311",
    appId: "1:265999340311:web:605b781017a338b89a9d52",
    measurementId: "G-M4M3RBBHC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const database = getDatabase();
const reference = ref(database, "data/");

function writeData(message) {

    set(reference, {
        message: message
    });
};




function ShareASuggestion() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const formSubmitHandler = (data) => {

        setIsLoadingBtn(true);

        setTimeout(() => {
            writeData(data.message);
            const getData = ref(database, "data/" + "message");

            onValue(getData, (snap) => {
                const dataMessage = snap.val();
                console.log(dataMessage);
                setIsLoadingBtn(false);
            });
        }, 5000);

        console.log(data);

        const message = data.message;

    }

    return (
        <Center m={2}>
            <Card size={["sm", "md", "lg"]} p="2">
                <CardHeader>
                    <Heading textAlign="center" size={["sm", "md"]}>Suggest an Adventure to the next visitor!</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <FormLabel
                                textAlign="center
                                " minW="300px"
                            >
                                <Textarea
                                    mt="3"
                                    id="amount"
                                    isRequired={true}
                                    {...register("message", { required: true })}
                                    type="text"
                                    placeholder="Propose a thrilling trip full of adventure!"
                                />
                            </FormLabel>
                            <Button
                                colorScheme="twitter"
                                maxW="350px"
                                isLoading={isLoadingBtn}
                                loadingText="Submitting..."
                                spinnerPlacement="end"
                                my="3"
                                type="submit"
                                spinner={<img style={{ maxHeight: "3ch" }} src={undefined} alt="loading" />}
                            >Submit</Button>
                        </Box>
                    </form>
                </CardBody>
            </Card>
        </Center>
    )
}

export default ShareASuggestion;