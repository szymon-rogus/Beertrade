package pl.beertrade.services.prices

import java.util.UUID

import scala.math.abs

abstract class AbstractBucketsPricesModifier extends PricesModifier{

  case class Repr(productId: UUID, buys: Int, sumPref: Int = 0)

  def finalize(toIncrease: List[Repr], toDecrease: List[Repr], initPrices: Map[UUID, Double]): Map[UUID, Double]

  private def decideWhichBest(pricesIfLeft: Map[UUID, Double], pricesIfRight: Map[UUID, Double], borderSet: List[Repr], indexedInitPrices: Map[UUID, Double]): Map[UUID,Double] = {
    def calcSum(prices: Map[UUID,Double]) = borderSet.map(x => prices(x.productId)).sum

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


  override def countNewPrices(inputPrices: Map[UUID, Double], buys: Map[UUID, Int]): Map[UUID, Double] = {
    val indexedBuys: List[Repr] = inputPrices.keys.map {
      productId: UUID => Repr(productId = productId, buys = buys(productId))
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
      finalize(toIncrease, toDecrease, inputPrices)
    } else {
      val theEqual: Int = toDecreaseBiggest
      val borderSet: List[Repr] = sortedIndexedBuysWithSums.filter(x => x.buys == theEqual)
      val toIncrease2 = toIncrease.filter(item => !borderSet.contains(item))
      val toDecrease2 = toDecrease.filter(item => !borderSet.contains(item))

      if(borderSet.size == sortedIndexedBuysWithSums.size){
        inputPrices
      }else if(toDecrease2.isEmpty){
        finalize(toIncrease2, borderSet, inputPrices)
      }else if(toIncrease2.isEmpty){
        finalize(borderSet, toDecrease2, inputPrices)
      }else{
        decideWhichBest(
          finalize(toIncrease2, toDecrease2.union(borderSet), inputPrices),
          finalize(toIncrease2.union(borderSet), toDecrease2, inputPrices),
          borderSet,
          inputPrices)
      }
    }

  }
}