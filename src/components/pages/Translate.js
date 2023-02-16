
import { useState } from "react";

function Translate() {

  const [textData, setTextData] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleChange = e => {
    setTextData(e.target.value);
    console.log(textData)
  };

  const translationURL = "https://api.nlpcloud.io/v1/";
  const model = "nllb-200-3-3b";
  const token = "bd536901bfa41da98ff64fa781ec429635aded9c";
  const rootURL = translationURL + model;

  const headersObj = {
    Authorization: "Token " + token,
    "User-Agent": "nlpcloud-javascript-client"
  }

  const payload = {
    text: textData,
    source: "",
    target: "eng_Latn"
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://api.nlpcloud.io/v1/nllb-200-3-3b/translation", {
      method: "POST",
      headers: headersObj,
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTranslatedText(data["translation_text"]);

      });
  }



  return (
    <main>
      <h1>Translate</h1>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Enter phrase to translate here" name="text" rows={5} cols={25} onChange={handleChange}></textarea>
        <button type="submit">Translate</button>
      </form>
      {translatedText ? <h2>{translatedText}</h2> : ""}
    </main>
  );
}

export default Translate;
