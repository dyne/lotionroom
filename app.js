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


// initialization
let init = { initialState: { zenroom: { } } }
zenroom.script("print(VERSION.original)")
	.print(text => { init.initialState.zenroom.version = text.trim() })
	.print_err(text => { })
	.zenroom_exec()
// configuration
const enc = { encoding: 'utf8' }
const configuration = fs.readFileSync('zenroom.rc', enc).trim()
init.initialState.zenroom.config = configuration
// // random salt
// TODO: overwrites version?! problem with double zenroom execution?
// zenroom.script("print(OCTET.random(32))")
// 	.print(text => { init.initialState.zenroom.salt = text.trim() })
// 	.zenroom_exec()

// load all .zen contracts found in ./zencode directory
// const zencode_path = path.join(__dirname, 'zencode');
// let contracts = { }
// fs.readdir(zencode_path, function (err, files) {
//     if (err) { return console.log('Unable to scan directory: ' + err) } 
//     files.forEach(function (file) {
// 		if(path.extname(file) == '.zen') {
// 			console.log("load zencode: %s",file); 
// 			contracts[path.basename(file,'.zen')] =
// 				fs.readFileSync(path.join(zencode_path,file),enc)
// 		}
//     });
// });
// init.initialState.contracts = contracts

let app = lotion(init)


function transactionHandler(state, transaction, ctx) {
	let contract = transaction.contract // state.contracts[transaction.contract]
	if( ! contract ) return false

	// print some info on the execution
	console.log(ctx.time)
	console.log(state.zenroom.salt)
	console.log(contract)

	// prepare output buffer
    let result = []
	const printFunction = text => { result.push(text) }

	// actual call to zencode_exec
	zenroom.script(contract)
		.conf(state.zenroom.config)
		.data(transaction.data)
		.keys(transaction.keys)
		.print_err(text => { true })
		.print(printFunction)
		.zencode_exec()
	// TODO: zencode_exec returns error on contract string?
	// Invalid function pointer called with signature 'iii'. Perhaps
	// this is an invalid value (e.g. caused by calling a virtual
	// method on a NULL pointer)? Or calling a function with an
	// incorrect type, which will fail? (it is worth building your
	// source files with -Werror (warnings are errors), as warnings
	// can indicate undefined behavior which can cause this)

	// updates the state with the result
    state.zenroom_result = result
}

app.use(transactionHandler)

app.start().then(appInfo => { 
	console.log(appInfo.GCI)
	fs.writeFileSync(".gci", appInfo.GCI)
})
