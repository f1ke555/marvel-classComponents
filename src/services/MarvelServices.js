class MarvelServices {
    getResource = async (url) => {
        const response = await fetch(url)
        return await response.json()
    }

    getAllCharacter = async (limit) => {
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=210&apikey=7c88fb8e492cf04cbddb283fcbb5f249`)
        return res.data.results
    }

    getCharacterById = async (id) => {
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=7c88fb8e492cf04cbddb283fcbb5f249`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return  {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[0].url,
            comics: char.comics.items
        }
    }
}

export default MarvelServices;