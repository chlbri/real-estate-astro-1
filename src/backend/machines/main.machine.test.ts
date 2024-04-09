import { MAIN_DATA } from '@-backend/data/main';
import { THROTTLE_TIME, TIME_BETWEEN_REQUESTS } from '@-constants/numbers';
import { incrementByTime } from '@-utils/test';
import { interpret } from 'xstate';
import { SimulatedClock } from 'xstate/lib/SimulatedClock';
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

describe('Acceptation', () => {
  test('The machine is defined', () => {
    expect(machine).toBeDefined();
  });

  test('The context is initialized', () => {
    expect(machine.context).toBeDefined();
  });
});

describe('Working', () => {
  const clock = new SimulatedClock();
  const service = interpret(machine, { clock });
  const throttle = (length = 1) => {
    const inc = () => incrementByTime(clock, THROTTLE_TIME + 1);
    const incs = Array.from({ length }).fill(
      inc
    ) as (() => Promise<void>)[];
    return Promise.all(incs.map((inc) => inc()));
  };
  const waitForNext = () =>
    incrementByTime(clock, TIME_BETWEEN_REQUESTS + 1);

  beforeAll(() => {
    service.start();
  });

  beforeEach(async () => {
    service.send('__RINIT__');
    await waitForNext();
  });

  test('It will filter by country', async () => {
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

  test('It will filter by country twice', async () => {
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

  test('It will filter by type', async () => {
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

  test('It will filter by type twice', async () => {
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

  test('It will filter by price range', async () => {
    const inferiorOrEqualTo = 200_000;
    const superiorOrEqualTo = 100_000;

    // #region Senders
    service.send({
      type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
      input: '' + superiorOrEqualTo,
    });
    await throttle();
    // await waitForNext();
    service.send({
      type: 'INFERIOR_OR_EQUAL_TO/INPUT',
      input: '' + inferiorOrEqualTo,
    });
    // #endregion

    await throttle(2);
    await waitForNext();

    const actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter(
        ({ price }) =>
          price >= superiorOrEqualTo && price <= inferiorOrEqualTo
      )
    );
  });

  test('It will filter by price range twice / three times', async () => {
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
    await waitForNext();
    // #endregion

    let actual = service.getSnapshot().context.ui.data.filtered;
    let expected = MAIN_DATA.filter(
      ({ price }) =>
        price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo1
    );
    expect(actual).toEqual(expected);

    // #region Second Event
    service.send({
      type: 'INFERIOR_OR_EQUAL_TO/INPUT',
      input: '' + inferiorOrEqualTo2,
    });
    await throttle();
    await waitForNext();
    // #endregion

    actual = service.getSnapshot().context.ui.data.filtered;
    expected = MAIN_DATA.filter(
      ({ price }) =>
        price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo2
    );

    console.log('Expected 2:', expected.length);

    expect(actual).toEqual(expected);

    // #region Third Event
    service.send({
      type: 'SUPERIOR_OR_EQUAL_TO/INPUT',
      input: '' + superiorOrEqualTo2,
    });
    await throttle(2);
    await waitForNext();
    // #endregion

    actual = service.getSnapshot().context.ui.data.filtered;
    expected = MAIN_DATA.filter(
      ({ price }) =>
        price >= superiorOrEqualTo2 && price <= inferiorOrEqualTo2
    );
    console.log('Expected 3:', expected.length);

    expect(actual).toEqual(expected);
  });

  test('It will filter all', async () => {
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

    // #region Third Event
    service.send('COUNTRY/TOGGLE');
    service.send({
      type: 'COUNTRY/INPUT',
      input: country,
    });
    await throttle();
    await waitForNext();
    // #endregion

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

  test('It will filter only one request if all requests are sent at same time', async () => {
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
    // await waitForNext();

    service.send({
      type: 'TYPE/INPUT',
      input: propertyType,
    });

    service.send({
      type: 'COUNTRY/INPUT',
      input: country,
    });
    // #endregion

    await waitForNext();

    const actual = service.getSnapshot().context.ui.data.filtered;
    const expected = MAIN_DATA.filter(({ price }) => {
      return price >= superiorOrEqualTo && price <= inferiorOrEqualTo;
    });

    expect(actual).toEqual(expected);
  });
});
