<p align="center">
  <a href="https://www.dyne.org">
    <img alt="lotionroom" src="https://www.oldbookillustrations.com/wp-content/high-res/n-d-1873-1877/carbonated-water-device-768.jpg" width="150" />
  </a>
</p>

<h1 align="center">
  lotionroom</br>
  <sub>An integration of lotion with zenroom</sub>
</h1>

<p align="center">
  <a href="https://travis-ci.com/dyne/lotionroom">
    <img src="https://travis-ci.com/dyne/lotionroom.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://dyne.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%9D%A4%20by-Dyne.org-blue.svg" alt="Dyne.org">
  </a>
</p>


<h4 align="center">
  <a href="#-install">💾 Install</a>
  <span> • </span>
  <a href="#-quick-start">🎮 Quick start</a>
  <span> • </span>
  <a href="#-acknowledgements">😍 Acknowledgements</a>
  <span> • </span>
  <a href="#-links">🌐 Links</a>
  <span> • </span>
  <a href="#-contributing">👤 Contributing</a>
  <span> • </span>
  <a href="#-license">💼 License</a>
</h4>

<br><br>


<details id="toc">
 <summary><strong>🚩 Table of Contents</strong> (click to expand)</summary>

* [Install](#-install)
* [Quick start](#-quick-start)
* [Acknowledgements](#-acknowledgements)
* [Links](#-links)
* [Contributing](#-contributing)
* [License](#-license)
</details>

***
## 💾 Install
```bash
cd lotionroom
npm -g install .
```


***
## 🎮 Quick start

Place all zencode contracts in the `zencode` directory

Start the node with `nodejs app.js` (creates or uses already existing `genesis.gci`)

Call the client using the `lr` command, for instance:
- `lr context`: list all the configured contracts
- `lr state`: shows the currently saved state
- `lr send <data> <keys>`: sends a transaction with json files

For a quick test round of zero-knowledge proof credential authentication:
`cd test && ./zkauth.sh`
Then watch the logs...

***
## 😍 Acknowledgements

Copyright © 2020 by [Dyne.org](https://www.dyne.org) foundation, Amsterdam

Designed, written and maintained by Puria Nafisi Azizi and Denis Roio.

***
## 🌐 Links

https://dyne.org/

***
## 👤 Contributing

Please first take a look at the [Dyne.org - Contributor License Agreement](CONTRIBUTING.md) then

1.  🔀 [FORK IT](../../fork)
2.  Create your feature branch `git checkout -b feature/branch`
3.  Commit your changes `git commit -am 'Add some fooBar'`
4.  Push to the branch `git push origin feature/branch`
5.  Create a new Pull Request
6.  🙏 Thank you


***
## 💼 License
    lotionroom - An integration of lotion with zenroom
    Copyright (c) 2020 Dyne.org foundation, Amsterdam

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**[back to 🔝](#toc)**
