'use strict'

import Bluebird from 'bluebird'
import * as babelPromise from 'babel-runtime/core-js/promise'

babelPromise.default = Bluebird

import './app'
