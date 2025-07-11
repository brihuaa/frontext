import { useEffect, useState } from "preact/hooks";
import { searchSignal } from "../signals.ts";

interface Character {
    id: number;
    name: string;
    image: string;
}

export default function CharacterList({ initial }: { initial: Character[] }) {
    const [characters, setCharacters] = useState<Character[]>(initial);

    useEffect(() => {
        if (!searchSignal.value) {
            setCharacters(initial);
            return;
        }
        fetch(`https://rickandmortyapi.com/api/character/?name=${searchSignal.value}`)
            .then((res) => res.json())
            .then((data) => setCharacters(data.results || []));
    }, [searchSignal.value]);

    return (
        <div class="grid">
            {characters.map((char) => (
                <div class="card" key={char.id}>
                    <a href={`/character/${char.id}`}>
                        <img src={char.image} alt={char.name} />
                    </a>
                    <a class="name" href={`/character/${char.id}`}>{char.name}</a>
                </div>
            ))}
        </div>
    );
}