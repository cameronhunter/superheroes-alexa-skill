import test from 'ava';
import { handler as Skill } from '..';
import { Request } from 'alexa-lambda-skill';

test('Identity intent', t => {
  const event = Request.intent('Identity', { query: 'spider-man' }).build();

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

test('Help intent', t => {
  const event = Request.intent('AMAZON.HelpIntent').build();

  return Skill(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: false,
        outputSpeech: {
          type: 'PlainText',
          text: 'I can reveal superheroes identities. Which superhero would you like to know about?'
        },
        reprompt: {
          outputSpeech: {
            type: 'PlainText',
            text: 'Which superhero would you like to know about?'
          }
        }
      }
    });
  });
});
