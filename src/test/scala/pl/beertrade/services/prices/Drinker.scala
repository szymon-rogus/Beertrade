package pl.beertrade.services.prices

import java.util.UUID

class Drinker(pricesModifier: PricesModifier, input_prices: Map[UUID, Double]) {
  def printMap(m: Map[UUID, Double]): Unit = {
    m.keys.toList.sorted.foreach(key => print(s"$key: ${m(key)}\n"))
  }

  def check(buys: List[Int], ids: List[UUID]): String = {
    val output_prices: Map[UUID, Double] = pricesModifier.countNewPrices(input_prices, buys.zipWithIndex.map { case (v, i) => (ids(i), v) }.toMap)
    printMap(output_prices)
    PricesAnalyzer.analyze(input_prices, output_prices, ids)

  }
}

object PricesAnalyzer {
  def analyze(input_prices: Map[UUID, Double], output_prices: Map[UUID, Double], ids: List[UUID]): String = {
    def sign(input: Double, output: Double): String = {
      if (input < output) return "<"
      if (input > output) return ">"
      if (input == output) return "="
      "="
    }

    var result: String = ""
    ids.foreach {
      product_id =>
        result += sign(input_prices(product_id), output_prices(product_id))
    }
    result
  }

}

object Drinker {
  def convertList(l: List[Double], ids: List[UUID]): Map[UUID, Double] = {
    l.zipWithIndex.map {
      case (b, c) => (ids(c), b)
    }.toMap
  }
}
