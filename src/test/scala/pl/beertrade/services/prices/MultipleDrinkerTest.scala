package pl.beertrade.services.prices

import org.junit.jupiter.api.Assertions.assertEquals
import org.scalatest.flatspec.AnyFlatSpec
import pl.beertrade.services.prices.SimpleDrinker.{convertList, generateIdsFor}

class MultipleDrinkerTest  extends AnyFlatSpec{
  "AmortizedPricesModifier2" should "not exceed border prices after many buys of the same products" in {
    val inputList = List(10.0, 13.0)
//    val ids = generateIdsFor(inputList)
    val ids: List[Int] = List(1,2);
    val diff = 3.0
    val borderPrices = inputList.map(inputPrice => BorderPrices(inputPrice - diff, inputPrice + diff))
    PricesAmorthizedModifierImpl(convertList(borderPrices, ids)) match {
      case Some(modifier: AbstractBucketsPricesModifier[Int]) =>
        val drinker: MultipleDinker[Int] = new MultipleDinker(modifier, input_prices = convertList(inputList, ids))
        assertEquals("<>",drinker.check(List(1,0), ids))
        assertEquals("<>",drinker.check(List(1,0), ids))
        assertEquals("<>",drinker.check(List(1,0), ids))
        assertEquals("<>",drinker.check(List(1,0), ids))

    }
  }
}
