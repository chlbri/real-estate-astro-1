/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import { CrossIcon } from './icons/Cross';
import { rinit } from './RinitSearch.hooks';

type Props = {
  class?: string;
};

export const RinitSearch: Component<Props> = (props) => {
  return (
    <button onClick={rinit} class='shadow-xl rounded-full p-2'>
      <CrossIcon {...props} />
    </button>
  );
};
