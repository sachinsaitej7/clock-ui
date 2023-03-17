// write a util function that extracts file path from a url
// this is sample url:  http://localhost:9199/v0/b/clock-poc-11334.appspot.com/o/listing-images%2Fdownload%20(2).jpeg-1678956049370?alt=media&token=f4ff24d7-735d-46c0-b101-d34e0fdb2dc1

exports.getFileNameFromUrl = (url) => {
  const parts = url.split("/");
  const fileNameWithParams = parts[parts.length - 1];
  const fileName = fileNameWithParams.split("?")[0];
  return `${decodeURIComponent(fileName)}`;
};
