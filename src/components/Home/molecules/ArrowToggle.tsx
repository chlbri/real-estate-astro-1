/** @jsxImportSource solid-js */

import type { Accessor, Component } from 'solid-js';
import { ArrowDown } from '../atoms/icons/ArrowDown';
import { ArrowUp } from '../atoms/icons/ArrowUp';

type Props = {
  open: Accessor<boolean>;
};

export const ArrowToggle: Component<Props> = ({ open }) => {
  return <>{open() ? <ArrowDown /> : <ArrowUp />}</>;
};
