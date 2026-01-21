import confetti from 'canvas-confetti';

function handleClick(url) {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    window.open(url, '_blank');
  }, 600);
}
