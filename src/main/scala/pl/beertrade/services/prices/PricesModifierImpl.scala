package pl.beertrade.services.prices

import scala.math.abs


class PricesModifierImpl() extends PricesModifier{
  case class Repr(productId: Int, buys: Int, sumPref: Int = 0)

  private def countNewPrices(toIncrease: List[Repr], toDecrease: List[Repr], initPrices: Map[Int, Double]): Map[Int, Double] ={
    val toDistribute: Double = initPrices.size * 1.0

    val toDecreaseBiggest: Int = toDecrease.map(repr => repr.buys).max
    val toIncreaseSmallest: Int  = toIncrease.map(repr => repr.buys).min
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

  private def decide_which_best(pricesIfLeft: Map[Int, Double], pricesIfRight: Map[Int, Double], borderSet: List[Repr], indexedInitPrices: Map[Int, Double]): Map[Int,Double] = {
    def calcSum(prices: Map[Int,Double]) = borderSet.map(x => prices(x.productId)).sum

    val sumPlain = calcSum(indexedInitPrices)

    //  counting delta if border left
    val sumLeft = calcSum(pricesIfLeft)
    //   counting delta if border right
    val sumRight = calcSum(pricesIfRight)

    val deltaLeft = abs(sumPlain - sumLeft)
    val deltaRight = abs(sumPlain - sumRight)

    if (deltaLeft >= deltaRight)
      pricesIfRight
    else
      pricesIfLeft
  }


  override def countNewPrices(inputPrices: Map[Int, Double], buys: Map[Int, Int]): Map[Int, Double] = {
    val indexedBuys: List[Repr] = inputPrices.keys.map {
      productId: Int => Repr(productId = productId, buys = buys(productId))
    }.toList
    val sortedIndexedBuys: List[Repr] = indexedBuys.sortWith(_.buys < _.buys)
    val justSums = sortedIndexedBuys.map(a => a.buys)
    val prefixSums: List[Int] = justSums.foldLeft(List[Int]())((accum, element) => {
      if (accum.isEmpty)
        List(element)
      else
        accum.+:(accum.head + element)
    })
    val sortedZippedBuysWithSums: List[(Repr, Int)] = sortedIndexedBuys.zip(prefixSums.reverse)
    val sortedIndexedBuysWithSums = sortedZippedBuysWithSums.map{case (repr, zippedSum) => Repr(repr.productId, repr.buys, zippedSum)}

    val allBuys: Int = buys.values.sum
    val halfBuys: Double = allBuys / 2.0


    val toIncrease: List[Repr] = sortedIndexedBuysWithSums.filter(_.sumPref >= halfBuys)
    val toDecrease: List[Repr] = sortedIndexedBuysWithSums.filter(_.sumPref < halfBuys)

    if (toIncrease.isEmpty || toDecrease.isEmpty)
      return inputPrices

    val toDecreaseBiggest = toDecrease.map(repr => repr.buys).max
    val toIncreaseSmallest = toIncrease.map(repr => repr.buys).min

    if (toIncreaseSmallest != toDecreaseBiggest) {
      countNewPrices(toIncrease, toDecrease, inputPrices)
    } else {
      val theEqual: Int = toDecreaseBiggest
      val borderSet: List[Repr] = sortedIndexedBuysWithSums.filter(x => x.buys == theEqual)
      val toIncrease2 = toIncrease.filter(item => !borderSet.contains(item))
      val toDecrease2 = toDecrease.filter(item => !borderSet.contains(item))

      if(borderSet.size == sortedIndexedBuysWithSums.size){
        inputPrices
      }else if(toDecrease2.isEmpty){
        countNewPrices(toIncrease2, borderSet, inputPrices)
      }else if(toIncrease2.isEmpty){
        countNewPrices(borderSet, toDecrease2, inputPrices)
      }else{
        decide_which_best(
          countNewPrices(toIncrease2, toDecrease2.union(borderSet), inputPrices),
          countNewPrices(toIncrease2.union(borderSet), toDecrease2, inputPrices),
          borderSet,
          inputPrices)
      }
    }

  }
}