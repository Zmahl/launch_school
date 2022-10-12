function shortLongShort (str1, str2) {
  if (str1.length < str2.length) {
    small = str1;
    lng = str2;
  }
  else {
    small = str2;
    lng = str1;
  }

  console.log(small + lng + small);
}

