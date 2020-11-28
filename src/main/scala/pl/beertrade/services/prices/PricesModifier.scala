package pl.beertrade.services.prices
import java.util.UUID

trait PricesModifier {
  def countNewPrices(input_prices: java.util.Map[UUID, java.lang.Double], buys: java.util.Map[UUID, java.lang.Integer]): java.util.Map[UUID, java.lang.Double]
}
