const express = require("express");
const router = express.Router();
const dataset = require("../data/parser");

router.get("/transactions", (req, res) => {
  let filteredByState; // contains datas for selected state, or all of them if no state is selected
  const uniqueCustomers = []; // contains all unique customers ID for the selected state (or all of them)
  const uniqueOrders = []; // contains all unique orders to compute the total number of unique order (and the revenue/order)
  let totalRevenue;
  const revenuePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // one number for each month of the year

  try {
    if (req.query.state) {
      filteredByState = dataset.results.filter(
        (transaction) => transaction.state === req.query.state
      );
    } else {
      filteredByState = dataset.results;
    }

    for (let i = 0; i < filteredByState.length; i++) {
      // I isolate each unique customer ID to know the exact number of unique customers
      if (!uniqueCustomers.includes(filteredByState[i].customer_id)) {
        uniqueCustomers.push(filteredByState[i].customer_id);
      }

      // I isolate each unique order ID to know the exact number of unique orders
      if (!uniqueOrders.includes(filteredByState[i].order_id)) {
        uniqueOrders.push(filteredByState[i].order_id);
      }

      // I iterate on the revenuePerMonth array, if the index I iterate on is equal to the Date of the month (ie: january = 0, december = 11) I make a sum of the sales with the corresponding index
      for (let j = 0; j < revenuePerMonth.length; j++) {
        const monthDate = new Date(filteredByState[i].order_date).getMonth();

        if (j === monthDate) {
          revenuePerMonth[j] += Math.floor(Number(filteredByState[i].sales));
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
      totalRevenue: totalRevenue,
      averageRevenuePerOrder: Number(
        (totalRevenue / uniqueOrders.length).toFixed(2)
      ),
      uniqueCustomers: uniqueCustomers.length,
      revenuePerMonth: revenuePerMonth,
      allStates: dataset.states.sort(),
    };

    res.status(200).json(requestedDatas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
