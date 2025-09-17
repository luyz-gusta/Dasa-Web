import Plus from "@/components/icons/Plus";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex justify-center items-center bg-background px-7 w-full">
        <div className="bg-cyan-400 w-[200px] h-full">.</div>
        <span className="text-amber-600">
          <Plus />
        </span>
      </header>
      {children}
    </div>
  );
}
