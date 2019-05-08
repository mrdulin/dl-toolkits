import faker from 'faker';
import { logger } from './setup';

const user = {
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  address: {
    city: faker.address.city(),
    country: faker.address.country(),
    street: {
      streetPrefix: faker.address.streetPrefix(),
      streetSuffix: faker.address.streetSuffix()
    }
  }
};

describe('logger', () => {
  it('#debug', () => {
    logger.debug(user, {
      context: 'UserService.findById',
      arguments: {
        id: faker.random.uuid(),
        extra: {
          campaignId: faker.random.uuid(),
          location: {
            id: faker.random.uuid(),
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
          }
        }
      },
      labels: ['log 7', 'better logging', 'winston', 'debug']
    });
  });

  it('#info', () => {
    logger.info(user, {
      context: 'UserService.findById',
      arguments: {
        id: faker.random.uuid(),
        extra: {
          campaignId: faker.random.uuid(),
          location: {
            id: faker.random.uuid(),
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
          }
        }
      },
      labels: ['log 7', 'better logging', 'winston', 'info']
    });
  });

  it('#error', () => {
    try {
      JSON.parse('test');
    } catch (error) {
      logger.error(error, {
        context: 'UserService.findById',
        arguments: {
          id: faker.random.uuid(),
          extra: {
            campaignId: faker.random.uuid(),
            location: {
              id: faker.random.uuid(),
              latitude: faker.address.latitude(),
              longitude: faker.address.longitude()
            }
          }
        },
        labels: ['log 6', 'better logging', 'winston']
      });
    }
  });
});
