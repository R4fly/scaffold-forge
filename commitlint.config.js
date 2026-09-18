module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Aturan opsional: Memaksa scope untuk tipe tertentu (jika diperlukan di masa depan)
    // 'scope-enum': [2, 'always', ['core', 'cli', 'tui', 'migration', 'ci']],
  }
};