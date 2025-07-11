import { searchSignal } from "../signals.ts";


export default function SearchBox() {
    return (
        <div className="search-box">
            <input
                className="search"
                type="text"
                value={searchSignal.value}
                onInput={(e) => searchSignal.value = (e.target as HTMLInputElement).value}
                placeholder="Buscar personaje..."
            />
        </div>
    );
}