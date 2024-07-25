import { toast } from "react-toastify";

export const showDate = (da) => {
  let date = new Date(da);
  return date.toDateString();
};
export function convertStringToFormat(inputString) {
  if (inputString.length <= 7) {
    return inputString; // No need to convert if the string is 4 characters or shorter
  }

  const firstFourChars = inputString.slice(0, 4);
  const lastFourChars = inputString.slice(-5);
  const middleChars = "......";

  return `${firstFourChars}${middleChars}${lastFourChars}`;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const CopyIt = (field, val) => {
  navigator.clipboard.writeText(val);
  toast.success(field + " copied", {
    autoClose: 1000,
    hideProgressBar: true
  });
  return null;
};

export const dateTimeTotimeStamp = (dateTime) => {
  const dateObject = new Date(dateTime);
  console.log(dateObject.getTime(), "<<<< thisis idata tem");
  return dateObject.getTime();
};

export const timestampToDateString = (stamp) => {
  function isTimestampInMilliseconds(value) {
    // Check if the value is an integer
    if (Number.isInteger(value)) {
      // Check if the value is within a reasonable range for timestamps
      let isStampInMiliSeconds = value > 1000000000000 && value < 9999999999999; // Example range for timestamps in milliseconds
      return isStampInMiliSeconds ? new Date(+value) : new Date(+value * 1000);
    }
  }

  const dateObject = isTimestampInMilliseconds(+stamp);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  // Assemble the formatted date string
  const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}`;
  console.log("\n\nconverted Timestamp =", formattedDateString, "-----", stamp);
  return formattedDateString;
};
