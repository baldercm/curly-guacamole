'use strict'

import Model from '../model/model'

export default function(router) {
  router.get('/', hello)
}

async function hello(req, res) {
  let model = await Model.findOne().exec()

  res.status(200).json(model)
}
