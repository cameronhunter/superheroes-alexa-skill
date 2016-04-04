# Superheroes Alexa Skill

An Alexa skill for the Amazon Echo. It reveals superheroes identities.

## Example phrases
```
Who is Batman?
Do you know what Spider-man's real identity is?
What is Mystique's real name?
```

## Setup
You must add a file `config/comic-vine.config.js` which exports an object containing your API key for comic-vine.

```javascript
export default {
  key: 'your-comic-vine-api-key'
}
```

## Test

```bash
npm test
```

## Deploy

```bash
npm run deploy
```

This creates `build/package.zip` containing the compiled skill exposing a single function `index.handler`. This package is then deployed to AWS Lambda. You can check it out in the [AWS console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/alexa-skill-test). Example utterances are also expanded and output to `build/UTTERANCES`.

Generated using [generator-alexa-skill](https://github.com/cameronhunter/generator-alexa-skill). See `model/UTTERANCES` for more example phrases that interact with this skill.
