const csv = require("csv-parser");
const fs = require("fs");
const results = []; // contains all datas from dataset.csv
const states = []; // contains all different states

fs.createReadStream("./data/dataset.csv")
  .pipe(
    csv({
      mapHeaders: ({ header, index }) => header.replace(" ", "_").toLowerCase(), // modified all headers to be more JS friendly (no spaces and lowercase)
    })
  )
  .on("data", (data) => results.push(data))
  .on("data", (data) => {
    if (!states.includes(data.state)) {
      states.push(data.state);
    }
  });

module.exports = { results, states };
