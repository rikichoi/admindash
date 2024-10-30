import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="p-4 min-h-screen bg-[#f7fafc]">
        {children}
      </main>
    </>
  );
}
