const axios = require('axios');

const getData = (url) =>
  axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

let cars = [];
const initialize = (callback) => {
  getData(
    'https://api.trademe.co.nz/v1/Categories.JSON?mcat_path=/Trade-Me-Motors/Cars&with_counts=true'
  ).then((data) => {
    cars = data.Subcategories;
    callback();
  });
};

const getUsedCarBrandsCount = () => {
  getData('https://api.trademe.co.nz/v1/Categories/UsedCars.JSON').then(
    (data) => {
      console.log(
        'Test Pass: Number of used car brands is',
        data.Subcategories.length
      );
    }
  );
};

const getCategoryByBrand = (brand) => cars.find((car) => car.Name === brand);

const getKiaCarCount = () => {
  const kiaBrand = getCategoryByBrand('Kia');
  if (kiaBrand) {
    console.log('Test Pass: Kia Brand do exist');
  } else {
    console.log('Test Fail: Kia Brand do not exist');
    return;
  }

  console.log('Test Pass: Kia brand cars count', kiaBrand.Count);
};

const checkHispanoSuizaDoesntExist = () => {
  const hispanoSuizaBrand = getCategoryByBrand('Hispano Suiza');
  if (!hispanoSuizaBrand) {
    console.log('Test Pass: Hispano Suiza Brand doesnt exist');
  } else {
    console.log('Test Fail: Hispano Suiza Brand do exist');
  }
};

const runTests = () => {
  getUsedCarBrandsCount();
  getKiaCarCount();
  checkHispanoSuizaDoesntExist();
};

initialize(runTests);
