import tshirt from "../assets/t-skjorte.jpg";
import genser from "../assets/genser.jpg";
import caps from "../assets/caps.jpg";

export type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
};

type ProductCardProps = { product: Product };

const nok = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0,
});

const products: Product[] = [
  { id: 1, name: "T-skjorte", img: tshirt, price: 200 },
  { id: 2, name: "Genser", img: genser, price: 300 },
  { id: 3, name: "Caps", img: caps, price: 200 },
  { id: 4, name: "Ølbrikketter (6stk)", img: tshirt, price: 200 },
  { id: 5, name: "Korkåpner", img: genser, price: 100 },
  { id: 6, name: "Cowboyhatt", img: caps, price: 350 },
];

function ProductCard({ product }: ProductCardProps) {
  const { name, img, price } = product;
  return (
    <article className="rounded-2xl border p-5">
      <h2 className="text-lg font-semibold">{name}</h2>

      <div className="mt-3 overflow-hidden rounded-xl">
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="w-full aspect-[4/4] object-cover"
        />
      </div>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <p className="text-base font-medium">{nok.format(price)}</p>
        <button className="btn">Kommer snart</button>
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <main>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
