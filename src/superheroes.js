import APIConfig from '../config/comic-vine.config.js';
import ComicAPI, { ERROR } from './comic-vine';
import Response, { say, ask } from 'alexa-response';
import { Skill, Intent, Launch } from 'alexa-annotations';

const api = new ComicAPI(APIConfig);

const Who = 'Who were you asking about?';
const WhichSuperhero = 'Which superhero would you like to know about?';

@Skill
export default class Superheroes {

  @Launch
  launch() {
    return ask(`Welcome to Superheroes! ${WhichSuperhero}`).reprompt(WhichSuperhero);
  }

  @Intent('Identity')
  identity({ query }) {
    const search = api.search({ query, resources: 'character', field_list: ['name', 'real_name'] });

    return search.then(({ results }) => {
      const [{ name, real_name }] = results;
      const answer = `${name}'s secret identity is ${real_name}`;
      return Response.build({
        say: answer,
        card: { title: 'Secret Identity', content: answer }
      });
    }).catch(error => {
      switch (error) {
        case ERROR.EMPTY_QUERY:
          console.error('Empty query');
          return ask(`I didn't understand. ${Who}`).reprompt(WhichSuperhero);

        case ERROR.EMPTY_RESULTS:
          console.error(`Empty results for "${query}"`);
          return ask(`I couldn't find any superheroes called ${query}. ${Who}`).reprompt(WhichSuperhero);

        default:
          console.error(error);
          return say('Sorry, I\'m having difficulty finding that information.');
      }
    });
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return ask(`I can reveal superheroes identities. ${WhichSuperhero}`).reprompt(WhichSuperhero);
  }

  @Intent('AMAZON.StopIntent', 'AMAZON.CancelIntent')
  goodbye() {
    return say('Goodbye!');
  }

}
