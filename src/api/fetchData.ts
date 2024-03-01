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
