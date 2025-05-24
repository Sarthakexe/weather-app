const apiKey = '0dc8420d25efd0c0b979bd0dc5128207';

const getWeather = async ({city}) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
}

export default getWeather