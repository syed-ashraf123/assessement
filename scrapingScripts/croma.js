const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const smartphoneURL =
  "https://api.croma.com/searchservices/v1/category/95?currentPage=1&query=:relevance&fields=FULL&channel=WEB&channelCode=400049";
const head = {
  "Upgrade-Insecure-Requests": "1",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
};
const scrape = async (url, category) => {
  const { data } = await axios.get(url, { headers: head });

  return data.products;
};
(async () => {
  const products = await scrape(smartphoneURL, "smartphone");

  const database = client.db("sample");
  const smartphones = database.collection("smartphones");

  await smartphones.insertMany(products);
  await client.close();
})();
