
// gets history from local storage
function getsHistory() {
  return JSON.parse(localStorage.getItem("RecentTranslations")) || [];
};

// saves history to local storage
function savesHistory(arr) {
  localStorage.setItem("RecentTranslations", JSON.stringify(arr));
  console.log(arr + "saving");
};

export function setLocalStorage_RecentTranslations(text, supportedLanuage = "???", translatedText) {

  console.log("hello");

  const recentTranslArr = getsHistory();

  console.log(recentTranslArr);

  if (text) {
    const tempFormatObj = {
      text, supportedLanuage, translatedText,
    };

    recentTranslArr.unshift(tempFormatObj);

    while (recentTranslArr.length > 5) {
      recentTranslArr.pop();
    }

    savesHistory(recentTranslArr);
  }

   return recentTranslArr   //returned value to be used to recreate table?????
};
