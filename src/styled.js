/* @flow */

/* eslint
  no-redeclare: off,
  flowtype/require-compound-type-alias: off,
  */

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

declare function createStyled<P>(
  component: React$ComponentType<P>,
  helpers?: $ReadOnlyArray<any>,
): React$ComponentType<P> & { toString(): string };

declare function createStyled(
  helpers: $ReadOnlyArray<any>,
): React$ComponentType<{}> & { toString(): string };

declare function createStyled(
  component?: string,
): React$ComponentType<{}> & { toString(): string };

function createStyled(
  component: $ReadOnlyArray<any> | string | React$ComponentType<any> = 'div',
  additionalHelpers?: $ReadOnlyArray<any> = [],
) {
  return Array.isArray(component)
    ? styled('div', { shouldForwardProp })(...helpers, ...component)
    : styled(component, { shouldForwardProp })(
        ...helpers,
        ...additionalHelpers,
      );
}

function sys({ as = 'div' }: any, ...additionalHelpers) {
  return styled(as, { shouldForwardProp })(...helpers, ...additionalHelpers);
}

export { createStyled as styled };
