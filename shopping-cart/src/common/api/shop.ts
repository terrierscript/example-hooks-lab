var Shop: any = {}

var _products = require("./products.json")

var TIMEOUT = 100

Shop.getProducts = function(cb, timeout) {
  timeout = timeout || TIMEOUT
  setTimeout(function() {
    cb(_products)
  }, timeout)
}

Shop.buyProducts = function(payload, cb, timeout) {
  timeout = timeout || TIMEOUT
  setTimeout(function() {
    cb()
  }, timeout)
}

export default Shop
