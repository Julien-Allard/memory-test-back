const express = require("express");
const router = express.Router();
const dataset = require("../data/parser");

router.get("/transactions", (req, res) => {
  let filteredByState; // contains datas for selected state, or all of them if no state is selected
  const uniqueCustomers = []; // contains all unique customers ID for the selected state (or all of them)
  const uniqueOrders = []; // contains all unique orders to compute the total number of unique order (and the revenue/order)
  let totalRevenue;
  const revenuePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  try {
    if (req.query.state) {
      const stateName =
        req.query.state.charAt(0).toUpperCase() + req.query.state.slice(1); // to be sure the request state name has an uppercase like in the database
      filteredByState = dataset.results.filter(
        (transaction) => transaction.state === stateName
      );
    } else {
      filteredByState = dataset.results;
    }

    // let january = 0;
    // let february = 0;
    // let march = 0;
    // let april = 0;
    // let may = 0;
    // let june = 0;
    // let july = 0;
    // let august = 0;
    // let september = 0;
    // let october = 0;
    // let november = 0;
    // let december = 0;
    for (let i = 0; i < filteredByState.length; i++) {
      // I isolate each unique customer ID to know the exact number of unique customers
      if (!uniqueCustomers.includes(filteredByState[i].customer_id)) {
        uniqueCustomers.push(filteredByState[i].customer_id);
      }

      // I isolate each unique order ID to know the exact number of unique orders
      if (!uniqueOrders.includes(filteredByState[i].order_id)) {
        uniqueOrders.push(filteredByState[i].order_id);
      }

      for (let j = 0; j < revenuePerMonth.length; j++) {
        const monthDate = new Date(filteredByState[i].order_date).getMonth();

        if (j === monthDate) {
          revenuePerMonth[j] += Number(filteredByState[i].sales);
        }
      }
    }

    // I compute all sales for a total revenue
    revenue = 0;
    filteredByState.map((transaction) => {
      revenue += Number(transaction.sales);
    });
    totalRevenue = Math.floor(revenue);

    const requestedDatas = {
      revenue: totalRevenue,
      revenuePerOrder: Number((totalRevenue / uniqueOrders.length).toFixed(2)),
      customers: uniqueCustomers.length,
    };

    res.status(200).json(filteredByState);
    console.log(requestedDatas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
