import type { Component } from 'solid-js';

type Props = {};

export const ContactForm: Component<Props> = ({}) => {
  return (
    <form
      class='flex flex-col gap-y-4'
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        class='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
        type='text'
        placeholder='Name*'
      />
      <input
        class='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
        type='text'
        placeholder='Email*'
      />
      <input
        class='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
        type='text'
        placeholder='Phone*'
      />
      <textarea
        class='border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none'
        placeholder='Message*'
      />
      <div class='flex gap-x-2'>
        <button
          class='bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition-transform transform active:scale-95 hover:shadow-md duration-150 ease-in-out'
          type='submit'
        >
          Send message
        </button>
        <button class='border border-violet-700 text-violet-700 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition-transform transform active:scale-95 hover:shadow-md duration-150 ease-in-out'>
          Call
        </button>
      </div>
    </form>
  );
};
