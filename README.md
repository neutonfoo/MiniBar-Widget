# Depreciated 12.28.22

There seems to be a couple of people finding this repo through the Übersicht website and that's great! But I have stopped using Übersicht in favor of [SketchyBar](https://github.com/FelixKratz/SketchyBar), which I found to be much easier to develop with. 

Previews of my SketchyBar configuration -- my [dotfiles](https://github.com/neutonfoo/dotfiles) -- (and other examples [here](https://github.com/FelixKratz/SketchyBar/discussions/47#discussioncomment-4156055)):

<img width="1470" alt="203055306-ab01f57a-b85a-48b0-a156-791038606b2f" src="https://user-images.githubusercontent.com/3114585/209837107-1b6ccbba-4449-42f1-b2d4-a6bc32a435a3.png">

<img width="2560" alt="206904761-14eaf83a-717a-4f6b-a059-55a461bceac7" src="https://user-images.githubusercontent.com/3114585/209837110-f277eb55-1116-4066-a2b6-76b85b13d747.png">


# MiniBar

![MiniBar-Widget](screenshot.png)

## Installation

Place the widget into the Übersicht widget directory.

Copy config.template.json as config.json and place your OpenWeatherMap API key.

## Options

```js
const options = {
  top: "20px",
  left: "420px",
  width: "600px",

  // Refer to https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  timezone: "US/Pacific",

  city: "Los Angeles",
};
```
