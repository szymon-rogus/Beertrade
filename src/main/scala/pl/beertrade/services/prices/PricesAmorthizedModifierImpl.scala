package pl.beertrade.services.prices


case class BorderPrices(lower: Double, upper: Double)

class PricesAmorthizedModifierImpl(borderPrices: Map[Int, BorderPrices]) extends AbstractBucketsPricesModifier {

  override def countNewPrices(toIncrease: List[Repr], toDecrease: List[Repr], initPrices: Map[Int, Double]): Map[Int, Double] = {
    val toDistribute: Double = initPrices.size * 1.0

    val toDecreaseBiggest: Int = toDecrease.map(repr => repr.buys).max
    val toIncreaseSmallest: Int = toIncrease.map(repr => repr.buys).min
    val compareValue: Double = toDecreaseBiggest + (toIncreaseSmallest - toDecreaseBiggest) / 2.0

    val amortizedToDecreaseDistances: Map[Int, Double] = toDecrease.map(
      repr => (repr.productId, toDecreaseAmortizedDistance(initPrices, compareValue, repr))).toMap
    val toDecreaseDistance: Double = amortizedToDecreaseDistances.values.sum
    val toDecreaseUnit: Double = (toDistribute / 2.0) / toDecreaseDistance

    val amortizedToIncreaseDistances: Map[Int, Double] = toIncrease.map(
      repr => (repr.productId, toIncreaseAmortizedDistance(initPrices, compareValue, repr))).toMap
    val toIncreaseDistance: Double = amortizedToDecreaseDistances.values.sum
    val toIncreaseUnit: Double = (toDistribute / 2) / toIncreaseDistance

    var newPrices = Map[Int, Double]()

    toDecrease.foreach(item => {
      newPrices = newPrices + (item.productId -> (initPrices(item.productId) - toDecreaseUnit * amortizedToDecreaseDistances(item.productId)))
    })
    toIncrease.foreach(item => {
      newPrices = newPrices + (item.productId -> (initPrices(item.productId) + toIncreaseUnit * amortizedToIncreaseDistances(item.productId)))
    })
    newPrices
  }

  private def toIncreaseAmortizedDistance(initPrices: Map[Int, Double], compareValue: Double, repr: Repr) = {
    (repr.buys - compareValue) * (borderPrices(repr.productId).upper - initPrices(repr.productId)) / borderPrices(repr.productId).upper
  }

  private def toDecreaseAmortizedDistance(initPrices: Map[Int, Double], compareValue: Double, repr: Repr) = {
    (compareValue - repr.buys) * (initPrices(repr.productId) - borderPrices(repr.productId).lower) / borderPrices(repr.productId).lower
  }

}