import { THROTTLE_TIME, TIME_BETWEEN_REQUESTS } from '@-constants/numbers';
import { advanceByTime } from '@-utils/test';
import { interpret } from 'xstate';
import { MAIN_DATA } from '../data/main';
import { machine } from './main.machine';

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
  const throttle = () => advanceByTime(THROTTLE_TIME + 1);
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

    service.send('TOGGLE_DROPDOWN_COUNTRY');
    service.send({
      type: 'FILTER_BY_COUNTRY',
      country,
    });

    await throttle();

    const actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toBeDefined();
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.country === country)
    );
  });

  test.concurrent('It will filter by country twice', async () => {
    const country1 = 'United States';
    const country2 = 'Canada';

    service.send('TOGGLE_DROPDOWN_COUNTRY');
    service.send({
      type: 'FILTER_BY_COUNTRY',
      country: country1,
    });

    await throttle();

    let actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.country === country1)
    );

    await waitForNext();

    service.send('TOGGLE_DROPDOWN_COUNTRY');
    service.send({
      type: 'FILTER_BY_COUNTRY',
      country: country2,
    });

    await throttle();

    actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.country === country2)
    );
  });

  test.concurrent('It will filter by type', async () => {
    const propertyType = 'Apartment';

    service.send('TOGGLE_DROPDOWN_TYPE');
    service.send({
      type: 'FILTER_BY_TYPE',
      propertyType,
    });

    await throttle();

    const actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.type === propertyType)
    );
  });

  test.concurrent('It will filter by type twice', async () => {
    const propertyType1 = 'Apartment';
    const propertyType2 = 'House';

    service.send('TOGGLE_DROPDOWN_TYPE');
    service.send({
      type: 'FILTER_BY_TYPE',
      propertyType: propertyType1,
    });

    await throttle();

    let actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.type === propertyType1)
    );

    await waitForNext();

    service.send('TOGGLE_DROPDOWN_TYPE');
    service.send({
      type: 'FILTER_BY_TYPE',
      propertyType: propertyType2,
    });

    await throttle();

    actual = service.getSnapshot().context.ui.data.filtered;
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.type === propertyType2)
    );
  });

  test.concurrent('It will filter by price range', async () => {
    const inferiorOrEqualTo = 200_000;
    const superiorOrEqualTo = 100_000;

    // service.send('FOCUS_PRICE_INFERIOR');
    service.send({
      type: 'SET_PRICE_INFERIOR',
      value: '' + inferiorOrEqualTo,
    });
    await throttle();
    service.send({
      type: 'SET_PRICE_SUPERIOR',
      value: '' + superiorOrEqualTo,
    });
    await throttle();

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

      service.send({
        type: 'SET_PRICE_INFERIOR',
        value: '' + inferiorOrEqualTo1,
      });
      await throttle();
      service.send({
        type: 'SET_PRICE_SUPERIOR',
        value: '' + superiorOrEqualTo1,
      });

      await throttle();

      let actual = service.getSnapshot().context.ui.data.filtered;
      expect(actual).toEqual(
        MAIN_DATA.filter(
          ({ price }) =>
            price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo1
        )
      );

      await waitForNext();

      service.send({
        type: 'SET_PRICE_INFERIOR',
        value: '' + inferiorOrEqualTo2,
      });

      await throttle();

      actual = service.getSnapshot().context.ui.data.filtered;
      expect(actual).toEqual(
        MAIN_DATA.filter(
          ({ price }) =>
            price >= superiorOrEqualTo1 && price <= inferiorOrEqualTo2
        )
      );

      await waitForNext();

      service.send({
        type: 'SET_PRICE_SUPERIOR',
        value: '' + superiorOrEqualTo2,
      });

      await throttle();

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
    service.send({
      type: 'SET_PRICE_INFERIOR',
      value: '' + inferiorOrEqualTo,
    });
    service.send({
      type: 'SET_PRICE_SUPERIOR',
      value: '' + superiorOrEqualTo,
    });

    await throttle();

    service.send('TOGGLE_DROPDOWN_TYPE');
    service.send({
      type: 'FILTER_BY_TYPE',
      propertyType,
    });

    await throttle();
    // await sleep(200);

    service.send('TOGGLE_DROPDOWN_COUNTRY');
    service.send({
      type: 'FILTER_BY_COUNTRY',
      country,
    });
    // #endregion

    await throttle();

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
      const superiorOrEqualTo = 20_000;
      const country = 'United States';
      const propertyType = 'Apartment';

      // #region Senders
      service.send({
        type: 'SET_PRICE_INFERIOR',
        value: '' + inferiorOrEqualTo,
      });
      await throttle();
      service.send({
        type: 'SET_PRICE_SUPERIOR',
        value: '' + superiorOrEqualTo,
      });
      await throttle();

      service.send({
        type: 'FILTER_BY_TYPE',
        propertyType,
      });

      service.send({
        type: 'FILTER_BY_COUNTRY',
        country,
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
