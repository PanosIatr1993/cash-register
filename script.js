function checkCashRegister(price, cash, cid) {
  const CASH_UNITS = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];
  let totalCid = 0;
  let totalChange = (cash - price);
  let changeOutput = [];

  /*Total Cash in Register*/
  for (let i = 0; i < cid.length; i++) {
    totalCid += cid[i][1];
  }
  totalCid = totalCid.toFixed(2);
  /*Condition that checks if Cash in Register is less than the needed change*/
  if (totalCid < totalChange) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  /*Condition that checks if Cash in Register equals the needed change*/
  if (totalCid == totalChange) {
    return { status: "CLOSED", change: cid };
  }

  /*Loop through the CASH_UNITS to calculate the change*/
  for (let i = CASH_UNITS.length - 1; i >= 0; i--) {
    const cashName = CASH_UNITS[i][0];
    const cashValue = CASH_UNITS[i][1];
    let cashAmount = 0;

    while (cid[i][1] >= cashValue && totalChange >= cashValue) {
      cashAmount += cashValue;
      totalChange -= cashValue;
      cid[i][1] -= cashValue;
      totalChange = totalChange.toFixed(2);
    }

    if (cashAmount > 0) {
      changeOutput.push([cashName, cashAmount]);
    }
  }
