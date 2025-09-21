<p align="center">
  <h3 align="center"><a href="https://streamawesome.app"><img src = "streamawesome-logo.png"/></a><br>
  <a href="https://streamawesome.app">🔗 Available Online</a></h3>
</p>
<p>&nbsp;</p>

## Stream Awesome - Stream Deck Icon Generator using Font Awesome


[![Build](https://img.shields.io/github/actions/workflow/status/sebinside/StreamAwesome/build.yml)](https://github.com/sebinside/StreamAwesome/actions)
[![Available Online](https://img.shields.io/badge/available-online-teal)](https://streamawesome.app)
[![Release](https://img.shields.io/github/v/release/sebinside/StreamAwesome)](https://github.com/sebinside/StreamAwesome/releases)
[![Font Awesome](https://img.shields.io/badge/font%20awesome-v6.6.0-orange)](https://fontawesome.com)


Generate awesome-looking Stream Deck icons. Close to the [Elgato original](https://www.elgato.com/stream-deck) and awesome because of [Font Awesome](https://fontawesome.com/).

[![image](preview.png)](https://streamawesome.app)

## How to Install

> [!TIP]
> You don't need to install anything if you just want to use it; head over to [streamawesome.app](https://streamawesome.app). A local installation is only needed if you want to contribute to this repository or run it offline.

1. Install [Node](https://nodejs.org) and npm
2. Download or clone this repository, e.g. using `git clone https://github.com/sebinside/StreamAwesome.git`
3. Download the **correct** version of [Font Awesome For The Web](https://fontawesome.com/download)
    1. Have a look at the orange font awesome shield in this readme to see which version is used
    2. Head over to the [download page](https://fontawesome.com/download), select the correct major version first, then click on `Looking for older or specific releases` and select the correct minor/patch version, both `Free` and `Pro` are supported
    3. Download the `Web` version and unzip the downloaded file
4. Move the folders `css` and `webfonts` into `StreamAwesome/fonts/fontawesome`, it should look like this:
    ```
    StreamAwesome
      └── fonts
          └── fontawesome
              ├── css
              └── webfonts
    ```
5. Run `npm install` from within the `StreamAwesome` folder to install all dependencies
6. Run `npm run dev` from within the `StreamAwesome` folder or use the provided Visual Studio Code config
7. Open the displayed localhost port in your web browser, by default: `http://localhost:5173`
