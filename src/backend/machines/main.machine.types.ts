import { Property, PropertyType } from '@-backend/data/main';
import { QueryFilter } from './filter.machine';
import { BeforeQuery } from './queryBuilder.machine';

export type HydrationData = {
  filtered?: Property[];
  currentQuery: BeforeQuery;
};

export type Context = {
  cache: {
    countries?: Set<string>;
    types?: Set<PropertyType>;
    query?: QueryFilter;
    lastQueryDate?: number;
  };
  ui: {
    dropdowns: {
      country: {
        current?: string;
        open?: boolean;
        default: string;
      };
      type: {
        current?: string;
        open?: boolean;
        default: string;
      };
    };
    inputs: {
      price: {
        inferiorOrEqualTo: {
          current?: string;
          default: string;
        };
        superiorOrEqualTo: {
          current?: string;
          default: string;
        };
      };
    };
    data: {
      filtered?: Property[];
      currentQuery?: BeforeQuery;
      previousQuery?: BeforeQuery;
    };
    timeouts: {
      inferiorFocusInterval?: ReturnType<typeof setTimeout>;
      superiorFocusInterval?: ReturnType<typeof setTimeout>;
    };
  };
};

// #region Events
export type Events =
  | {
      type:
        | '__RINIT__'
        | 'RESET_INPUTS'
        | 'COUNTRY/TOGGLE'
        | 'TYPE/TOGGLE'
        | 'START_QUERY';
    }
  | {
      type: 'CHILD/COUNTRY/TOGGLE' | 'CHILD/TYPE/TOGGLE';
      open?: boolean;
    }
  | { type: 'QUERY'; query?: BeforeQuery }
  | {
      type:
        | 'COUNTRY/INPUT'
        | 'CHILD/COUNTRY/INPUT'
        | 'TYPE/INPUT'
        | 'CHILD/TYPE/INPUT'
        | 'SUPERIOR_OR_EQUAL_TO/INPUT'
        | 'CHILD/SUPERIOR_OR_EQUAL_TO/INPUT'
        | 'INFERIOR_OR_EQUAL_TO/INPUT'
        | 'CHILD/INFERIOR_OR_EQUAL_TO/INPUT';

      input?: string;
    };
// #endregion
