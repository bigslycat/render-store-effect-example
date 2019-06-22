/* @flow */

export const Key = styled((props: {}) => (
  <Root
    as='span'
    css={{
      ':before': { content: '"["' },
      ':after': { content: '"]"' },
      [`${Button.toString()}:not([disabled]) &`]: { color: '#999' },
    }}
    {...props}>
    Enter
  </Root>
))`
  ${Button.toString()}:not([disabled]) & {
    color: #999;
  }
  :before {
    content: '[';
  }
  :after {
    content: ']';
  }
`;
