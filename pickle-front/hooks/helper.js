export const summarizeStr = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num) + "...";
  }
};

export const updateArr = (exArray, element) => {
  let newArr = [...exArray];
  const updatedEl = newArr.find((el) => el.id === element.id);
  const index = newArr.indexOf(updatedEl);
  newArr.splice(index, 1, element);
  return newArr;
};
