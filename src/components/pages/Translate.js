
import { useState } from "react";
import { useForm } from "react-hook-form";
import supportedlan from "../supportedLanguages.json"

console.log(supportedlan)

function Translate() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [translatedText, setTranslatedText] = useState("");

  const [detectedLang, setDetectedLang] = useState("");

  const onSubmit = data => {

    console.log(data);
    
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", data.textRequired);
    encodedParams.append("format", "text");
    encodedParams.append("target", "en");

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'ba4297ccadmsh81359987f2544c5p104fa9jsn6bf3224d7a19',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      body: encodedParams
    };

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);

        const resultObj = supportedlan.text.find(obj => obj.code === responseData.data.translations[0].detectedSourceLanguage);
        const supportedLanuage = resultObj.language;

        setTranslatedText(responseData.data.translations[0].translatedText);
        setDetectedLang(supportedLanuage ? supportedLanuage : "Unable to find language name")
      })
      .catch(err => console.error(err));
  };

  console.log(watch("textRequired"));


  return (
    <main>
      <h1>Translate</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea rows={10} cols={5} {...register("textRequired", { required: true })} />
        {errors.textRequired && <p>This field is required</p>}
        <input type="submit" value="Translate" />
      </form>
      {translatedText && (
        <div>
          <h2>Detected language: {detectedLang}</h2>
          <h2>{translatedText}</h2>
        </div>
      )}
    </main>
  );
}

export default Translate;
