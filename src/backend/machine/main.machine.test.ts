import { advanceByTime } from '@-utils/test';
import { interpret } from 'xstate';
import { MAIN_DATA } from '../data/main';
import { initialContext, machine } from './main.machine';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe.concurrent('Acceptation', () => {
  test.concurrent('The machine is defined', () => {
    expect(machine).toBeDefined();
  });

  test.concurrent('The context is initilized', () => {
    expect(machine.context).toEqual(initialContext);
  });
});

describe.concurrent('Working', () => {
  test.concurrent('It will filter by country', async () => {
    const country = 'United States';

    const service = interpret(machine).start();

    service.send('TOGGLE_DROPDOWN_COUNTRY');

    service.send({
      type: 'FILTER_BY_COUNTRY',
      country,
    });

    const actual = service.getSnapshot().context.back.filtered;

    expect(actual).toBeDefined();
    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.country === country)
    );
  });

  test.concurrent('It will filter by type', async () => {
    const propertyType = 'Apartment';

    const service = interpret(machine).start();

    service.send('TOGGLE_DROPDOWN_TYPE');

    service.send({
      type: 'FILTER_BY_TYPE',
      propertyType,
    });

    const actual = service.getSnapshot().context.back.filtered;

    expect(actual).toEqual(
      MAIN_DATA.filter((data) => data.type === propertyType)
    );
  });

  test.concurrent('It will filter by price range', async () => {
    const inferiorOrEqualTo = 200_000;
    const superiorOrEqualTo = 100_000;

    const service = interpret(machine).start();

    service.send({
      type: 'FILTER_BY_PRICE',
      inferiorOrEqualTo,
      superiorOrEqualTo,
    });

    const actual = service.getSnapshot().context.back.filtered;

    expect(actual).toEqual(
      MAIN_DATA.filter(
        ({ price }) =>
          price >= superiorOrEqualTo && price <= inferiorOrEqualTo
      )
    );
  });

  test.concurrent('It will filter all', async () => {
    const inferiorOrEqualTo = 100_000;
    const superiorOrEqualTo = 20_000;
    const country = 'United States';
    const propertyType = 'Apartment';

    vi.useFakeTimers();

    const service = interpret(machine).start();

    // #region Senders
    service.send({
      type: 'FILTER_BY_PRICE',
      inferiorOrEqualTo,
      superiorOrEqualTo,
    });

    await advanceByTime(201);
    // await sleep(200);

    service.send({
      type: 'FILTER_BY_TYPE',
      propertyType,
    });

    await advanceByTime(201);
    // await sleep(200);

    service.send({
      type: 'FILTER_BY_COUNTRY',
      country,
    });
    // #endregion

    const actual = service.getSnapshot().context.back.filtered;

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

      const service = interpret(machine).start();

      // #region Senders
      service.send({
        type: 'FILTER_BY_PRICE',
        inferiorOrEqualTo,
        superiorOrEqualTo,
      });

      service.send({
        type: 'FILTER_BY_TYPE',
        propertyType,
      });

      service.send({
        type: 'FILTER_BY_COUNTRY',
        country,
      });
      // #endregion

      const actual = service.getSnapshot().context.back.filtered;
      const expected = MAIN_DATA.filter(({ price }) => {
        return price >= superiorOrEqualTo && price <= inferiorOrEqualTo;
      });

      expect(actual).toEqual(expected);
    }
  );
});

export {};
