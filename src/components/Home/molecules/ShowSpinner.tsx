/** @jsxImportSource solid-js */

import { Spinner } from '@-components/shared/atoms/Spinner';
import type { Component, JSX } from 'solid-js';
import { Show } from 'solid-js';

type Props = {
  when: boolean;
  children: JSX.Element;
};

export const ShowSpinner: Component<Props> = ({ when, children }) => {
  const fallback = <Spinner />;
  return <Show {...{ when, fallback }}>{children}</Show>;
};
