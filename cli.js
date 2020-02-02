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
let YAML = require('yaml')
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
        return read_file("genesis.gci")
    } catch (e) {
        console.log('genesis.gci file not found!\n\nIs the node runnig?\n\nAre you in the right folder?')
    }
}

let cx
async function main() {
    switch(process.argv[2]) {
    case 'context':
        cx = await connect(read_gci())
        console.log(YAML.stringify(await cx.state))
        process.exit()
        break;

    case 'version':
        cx = await connect(read_gci())
        console.log(YAML.stringify(await cx.state.zenroom))
        process.exit()
        break;

	case 'api':
		cx = await connect(read_gci())
		// const api = await cx.state.contracts
		console.log(YAML.stringify(await cx.state.contracts))
		process.exit()
		break;

	case 'state':
		cx = await connect(read_gci())
		// const api = await cx.state.contracts
		console.log(YAML.stringify(await cx.state.current))
		process.exit()
		break;

    case 'send':
        const gci = read_gci()
        let { send } = await connect(gci)
        const contract = process.argv[3]
        try {
            const data = process.argv[4]?read_json(process.argv[4]):null
            const keys = process.argv[5]?read_json(process.argv[5]):null
            let tx = {
				"contract": contract,
                "keys": keys,
                "data": data }
			console.log(`To ${gci}:\n${YAML.stringify(tx)}`)
			const res = await send(tx)
			console.log(`Reply:\n${YAML.stringify(res)}\n`)
			process.exit()
		} catch (e) {
			console.log('malformed JSON. try like this:')
			console.log('$ lotion send <gci> \'{ "foo": "bar" }\'')
		}
		process.exit()
		break;

    default:
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
