import log from "@log";
import api from "./config";

class apis { }
apis.call = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      api.get(url, params).then(res => {
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.callPost = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      api.post(url, params).then(res => {
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.callPut = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      api.put(url, params).then(res => {
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.callDelete = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      api.delete(url, params).then(res => {
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.getProduct = () => {
  return apis.call("/products", '');
};


export default apis;
