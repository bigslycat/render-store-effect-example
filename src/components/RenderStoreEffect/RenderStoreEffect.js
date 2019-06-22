/* @flow */

/* eslint-disable no-redeclare */

import * as React from 'react';
import type { Store, Effect } from 'effector';

import type { Phase } from './usePhase';
import { usePhase } from './usePhase';

declare export function RenderStoreEffect<State, Payload, Done, Fail>(props: {
  +store: Store<State>,
  +effect: Effect<Payload, Done, Fail>,
  +payload: Payload,
  +pending: React$ComponentType<{ state: State, payload: Payload }>,
  +done: React$ComponentType<{ state: State, payload: Payload, result: Done }>,
  +fail: React$ComponentType<{ state: State, payload: Payload, error: Fail }>,
}): React$Node;

declare export function RenderStoreEffect<State, Done, Fail>(props: {
  +store: Store<State>,
  +effect: Effect<void, Done, Fail>,
  +payload?: void,
  +pending: React$ComponentType<{ state: State, payload: void }>,
  +done: React$ComponentType<{ state: State, payload: void, result: Done }>,
  +fail: React$ComponentType<{ state: State, payload: void, error: Fail }>,
}): React$Node;

export function RenderStoreEffect<State, Payload, Done, Fail>(props: {
  +store: Store<State>,
  +effect: Effect<Payload, Done, Fail>,
  +payload: Payload,
  +pending: React$ComponentType<{ state: State, payload: Payload }>,
  +done: React$ComponentType<{ state: State, payload: Payload, result: Done }>,
  +fail: React$ComponentType<{ state: State, payload: Payload, error: Fail }>,
}): React$Node {
  const phase: Phase<State, Payload, Done, Fail> = usePhase(
    props.store,
    props.effect,
    props.payload,
  );

  switch (phase.status) {
    case 'empty':
      return null;

    case 'pending':
      return <props.pending state={phase.state} payload={phase.payload} />;

    case 'done':
      return (
        <props.done
          state={phase.state}
          payload={phase.payload}
          result={phase.result}
        />
      );

    case 'fail':
      return (
        <props.fail
          state={phase.state}
          payload={phase.payload}
          error={phase.error}
        />
      );

    default:
      (phase: empty);
      throw new Error('Unknown status');
  }
}
