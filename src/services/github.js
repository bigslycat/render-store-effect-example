/* @flow */

import { createStore, createEffect } from 'effector';
import type { Effect, Store } from 'effector';

export const getUser: Effect<string, any> = createEffect('load', {
  handler: login =>
    fetch(`https://api.github.com/users/${login}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
    }).then(response =>
      response.status < 400 ? response.json() : Promise.reject(new Error()),
    ),
});

export const store: Store<any> = createStore(null).on(
  getUser.done,
  (_, { result }) => result,
);
