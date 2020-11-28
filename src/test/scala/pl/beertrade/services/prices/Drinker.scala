package pl.beertrade.services.prices

import java.util.UUID

import collection.JavaConverters._
import scala.collection.breakOut

class Drinker(pricesModifier: PricesModifier, input_prices: Map[UUID, Double]) {
  def printMap(m: Map[UUID, Double]): Unit = {
    m.keys.toList.sorted.foreach(key => print(s"$key: ${m(key)}\n"))
  }

  def check(buys: List[Int], ids: List[UUID]): String = {
    val output_prices: Map[UUID, Double] = pricesModifier.countNewPrices(mapToJavaDouble(input_prices), mapToJavaInteger(buys.zipWithIndex.map { case (v, i) => (ids(i), v) }.toMap))
      .asScala.map{case (k, v) => (k, v.doubleValue)}(breakOut)
    printMap(output_prices)
    PricesAnalyzer.analyze(input_prices, output_prices, ids)

  }

  private def mapToJavaDouble(scalaMap: Map[UUID, Double]): java.util.Map[UUID, java.lang.Double] = {
    scalaMap.map { case (k, v) => k -> new java.lang.Double(v) }.asJava
  }

  private def mapToJavaInteger(scalaMap: Map[UUID, Int]): java.util.Map[UUID, java.lang.Integer] = {
    scalaMap.map { case (k, v) => k -> new java.lang.Integer(v) }.asJava
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
