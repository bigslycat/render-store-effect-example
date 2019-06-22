/* @flow */

import * as React from 'react';

import { A } from '../A';

export const Company = ({ children, ...props }: { children: string }) => {
  const company = children.trim();

  return company[0] === '@' ? (
    <A href={`https://github.com/${company.slice(0)}`} {...props}>
      {company}
    </A>
  ) : (
    company
  );
};
