
import { useState } from "react";
import { useForm } from "react-hook-form";

function Translate() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {

    console.log(data);

    const translationURL = "https://api.nlpcloud.io/v1/";
    const model = "nllb-200-3-3b/";
    const token = "bd536901bfa41da98ff64fa781ec429635aded9c";
    const translationURLPart = "translation"
    const rootURL = translationURL + model + translationURLPart;

    const headersObj = {
      Authorization: "Token " + token,
      "User-Agent": "nlpcloud-javascript-client"
    }

    const payload = {
      text: data.textRequired,
      source: "",
      target: "eng_Latn",
    };

    fetch(rootURL, {
      method: "POST",
      headers: headersObj,
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTranslatedText(data["translation_text"]);

      });
  };

  console.log(watch("textRequired"));

  const [translatedText, setTranslatedText] = useState("");

  return (
    <main>
      <h1>Translate</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea rows={10} cols={5} {...register("textRequired", { required: true })} />
        {errors.textRequired && <p>This field is required</p>}
        <input type="submit" value="Translate" />
      </form>
      {translatedText ? <h2>{translatedText}</h2> : ""}
    </main>
  );
}

export default Translate;
