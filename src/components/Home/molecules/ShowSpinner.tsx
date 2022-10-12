/** @jsxImportSource solid-js */

import type { Component, JSX } from 'solid-js';
import { Show } from 'solid-js';
import { Spinner } from '../atoms/Spinner';

type Props = {
  when: boolean;
  children: JSX.Element;
};

export const ShowSpinner: Component<Props> = ({ when, children }) => {
  const fallback = <Spinner />;
  return <Show {...{ when, fallback }}>{children}</Show>;
};
