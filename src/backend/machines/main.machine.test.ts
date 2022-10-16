import { MAIN_DATA } from '@-backend/data/main';
import { THROTTLE_TIME, TIME_BETWEEN_REQUESTS } from '@-constants/numbers';
import { advanceByTime } from '@-utils/test';
import { interpret } from 'xstate';
import { machine as machine1 } from './main.machine';

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

describe.concurrent('Acceptation', () => {
  test.concurrent('The machine is defined', () => {
    expect(machine).toBeDefined();
  });

  test.concurrent('The context is initialized', () => {
    expect(machine.context).toBeDefined();
  });
});

describe.concurrent('Working', () => {
  const service = interpret(machine);
  const throttle = () => advanceByTime(THROTTLE_TIME * 2);
  const waitForNext = () => advanceByTime(TIME_BETWEEN_REQUESTS + 1);

  beforeAll(() => {
    vi.useFakeTimers();
    service.start();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(async () => {
    service.send('__RINIT__');
    await advanceByTime(0);
  });

  test.concurrent('It will filter by country', async () => {
    const country = 'United States';

    service.send('COUNTRY/TOGGLE');
    service.send({
      type: 'COUNTRY/INPUT',
      input: country,
    });

    await throttle();
    await waitForNext();

    const actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toBeDefined();
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.country === country)
    );
  });

  test.concurrent('It will filter by country twice', async () => {
    const country1 = 'United States';
    const country2 = 'Canada';

    service.send('COUNTRY/TOGGLE');
    service.send({
      type: 'COUNTRY/INPUT',
      input: country1,
    });

    await throttle();
    await waitForNext();

    let actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.country === country1)
    );

    await waitForNext();

    service.send('COUNTRY/TOGGLE');
    service.send({
      type: 'COUNTRY/INPUT',
      input: country2,
    });

    await throttle();
    await waitForNext();

    actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.country === country2)
    );
  });

  test.concurrent('It will filter by type', async () => {
    const propertyType = 'Apartment';

    service.send('TYPE/TOGGLE');
    service.send({
      type: 'TYPE/INPUT',
      input: propertyType,
    });

    await throttle();
    await waitForNext();

    const actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.type === propertyType)
    );
  });

  test.concurrent('It will filter by type twice', async () => {
    const propertyType1 = 'Apartment';
    const propertyType2 = 'House';

    service.send('TYPE/TOGGLE');
    service.send({
      type: 'TYPE/INPUT',
      input: propertyType1,
    });

    await throttle();
    await waitForNext();

    let actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.type === propertyType1)
    );

    await waitForNext();

    service.send('TYPE/TOGGLE');
    service.send({
      type: 'TYPE/INPUT',
      input: propertyType2,
    });

    await throttle();
    await waitForNext();

    actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.type === propertyType2)
    );
  });

  test.concurrent('It will filter by price range', async () => {
    const inferiorOrEqualTo = 200_000;
    const superiorOrEqualTo = 100_000;

    // #region Senders
    service.send({
      type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
      input: '' + superiorOrEqualTo,
    });
    await throttle();
    await waitForNext();
    service.send({
      type: 'INFERIOR_OR_EQUAL_TO/INPUT',
      input: '' + inferiorOrEqualTo,
    });
    // #endregion

    await throttle();
    await waitForNext();

    const actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter(
        ({ price }) =>
          price >= superiorOrEqualTo && price <= inferiorOrEqualTo
      )
    );
  });

  test.concurrent(
    'It will filter by price range twice / three times',
    async () => {
      const inferiorOrEqualTo1 = 200_000;
      const superiorOrEqualTo1 = 100_000;
      const inferiorOrEqualTo2 = 100_000;
      const superiorOrEqualTo2 = 30_000;

      // #region First Event
      service.send({
        type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
        input: '' + superiorOrEqualTo1,
      });
      service.send({
        type: 'INFERIOR_OR_EQUAL_TO/INPUT',
        input: '' + inferiorOrEqualTo1,
      });
      await throttle();
      // #endregion

      let actual = service.getSnapshot().context.ui.data.filtered;
      expect(actual).toEqual(
        MAIN_DATA.filter(
          ({ price }) =>
            price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo1
        )
      );

      // #region Second Event
      await waitForNext();
      service.send({
        type: 'INFERIOR_OR_EQUAL_TO/INPUT',
        input: '' + inferiorOrEqualTo2,
      });
      await throttle();
      await waitForNext();
      // #endregion

      actual = service.getSnapshot().context.ui.data.filtered;
      expect(actual).toEqual(
        MAIN_DATA.filter(
          ({ price }) =>
            price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo2
        )
      );

      // #region Thrid Event
      await waitForNext();
      service.send({
        type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
        input: '' + superiorOrEqualTo2,
      });
      await throttle();
      await waitForNext();
      // #endregion

      actual = service.getSnapshot().context.ui.data.filtered;
      expect(actual).toEqual(
        MAIN_DATA.filter(
          ({ price }) =>
            price >= superiorOrEqualTo2 && price <= inferiorOrEqualTo2
        )
      );
    }
  );

  test.concurrent('It will filter all', async () => {
    const inferiorOrEqualTo = 100_000;
    const superiorOrEqualTo = 20_000;
    const country = 'United States';
    const propertyType = 'Apartment';

    // #region Senders
    // #region First Event
    service.send({
      type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
      input: '' + superiorOrEqualTo,
    });
    service.send({
      type: 'INFERIOR_OR_EQUAL_TO/INPUT',
      input: '' + inferiorOrEqualTo,
    });
    await throttle();
    await waitForNext();
    // #endregion

    // #region Second Event
    service.send('TYPE/TOGGLE');
    service.send({
      type: 'TYPE/INPUT',
      input: propertyType,
    });
    await throttle();
    await waitForNext();
    // #endregion

    service.send('COUNTRY/TOGGLE');
    service.send({
      type: 'COUNTRY/INPUT',
      input: country,
    });
    await throttle();
    await waitForNext();
    // #endregion

    const actual = service.getSnapshot().context.ui.data.filtered;

    const expected = MAIN_DATA.filter(({ price }) => {
      return price >= superiorOrEqualTo && price <= inferiorOrEqualTo;
    })
      .filter(({ type }) => {
        return type === propertyType;
      })
      .filter((data) => {
        return data.country === country;
      });

    expect(actual).toEqual(expected);
  });

  test.concurrent(
    'It will filter only one request if all requests are sent at same time',
    async () => {
      const inferiorOrEqualTo = 100_000;
      const superiorOrEqualTo = 30_000;
      const country = 'United States';
      const propertyType = 'Apartment';

      // #region Senders
      service.send({
        type: 'INFERIOR_OR_EQUAL_TO/INPUT',
        input: '' + inferiorOrEqualTo,
      });
      service.send({
        type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
        input: '' + superiorOrEqualTo,
      });
      await throttle();
      await waitForNext();

      service.send({
        type: 'TYPE/INPUT',
        input: propertyType,
      });

      service.send({
        type: 'COUNTRY/INPUT',
        input: country,
      });
      // #endregion

      await advanceByTime(0);

      const actual = service.getSnapshot().context.ui.data.filtered;
      const expected = MAIN_DATA.filter(({ price }) => {
        return price >= superiorOrEqualTo && price <= inferiorOrEqualTo;
      });

      expect(actual).toEqual(expected);
    }
  );
});

export {};
