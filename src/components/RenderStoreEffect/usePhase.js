/* @flow */

import * as React from 'react';
import { forward, createEvent } from 'effector';
import type { Store, Effect } from 'effector';

export type Phase<State, Payload, Done, Fail> =
  | { status: 'empty' }
  | { status: 'pending', state: State, payload: Payload }
  | { status: 'done', state: State, payload: Payload, result: Done }
  | { status: 'fail', state: State, payload: Payload, error: Fail };

export function usePhase<State, Payload, Done, Fail>(
  store: Store<State>,
  effect: Effect<Payload, Done, Fail>,
  payload: Payload,
): Phase<State, Payload, Done, Fail> {
  const [phase, setPhase]: [
    Phase<State, Payload, Done, Fail>,
    *,
  ] = React.useState({ status: 'empty' });

  const callEffect = React.useMemo(() => createEvent('callEffect'), []);

  React.useEffect(() => {
    const forwardSubscription = forward({ from: callEffect, to: effect });

    const effectSubscription = store.watch(effect, state =>
      setPhase({ status: 'pending', state, payload }),
    );

    const doneSubscription = store.watch(effect.done, (state, { result }) =>
      setPhase({ status: 'done', state, payload, result }),
    );

    const failSubscription = store.watch(effect.fail, (state, { error }) =>
      setPhase({ status: 'fail', state, payload, error }),
    );

    callEffect(payload);

    return () => {
      forwardSubscription.unsubscribe();
      effectSubscription.unsubscribe();
      doneSubscription.unsubscribe();
      failSubscription.unsubscribe();
    };
  }, [callEffect, effect, payload, store]);

  return phase;
}
