/* eslint-disable */

export function compareDate(date1, date2) {
  if (date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()) {
    return true;
  }
  return false;
}

// export function filterByDate(data, date) {
//
// }
