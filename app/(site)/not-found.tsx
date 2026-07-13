import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid-lines flex min-h-[100svh] items-center bg-ink">
      <div className="container-x py-32 text-center">
        <p className="font-display text-[110px] font-extrabold leading-none text-gold md:text-[160px]">404</p>
        <h1 className="h-display mt-4 text-3xl text-white md:text-4xl">Bu sayfa projede yok.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          Aradığınız sayfa taşınmış veya hiç çizilmemiş olabilir. Sizi sağlam zemine geri götürelim.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/" className="btn btn-gold"><ArrowLeft size={15} /> Ana Sayfaya Dön</Link>
          <Link href="/iletisim" className="btn btn-ghost-dark">Bize Ulaşın</Link>
        </div>
      </div>
    </section>
  );
}
