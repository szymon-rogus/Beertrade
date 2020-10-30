package pl.beertrade.services.prices

import java.util

import org.junit.jupiter.api.Assertions.assertEquals

import scala.collection.JavaConverters.asScalaBufferConverter

class Drinker(pricesModifier: PricesModifier, input_prices: Map[Int, Double]) {

  def check(buys: List[Int]): String = {
    val output_prices: Map[Int, Double] = pricesModifier.countNewPrices(input_prices, buys.zipWithIndex.map { case (v, i) => (i, v) }.toMap)
    PricesAnalyzer.analyze(input_prices, output_prices)

  }
}

object PricesAnalyzer{
  def analyze(input_prices: Map[Int, Double], output_prices: Map[Int, Double]): String = {
    def sign(input: Double, output: Double): String = {
      if(input < output)
        return "<"
      if(input > output)
        return ">"
      if(input == output)
        return "="
      "="
    }
    var result: String = ""
    input_prices.keys.toList.sorted.foreach {
      product_id =>
        result += sign(input_prices(product_id), output_prices(product_id))
    }
    result
  }

}

object Drinker{
  def convertList(l: List[Double]): Map[Int, Double] = {
    l.zipWithIndex.map {
      case (b, c) => (c, b)
    }.toMap
  }


}
