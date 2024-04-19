const axios = require("axios");
const cheerio = require("cheerio");

const smartphoneURL =
  "https://www.amazon.in/s?rh=n%3A1389432031&fs=true&ref=lp_1389432031_sar";
const laptopURL =
  "https://www.amazon.in/s?rh=n%3A1375424031&fs=true&ref=lp_1375424031_sar";
const tabletURL =
  "https://www.amazon.in/s?bbn=976420031&rh=n%3A976419031%2Cn%3A1375458031&dc&qid=1713450402&rnid=976420031&ref=lp_976420031_nr_n_10";
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
  const productsLinks = [];
  $(".sg-col-inner").each((i, el) => {
    // console.log(el);
    const element = $(el);
    console.log("---------");
    const link = element.find(".a-link-normal").attr("href");
    if (link) productsLinks.push("https://www.amazon.in" + link);
  });
  //   console.log(productsLinks);
  const allData = [];
  for (let i = 0; i < productsLinks.length; i++) {
    console.log(productsLinks[i]);
    const { data } = await axios.get(productsLinks[i], { headers: head });
    //   console.log(data);
    const $ = cheerio.load(data);
    const images = [];
    const price = $("#apex_desktop")
      .first()
      .find(".a-price-whole")
      .text()
      .match(/\d/g)
      .join("");
    $(".a-fixed-left-grid")
      .find("img")
      .each((k, img) => {
        const imgs = $(img).attr("src");
        if (imgs.includes("m.media")) images.push(imgs);
      });
    console.log({ price });
    const prodDetTable = $(".a-keyvalue.prodDetTable");
    const tableData = {};
    prodDetTable.each((index, table) => {
      $(table)
        .find("tr")
        .each((i, row) => {
          tableData[$(row).find("th").text().trim()] = $(row)
            .find("td")
            .text()
            .trim();
        });
    });
    tableData.price = price;
    allData.push(tableData);
    console.log({ tableData });
  }
};
(async () => {
  await scrape(tabletURL, "tablet");
})();
