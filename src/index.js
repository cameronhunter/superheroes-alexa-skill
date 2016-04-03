import APIConfig from '../config/comic-vine.config.js';
import ComicAPI from './comic-vine';
import Response from 'alexa-response';
import { Skill, Intent } from 'alexa-lambda-skill';
import { ssml } from 'alexa-ssml';

const api = new ComicAPI(APIConfig);

@Skill
export default class ComicQuestions {

  @Intent('COMIC.Identity')
  identity({ query }) {
    return api.search({ query, resources: 'character', field_list: ['name', 'real_name'] }).then(response => {
      const [{ name, real_name }] = response.results;
      const answer = `${name}'s secret identity is ${real_name}`;
      return Response.say(answer).card({ title: 'Secret Identity', content: answer });
    });
  }

}
