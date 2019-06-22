/* @flow */

import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import { system } from '@styled-system/core/src';
import { space } from '@styled-system/space/src';
import { color } from '@styled-system/color/src';
import { typography } from '@styled-system/typography/src';
import { layout } from '@styled-system/layout/src';
import { flexbox } from '@styled-system/flexbox/src';
import { grid } from '@styled-system/grid/src';
import { background } from '@styled-system/background/src';
import { border } from '@styled-system/border/src';
import { position } from '@styled-system/position/src';
import { shadow } from '@styled-system/shadow/src';
import { textStyle, colorStyle, buttonStyle } from '@styled-system/variant/src';

type PropNamesHash = { [string]: true };

export const helpers: $ReadOnlyArray<any> = [
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  textStyle,
  colorStyle,
  buttonStyle,
  system({
    float: true,
  }),
];

export const propNames: $ReadOnlyArray<string> = (helpers: any).flatMap(
  helper => helper.propNames,
);

export const propNamesHash: $ReadOnly<PropNamesHash> = {
  ...propNames.reduce(
    (acc: PropNamesHash, next): PropNamesHash => ({ ...acc, [next]: true }),
    {},
  ),
};

export const shouldForwardProp = (prop: $ReadOnlyArray<string>): boolean =>
  isPropValid(prop) &&
  !Object.prototype.hasOwnProperty.call(propNamesHash, prop);

export const Root = styled('div', { shouldForwardProp })(...helpers);
