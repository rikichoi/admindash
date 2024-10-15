import Image from "next/image";
import { User } from "./lib/types";

async function getData(): Promise<User[]> {
  "use server";

  const res = await fetch("http://localhost:5000/api/users");
  return await res.json();
}

export default async function Home() {
  const users = await getData();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {users.map((user, index: number) => (
            <li key={index} className="mb-2">
              <span>email: {user.email}</span>{" "}
              <span>username: {user.username}</span>{" "}
              <span>passwordHashed: {user.passwordHashed}</span>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
