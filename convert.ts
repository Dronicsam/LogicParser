export function Convert(str: string) {
  let tempString = "";
  if (
    str.toLowerCase().split(" ").indexOf("или") > -1 ||
    str.toLowerCase().split(" ").indexOf("и")
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
  } else {
    tempString = str;
  }
  return tempString;
}
