import Response from 'alexa-response';
import { ssml } from 'alexa-ssml';
import { Skill, Launch, Intent } from 'alexa-lambda-skill';

@Skill
export default class Test {

  @Launch
  launch() {
    return Response.say('Test launched!');
  }

  @Intent('hello')
  hello({ name = 'world' }) {
    return Response.say(`Hello ${name}`).card({ title:'Test', content:`Hello ${name}` });
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.ask('I say hello to people. Who should I say hello to?').reprompt('Who should I say hello to?');
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    return Response.say(<speak>Goodbye!</speak>);
  }

}
