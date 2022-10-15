/** @jsxImportSource solid-js */

import type { Property as P } from '@-backend/data/main';
import { removePublic } from '@-backend/data/removePublic';
import { AreaIcon } from '@-components/shared/atoms/icons/Area';
import { BathIcon } from '@-components/shared/atoms/icons/Bath';
import { BedIcon } from '@-components/shared/atoms/icons/Bed';
import type { Component } from 'solid-js';

type Props = {
  property: P;
};

export const Property: Component<Props> = ({ property }) => {
  return (
    <a
      class='bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition flex flex-col'
      href={`/properties/${property.id}`}
    >
      <img class='mb-8' src={removePublic(property.image)} alt='' />
      <div class='mb-4 flex gap-x-2 text-sm'>
        <div class='bg-green-500 rounded-full text-white px-3 inline-block'>
          {property.type}
        </div>
        <div class='bg-violet-500 rounded-full text-white px-3 inline-block'>
          {property.country}
        </div>
      </div>
      <div class='text-lg font-semibold max-w-[260px]'>
        {property.address}
      </div>
      <div class='flex gap-x-4 my-4'>
        <div class='flex items-center text-gray-600 gap-1'>
          <BedIcon />
          <div class='text-base'>{property.bedrooms}</div>
        </div>
        <div class='flex items-center text-gray-600 gap-1'>
          <BathIcon />
          <div class='text-base'>{property.bathrooms}</div>
        </div>
        <div class='flex items-center text-gray-600 gap-1'>
          <AreaIcon />
          <div class='text-base'>{property.surface}</div>
        </div>
      </div>
      <div class='text-lg font-semibold text-violet-600 mb-4'>
        $ {property.price}
      </div>
    </a>
  );
};
