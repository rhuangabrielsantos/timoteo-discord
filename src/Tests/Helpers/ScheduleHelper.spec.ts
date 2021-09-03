import { RecurrenceRule } from "node-schedule";
import ScheduleHelper from "../../Helpers/ScheduleHelper";

test("Given a specific hour to schedule helper handler, With Production Environment, Should with return the RecurrenceRule correctly", () => {
  const ruleCreatedByHelper = ScheduleHelper.createTimerRule({
    hour: 8,
    minute: 30,
    second: 10,
  });

  const expectedRule = new RecurrenceRule();
  expectedRule.hour = 8;
  expectedRule.minute = 30;
  expectedRule.second = 10;
  expectedRule.tz = "America/Sao_Paulo";

  expect(ruleCreatedByHelper).toEqual(expectedRule);
});

test("Given a empty hour to schedule helper handler, With Production Environment, Should with return the second with zero information", () => {
  const ruleCreatedByHelper = ScheduleHelper.createTimerRule({});

  const expectedRule = new RecurrenceRule();
  expectedRule.second = 0;
  expectedRule.tz = "America/Sao_Paulo";

  expect(ruleCreatedByHelper).toEqual(expectedRule);
});

test("Given a specific hour to schedule helper handler, With Development Environment, Should with return the actually hour more five seconds", () => {
  process.env.ENVIRONMENT = "development";
  process.env.SCHEDULE_TEST = "on";

  const ruleCreatedByHelper = ScheduleHelper.createTimerRule({
    hour: 8,
    minute: 30,
    second: 10,
  });

  const now = new Date();

  const expectedRule = new RecurrenceRule();
  expectedRule.hour = now.getHours();
  expectedRule.minute = now.getMinutes();
  expectedRule.second = now.getSeconds() + 5;
  expectedRule.tz = "America/Sao_Paulo";

  expect(ruleCreatedByHelper).toEqual(expectedRule);
});
