import { MAIN_DATA } from '@-backend/data/main';
import { THROTTLE_TIME, TIME_BETWEEN_REQUESTS } from '@-constants/numbers';
import { testInterpret } from '@-hooks/testInterpret';
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
  const service = testInterpret(machine);

  // #region Hooks
  const throttle = (length = 1) => {
    const inc = () => service.advanceTime(THROTTLE_TIME + 1);
    const incs = Array.from({ length }).fill(
      inc
    ) as (() => Promise<void>)[];
    return Promise.all(incs.map((inc) => inc()));
  };
  const waitForNext = () => service.advanceTime(TIME_BETWEEN_REQUESTS + 1);

  const accessor = (ctx: Context) => ctx.ui.data.filtered;
  // #endregion

  // #endregion

  describe('#1: It will filter by country', () => {
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

    test('#4: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        (data) => data.country === country
      );
      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

    test('#5: __RINIT__', async () => {
      service.send('__RINIT__');
      await waitForNext();
    });
  });

  describe('#2: It will filter by country twice', async () => {
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

    test('#4: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        (data) => data.country === country1
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

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

    test('#9: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        (data) => data.country === country2
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

    test('#10: __RINIT__', async () => {
      service.send('__RINIT__');
      await waitForNext();
    });
  });

  describe('#3: It will filter by type', async () => {
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

    test('#4: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        (data) => data.type === propertyType
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

    test('#5: __RINIT__', async () => {
      service.send('__RINIT__');
      await waitForNext();
    });
  });

  describe('#4: It will filter by type twice', async () => {
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

    test('#4: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        (data) => data.type === propertyType1
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

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

    test('#9: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        (data) => data.type === propertyType2
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

    test('#10: __RINIT__', async () => {
      service.send('__RINIT__');
      await waitForNext();
    });
  });

  describe('#5: It will filter by price range', async () => {
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

    test('#4: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        ({ price }) =>
          price >= superiorOrEqualTo && price <= inferiorOrEqualTo
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

    test('#5: __RINIT__', async () => {
      service.send('__RINIT__');
      await waitForNext();
    });
  });

  describe('#6: It will filter by price range twice / three times', async () => {
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

    test('#4: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        ({ price }) =>
          price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo1
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

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

    test('#7: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        ({ price }) =>
          price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo2
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

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

    test('#10: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(
        ({ price }) =>
          price >= superiorOrEqualTo2 && price <= inferiorOrEqualTo2
      );

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

    test('#11: __RINIT__', async () => {
      service.send('__RINIT__');
      await waitForNext();
    });
  });

  describe('#7: It will filter all', async () => {
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

    test('#10: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(({ price }) => {
        return price >= superiorOrEqualTo && price <= inferiorOrEqualTo;
      })
        .filter(({ type }) => {
          return type === propertyType;
        })
        .filter((data) => {
          return data.country === country;
        });

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

    test('#11: __RINIT__', async () => {
      service.send('__RINIT__');
      await waitForNext();
    });
  });

  describe('#8: It will filter only one request if all requests are sent at same time', async () => {
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

    test('#6: Wait for database', async () => {
      await waitForNext();
    });

    test('#7: Test the filtered data', () => {
      const expected = MAIN_DATA.filter(({ price }) => {
        return price >= superiorOrEqualTo && price <= inferiorOrEqualTo;
      });

      const check = service.context({
        expected,
        accessor,
      });

      expect(check).toEqual(true);
    });

    test('#8: __RINIT__', async () => {
      service.send('__RINIT__');
      await waitForNext();
    });
  });
});
