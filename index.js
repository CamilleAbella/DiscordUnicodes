
const emojis = require('./emojis.json')

function resolve(resolvable){
    return matchAll(resolvable)
}

function get(string){
    return emojis.find(emoji => (
        emoji.name == string ||
        emoji.charcode == string ||
        emoji.unicode == string
    ))
}

function has(string){
    return emojis.some(emoji => (
        emoji.name == string ||
        emoji.charcode == string ||
        emoji.unicode == string
    ))
}

function match(resolvable){
    if(typeof resolvable == 'string') return emojis.get(resolvable)
    if(resolvable instanceof RegExp) return emojis.find(emoji => resolvable.test(emoji.name))
    switch(typeof resolvable){
        case 'function' :
        case 'asyncFunction' :
        case 'arrowFunction' :
        return emojis.find(resolvable)
    }
}

function matchAll(regex){
    if(typeof resolvable == 'string') return emojis.filter(emoji => (
        emoji.name == resolvable ||
        emoji.charcode == resolvable ||
        emoji.unicode == resolvable
    ))
    if(resolvable instanceof RegExp) return emojis.filter(emoji => resolvable.test(emoji.name))
    switch(typeof resolvable){
        case 'function' :
        case 'asyncFunction' :
        case 'arrowFunction' :
        return emojis.filter(resolvable)
    }
}

function extractFrom(string){
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

resolve.count           = emojis.length 
resolve.list            = emojis        
resolve.get             = get           
resolve.has             = has           
resolve.match           = match          
resolve.matchAll        = matchAll        
resolve.extractFrom     = extractFrom      
module.exports          = resolve 
