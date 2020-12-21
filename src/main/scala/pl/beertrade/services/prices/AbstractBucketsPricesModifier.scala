package pl.beertrade.services.prices

import java.util.UUID
import collection.JavaConverters._
import scala.collection.breakOut

import scala.math.abs

abstract class AbstractBucketsPricesModifier[I] extends PricesModifier[I]{

  case class Repr(productId: I, buys: Int, sumPref: Int = 0)

  def finalize(toIncrease: List[Repr], toDecrease: List[Repr], initPrices: Map[I, Double]): Map[I, Double]

  private def decideWhichBest(pricesIfLeft: Map[I, Double], pricesIfRight: Map[I, Double], borderSet: List[Repr], indexedInitPrices: Map[I, Double]): Map[I,Double] = {
    def calcSum(prices: Map[I,Double]) = borderSet.map(x => prices(x.productId)).sum

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


  override def countNewPrices(inputPrices: java.util.Map[I, java.lang.Double], buys: java.util.Map[I, java.lang.Integer]): java.util.Map[I, java.lang.Double] = {
    val scalaInputPrices: Map[I, Double] = inputPrices.asScala.map{case (k, v) => (k, v.doubleValue)}(breakOut)
    val scalaBuys: Map[I, Int] = buys.asScala.map{case (k, v) => (k, v.intValue())}(breakOut)
    val indexedBuys: List[Repr] = scalaInputPrices.keys.map {
      productId: I => Repr(productId = productId, buys = scalaBuys(productId))
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

    val allBuys: Int = scalaBuys.values.sum
    val halfBuys: Double = allBuys / 2.0


    val toIncrease: List[Repr] = sortedIndexedBuysWithSums.filter(_.sumPref >= halfBuys)
    val toDecrease: List[Repr] = sortedIndexedBuysWithSums.filter(_.sumPref < halfBuys)

    if (toIncrease.isEmpty || toDecrease.isEmpty)
      return inputPrices

    val toDecreaseBiggest = toDecrease.map(repr => repr.buys).max
    val toIncreaseSmallest = toIncrease.map(repr => repr.buys).min

    if (toIncreaseSmallest != toDecreaseBiggest) {
      finalize(toIncrease, toDecrease, scalaInputPrices).map { case (k, v) => (k -> new java.lang.Double(v)) }.asJava
    } else {
      val theEqual: Int = toDecreaseBiggest
      val borderSet: List[Repr] = sortedIndexedBuysWithSums.filter(x => x.buys == theEqual)
      val toIncrease2 = toIncrease.filter(item => !borderSet.contains(item))
      val toDecrease2 = toDecrease.filter(item => !borderSet.contains(item))

      if(borderSet.size == sortedIndexedBuysWithSums.size){
        inputPrices
      }else if(toDecrease2.isEmpty){
        mapToJava(finalize(toIncrease2, borderSet, scalaInputPrices))
      }else if(toIncrease2.isEmpty){
        mapToJava(finalize(borderSet, toDecrease2, scalaInputPrices))
      }else{
        mapToJava(decideWhichBest(
          finalize(toIncrease2, toDecrease2.union(borderSet), scalaInputPrices),
          finalize(toIncrease2.union(borderSet), toDecrease2, scalaInputPrices),
          borderSet,
          scalaInputPrices))
      }
    }

  }

  private def mapToJava(scalaMap: Map[I, Double]): java.util.Map[I, java.lang.Double] = {
    scalaMap.map { case (k, v) => k -> new java.lang.Double(v) }.asJava
  }
}