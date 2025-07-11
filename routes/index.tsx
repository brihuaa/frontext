import { Handlers, PageProps } from "$fresh/server.ts";
import SearchBox from "../islands/SearchBox.tsx";
import CharacterList from "../islands/CharacterList.tsx";


interface Character {
    id: number;
    name: string;
    image: string;
}

export const handler: Handlers = {
    async GET(_req, ctx) {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        const data = await res.json();
        const characters: Character[] = data.results.map((c: any) => ({
            id: c.id,
            name: c.name,
            image: c.image,
        }));
        return ctx.render({ characters });
    },
};

export default function Home({ data }: PageProps<{ characters: Character[] }>) {
    return (
        <div>
            <SearchBox />
            <CharacterList initial={data.characters} />
        </div>
    );
}
