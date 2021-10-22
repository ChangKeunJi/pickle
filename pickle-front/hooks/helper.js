export const summarizeStr = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num) + "...";
  }
};
