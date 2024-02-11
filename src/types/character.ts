
export interface Character {
    id: number,
    name: string,
    status: string,
    type?: string,
    gender: string,
    origin: {
        name: string,
        url: string
    }, 
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string,
}

export interface CharacterList extends Array<Character>{
    [index: number]: Character
}

export interface Response {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string
    },
    results: CharacterList
}