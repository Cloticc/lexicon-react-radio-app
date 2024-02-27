export const fetchData = async (endpoint: string) => {
  let data;
  let error;
  let isLoading = true;

  try {
    const response = await fetch(`https://api.sr.se/api/v2/${endpoint}`);

    if (!response.ok) {
      error = `Error: ${response.status}`;
      throw new Error(error);
    }

    data = await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = 'An error occurred';
    }
  } finally {
    isLoading = false;
  }

  return { data, isLoading, error };
}

// export const fetchData = async (endpoint: string) => {
//   let data;
//   let error;
//   let isLoading = true;

//   try {
//     const response = await fetch(`https://api.sr.se/api/v2/${endpoint}`);
//     const xmlData = await response.text();
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(xmlData, "text/xml");
//     data = xmlDoc;
//   } catch (err: unknown) { // had to add : unknown to get rid of error from eslint
//     if (err instanceof Error) {
//       error = err.message;
//     } else {
//       error = 'An error occurred';
//     }
//   } finally {
//     isLoading = false;
//   }

//   return { data, isLoading, error };
// }

// import xml2js from 'xml2js';

// export const fetchData = async (endpoint: string) => {
//   let data;
//   let error;
//   let isLoading = true;

//   try {
//     const response = await fetch(`https://api.sr.se/api/v2/${endpoint}`);
//     const xmlData = await response.text();
//     data = await xml2js.parseStringPromise(xmlData);
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       error = err.message;
//     } else {
//       error = 'An error occurred';
//     }
//   } finally {
//     isLoading = false;
//   }

//   return { data, isLoading, error };
// }