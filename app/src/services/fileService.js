async function getByName(fileName) {
  return await fetch(`/api/files/data?fileName=${fileName}`);
}

async function getAll() {
  return await fetch(`/api/files/data`);
}

export { getByName, getAll };