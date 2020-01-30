#!/usr/bin/env node
// Lotionroom - Tendermint / Cosmos proof of concept contract made with Zenroom

// Copyright (C) 2020 Dyne.org foundation
// designed, written and maintained by
// Denis Roio and Puria Nafisi Azizi

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

let connect = require('lotion-connect')
var fs = require('fs');

const read_file = filename => {
  try {
    return fs.readFileSync(filename, 'utf8')
  } catch (e) {
    console.log(`File '${filename}' NOT FOUND!`)
  }
}

const read_json = filename => {
  try {
    return JSON.parse(read_file(filename));
  } catch (e) {
    console.log('malformed JSON. try like this:')
    console.log('{ "foo": "bar" }\n\n\n')
    console.error(e.message);
  }
}

const read_gci = () => {
  try {
    return read_file(".gci")
  } catch (e) {
    console.log('.gci file not found!\n\nIs the node runnig?\n\nAre you in the right folder?')
  }
}


async function main() {
  if (process.argv[2] === 'state' && process.argv.length === 4) {
    let { state } = await connect(process.argv[3])
    console.log(JSON.stringify(await state, null, 2))
    process.exit()
  } else if (process.argv[2] === 'send' && process.argv.length === 6) {
    const gci = read_gci()
    let { send } = await connect(gci)
    try {
      const data = read_json(process.argv[3])
      const keys = read_json(process.argv[4])
      const contract = read_file(process.argv[5])
      let tx = {
        "keys": keys,
        "data": data,
        "contract": contract
      }
      console.log(`Sending a Transaction to ${gci} with the following: \n\n ${JSON.stringify(tx)} \n\n`)
      console.log(JSON.stringify(await send(tx), null, 2))
      process.exit()
    } catch (e) {
      console.log('malformed JSON. try like this:')
      console.log('$ lotion send <gci> \'{ "foo": "bar" }\'')
    }
  } else if (process.argv.length < 3) {
    console.log(
      `
  Usage:

    $ lotion state                                                                    Get the latest state of an app
    $ lotion send <data-filename.json> <keys-filename.json> <zencode-filename.zen>    Send a zencode transaction to a running app
      `
    )
  }
}

main()
