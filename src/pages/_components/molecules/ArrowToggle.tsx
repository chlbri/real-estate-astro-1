/** @jsxImportSource solid-js */

import type { Accessor, Component } from 'solid-js';
import { ArrowDown } from '../../_shared/atoms/icons/ArrowDown';
import { ArrowUp } from '../../_shared/atoms/icons/ArrowUp';

type Props = {
  open: Accessor<boolean>;
};

export const ArrowToggle: Component<Props> = ({ open }) => {
  return <>{open() ? <ArrowDown /> : <ArrowUp />}</>;
};
