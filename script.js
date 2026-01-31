import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔐 你的私钥
const WRITE_KEY = "6d4a5fbb293f02d1ebfbb914b8eae6e7d9a0e5e6";

// 🔥 Firebase 配置（从 Firebase 项目设置里复制）
const firebaseConfig = {
  apiKey: "你的 apiKey",
  authDomain: "memo-cards-v2.firebaseapp.com",
  projectId: "memo-cards-v2",
};

// 初始化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const memosRef = collection(db, "memos");

// DOM
const card = document.getElementById("card");
const input = document.getElementById("input");

async function loadRandom() {
  const snap = await getDocs(memosRef);
  const docs = snap.docs;
  if (docs.length === 0) {
    card.textContent = "No memos yet.";
    return;
  }
  const random = docs[Math.floor(Math.random() * docs.length)];
  card.textContent = random.data().text;
}

async function loadAll() {
  const snap = await getDocs(memosRef);
  card.innerHTML = snap.docs.map(d => `• ${d.data().text}`).join("<br><br>");
}

async function addMemo() {
  if (!input.value.trim()) return;
  await addDoc(memosRef, {
    text: input.value,
    key: WRITE_KEY,
    createdAt: serverTimestamp()
  });
  input.value = "";
  loadRandom();
}

document.getElementById("randomBtn").onclick = loadRandom;
document.getElementById("allBtn").onclick = loadAll;
document.getElementById("addBtn").onclick = addMemo;

loadRandom();
