if (password !== process.env.VITE_ADMIN_PASSWORD) {
  return alert('Acesso negado');
}
