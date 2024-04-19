const axios = require("axios");
const cheerio = require("cheerio");
const regex = /\d+/g;
const valuesToCheck = [
  "Domestic",
  "Warranty",
  "Manufacturer",
  "months",
  "Box",
  "Accessories",
  "Domestic",
  "Year",
  "Yr",
  "Onsite",
];

const smartphoneURL =
  "https://www.flipkart.com/mobiles/pr?sid=tyy,4io&otracker=categorytree";
const laptopURL =
  "https://www.flipkart.com/laptops/pr?sid=6bo,b5g&otracker=categorytree";
const tabletURL =
  "https://www.flipkart.com/tablets/pr?sid=hry&otracker=categorytree";
const head = {
  "Upgrade-Insecure-Requests": "1",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
};
const scrape = async (url, category) => {
  const { data } = await axios.get(url, { headers: head });
  //   console.log(data);
  const $ = cheerio.load(data);
  //   : "._2kHMtA"
  $("._4ddWXP").each((i, el) => {
    console.log(el);
    const element = $(el);
    const price = element.find("._30jeq3._1_WHN1").text();
    const name = element.find("._4rR01T").text();
    const rating = element.find("._1lRcqv").text();
    const ratingsAndReviews = element.find("._2_R_DZ").text().split("&");
    const numbersArray1 = ratingsAndReviews[0].match(regex);
    const ratings = numbersArray1 ? numbersArray1.join("") : null;
    const numbersArray2 =
      ratingsAndReviews.length > 1 ? ratingsAndReviews[1].match(regex) : null;
    const reviews = numbersArray2 ? numbersArray2.join("") : null;
    let display,
      storage,
      camera,
      battery,
      processor,
      warranty,
      ram,
      software,
      os;

    element.find(".rgWa7D").each((j, desc) => {
      if (category === "smartphone") {
        if (j === 0) {
          storage = $(desc).text();
          return;
        }
        if (j === 1) {
          display = $(desc).text();
          return;
        }
        if (j === 2) {
          camera = $(desc).text();
          return;
        }
        if (j === 3) {
          battery = $(desc).text();
          return;
        }
        if (j === 4) {
          processor = $(desc).text();

          const containsValue = valuesToCheck.some((value) =>
            processor.includes(value)
          );
          if (containsValue) {
            warranty = processor;
            processor = null;
          }
          return;
        }
        if (j === 5) {
          warranty = $(desc).text();
          return;
        }
      } else if ((category = "laptop")) {
        if (j === 0) {
          processor = $(desc).text();
          return;
        }
        if (j === 1) {
          ram = $(desc).text();
          return;
        }
        if (j === 2) {
          os = $(desc).text();
          return;
        }
        if (j === 3) {
          storage = $(desc).text();
          return;
        }
        if (j === 4) {
          display = $(desc).text();
          return;
        }
        if (j === 5) {
          software = $(desc).text();

          const containsValue = valuesToCheck.some((value) =>
            software.includes(value)
          );
          if (containsValue) {
            warranty = software;
            software = null;
          }
          return;
        }
        if (j === 6) {
          warranty = $(desc).text();
          return;
        }
      }
    });

    console.log({
      price,
      name,
      rating,
      ratings,
      reviews,
      storage,
      display,
      camera,
      battery,
      processor,
      warranty,
      ram,
      software,
      os,
    });
  });
};
(async () => {
  await scrape(tabletURL, "tablet");
})();
