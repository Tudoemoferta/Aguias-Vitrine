import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/getProducts")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  function go(url) {
    confetti();
    window.open(url, "_blank");
  }

  return (
    <main style={styles.bg}>
      <h1>Águias Vitrine</h1>

      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            <img src={p.image_url} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>

            <strong>
              R$ {p.price}
              {p.discount && (
                <span> (-{p.discount}%)</span>
              )}
            </strong>

            <button onClick={() => go(p.affiliate_url)}>
              Comprar Agora
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "url('/aguia-bg.jpg') center/cover fixed",
    padding: 40
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: 20
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 20
  }
};
