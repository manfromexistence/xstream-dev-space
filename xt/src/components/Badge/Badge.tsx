import { Box, BoxProps } from '../Box/Box';
import React from 'react';
import { badge } from './Badge.css';

export function Badge(props: BoxProps) {
  return <Box as="span" className={badge} {...props} />;
}
