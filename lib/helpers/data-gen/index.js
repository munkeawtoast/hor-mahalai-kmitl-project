import { faker } from '@faker-js/faker'

const range = {
  from: 0,
  to: 1,
}

function setRange(from = 0, to = 1) {
  const seedArray = []
  for (let index = from; index < to; index++) {
    array.push(index)
  }
  faker.mersenne.seed_array(seedArray)
}

export function generateUsers(from = 0, to = 1) {
  setRange({ from, to })
  const count = to - from
  const users = []
  for (let index = 0; index < count; index++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = faker.internet.email(firstName, lastName)
    const password = faker.internet.password(10)
    const age = faker.date.birthdate({
      min: 18,
      max: 35,
      mode: 'age',
    })
    const role = faker.helpers.arrayElement(['student', 'dorm-owner'])
    users.push({
      firstName,
      lastName,
      email,
      password,
      age,
      role,
    })
  }
  return users
}

export function generateDorms(from = 0, to = 1) {
  setRange({ from, to })
  const count = to - from
  const locations = []
  for (let index = 0; index < count; index++) {
    locations.push({
      name: faker.company.name(),
      area: faker.datatype.number({
        min: 1,
        max: 10,
      }),
      mapPosition: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      },
      address: faker.address.streetAddress(true),
      description: faker.lorem.paragraphs(4),
      image: faker.image.cats(400, 300, true),
      waterUnit: faker.datatype.float({
        min: 5,
        max: 50,
        precision: 0.1,
      }),
      electricityUnit: faker.datatype.float({
        min: 5,
        max: 50,
        precision: 0.1,
      }),
      dormAmenities: {
        carPark: faker.datatype.boolean(),
        bikePark: faker.datatype.boolean(),
        smokingArea: faker.datatype.boolean(),
        waterRefill: faker.datatype.boolean(),
        securityCamera: faker.datatype.boolean(),
        washer: faker.datatype.boolean(),
      },
      roomamenities: {
        airconditioner: faker.datatype.boolean(),
        fan: faker.datatype.boolean(),
        bed: faker.datatype.number({
          min: 0,
          max: 3,
        }),
        waterheater: faker.datatype.boolean(),
        cookingarea: faker.datatype.boolean(),
      },
    })
  }
  return locations
}
