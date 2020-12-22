package pl.beertrade.services.prices

import java.util.UUID
import collection.JavaConverters._
import scala.collection.breakOut


/**
 * Dinker can be used to test prices modifiers. Add input_prices to begin with and then
 * call methods to do buys
 * @param pricesModifier
 * @param input_prices
 */
class SimpleDrinker[I : Ordering](pricesModifier: PricesModifier[I], input_prices: Map[I, Double]) {
  def printMap(m: Map[I, Double]): Unit = {
    m.keys.toList.sorted.foreach(key => print(s"$key: ${m(key)}\n"))
  }

  def check(buys: List[Int], ids: List[I]): String = {
    val output_prices: Map[I, Double] = pricesModifier.countNewPrices(mapToJavaDouble(input_prices), mapToJavaInteger(buys.zipWithIndex.map { case (v, i) => (ids(i), v) }.toMap))
      .asScala.map{case (k, v) => (k, v.doubleValue)}(breakOut)
    printMap(output_prices)
    PricesAnalyzer.analyze(input_prices, output_prices, ids)

  }

  private def mapToJavaDouble(scalaMap: Map[I, Double]): java.util.Map[I, java.lang.Double] = {
    scalaMap.map { case (k, v) => k -> new java.lang.Double(v) }.asJava
  }

  private def mapToJavaInteger(scalaMap: Map[I, Int]): java.util.Map[I, java.lang.Integer] = {
    scalaMap.map { case (k, v) => k -> new java.lang.Integer(v) }.asJava
  }

}

object PricesAnalyzer {
  def analyze[I: Ordering](input_prices: Map[I, Double], output_prices: Map[I, Double], ids: List[I]): String = {
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

object SimpleDrinker {
  def convertList[T, I : Ordering](l: List[T], ids: List[I]): Map[I, T] = {
    l.zipWithIndex.map {
      case (b, c) => (ids(c), b)
    }.toMap
  }




  def generateIdsFor (l: List[Double]): List[UUID] ={
    l.indices.map(_ => UUID.randomUUID()).toList
  }

//  def inputAndIds(l: List[Double]): ()


}
