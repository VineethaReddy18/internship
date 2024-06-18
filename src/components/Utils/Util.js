import axios from "axios";

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
