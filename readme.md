# !!! DEPRECATED !!!

## Discord Unicodes

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
[
    {
        "name": "nerd",
        "charcode": "\\uD83E\\uDD13",
        "unicode": "🤓",
        "png": "https://res.cloudinary.com/les-laboratoires-js/image/upload/nerd.png",
        "svg": "https://discordapp.com/assets/e694b29603bee9f93dea4cad64502a38.svg"
    }
]
```

## Functions

```js
Unicodes(any)                   // call Unicodes.matchAll() method
Unicodes.list                   // give all emojis array
Unicodes.count                  // give size of emojis array
Unicodes.get(string)            // get emoji by name, charcode or unicode
Unicodes.has(string)            // check emoji by name, charcode or unicode
Unicodes.match(any)             // get emoji by name, regex or callback filter
Unicodes.matchAll(any)          // get emojis by name, regex or callback filter
Unicodes.extractFrom(string)    // extract emoji array includes to given string
```

## Support 👍

https://discord.gg/3vC2XWK 
