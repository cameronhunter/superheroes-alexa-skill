import test from 'ava';
import { Request } from 'alexa-lambda-skill';
import { handler } from '..';

// AWS Lambda requires a CommonJS export named 'handler'
const Skill = handler.default;

test('LaunchRequest', t => {
  const event = Request.launchRequest().build();

  return Skill(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Test launched!' }
      }
    });
  });
});

test('Hello intent', t => {
  const event = Request.intent('hello', { name: 'world' }).build();

  return Skill(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Hello world' },
        card: { type: 'Simple', title: 'Test', content: 'Hello world' }
      }
    });
  });
});
