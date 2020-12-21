package pl.beertrade.services.prices

case class BorderPrices(lower: Double, upper: Double)

class PricesAmorthizedModifierImpl[I](borderPrices: Map[I, BorderPrices]) extends AbstractBucketsPricesModifier[I] {
  override def finalize(toIncrease: List[Repr], toDecrease: List[Repr], initPrices: Map[I, Double]): Map[I, Double] = {
    val toDistribute = initPrices.size * 1.0

    val toDecreaseBiggest = toDecrease.map(repr => repr.buys).max
    val toIncreaseSmallest = toIncrease.map(repr => repr.buys).min
    val compareValue = toDecreaseBiggest + (toIncreaseSmallest - toDecreaseBiggest) / 2.0

    val amortizedToDecreaseDistances = toDecrease.map(
      repr => (repr.productId, toDecreaseAmortizedDistance(initPrices, compareValue, repr))).toMap
    val toDecreaseDistance = amortizedToDecreaseDistances.values.sum
    val toDecreaseUnit = (toDistribute / 2.0) / toDecreaseDistance

    val amortizedToIncreaseDistances = toIncrease.map(
      repr => (repr.productId, toIncreaseAmortizedDistance(initPrices, compareValue, repr))).toMap
    val toIncreaseDistance = amortizedToIncreaseDistances.values.sum
    val toIncreaseUnit = (toDistribute / 2) / toIncreaseDistance

    var newPrices = Map[I, Double]()

    toDecrease.foreach(item => {
      newPrices = newPrices + (item.productId -> (initPrices(item.productId) - toDecreaseUnit * amortizedToDecreaseDistances(item.productId)))
    })
    toIncrease.foreach(item => {
      newPrices = newPrices + (item.productId -> (initPrices(item.productId) + toIncreaseUnit * amortizedToIncreaseDistances(item.productId)))
    })
    newPrices
  }

  private def toIncreaseAmortizedDistance(initPrices: Map[I, Double], compareValue: Double, repr: Repr) = (repr.buys - compareValue) * (borderPrices(repr.productId).upper - initPrices(repr.productId)) / borderPrices(repr.productId).upper

  private def toDecreaseAmortizedDistance(initPrices: Map[I, Double], compareValue: Double, repr: Repr) = (compareValue - repr.buys) * (initPrices(repr.productId) - borderPrices(repr.productId).lower) / borderPrices(repr.productId).lower


}

object PricesAmorthizedModifierImpl {
  def apply[I](borderPrices: Map[I, BorderPrices]): Option[PricesAmorthizedModifierImpl[I]] = {
    if (validateBorderPrices(borderPrices))
      Option(new PricesAmorthizedModifierImpl(borderPrices))
    else
      None
  }

  def validateBorderPrices[I](borderPrices: Map[I, BorderPrices]): Boolean = !borderPrices.values.exists(borderPrice => borderPrice.upper <= 0.0 || borderPrice.lower <= 0.0)

}