import { useEffect, useState } from "preact/hooks";
import { searchSignal } from "../signals.ts";

interface Character {
    id: number;
    name: string;
    image: string;
}

interface ApiResponse {
    info: { pages: number; count: number; next: string | null; prev: string | null; };
    results: Character[];
}

export default function CharacterList({ initial }: { initial: Character[] }) {
    const [characters, setCharacters] = useState<Character[]>(initial);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(42);

    useEffect(() => {
        let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
        if (searchSignal.value) {
            url += `&name=${searchSignal.value}`;
        }
        fetch(url)
            .then((res) => res.json())
            .then((data: ApiResponse) => {
                setCharacters(data.results || []);
                setTotalPages(data.info?.pages || 1);
            });
    }, [searchSignal.value, page]);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", margin: "1rem 0" }}>
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</button>
                <span>{page} / {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Siguiente</button>
            </div>
            <div class="grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(9, 1fr)",
                gap: "1rem"
            }}>
                {characters.map((char) => (
                    <div class="card" key={char.id}>
                        <a href={`/character/${char.id}`}>
                            <img src={char.image} alt={char.name} />
                        </a>
                        <a class="name" href={`/character/${char.id}`}>{char.name}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}