package pl.beertrade.services.prices

import scala.collection.JavaConverters._
import scala.collection.breakOut

class MultipleDinker[I : Ordering](pricesModifier: PricesModifier[I], var input_prices: Map[I, Double]) {
  print(input_prices+"\n")

  def printMap(m: Map[I, Double]): Unit = {
    m.keys.toList.sorted.foreach(key => print(s"$key: ${m(key)}\n"))
  }

  def check(buys: List[Int], ids: List[I]): String = {
    val output_prices: Map[I, Double] = pricesModifier.countNewPrices(mapToJavaDouble(input_prices), mapToJavaInteger(buys.zipWithIndex.map { case (v, i) => (ids(i), v) }.toMap))
      .asScala.map{case (k, v) => (k, v.doubleValue)}(breakOut)
    printMap(output_prices)
    val inputPricesToAnalyze = input_prices
    input_prices = output_prices
    PricesAnalyzer.analyze(inputPricesToAnalyze, output_prices, ids)

  }

  private def mapToJavaDouble(scalaMap: Map[I, Double]): java.util.Map[I, java.lang.Double] = {
    scalaMap.map { case (k, v) => k -> new java.lang.Double(v) }.asJava
  }

  private def mapToJavaInteger(scalaMap: Map[I, Int]): java.util.Map[I, java.lang.Integer] = {
    scalaMap.map { case (k, v) => k -> new java.lang.Integer(v) }.asJava
  }

}