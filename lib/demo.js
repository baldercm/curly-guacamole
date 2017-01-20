'use strict'

async function run() {
  try {
    let result = await task()
    console.log(result)
  } catch(e) {
    console.error(e)
  }
}

function task() {
  return Promise.resolve('ok!').delay(3000).timeout(1).return('go!')
}

export {run}
