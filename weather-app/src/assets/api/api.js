const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = async ({ city }) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export default getWeather;
