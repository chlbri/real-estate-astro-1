import type { ALL_OPTIONS } from '@-constants/strings';

export type PropertyType = 'House' | 'Apartment' | typeof ALL_OPTIONS;

export type Property = {
  id: number;
  type: PropertyType;
  name: string;
  description: string;
  image: string;
  imageLg: string;
  country: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  surface: string;
  year: number;
  price: number;
  agent: {
    image: string;
    name: string;
    phone: string;
  };
};

export const MAIN_DATA: Property[] = [
  {
    id: 1,
    type: 'House',
    name: 'House 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house1.png',
    imageLg: '/public/images/houses/house1lg.png',
    country: 'United States',
    address: '7240C Argyle St. Lawndale, CA 90260',
    bedrooms: 6,
    bathrooms: 3,
    surface: '4200 sq ft',
    year: 2016,
    price: 110000,
    agent: {
      image: '/public/images/agents/agent1.png',
      name: 'Patricia Tullert',
      phone: '0123 456 78910',
    },
  },
  {
    id: 2,
    type: 'House',
    name: 'House 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house2.png',
    imageLg: '/public/images/houses/house2lg.png',
    country: 'Canada',
    address: '798 Talbot St. Bridgewater, NJ 08807',
    bedrooms: 6,
    bathrooms: 3,
    surface: '4200 sq ft',
    year: 2016,
    price: 140000,
    agent: {
      image: '/public/images/agents/agent2.png',
      name: 'Daryl Hawker',
      phone: '0123 456 78910',
    },
  },
  {
    id: 3,
    type: 'House',
    name: 'House 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house3.png',
    imageLg: '/public/images/houses/house3lg.png',
    country: 'United States',
    address: '2 Glen Creek St. Alexandria, VA 22304',
    bedrooms: 6,
    bathrooms: 3,
    surface: '4200 sq ft',
    year: 2016,
    price: 170000,
    agent: {
      image: '/public/images/agents/agent3.png',
      name: 'Amado Smith',
      phone: '0123 456 78910',
    },
  },
  {
    id: 4,
    type: 'House',
    name: 'House 4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house4.png',
    imageLg: '/public/images/houses/house4lg.png',
    country: 'Canada',
    address: '84 Woodland St. Cocoa, FL 32927',
    bedrooms: 6,
    bathrooms: 3,
    surface: '4200 sq ft',
    year: 2016,
    price: 200000,
    agent: {
      image: '/public/images/agents/agent4.png',
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 5,
    type: 'House',
    name: 'House 5',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house5.png',
    imageLg: '/public/images/houses/house5lg.png',
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: 5,
    bathrooms: 3,
    surface: '4200 sq ft',
    year: 2015,
    price: 210000,
    agent: {
      image: '/public/images/agents/agent5.png',
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 6,
    type: 'House',
    name: 'House 6',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house6.png',
    imageLg: '/public/images/houses/house6lg.png',
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: 6,
    bathrooms: 3,
    surface: '6200 sq ft',
    year: 2014,
    price: 220000,
    agent: {
      image: '/public/images/agents/agent6.png',
      name: 'Karen Sorensen',
      phone: '0123 456 78910',
    },
  },
  {
    id: 7,
    type: 'Apartment',
    name: 'Apartment 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/apartments/a1.png',
    imageLg: '/public/images/apartments/a1lg.png',
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: 2,
    bathrooms: 1,
    surface: '1200 sq ft',
    year: 2012,
    price: 20000,
    agent: {
      image: '/public/images/agents/agent7.png',
      name: 'Jawhar Shamil Naser',
      phone: '0123 456 78910',
    },
  },
  {
    id: 8,
    type: 'Apartment',
    name: 'Apartment 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/apartments/a2.png',
    imageLg: '/public/images/apartments/a2lg.png',
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: 3,
    bathrooms: 1,
    surface: '1000 sq ft',
    year: 2011,
    price: 30000,
    agent: {
      image: '/public/images/agents/agent8.png',
      name: 'Juana Douglass',
      phone: '0123 456 78910',
    },
  },
  {
    id: 9,
    type: 'Apartment',
    name: 'Apartment 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/apartments/a3.png',
    imageLg: '/public/images/apartments/a3lg.png',
    country: 'United States',
    address: '84 Woodland St. Cocoa, FL 32927',
    bedrooms: 2,
    bathrooms: 1,
    surface: '1100 sq ft',
    year: 2011,
    price: 40000,
    agent: {
      image: '/public/images/agents/agent9.png',
      name: 'Jerry Schenck',
      phone: '0123 456 78910',
    },
  },
  {
    id: 10,
    type: 'House',
    name: 'House 7',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house7.png',
    imageLg: '/public/images/houses/house7lg.png',
    country: 'Canada',
    address: '7240C Argyle St. Lawndale, CA 90260',
    bedrooms: 5,
    bathrooms: 3,
    surface: '3200 sq ft',
    year: 2015,
    price: 117000,
    agent: {
      image: '/public/images/agents/agent10.png',
      name: 'Vera Levesque',
      phone: '0123 456 78910',
    },
  },
  {
    id: 11,
    type: 'House',
    name: 'House 8',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house8.png',
    imageLg: '/public/images/houses/house8lg.png',
    country: 'Canada',
    address: '798 Talbot St. Bridgewater, NJ 08807',
    bedrooms: 7,
    bathrooms: 2,
    surface: '2200 sq ft',
    year: 2019,
    price: 145000,
    agent: {
      image: '/public/images/agents/agent11.png',
      name: 'Sofia Gomes',
      phone: '0123 456 78910',
    },
  },
  {
    id: 12,
    type: 'House',
    name: 'House 9',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house9.png',
    imageLg: '/public/images/houses/house9lg.png',
    country: 'United States',
    address: '2 Glen Creek St. Alexandria, VA 22304',
    bedrooms: 4,
    bathrooms: 4,
    surface: '4600 sq ft',
    year: 2015,
    price: 139000,
    agent: {
      image: '/public/images/agents/agent12.png',
      name: 'Raymond Hood',
      phone: '0123 456 78910',
    },
  },
  {
    id: 13,
    type: 'House',
    name: 'House 10',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house10.png',
    imageLg: '/public/images/houses/house10lg.png',
    country: 'Canada',
    address: '84 Woodland St. Cocoa, FL 32927',
    bedrooms: 5,
    bathrooms: 2,
    surface: '5200 sq ft',
    year: 2014,
    price: 180000,
    agent: {
      image: '/public/images/agents/agent1.png',

      name: 'Patricia Tullert',
      phone: '0123 456 78910',
    },
  },
  {
    id: 14,
    type: 'House',
    name: 'House 11',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house11.png',
    imageLg: '/public/images/houses/house11lg.png',
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: 5,
    bathrooms: 2,
    surface: '3200 sq ft',
    year: 2011,
    price: 213000,
    agent: {
      image: '/public/images/agents/agent2.png',
      name: 'Daryl Hawker',
      phone: '0123 456 78910',
    },
  },
  {
    id: 15,
    type: 'House',
    name: 'House 12',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/houses/house12.png',
    imageLg: '/public/images/houses/house12lg.png',
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: 4,
    bathrooms: 3,
    surface: '5200 sq ft',
    year: 2013,
    price: 221000,
    agent: {
      image: '/public/images/agents/agent13.png',
      name: 'Amado Smith',
      phone: '0123 456 78910',
    },
  },
  {
    id: 16,
    type: 'Apartment',
    name: 'Apartment 16',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/apartments/a4.png',
    imageLg: '/public/images/apartments/a4lg.png',
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: 2,
    bathrooms: 1,
    surface: '1300 sq ft',
    year: 2011,
    price: 21000,
    agent: {
      image: '/public/images/agents/agent4.png',
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 17,
    type: 'Apartment',
    name: 'Apartment 17',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/apartments/a5.png',
    imageLg: '/public/images/apartments/a5lg.png',
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: 3,
    bathrooms: 1,
    surface: '1000 sq ft',
    year: 2012,
    price: 32000,
    agent: {
      image: '/public/images/agents/agent5.png',
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 18,
    type: 'Apartment',
    name: 'Apartment 18',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.',
    image: '/public/images/apartments/a6.png',
    imageLg: '/public/images/apartments/a6lg.png',
    country: 'Canada',
    address: '84 Woodland St. Cocoa, FL 32927',
    bedrooms: 3,
    bathrooms: 1,
    surface: '1200 sq ft',
    year: 2010,
    price: 38000,
    agent: {
      image: '/public/images/agents/agent6.png',
      name: 'Karen Sorensen',
      phone: '0123 456 78910',
    },
  },
];
