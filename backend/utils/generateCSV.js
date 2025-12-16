const { Parser } = require("json2csv");

const generateCSV = (transactions) => {
  const fields = ["date", "type", "amount", "category", "description"];
  const parser = new Parser({ fields });
  return parser.parse(transactions);
};

module.exports = generateCSV;
