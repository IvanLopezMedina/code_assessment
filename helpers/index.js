const axios = require('axios');

const fetchDataFromProvider = async (url) => {
  let data;
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return data;
};

module.exports = {fetchDataFromProvider};
