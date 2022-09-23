import { dbContext } from "../db/DbContext.js"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class CarsService {
  async getCar(carId) {
    const car = await dbContext.Cars.findById(carId).populate('seller', 'name picture')
    if (!car) {
      throw new BadRequest('Invalid Car ID')
    }
    return car
  }


  async editCar(carData, userInfo) {
    const car = await this.getCar(carData.sellerId)
    if (userInfo.id != car.id.toString()) {
      throw new UnAuthorized('Thats not your car..... Jerk')
    }

    car.make = carData.make || car.make
    car.model = carData.model || car.model
    car.price = carData.price || car.price
    car.year = carData.year || car.year
    car.description = carData.description || car.description
    car.imgUrl = carData.imgUrl || car.imgUrl


    await car.save()
    return car

  }
  async manufactureCar(formData) {
    const car = await dbContext.Cars.create(formData)
    return car
  }
  async getCars() {
    const cars = await dbContext.Cars.find()

    return cars
  }
}

export const carsService = new CarsService()