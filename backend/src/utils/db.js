const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readCollection(collection) {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

function writeCollection(collection, data) {
  const filePath = getFilePath(collection);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function findAll(collection, filter = {}) {
  const data = readCollection(collection);
  return data.filter(item => {
    return Object.entries(filter).every(([key, val]) => {
      if (typeof val === 'string') return String(item[key]).toLowerCase().includes(val.toLowerCase());
      return item[key] === val;
    });
  });
}

function findById(collection, id) {
  return readCollection(collection).find(item => item.id === id || item._id === id);
}

function insertOne(collection, doc) {
  const data = readCollection(collection);
  const newDoc = { _id: `${collection}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`, ...doc, createdAt: new Date().toISOString() };
  data.push(newDoc);
  writeCollection(collection, data);
  return newDoc;
}

function updateOne(collection, id, updates) {
  const data = readCollection(collection);
  const idx = data.findIndex(item => item.id === id || item._id === id);
  if (idx === -1) return null;
  data[idx] = { ...data[idx], ...updates, updatedAt: new Date().toISOString() };
  writeCollection(collection, data);
  return data[idx];
}

function deleteOne(collection, id) {
  const data = readCollection(collection);
  const filtered = data.filter(item => item.id !== id && item._id !== id);
  writeCollection(collection, filtered);
  return filtered.length < data.length;
}

module.exports = { readCollection, writeCollection, findAll, findById, insertOne, updateOne, deleteOne };
