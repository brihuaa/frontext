import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function Layout(props: PageProps) {
    return (
        <div className="layout">
            <Header />
            <props.Component />
        </div>
    );
}