import { css, run } from "uebersicht";
import * as config from "./config.json";

console.log(config);

const options = {
  top: "20px",
  left: "420px",
  width: "600px",

  // Refer to https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  timezone: "US/Pacific",
  city: "Los Angeles",
};

let lastWeatherUpdate = 0;
let temp = 0;
let weather = "";

export const command = dispatch => {
  run(`TZ=":${options.timezone}" date "+%A %B %d %Y %T"`).then(response => {
    // console.log(response);
    return dispatch({
      type: "DATE_UPDATE",
      data: response,
    });
  });

  const now = Date.now();

  // Update every hour
  if (now - lastWeatherUpdate >= 60000) {
    lastWeatherUpdate = Date.now();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${options.city}&units=metric&appid=${config.OPENWEATHERMAP_APIKEY}`
    ).then(response => {
      return dispatch({
        type: "WEATHER_UPDATE",
        data: {
          weather: response.json(),
        },
      });
    });
  }
};

export const refreshFrequency = 1000;

export const className = {
  top: options.top,
  left: options.left,
  width: options.width,
  userSelect: "none",

  backgroundColor: "rgba(0, 0, 0, 0.8)",
  // border: "1px solid #333",
  padding: "5px",
  boxSizing: "border-box",
  borderRadius: "5px",
};

const containerClassName = css({
  color: "rgba(255, 255, 255)",
  fontFamily: "PT Mono",
  fontSize: "10pt",
  textAlign: "center",
});

const red = css({
  color: "#EF233C",
});

const green = css({
  color: "#3BCA2B",
});

const blue = css({
  color: "#5DADE2",
});

const yellow = css({
  color: "#ffff00",
});

const orange = css({
  color: "#FF8C00",
});

export const updateState = (event, previousState) => {
  if (event.error) {
    return { ...previousState, warning: `We got an error: ${event.error}` };
  }

  if (event.type === "DATE_UPDATE") {
    const [day, month, dayNum, year, time] = event.data.split(" ");

    return {
      warning: false,
      day: day,
      month: month,
      dayNum: dayNum,
      year: year,
      time: time,
    };
  } else if (event.type === "WEATHER_UPDATE") {
    event.data.weather.then(data => {
      temp = data.main.temp;
      weather = data.weather[0].main;
    });
  }

  return {
    ...previousState,
    warning: false,
  };
};

export const render = ({ warning, day, month, dayNum, year, time }) => {
  if (warning) {
    return <div>{warning}</div>;
  }

  return (
    <div className={containerClassName}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
        crossOrigin="anonymous"
      />
      {options.city} <i className={`far fa-calendar ${yellow}`}></i> {day},{" "}
      {month} {dayNum} <i className={`far fa-clock ${green}`}></i> {time}{" "}
      <i className={`fas fa-thermometer-half ${red}`}></i> {temp}&deg;C{" "}
      <i className={`fa fa-cloud ${blue}`}></i> {weather}
    </div>
  );
};
