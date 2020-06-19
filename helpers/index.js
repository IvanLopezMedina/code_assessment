const axios = require('axios');

const fetchDataFromProvider = async (url) => {
  let data;
  await axios
    .get(url)
    .then((response) => {
      // Take the first object which contains all the data
      data = response.data[Object.keys(response.data)[0]];
    })
    .catch((error) => {
      throw new Error(error);
    });

  return data;
};

module.exports = {fetchDataFromProvider};
