package pl.beertrade.services.prices

import java.util.UUID

import pl.beertrade.model.beer.jto.{PriceJTO, PricesJTO}

trait PricesService{
  def countNewPrices()
  def getPrices(): PricesJTO
  def getPrice(productId: UUID): PriceJTO
}
