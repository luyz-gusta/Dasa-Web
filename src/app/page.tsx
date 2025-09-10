import { Input } from "@/components/Input";

export default function Home() {
  return (
    <section className="flex justify-center items-center w-full h-full min-h-screen">
      <form className="bg-cyan-400 shadow-2xs p-10">
        <h1>StockExpress</h1>
        <Input name="nome" type="text" />
      </form>
    </section>
  );
}
