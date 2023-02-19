
// gets history from local storage
function getsHistory() {
    return JSON.parse(localStorage.getItem("RecentConversions")) || [];
  };
  
  // saves history to local storage
  function savesHistory(arr) {
    localStorage.setItem("RecentConversions", JSON.stringify(arr));
    console.log(arr + "saving");
  };
  
  export function setLocalStorage_RecentConversions(amount, value = "???", rate) {
  
    console.log("hello");
  
    const recentTranslArr = getsHistory();
  
    console.log(recentTranslArr);
  
    if (amount) {
      const tempFormatObj = {
        amount, value, rate,
      };
  
      recentTranslArr.unshift(tempFormatObj);
  
      while (recentTranslArr.length > 5) {
        recentTranslArr.pop();
      }
  
      savesHistory(recentTranslArr);
    }
  
     return recentTranslArr   //returned value to be used to recreate table?????
  };
  