package pl.beertrade.services.prices

import java.util.UUID

import org.junit.jupiter.api.Assertions.assertEquals
import org.scalatest.flatspec.AnyFlatSpec
import pl.beertrade.services.prices.SimpleDrinker.convertList


class SimpleDrinkerTest extends AnyFlatSpec {
  def rAssertEquals(actual: String, expected: String): Unit = assertEquals(expected, actual)

  "PricesModifier" should "return expected values for a list of 5 elements" in {
    val input_list = List(11.22, 12.31, 10.17, 11.05, 13.35)
    val ids = input_list.indices.map(id => UUID.randomUUID()).toList

    val drinker: SimpleDrinker[UUID] = new SimpleDrinker(new PricesModifierImpl(), convertList(input_list, ids))


    assertEquals(">>>><", drinker.check(List(1, 1, 2, 2, 3), ids))
    assertEquals("=====", drinker.check(List(1, 1, 1, 1, 1), ids))
    assertEquals("=====", drinker.check(List(0, 0, 0, 0, 0),ids))
    assertEquals("><<<<", drinker.check(List(1, 2, 2, 2, 2), ids))
    assertEquals(">>>><", drinker.check(List(1, 1, 1, 1, 2), ids))
    assertEquals(">>>><", drinker.check(List(1, 1, 2, 2, 3), ids))
    assertEquals(">>><<", drinker.check(List(1, 2, 3, 4, 5), ids))
  }

  "PricesModifier" should "return expected values for another list of 5 elements" in {
    val inputList = List(5.09, 8.6, 0.42, 6.61, 8.53)
    val ids = inputList.indices.map(id => UUID.randomUUID()).toList

    val drinker: SimpleDrinker[UUID] = new SimpleDrinker(new PricesModifierImpl(), convertList(inputList, ids))

    rAssertEquals(drinker.check(List(1, 9, 7, 2, 8), ids), "><>><")
    rAssertEquals(drinker.check(List(1, 3, 10, 14, 8), ids), ">><<>")
    rAssertEquals(drinker.check(List(1, 2, 6, 3, 8), ids), ">><><")
    rAssertEquals(drinker.check(List(1, 3, 5, 7, 9), ids), ">>><<")

  }

  "PricesModifier" should "return expected values for a medium list of 8 elements" in {
    val inputList = List(5.09, 8.6, 0.42, 6.61, 8.53, 12.45, 6.67, 15.21)
    val ids = inputList.indices.map(id => UUID.randomUUID()).toList

    val drinker: SimpleDrinker[UUID] = new SimpleDrinker(new PricesModifierImpl, convertList(inputList, ids))

    rAssertEquals(drinker.check(List(1, 9, 7, 2, 8, 3, 6, 12), ids), "><>><>><")
    rAssertEquals(drinker.check(List(1, 2, 3, 4, 20, 21, 22, 23), ids), ">>>>><<<")
  }

  "AmortizedPricesModifier" should "return expected values for a medium list of 8 elements" in {
    val inputList = List(5.09, 8.6, 4.42, 6.61, 8.53, 12.45, 6.67, 15.21)
    val ids = inputList.indices.map(id => UUID.randomUUID()).toList
    val borderPrices: Map[UUID, BorderPrices] = inputList.indices.toList.map(i => (ids(i), BorderPrices(4.0, 20.0))).toMap
    val drinker: SimpleDrinker[UUID] = new SimpleDrinker(new PricesAmorthizedModifierImpl(borderPrices), convertList(inputList, ids))
    rAssertEquals(drinker.check(List(1, 9, 7, 2, 8, 3, 6, 12), ids), "><>><>><")
    rAssertEquals(drinker.check(List(1, 2, 3, 4, 20, 21, 22, 23), ids), ">>>>><<<")
  }

  "simple test with only few products and huge number of buys" should "not  increase the prices over the border" in {
    val ids = (0 to 2).map(id => UUID.randomUUID()).toList
    val drinker: SimpleDrinker[UUID] = new SimpleDrinker(new PricesAmorthizedModifierImpl(Map(
      ids(0) -> BorderPrices(1.0,20.0),
      ids(1) -> BorderPrices(1.0,20.0),
      ids(2) -> BorderPrices(1.0,20.0),
    )), convertList(List(7.0, 8.0, 9.0), ids))
    rAssertEquals(drinker.check(List(1,1,2), ids), ">><")

  }

  "AmortizedPricesModifier2" should "return expected values for a medium list of 8 elements" in {
    val inputList = List(7.0, 8.0, 9.0)
    val ids = (0 to 2).map(id => UUID.randomUUID()).toList
    val borderPrices: Map[UUID, BorderPrices] = inputList.indices.toList.map(i => (ids(i), BorderPrices(1.0, 20.0))).toMap

    PricesAmorthizedModifierImpl(borderPrices) match {
      case Some(modifier) => {
        val drinker: SimpleDrinker[UUID] = new SimpleDrinker(modifier, convertList(inputList, ids))
        rAssertEquals(drinker.check(List(1, 1, 2), ids), ">><")
        rAssertEquals(drinker.check(List(1, 1, 1000), ids), ">><")
      }
    }


  }


}
