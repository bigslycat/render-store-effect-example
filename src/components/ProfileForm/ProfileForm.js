/* @flow */

import * as React from 'react';

import { Form } from '../Form';
import { Label } from '../Label';
import { Input } from '../Input';
import { Button } from '../Button';
import { Key } from '../Key';

export const ProfileForm = (props: {
  // eslint-disable-next-line flowtype/require-compound-type-alias
  onSubmit: ((string => string) | string) => void,
}) => {
  const [inputValue, onChange]: [string, *] = React.useState('');

  function onSubmit(e) {
    e.preventDefault();
    props.onSubmit(inputValue);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Label>
        Your GitHub login
        <Input
          ref={e => e instanceof HTMLElement && e.focus()}
          placeholder='Enter your GitHub login here...'
          onChange={e => onChange(e.target.value)}
          value={inputValue}
        />
      </Label>
      <Button type='submit' disabled={!inputValue}>
        Show profile <Key>Enter</Key>
      </Button>
    </Form>
  );
};
