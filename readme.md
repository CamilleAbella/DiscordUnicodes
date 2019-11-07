# Discord Unicodes

`npm install discord-unicodes --save`

```js
const Unicodes = require('discord-unicodes')
```

## Examples

get emoji data:
```js
const nerd = Unicodes('🤓')
console.log(nerd)
```
ouput:
```json
{
    "name": "nerd",
    "charcode": "\\uD83E\\uDD13",
    "url": "https://discordapp.com/assets/e694b29603bee9f93dea4cad64502a38.svg",
    "unicode": "🤓"
}
```

## Functions

```js
Unicodes(any)
Unicodes.list               // all discord emojis array
Unicodes.count              // size of emojis array
Unicodes.get(num)           // get emoji by ID (1...1600+)
Unicodes.has(string)        // check if emoji exist
Unicodes.find(string)       // get first emoji found from string
Unicodes.search(regex)      // get emoji array from regex
Unicodes.extract(string)    // extract emoji array from text
```

## Support 👍

https://discord.gg/3vC2XWK 