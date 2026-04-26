const friday = (s, p) => {
  if (p !== "robinsoncrusoe") return;
  for (let i = 1; i < p.length; i++) {
    try {
      s = atob(s);
    } catch (e) {
      break;
    }
  }
  return s;
};