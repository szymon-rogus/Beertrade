package pl.beertrade.services.prices
import java.util.UUID

trait PricesModifier[I] {
  def countNewPrices(input_prices: java.util.Map[I, java.lang.Double], buys: java.util.Map[I, java.lang.Integer]): java.util.Map[I, java.lang.Double]
}
