### data/parser.js :

- installed csv-parser package to parse the dataset.csv and iterate on it with Node.js
- import and parse all datas
- modified all headers to be more JS friendly (no spaces and lowercase)
- exports all results to be called in routes/transactions.js
- all computing is made in the back so it can send only the useful datas for the dashboard with the transactions route
