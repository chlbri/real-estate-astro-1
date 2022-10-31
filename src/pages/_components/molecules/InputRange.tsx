/** @jsxImportSource solid-js */

import type { Accessor, Component } from 'solid-js';

type Props = {
  setValue: (value?: string) => void;
  id?: string;
  value: Accessor<string>;
};

export const InputRange: Component<Props> = ({ setValue, id, value }) => {
  return (
    <div
      class='w-full lg:max-w-xs h-14 py-2 px-3 border rounded-lg items-center justify-between flex focus-within:border-yellow-700 last:2xl:bg-white'
      id={id}
    >
      <input
        class='w-11/12 h-full pl-[18px] rounded-lg items-center focus:outline-none text-xl bg-transparent'
        type='number'
        step={10000}
        min={0}
        value={value()}
        onInput={(event) => {
          const value = event.currentTarget.value;
          setValue(value);
        }}
      />
      <div class='w-0.5 h-full bg-gray-500'></div>
      <span class='text-gray-500'>$</span>
    </div>
  );
};
