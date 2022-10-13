/** @jsxImportSource solid-js */

import { Component, createSignal } from 'solid-js';

type Props = {
  setValue?: (value: number) => void;
  id?: string;
};

export const InputRange: Component<Props> = ({ setValue, id }) => {
  const [input, setInput] = createSignal('0');
  let refInput: HTMLInputElement;
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
        // onLoad={(e) => {
        //   e.currentTarget.focus();
        // }}
        onInput={(e) => {
          e.preventDefault();
          const value = e.currentTarget.value;
          const test = /\d+/.test(value);
          if (test) {
            setInput(value);
          }
          refInput.value = input();
          console.log(refInput.value);
          setValue?.(Number.parseInt(refInput.value));
        }}
        ref={refInput!}
        // pattern='[0-9]{3}'
      />
      <div class='w-0.5 h-full bg-gray-500'></div>
      <span class='text-gray-500'>$</span>
    </div>
  );
};
