export const hasUniqueProperties = (arr: any[], prop: string) => {
  const tmpArr = [];

  for (const obj in arr) {
    if (tmpArr.indexOf(arr[obj][prop]) < 0) {
      tmpArr.push(arr[obj][prop]);
    } else {
      return false;
    }
  }

  return true;
};
