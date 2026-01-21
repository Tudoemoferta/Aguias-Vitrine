import { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    image_url: "",
    affiliate_url: ""
  });

  async function login() {
    try {
      await axios.post("/api/admin/login", { password });
      setLogged(true);
    } catch {
      alert("Senha incorreta");
    }
  }

  async function addProduct() {
    await axios.post("/api/addProduct", form);
    alert("Produto cadastrado");
  }

  if (!logged) {
    return (
      <div style={styles.login}>
        <h2>Administração</h2>
        <input
          type="password"
          placeholder="Senha do administrador"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={styles.panel}>
      <h1>Painel Admin – Águias Vitrine</h1>

      {Object.keys(form).map(key => (
        <input
          key={key}
          placeholder={key}
          value={form[key]}
          onChange={e =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button onClick={addProduct}>Cadastrar Produto</button>
    </div>
  );
}

const styles = {
  login: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  panel: {
    padding: 40,
    display: "grid",
    gap: 10,
    maxWidth: 600,
    margin: "0 auto"
  }
};
