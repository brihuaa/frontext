import { searchSignal } from "../signals.ts";


export default function SearchBox() {
    return (
        <div className="search-box">
            <h1>Rick and Morty Characters</h1>
            <input
                className="search"
                type="text"
                value={searchSignal.value}
                onInput={(e) => searchSignal.value = (e.target as HTMLInputElement).value}
                placeholder="Buscar personaje..."
            />
            <button
                className="search-btn"
                type="button"
                onClick={() => {/* la búsqueda ya se actualiza con el input */}}
            >
                Buscar
            </button>
        </div>
    );
}