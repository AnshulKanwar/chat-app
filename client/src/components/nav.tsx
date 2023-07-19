import Link from "next/link";

export default function Nav() {
  return (
    <nav className="px-10 py-5">
      <div>
        <Link href="/">
          <h1 className="text-3xl font-bold">Chat App</h1>
        </Link>
      </div>
    </nav>
  );
}
