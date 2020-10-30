package pl.beertrade.services.prices

trait PricesModifier {
  def countNewPrices(input_prices: Map[Int, Double], buys: Map[Int, Int]): Map[Int, Double]
}
