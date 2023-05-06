import { faker } from '@faker-js/faker'

export function generateUsers(from = 0, to = 1) {
  const count = to - from
  const users = []
  for (let index = 0; index < count; index++) {
    const id = index + from
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const userName = faker.internet.userName(firstName, lastName)
    // const email = faker.internet.email(firstName, lastName)
    // const password = faker.internet.password(10)
    //! temporary for easy login
    const email = `user${id}@mail.com`
    const password = 1234
    const dob = faker.date.birthdate({
      min: 18,
      max: 35,
      mode: 'age',
    })
    const role = faker.helpers.arrayElement([
      'student',
      'dorm-owner',
      'moderator',
    ])
    const userImage = faker.image.avatar()
    users.push({
      id,
      firstName,
      lastName,
      userName,
      email,
      password,
      dob,
      role,
      userImage,
    })
  }
  return users
}

export function generateDorms(from = 0, to = 1) {
  const count = to - from
  const locations = []
  for (let index = 0; index < count; index++) {
    locations.push({
      id: index + from,
      name: faker.company.name(),
      area: faker.datatype.number({
        min: 1,
        max: 10,
      }),
      mapPosition: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      },
      price: {
        from: faker.datatype.number({
          min: 1500,
          max: 2500,
          precision: 50,
        }),
        to: faker.datatype.number({
          min: 2500,
          max: 5000,
          precision: 50,
        }),
      },
      address: faker.address.streetAddress(true),
      description: faker.lorem.paragraphs(4),
      images: [
        faker.image.city(1280, 720, true),
        faker.image.city(1280, 720, true),
        faker.image.city(1280, 720, true),
        faker.image.city(1280, 720, true),
      ],
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
      roomAmenities: {
        airConditioner: faker.datatype.boolean(),
        fan: faker.datatype.boolean(),
        bed: faker.datatype.number({
          min: 0,
          max: 3,
        }),
        waterHeater: faker.datatype.boolean(),
        cookingArea: faker.datatype.boolean(),
      },
    })
  }
  return locations
}
// import fs from 'fs'
// fs.writeFileSync('users.json', JSON.stringify(generateUsers(0, 5), null, 2))
