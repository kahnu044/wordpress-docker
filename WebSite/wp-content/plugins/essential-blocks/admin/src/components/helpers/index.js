//Check if the string is JSON or plain String
export const ebJsonStringCheck = (string) => {
    try {
      var o = JSON.parse(string);
      if (o && typeof o === "object") {
        return true;
      }
    } catch (e) { }
  
    return false;
  }