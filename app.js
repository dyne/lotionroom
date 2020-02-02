// Tendermint / Cosmos proof of concept contract made with Zenroom

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

// deps
let lotion = require('lotion')
let zenroom = require('zenroom')
let fs = require('fs')
let path = require('path')
const enc = { encoding: 'utf8' }


// initialization
let init = { initialState: { } }
// zenroom: { } } }
let zconf = { }

zconf.config = fs.readFileSync('zenroom.rc', enc).trim()

// version
// zenroom.script("write(VERSION.original)")
//     .print(text => { zconf.version = text
// 					 console.log(`Zenroom version: ${zconf.version}`) })
//     .print_err(text => { })
//     .zenroom_exec()
// random salt
// zenroom.script("write(OCTET.random(32))")
// 	.print(text => { zconf.salt = text
// 					 console.log(`Salt: ${zconf.salt}`) })
// 	.zenroom_exec()

init.initialState.zenroom = zconf

// load all .zen contracts found in ./zencode directory
const zencode_path = path.join(__dirname, 'zencode');
let contracts = { }
fs.readdir(zencode_path, function (err, files) {
    if (err) { return console.log('Unable to scan directory: ' + err) }
    files.forEach(function (file) {
        if(path.extname(file) == '.zen') {
            console.log("load zencode: %s",file);
            contracts[path.basename(file,'.zen')] =
                fs.readFileSync(path.join(zencode_path,file),enc)
        }
    });
});
init.initialState.contracts = contracts

let app = lotion(init)


function transactionHandler(state, transaction, ctx) {
    let contract = transaction.contract // state.contracts[transaction.contract]
    if( ! contract ) return false

    // print some info on the execution
    console.log(ctx.time)
    // console.log(state.zenroom.salt)
    console.log(contract)

    // prepare output buffer
    let result = []
    const printFunction = text => { result.push(text) }
	console.log(transaction)
    // actual call to zencode_exec
    zenroom.script(state.contracts[contract])
        .conf(state.zenroom.config)
        .data(JSON.stringify(transaction.data))
        .keys(transaction.keys)
        .print_err(text => { console.err(text) })
        .print(printFunction)
        .zencode_exec()

    // updates the state with the result
    state.current = result
}

app.use(transactionHandler)

app.start().then(appInfo => {
    console.log(appInfo.GCI)
    fs.writeFileSync("genesis.gci", appInfo.GCI)
})
