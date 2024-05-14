export function Convert(str: string) {
  let tempString = "";
  if (
    str.toLowerCase().split(" ").indexOf("или") !== -1 ||
    str.toLowerCase().split(" ").indexOf("и") !== -1
  ) {
    let tempArr = str.split(" ");
    tempArr.forEach((item: string, index: number) => {
      if (item.toLowerCase() == "или") {
        tempArr[index] = "+";
      } else if (item.toLowerCase() == "и") {
        tempArr[index] = "*";
      }
    });
    tempString = tempArr.join(" ");
    return tempString;
  } else if (
    str.toLowerCase().split(" ").indexOf("+") !== -1 ||
    str.toLowerCase().split(" ").indexOf("*") !== -1
  ) {
    return str;
  } else {
    return false;
  }
}
