/* @flow */

import * as React from 'react';
import { Global, css } from '@emotion/core';

import { getUser, store } from './services/github';

import { Root } from './components/Root';
import { Layout } from './components/Layout';
import { A } from './components/A';
import { Img } from './components/Img';
import { Company } from './components/Company';
import { ProfileForm } from './components/ProfileForm';
import { RenderStoreEffect } from './components/RenderStoreEffect';

const globals = css`
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app-root {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 3em;
  }
`;

const Pending = props => (
  <Root>
    Loading <b>{props.payload}</b>&apos;s profile...
  </Root>
);

const Done = ({ state }) => (
  <Root>
    <Img float='left' mr='1em' src={state.avatar_url} width={128} />
    <Root>
      <A href={state.html_url}>{state.name || state.login}</A>
      {state.company && (
        <>
          {' '}
          from <Company>{state.company}</Company>
        </>
      )}
      {state.location && <>, {state.location}</>}
    </Root>
    {state.bio && <Root>Bio: {state.bio}</Root>}
    <Root>Public repos: {state.public_repos}</Root>
    <Root>Public gists: {state.public_gists}</Root>
    <Root>Followers: {state.followers}</Root>
    <Root>Following: {state.following}</Root>
  </Root>
);

const Fail = () => <Root>User not found.</Root>;

const App = () => {
  const [login, changeLogin]: [string, *] = React.useState('');

  return (
    <Layout>
      <Global styles={globals} />
      <ProfileForm onSubmit={changeLogin} />
      {login && (
        <RenderStoreEffect
          payload={login}
          store={store}
          effect={getUser}
          pending={Pending}
          done={Done}
          fail={Fail}
        />
      )}
    </Layout>
  );
};

export default App;
