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
          type: 'Standard',
          title: 'Secret Identity',
          text: 'Spider-Man\'s secret identity is Peter Benjamin Parker',
          image: {
            smallImageUrl: 'http://static.comicvine.com/uploads/screen_medium/3/31666/4688877-asm2015002cov-288e0.jpg',
            largeImageUrl: 'http://static.comicvine.com/uploads/scale_large/3/31666/4688877-asm2015002cov-288e0.jpg'
          }
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
