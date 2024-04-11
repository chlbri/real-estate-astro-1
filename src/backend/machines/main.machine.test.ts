import { MAIN_DATA, Property } from '@-backend/data/main';
import { THROTTLE_TIME, TIME_BETWEEN_REQUESTS } from '@-constants/numbers';
import { interpret } from '@bemedev/x-test';
import { machine as machine1 } from './main.machine';
import { Context } from './main.machine.types';

const machine = machine1.withContext({
  cache: {},
  ui: {
    data: {},
    dropdowns: {
      country: {
        default: 'select',
      },
      type: {
        default: 'select',
      },
    },
    inputs: {
      price: {
        inferiorOrEqualTo: { default: 'price' },
        superiorOrEqualTo: { default: 'price' },
      },
    },
    timeouts: {},
  },
});

describe('Acceptation', () => {
  test('The machine is defined', () => {
    expect(machine).toBeDefined();
  });

  test('The context is initialized', () => {
    expect(machine.context).toBeDefined();
  });
});

describe('Workflows', () => {
  // #region Preparation
  const service = interpret(machine);

  beforeAll(() => {
    service.start();
  });

  afterAll(() => {
    service.stop();
  });

  // #region Hooks
  const _throttle = () => service.advanceTime(THROTTLE_TIME + 1);
  const throttle = (length = 1) => {
    const incs = Array.from({ length }).fill(
      _throttle
    ) as (() => Promise<void>)[];
    return Promise.all(incs.map((inc) => inc()));
  };

  const waitForNext = () => service.advanceTime(TIME_BETWEEN_REQUESTS + 1);
  type Filter = (property: Property) => boolean;
  const useFiltered = (filter: Filter) => {
    const expected = MAIN_DATA.filter(filter);
    const accessor = (ctx: Context) => ctx.ui.data.filtered;

    const func = () => service.context(expected, accessor);
    return func;
  };

  const useRinit = () => {
    return afterAll(() => {
      service.send('__RINIT__');
      return waitForNext();
    });
  };
  // #endregion

  // #endregion

  describe('Workflow 1: It will filter by country', () => {
    useRinit();
    const country = 'United States';

    test('#1: TOGLLE', () => {
      service.send('COUNTRY/TOGGLE');
    });

    test('#2: INPUT', () => {
      service.send({
        type: 'COUNTRY/INPUT',
        input: country,
      });
    });

    test('#3: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });

    test(
      '#4: Test the filtered data',
      useFiltered((data) => data.country === country)
    );
  });

  describe('#2: It will filter by country twice', async () => {
    useRinit();

    const country1 = 'United States';
    const country2 = 'Canada';

    test('#1: TOGLLE', () => {
      service.send('COUNTRY/TOGGLE');
    });

    test('#2: INPUT', () => {
      service.send({
        type: 'COUNTRY/INPUT',
        input: country1,
      });
    });

    test('#3: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });

    test(
      '#4: Test the filtered data',
      useFiltered((data) => data.country === country1)
    );

    test('#5: Wait for next', async () => {
      await waitForNext();
    });

    test('#6: TOGGLE', () => {
      service.send('COUNTRY/TOGGLE');
    });

    test('#7: INPUT', () => {
      service.send({
        type: 'COUNTRY/INPUT',
        input: country2,
      });
    });

    test('#8: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });

    test(
      '#9: Test the filtered data',
      useFiltered((data) => data.country === country2)
    );
  });

  describe('#3: It will filter by type', async () => {
    useRinit();
    const propertyType = 'Apartment';

    test('#1: TOGGLE', () => {
      service.send('TYPE/TOGGLE');
    });

    test('#2: INPUT', () => {
      service.send({
        type: 'TYPE/INPUT',
        input: propertyType,
      });
    });

    test('#3: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });

    test(
      '#4: Test the filtered data',
      useFiltered(({ type }) => type === propertyType)
    );
  });

  describe('#4: It will filter by type twice', async () => {
    useRinit();
    const propertyType1 = 'Apartment';
    const propertyType2 = 'House';

    test('#1: TOGLLE', () => {
      service.send('TYPE/TOGGLE');
    });

    test('#2: INPUT', () => {
      service.send({
        type: 'TYPE/INPUT',
        input: propertyType1,
      });
    });

    test('#3: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });

    test(
      '#4: Test the filtered data',
      useFiltered(({ type }) => type === propertyType1)
    );

    test('#5: Wait for next', async () => {
      await waitForNext();
    });

    test('#6: TOGGLE', () => {
      service.send('TYPE/TOGGLE');
    });

    test('#7: INPUT', () => {
      service.send({
        type: 'TYPE/INPUT',
        input: propertyType2,
      });
    });

    test('#8: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });

    test(
      '#9: Test the filtered data',
      useFiltered(({ type }) => type === propertyType2)
    );
  });

  describe('#5: It will filter by price range', async () => {
    useRinit();
    const inferiorOrEqualTo = 200_000;
    const superiorOrEqualTo = 100_000;

    test('#1: INPUT - SUPERIOR', () => {
      service.send({
        type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
        input: '' + superiorOrEqualTo,
      });
    });

    test('#2: INPUT - INFERIOR', () => {
      service.send({
        type: 'INFERIOR_OR_EQUAL_TO/INPUT',
        input: '' + inferiorOrEqualTo,
      });
    });

    test('#3: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });

    test(
      '#4: Test the filtered data',
      useFiltered(
        ({ price }) =>
          price >= superiorOrEqualTo && price <= inferiorOrEqualTo
      )
    );
  });

  describe('#6: It will filter by price range twice / three times', () => {
    useRinit();
    const inferiorOrEqualTo1 = 200_000;
    const superiorOrEqualTo1 = 100_000;
    const inferiorOrEqualTo2 = 100_000;
    const superiorOrEqualTo2 = 30_000;

    // #region First Event
    test('#1: INPUT - SUPERIOR', () => {
      service.send({
        type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
        input: '' + superiorOrEqualTo1,
      });
    });

    test('#2: INPUT - INFERIOR', () => {
      service.send({
        type: 'INFERIOR_OR_EQUAL_TO/INPUT',
        input: '' + inferiorOrEqualTo1,
      });
    });

    test('#3: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });
    // #endregion

    test(
      '#4: Test the filtered data',
      useFiltered(
        ({ price }) =>
          price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo1
      )
    );

    // #region Second Event
    test('#5: INPUT - INFERIOR', () => {
      service.send({
        type: 'INFERIOR_OR_EQUAL_TO/INPUT',
        input: '' + inferiorOrEqualTo2,
      });
    });

    test('#6: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });
    // #endregion

    test(
      '#7: Test the filtered data',
      useFiltered(
        ({ price }) =>
          price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo2
      )
    );

    // #region Third Event
    test('#8: INPUT - SUPERIOR', () => {
      service.send({
        type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
        input: '' + superiorOrEqualTo2,
      });
    });

    test('#9: Wait for database', async () => {
      await throttle(2);
      await waitForNext();
    });
    // #endregion

    test(
      '#10: Test the filtered data',
      useFiltered(
        ({ price }) =>
          price >= superiorOrEqualTo2 && price <= inferiorOrEqualTo2
      )
    );
  });

  describe('#7: It will filter all', async () => {
    useRinit();
    const inferiorOrEqualTo = 100_000;
    const superiorOrEqualTo = 20_000;
    const country = 'United States';
    const propertyType = 'Apartment';

    // #region Senders
    // #region First Event
    test('#1: INPUT - SUPERIOR', () => {
      service.send({
        type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
        input: '' + superiorOrEqualTo,
      });
    });

    test('#2: INPUT - INFERIOR', () => {
      service.send({
        type: 'INFERIOR_OR_EQUAL_TO/INPUT',
        input: '' + inferiorOrEqualTo,
      });
    });

    test('#3: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });
    // #endregion

    // #region Second Event
    test('#4: TOGGLE - TYPE', () => {
      service.send('TYPE/TOGGLE');
    });

    test('#5: INPUT - TYPE', () => {
      service.send({
        type: 'TYPE/INPUT',
        input: propertyType,
      });
    });

    test('#6: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });
    // #endregion

    // #region Third Event
    test('#7: TOGLLE - COUNTRY', () => {
      service.send('COUNTRY/TOGGLE');
    });

    test('#8: INPUT - COUNTRY', () => {
      service.send({
        type: 'COUNTRY/INPUT',
        input: country,
      });
    });

    test('#9: Wait for database', async () => {
      await throttle();
      await waitForNext();
    });
    // #endregion

    // #endregion

    test(
      '#10: Test the filtered data',
      useFiltered((data) => {
        const isType = data.type === propertyType;
        const isCountry = data.country === country;
        const isPrice =
          data.price >= superiorOrEqualTo &&
          data.price <= inferiorOrEqualTo;

        const check = isPrice && isType && isCountry;

        return check;
      })
    );
  });

  describe('#8: It will filter only one request if all requests are sent at same time', () => {
    useRinit();
    const inferiorOrEqualTo = 100_000;
    const superiorOrEqualTo = 30_000;
    const country = 'United States';
    const propertyType = 'Apartment';

    // #region Senders
    test('#1: INPUT - SUPERIOR', () => {
      service.send({
        type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
        input: '' + superiorOrEqualTo,
      });
    });

    test('#2: INPUT - INFERIOR', () => {
      service.send({
        type: 'INFERIOR_OR_EQUAL_TO/INPUT',
        input: '' + inferiorOrEqualTo,
      });
    });

    test('#3: THROTTLE', async () => {
      await throttle();
    });

    test('#4: INPUT - TYPE', () => {
      service.send({
        type: 'TYPE/INPUT',
        input: propertyType,
      });
    });

    test('#5: INPUT - COUNTRY', () => {
      service.send({
        type: 'COUNTRY/INPUT',
        input: country,
      });
    });
    // #endregion

    test('#6: Wait for database', () => waitForNext());

    test(
      '#7: Test the filtered data',
      useFiltered(
        ({ price }) =>
          price >= superiorOrEqualTo && price <= inferiorOrEqualTo
      )
    );
  });
});
