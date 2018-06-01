
import path from 'path'
//import Kernel from './kernel'

if (process.argv.length != 3) {
  console.log('Need a JSON config object')
  process.exit()
}

const config = require(path.resolve(process.argv[2]))


let init = (r) =>  'todo';
const kernel = {init};

kernel.init(err => {
  if (err) {
    console.error("Failed to init")
    console.log(err)
    process.exit()
  }
})


