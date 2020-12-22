package pl.beertrade.services.prices

import java.util.UUID
import scala.collection.JavaConverters.mapAsScalaMapConverter

case class BorderPrices(lower: Double, upper: Double)

class PricesAmorthizedModifierImpl[I](var borderPrices: Map[I, BorderPrices]) extends AbstractBucketsPricesModifier[I] {
  override def finalize(toIncrease: List[Repr], toDecrease: List[Repr], initPrices: Map[I, Double]): Map[I, Double] = {
    if(borderPrices!= null) {
      var newPrices = Map[I, Double]()

      toDecrease.foreach(item => {
        newPrices = newPrices + (item.productId -> (initPrices(item.productId) - 0.1 * (initPrices(item.productId) - borderPrices(item.productId).lower)))
      })
      toIncrease.foreach(item => {
        newPrices = newPrices + (item.productId -> (initPrices(item.productId) + 0.1 * (borderPrices(item.productId).upper - initPrices(item.productId))))
      })
      newPrices
    } else {
      throw new IllegalArgumentException("border prices not supplied")
    }
  }

  def updateBorderPrices(borderPrices: java.util.Map[I, BorderPrices]): Unit = {
    this.borderPrices = borderPrices.asScala.map(kv => (kv._1,kv._2)).toMap
  }
}

object PricesAmorthizedModifierImpl {
  def apply[I](borderPrices: Map[I, BorderPrices]): Option[PricesAmorthizedModifierImpl[I]] = {
    if (validateBorderPrices(borderPrices))
      Option(new PricesAmorthizedModifierImpl(borderPrices))
    else
      None
  }
  def apply(): PricesAmorthizedModifierImpl[UUID] = {
    new PricesAmorthizedModifierImpl(null)
  }


  def validateBorderPrices[I](borderPrices: Map[I, BorderPrices]): Boolean = !borderPrices.values.exists(borderPrice => borderPrice.upper <= 0.0 || borderPrice.lower <= 0.0)

}