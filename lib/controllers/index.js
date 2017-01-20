'use strict'


export default (router) => {
  router.get('/', hello)
}

function hello(req, res) {
  res.status(200).send('hello')
}
