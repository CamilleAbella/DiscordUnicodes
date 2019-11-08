
const emojis = require('./emojis.json')

function lockType(resolvable,type){
    if(typeof resolvable != type)
    throw TypeError('resolvable argument must be a '+type)
    return resolvable
}
function lockInstance(resolvable,_class){
    if(resolvable instanceof _class){
        return resolvable
    }   throw TypeError('resolvable must be '+_class.name)
}

function resolve(resolvable){
    const type = typeof resolvable
    if(type == 'string')                return find(resolvable)
    if(type == 'number')                return get(resolvable)
    if(resolvable instanceof RegExp)    return search(resolvable)
    return false
}

function get(resolvable){
    const num = lockType(resolvable,'number')
    return emojis[num]
}

function has(resolvable){
    const string = lockType(resolvable,'string')
    return emojis.some(emoji => (
        emoji.name == string ||
        emoji.charcode == string ||
        emoji.unicode == string ||
        emoji.url == "https://discordapp.com/assets/"+string+".svg"
    ))
}

function find(resolvable){
    const string = lockType(resolvable,'string').toLowerCase()
    return emojis.find(emoji => (
        emoji.name == string ||
        emoji.charcode == string ||
        emoji.unicode == string ||
        emoji.url == "https://discordapp.com/assets/"+string+".svg"
    ))
}

function search(resolvable){
    const regex = lockInstance(resolvable,RegExp)
    return emojis.filter(emoji => regex.test(emoji.name))
}

function extract(resolvable){
    let string = lockType(resolvable,'string')
    result = []
    for(i=0; i<string.length; i++){
        for(let emoji of emojis){
            const mention = ':'+emoji.name+':'
            const regex = new RegExp('^'+emoji.charcode,'u')
            if(regex.test(string.slice(i))){
                const end = i + emoji.unicode.length
                result.push({
                    matchType : 'unicode',
                    match : string.slice(i, end),
                    startIndex : i,
                    endIndex : end,
                    emoji : emoji
                })
                i = end
            }else if(string.slice(i).startsWith(mention)){
                const end = i + mention.length
                result.push({
                    matchType : 'mention',
                    match : string.slice(i, end),
                    startIndex : i,
                    endIndex : end,
                    emoji : emoji
                })
                i = end
            }
        }
    }
    return result
}

resolve.count   = emojis.length // return size of emoji array
resolve.list    = emojis        // return all discord emojis
resolve.get     = get           // get emoji by ID (1...1600+)
resolve.has     = has           // check if emoji exist
resolve.find    = find          // get first emojis found from string compare to all emoji props
resolve.search  = search        // get emoji array from regex apply to emoji names
resolve.extract = extract       // extract emoji array from text
module.exports  = resolve       // apply previous functions, just an alias
