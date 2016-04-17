# Superheroes Alexa Skill

An Alexa skill for the Amazon Echo. It reveals superheroes identities using the [Comic Vine API](http://comicvine.gamespot.com/api/). Generated using [generator-alexa-skill](https://github.com/cameronhunter/generator-alexa-skill).

Available to use in the [Alexa Skill store](http://alexa.amazon.com/spa/index.html#skills/amzn1.echo-sdk-ams.app.59b2b446-e3ef-4b72-9827-32ccb6bc2836)!

## Example phrases
```
Alexa, ask Superheroes who Batman is
Alexa, ask Superheroes do you know what Spider-man's real identity is?
Alexa, ask Superheroes what is Mystique's real name?
```

See `model/UTTERANCES` for more example phrases.

## Development

### Setup
You must add a file `config/comic-vine.config.js` which exports an object containing your API key for comic-vine.

```javascript
export default {
  key: 'your-comic-vine-api-key'
}
```

### Test

```bash
npm test
```

### Package

```bash
npm run package
```

This creates `build/package.zip` containing the compiled skill - this can be uploaded directly to AWS Lambda. It exposes a single function `index.hander`. Skill utterances defined in the `model` directory are expanded and output to `build/UTTERANCES`.

### Deploy

```bash
npm run deploy
```

If you configure the project with AWS credentials then you can build, test, package and deploy the project with a single command. You can check it out in the [AWS console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/superheroes-alexa-skill).
