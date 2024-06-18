import axios from "axios";

export function convertToIST(dateString) {
  // Create a new Date object from the input date

  let date = new Date(dateString);

  // Get the time offset in minutes and convert it to milliseconds
  let offset = date.getTimezoneOffset() * 60000;

  // Create IST offset in milliseconds (IST is UTC + 5:30)
  let istOffset = 5.5 * 60 * 60 * 1000;

  // Convert the date to IST
  let istDate = new Date(date.getTime() + offset + istOffset);

  // Format the date into yyyy-mm-dd hh-mm-ss
  let year = istDate.getFullYear();
  let month = String(istDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  let day = String(istDate.getDate()).padStart(2, "0");
  let hours = String(istDate.getHours()).padStart(2, "0");
  let minutes = String(istDate.getMinutes()).padStart(2, "0");
  let seconds = String(istDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const formatProductData = (text) => {
  // console.log(text);
  const textArray = text.split(";");
  const productData = {
    prod: textArray[0].split(":")[1],
    sap: textArray[1].split(":")[1],
    prodD: textArray[2].split(":")[1],
    client: textArray[3].split(":")[1],
    qty: textArray[4].split(":")[1],
    serialNo: textArray[5].split(":")[1],
  };
  return productData;
};

export const formatStationData = (text) => {
  // console.log(text);
  const textArray = text.split(";");
  const stationData = {
    stationId: textArray[0].split(":")[1],
    stationName: textArray[1].split(":")[1],
  };
  return stationData;
};

export const CreateProduct = async (productData) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/add-product`,
      productData
    );
    console.log(res);
  } catch (e) {
    console.error("Error adding event:", e);
  }
};
