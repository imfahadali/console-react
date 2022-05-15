import { stringify } from "query-string";

// export function getApi(queries) {
//   //get queries and return encoded api ready to be fetched
//   let api = "https://find.jobget.com/api/jobs/search";
//   api += "?";
//   console.log(api);
//   stringify(queries);
// }

export const fetchingData = async (api) => {
  console.log("IS empty");
  const response = await fetch(api);
  const resData = await response.json();
  console.log(resData);
  console.log(resData.data.hits);
  const dataObjects = resData.data.hits.map((item) => {
    const {
      title,
      location,
      company,
      category,
      cpa,
      cpc,
      source,
      posted_time,
      _modifiedTS,
    } = item._source;
    return {
      id: item._id,
      title,
      source,
      location,
      company,
      category,
      cpa,
      cpc,
      posted_time,
      _modifiedTS,
    };
  });
  console.log(dataObjects);
  return dataObjects;
};

export function relativeDays(timestamp) {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / oneDayInMs
  );

  return rtf.format(daysDifference, "day");
}
