const testEndpoint = async () => {
  try {
    const response = await fetch('');

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    const items = data.normalads || data.data || [];
    const filteredData = items.filter((item) => item.categories === 'Skincare');

    console.log(filteredData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

testEndpoint();