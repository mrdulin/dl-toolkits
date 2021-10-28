import { Pubsub } from './pubsub';
describe('usePubSub', () => {
  afterEach(() => {
    Pubsub.clearAllSubscriptions();
  });
  test('one subscriber', () => {
    expect.assertions(2);
    const subscriber = jest.fn().mockImplementation((data) => {
      expect(data).toEqual('hello world!');
    });
    Pubsub.subscribe('MY TOPIC', subscriber);
    Pubsub.publish('MY TOPIC', 'hello world!');
    expect(subscriber).toBeCalledWith('hello world!');
  });

  test('multiple subscribers and on publisher', () => {
    expect.assertions(4);
    const subscriber1 = jest.fn().mockImplementation((data) => {
      expect(data).toEqual('hello world!');
    });
    const subscriber2 = jest.fn().mockImplementation((data) => {
      expect(data).toEqual('hello world!');
    });
    Pubsub.subscribe('MY TOPIC', subscriber1);
    Pubsub.subscribe('MY TOPIC', subscriber2);
    Pubsub.publish('MY TOPIC', 'hello world!');
    expect(subscriber1).toBeCalledWith('hello world!');
    expect(subscriber2).toBeCalledWith('hello world!');
  });

  test('cancel specific subscription', () => {
    expect.assertions(2);
    const subscriber = jest.fn().mockImplementation((data) => {
      expect(data).toEqual('hello world!');
    });
    const token = Pubsub.subscribe('MY TOPIC', subscriber);
    Pubsub.publish('MY TOPIC', 'hello world!');
    Pubsub.unsubscribe(token);
    Pubsub.publish('MY TOPIC', 'hello world!');
    expect(subscriber).toBeCalledTimes(1);
  });

  test('should count subscriptions', () => {
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    const subscriber3 = jest.fn();
    Pubsub.subscribe('a', subscriber1);
    Pubsub.subscribe('a', subscriber2);
    Pubsub.subscribe('a', subscriber3);
    expect(Pubsub.countSubscriptions('a')).toEqual(3);
  });

  test('multiple publishers and subscribers', () => {
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    const subscriber3 = jest.fn();
    Pubsub.subscribe('a', subscriber1);
    Pubsub.subscribe('b', subscriber2);
    Pubsub.subscribe('c', subscriber3);

    Pubsub.publish('a', 'data 1');
    Pubsub.publish('b', 'data 2');
    Pubsub.publish('c', 'data 3');

    expect(subscriber1).toBeCalledWith('data 1');
    expect(subscriber2).toBeCalledWith('data 2');
    expect(subscriber3).toBeCalledWith('data 3');
  });
});
