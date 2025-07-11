import { Handlers, PageProps } from "$fresh/server.ts";

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: { name: string };
    location: { name: string };
    image: string;
}

export const handler: Handlers = {
    async GET(_req, ctx) {
        const { id } = ctx.params;
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data: Character = await res.json();
        return ctx.render({ character: data });
    },
};

export default function CharacterPage({ data }: PageProps<{ character: Character }>) {
    const c = data.character;
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
            <h2>{c.name}</h2>
            <img src={c.image} alt={c.name} style={{ width: "200px", borderRadius: "1rem" }} />
            <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
                <li><strong>Status:</strong> {c.status}</li>
                <li><strong>Species:</strong> {c.species}</li>
                <li><strong>Gender:</strong> {c.gender}</li>
                <li><strong>Origin:</strong> {c.origin.name}</li>
                <li><strong>Location:</strong> {c.location.name}</li>
            </ul>
            <a href="/" style={{ marginTop: "1rem" }}>Volver</a>
        </div>
    );
}
