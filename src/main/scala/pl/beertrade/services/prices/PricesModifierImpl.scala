package pl.beertrade.services.prices


class PricesModifierImpl() extends AbstractBucketsPricesModifier {

  override def countNewPrices(toIncrease: List[Repr], toDecrease: List[Repr], initPrices: Map[Int, Double]): Map[Int, Double] = {
    val toDistribute: Double = initPrices.size * 1.0

    val toDecreaseBiggest: Int = toDecrease.map(repr => repr.buys).max
    val toIncreaseSmallest: Int = toIncrease.map(repr => repr.buys).min
    val compareValue: Double = toDecreaseBiggest + (toIncreaseSmallest - toDecreaseBiggest) / 2.0
    val toDecreaseDistance: Double = toDecrease.map(x => compareValue - x.buys).sum
    val toDecreaseUnit: Double = (toDistribute / 2.0) / toDecreaseDistance
    val toIncreaseDistance: Double = toIncrease.map(x => x.buys - compareValue).sum
    val toIncreaseUnit: Double = (toDistribute / 2) / toIncreaseDistance
    var newPrices = Map[Int, Double]()

    toDecrease.foreach(item => {
      newPrices = newPrices + (item.productId -> (initPrices(item.productId) - toDecreaseUnit * (
        compareValue - item.buys)))
    })
    toIncrease.foreach(item => {
      newPrices = newPrices + (item.productId -> (initPrices(item.productId) + toIncreaseUnit * (
        item.buys - compareValue)))
    })
    newPrices
  }
}