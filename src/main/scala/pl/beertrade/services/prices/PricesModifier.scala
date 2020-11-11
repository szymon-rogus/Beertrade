package pl.beertrade.services.prices
import java.util.UUID

trait PricesModifier {
  def countNewPrices(input_prices: Map[UUID, Double], buys: Map[UUID, Int]): Map[UUID, Double]
}
