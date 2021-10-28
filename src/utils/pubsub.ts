import { NotFunc, AnyFunction } from './type-helpers';

let lastUid = -1;
let subscribers: Record<TopicKey, Record<SubscribeToken, Subscriber>> = {};

export type TopicKey = string;
export type Subscriber = AnyFunction;
export type SubscribeToken = string;
/**
 * subscribers = {
 *    [topicKey1]: {
 *      token1: subscriber1,
 *      token2: subscriber2
 *    }
 * }
 * @returns
 */
export const Pubsub = {
  subscribe: (topicKey: TopicKey, subscriber: Subscriber): SubscribeToken => {
    const token = 'uid_' + String(++lastUid);
    if (!subscribers[topicKey]) {
      subscribers[topicKey] = {};
    }
    subscribers[topicKey][token] = subscriber;
    return token;
  },

  unsubscribe: (token: SubscribeToken): void => {
    for (const topicKey in subscribers) {
      if (subscribers.hasOwnProperty(topicKey)) {
        const subscriptions = subscribers[topicKey];
        if (subscriptions[token]) {
          delete subscriptions[token];
          break;
        }
      }
    }
  },

  publish: (topicKey: TopicKey, data: NotFunc<any>): void => {
    if (subscribers[topicKey]) {
      const subscription = subscribers[topicKey];
      for (const subscriber of Object.values<Subscriber>(subscription)) {
        subscriber(data);
      }
    }
  },

  countSubscriptions: (topicKey: TopicKey): number => {
    for (const tk in subscribers) {
      if (subscribers.hasOwnProperty(topicKey) && tk === topicKey) {
        return Object.keys(subscribers[tk]).length;
      }
    }
    return 0;
  },

  clearAllSubscriptions: (): void => {
    subscribers = {};
  },
};
