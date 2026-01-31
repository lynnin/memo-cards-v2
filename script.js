// ===== Firebase SDK（模块化 v9）=====
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ===== Firebase 配置（你刚刚给我的那一段）=====
const firebaseConfig = {
  apiKey: "AIzaSyCjNsWPJTH5f1O4YhM1jJ32UZXvNZfmXIA",
  authDomain: "memo-cards-v2.firebaseapp.com",
  projectId: "memo-cards-v2",
  storageBucket: "memo-cards-v2.firebasestorage.app",
  messagingSenderId: "554627425176",
  appId: "1:554627425176:web:9dfc6e204cc24381bd81ed",
  measurementId: "G-LJDY86DB7W"
};

// ===== 初始化 Firebase =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== DOM 元素 =====
const input = document.getElementById("memoInput");
const addBtn = document.getElementById("addBtn");
const cardsDiv = document.getElementById("cards");

// ===== Firestore 集合 =====
const memosRef = collection(db, "memos");

// ===== 添加 memo =====
addBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  await addDoc(memosRef, {
    text,
    createdAt: serverTimestamp(),
    // 和你 rules 里对应的 key
    secret: "6d4a5fbb293f02d1ebfbb914b8eae6e7d9a0e5e6"
  });

  input.value = "";
});

// ===== 实时读取所有 memo =====
const q = query(memosRef, orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  cardsDiv.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = data.text;
    cardsDiv.appendChild(div);
  });
});

