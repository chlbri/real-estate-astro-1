/** @jsxImportSource solid-js */

import { ArrowDown } from '@-components/shared/atoms/icons/ArrowDown';
import { ArrowUp } from '@-components/shared/atoms/icons/ArrowUp';
import type { Accessor, Component } from 'solid-js';

type Props = {
  open: Accessor<boolean>;
};

export const ArrowToggle: Component<Props> = ({ open }) => {
  return <>{open() ? <ArrowDown /> : <ArrowUp />}</>;
};
