const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("./data/dataset.csv")
  .pipe(
    csv({
      mapHeaders: ({ header, index }) => header.replace(" ", "_").toLowerCase(),
    })
  )
  .on("data", (data) => results.push(data));

module.exports = { results };
