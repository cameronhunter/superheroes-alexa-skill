import test from 'ava';
import handler from '..';
import { Request } from 'alexa-lambda-skill';

// AWS Lambda requires a CommonJS export
const Skill = handler.default;

test('Identity intent', t => {
  const event = Request.intent('COMIC.Identity', { query: 'spider-man' }).build();

  return Skill(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: {
          type: 'PlainText',
          text: 'Spider-Man\'s secret identity is Peter Benjamin Parker'
        },
        card: {
          type: 'Simple',
          title: 'Secret Identity',
          content: 'Spider-Man\'s secret identity is Peter Benjamin Parker'
        }
      }
    });
  });
});
