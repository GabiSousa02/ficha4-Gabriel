import { useEffect, useState } from "react";
import Card from "./Card.jsx";
 
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [randomCard, setRandomCard] = useState(null);
  const [sorted, setSorted] = useState(false);
 
  // Buscar cartas ao servidor e filtrar por tipo
  useEffect(() => {
    setLoading(true);
    setError("");
 
    const url =
      filter === "Todas"
        ? "http://localhost:3000/api/cartas"
        : `http://localhost:3000/api/cartas?tipo=${encodeURIComponent(filter)}`;
 
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP ${res.status}`);
        }
 
        return res.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);
 
  // Pesquisa pelo nome
  let visible = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );
 
  // Ordenar por ataque
  if (sorted) {
    visible = [...visible].sort(
      (a, b) => b.attack - a.attack
    );
  }
 
  // EXTRA 1 - Escolher carta aleatória através da API
  function pickRandom() {
    fetch("http://localhost:3000/api/cartas/aleatoria")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP ${res.status}`);
        }
 
        return res.json();
      })
      .then((data) => {
        setRandomCard(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }
 
  // Estado de carregamento
  if (loading) {
    return <h2>A carregar...</h2>;
  }
 
  // Estado de erro
  if (error) {
    return <h2>Erro ao carregar cartas: {error}</h2>;
  }
 
  return (
    <main>
      <h1>A minha coleção</h1>
 
      <p>
        Tenho {cards.length} cartas · a mostrar {visible.length}
      </p>
 
      <div>
        <button onClick={() => setFilter("Todas")}>
          Todas
        </button>
 
        <button onClick={() => setFilter("Criatura")}>
          Só criaturas
        </button>
 
        <button onClick={() => setFilter("Feitiço")}>
          Só feitiços
        </button>
 
        <button onClick={() => setSorted(!sorted)}>
          {sorted ? "Ordem original" : "Ordenar por ataque"}
        </button>
      </div>
 
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Procurar pelo nome..."
      />
 
      {visible.length === 0 ? (
        <p>Nenhuma carta corresponde.</p>
      ) : (
        <ul>
          {visible.map((card) => (
            <Card key={card.name} {...card} />
          ))}
        </ul>
      )}
 
      <h2>Carta à sorte</h2>
 
      <button onClick={pickRandom}>
        Escolher outra
      </button>
 
      {randomCard && (
        <p>
          <b>{randomCard.name}</b> — {randomCard.type} · ataque{" "}
          {randomCard.attack} · defesa {randomCard.defense}
        </p>
      )}
    </main>
  );
}
 
export default App;