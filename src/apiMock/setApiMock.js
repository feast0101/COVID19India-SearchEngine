const useApiMock = "true";

var SetApiMock = function() {
   if (process.env.NODE_ENV !== "production") {
      setApiMock(useApiMock);
   }
}

function setApiMock(useApiMock) {
  if (useApiMock) {
    require("./apiMock");
  }
}

export default SetApiMock;