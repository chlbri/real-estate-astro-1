import type { Component } from 'solid-js';

type Props = {
  color?: string;
  size?: number;
  class?: string;
};

const BORDER_RATIO = 4 / 100;

export const Spinner: Component<Props> = ({
  size = 60,
  color = 'black',
  class: _class,
}) => {
  return (
    <div
      class={`rounded-full animate-spin ${_class}`}
      style={`
        border-color:${color}; 
        width: ${size}px; 
        height: ${size}px; 
        border-top-width: ${size * BORDER_RATIO}px;
        border-bottom-width: ${size * BORDER_RATIO}px;
      `}
    />
  );
};
