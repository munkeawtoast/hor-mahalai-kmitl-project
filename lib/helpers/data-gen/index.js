import { faker } from '@faker-js/faker'

export function generateUsers(count = 1) {
  const users = []
  for (let index = 0; index < count; index++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.date.birthdate({
        min: 18,
        max: 35,
        mode: 'age',
      }),
    })
  }
  return users
}

export function generateLocations(count = 1) {
  const locations = []
  for (let index = 0; index < count; index++) {
    locations.push({
      name: faker.company.name(),
      area: faker.datatype.number({
        min: 1,
        max: 10,
      }),
      address: faker.address.streetAddress(true),
      description: faker.lorem.paragraphs(4),
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
        bikepark: faker.datatype.boolean(),
        smokingarea: faker.datatype.boolean(),
        waterrefill: faker.datatype.boolean(),
        securitycamera: faker.datatype.boolean(),
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
