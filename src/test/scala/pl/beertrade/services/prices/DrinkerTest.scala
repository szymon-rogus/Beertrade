package pl.beertrade.services.prices

import org.junit.jupiter.api.Assertions.assertEquals
import org.scalatest.flatspec.AnyFlatSpec
import pl.beertrade.services.prices.Drinker.convertList


class DrinkerTest extends AnyFlatSpec {
  def rAssertEquals(actual: String, expected: String): Unit = assertEquals(expected, actual)

  "PricesModifier" should "return expected values for a list of 5 elements" in {
    val input_list = List(11.22, 12.31, 10.17, 11.05, 13.35)

    val drinker: Drinker = new Drinker(new PricesModifierImpl(), convertList(input_list))


    assertEquals(">>>><", drinker.check(List(1, 1, 2, 2, 3)))
    assertEquals("=====", drinker.check(List(1, 1, 1, 1, 1)))
    assertEquals("=====", drinker.check(List(0, 0, 0, 0, 0)))
    assertEquals("><<<<", drinker.check(List(1, 2, 2, 2, 2)))
    assertEquals(">>>><", drinker.check(List(1, 1, 1, 1, 2)))
    assertEquals(">>>><", drinker.check(List(1, 1, 2, 2, 3)))
    assertEquals(">>><<", drinker.check(List(1, 2, 3, 4, 5)))
  }

  "PricesModifier" should "return expected values for another list of 5 elements" in {
    val inputList = List(5.09, 8.6, 0.42, 6.61, 8.53)
    val drinker: Drinker = new Drinker(new PricesModifierImpl(), convertList(inputList))

    rAssertEquals(drinker.check(List(1, 9, 7, 2, 8)), "><>><")
    rAssertEquals(drinker.check(List(1, 3, 10, 14, 8)), ">><<>")
    rAssertEquals(drinker.check(List(1, 2, 6, 3, 8)), ">><><")
    rAssertEquals(drinker.check(List(1, 3, 5, 7, 9)), ">>><<")

  }

  "PricesModifier" should "return expected values for a medium list of 8 elements" in {
    val inputList = List(5.09, 8.6, 0.42, 6.61, 8.53, 12.45, 6.67, 15.21)
    val drinker: Drinker = new Drinker(new PricesModifierImpl, convertList(inputList))

    rAssertEquals(drinker.check(List(1, 9, 7, 2, 8, 3, 6, 12)), "><>><>><")
    rAssertEquals(drinker.check(List(1, 2, 3, 4, 20, 21, 22, 23)), ">>>>><<<")
  }

  "AmortizedPricesModifier" should "return expected values for a medium list of 8 elements" in {
    val inputList = List(5.09, 8.6, 4.42, 6.61, 8.53, 12.45, 6.67, 15.21)
    val borderPrices: Map[Int, BorderPrices] = (0 to inputList.size).toList.map(i => (i, BorderPrices(4.0, 20.0))).toMap
    val drinker: Drinker = new Drinker(new PricesAmorthizedModifierImpl(borderPrices), convertList(inputList))
    rAssertEquals(drinker.check(List(1, 9, 7, 2, 8, 3, 6, 12)), "><>><>><")
    rAssertEquals(drinker.check(List(1, 2, 3, 4, 20, 21, 22, 23)), ">>>>><<<")
  }

  "simple test with only few products and huge number of buys" should "not  increase the prices over the border" in {
    val drinker: Drinker = new Drinker(new PricesAmorthizedModifierImpl(Map(
      0 -> BorderPrices(1.0,20.0),
      1 -> BorderPrices(1.0,20.0),
      2 -> BorderPrices(1.0,20.0),
    )), convertList(List(7.0, 8.0, 9.0)))
    rAssertEquals(drinker.check(List(1,1,2)), ">><")

  }

  "AmortizedPricesModifier2" should "return expected values for a medium list of 8 elements" in {
    val inputList = List(7.0, 8.0, 9.0)
    val borderPrices: Map[Int, BorderPrices] = (0 to inputList.size).toList.map(i => (i, BorderPrices(1.0, 20.0))).toMap

    PricesAmorthizedModifierImpl(borderPrices) match {
      case Some(modifier) => {
        val drinker: Drinker = new Drinker(modifier, convertList(inputList))
//        rAssertEquals(drinker.check(List(1, 1, 2)), ">><")
        rAssertEquals(drinker.check(List(1, 1, 1000)), ">><")
      }
    }
  }


}
