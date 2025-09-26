// src/BusinessDemo.js
import React, { useEffect, useState } from "react";

/*
  BusinessDemo.js
  - Single-file demo (no backend)
  - Inline styles, localStorage persistence
  - Roles: admin / customer
  - Features: products (CRUD), shop & cart, orders, bookings, notifications, chatbot
*/

const STORAGE_KEY = "business_demo_v1";

/* ---------- initial demo data ---------- */
const initialStore = {
  users: [
    { id: "u_admin", email: "admin@biz.com", password: "1234", role: "admin", name: "Admin" },
    { id: "u_user", email: "user@biz.com", password: "1234", role: "customer", name: "Customer" },
  ],
  products: [
    { id: "p1", name: "Handmade Mug", priceCents: 2500, inventory: 10, image: "", description: "Ceramic mug, 350ml." },
    { id: "p2", name: "Local Coffee Beans (500g)", priceCents: 1200, inventory: 25, image: "", description: "Medium roast." },
    { id: "p3", name: "Consultation (30m)", priceCents: 5000, inventory: 9999, image: "", description: "Business consultation slot." },
  ],
  orders: [], // {id, items:[{productId, qty}], totalCents, customerEmail, status, createdAt}
  bookings: [], // {id, service, customerName, customerEmail, startISO, endISO, status, createdAt}
  notifications: [], // {id, text, createdAt, read}
};

/* ---------- localStorage helpers ---------- */
function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialStore;
    const parsed = JSON.parse(raw);
    // merge to keep initial shapes if adding new fields later
    return { ...initialStore, ...parsed };
  } catch (e) {
    console.error("Failed to load store", e);
    return initialStore;
  }
}
function saveStore(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

/* ---------- inline styles ---------- */
const S = {
  app: { fontFamily: "Inter, Arial, sans-serif", color: "#0f172a", padding: 12 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#0369a1", color: "white", borderRadius: 8 },
  main: { display: "flex", gap: 16, marginTop: 12 },
  left: { flex: 1, minWidth: 300 },
  right: { width: 340 },
  card: { background: "white", padding: 14, borderRadius: 8, boxShadow: "0 6px 18px rgba(2,6,23,0.06)", marginBottom: 12 },
  btn: { background: "#0369a1", color: "white", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" },
  danger: { background: "#ef4444", color: "white", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer" },
  input: { padding: 8, borderRadius: 6, border: "1px solid #e6eef6", width: "100%" },
  small: { fontSize: 13, color: "#475569" },
  notifBtn: { background: "transparent", border: "none", color: "white", cursor: "pointer", position: "relative", fontSize: 18 },
  notifCount: { position: "absolute", top: -8, right: -8, background: "#ef4444", color: "white", width: 20, height: 20, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 },
  chatToggle: { position: "fixed", left: 24, bottom: 24, width: 56, height: 56, borderRadius: 28, background: "#0369a1", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 20px rgba(3,105,161,0.2)" },
  chatWindow: { position: "fixed", left: 24, bottom: 94, width: 320, height: 360, background: "white", borderRadius: 10, boxShadow: "0 8px 30px rgba(2,6,23,0.12)", display: "flex", flexDirection: "column", overflow: "hidden" },
  chatHeader: { background: "#0369a1", color: "white", padding: 8, display: "flex", justifyContent: "space-between", alignItems: "center" },
  chatBody: { padding: 10, flex: 1, overflowY: "auto" },
  chatInputRow: { display: "flex", gap: 8, padding: 8, borderTop: "1px solid #eef2f7" },
};

/* ---------- utility ---------- */
const uid = (pref = "") => pref + Math.random().toString(36).slice(2, 9);
const todayISO = () => new Date().toISOString().slice(0, 10);

/* ---------- main component ---------- */
export default function BusinessDemo() {
  const [store, setStore] = useState(() => loadStore());
  const [user, setUser] = useState(null); // {email, role, name}
  const [view, setView] = useState("home"); // home, shop, cart, orders, products, bookings
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem(`${STORAGE_KEY}_cart`) || "[]"));
  const [notifOpen, setNotifOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ id: uid("m_"), from: "bot", text: "Hi — demo assistant. Type 'menu' for options." }]);

  useEffect(() => saveStore(store), [store]);
  useEffect(() => localStorage.setItem(`${STORAGE_KEY}_cart`, JSON.stringify(cart)), [cart]);

  /* ---------- auth ---------- */
  function login(email, password) {
    const u = store.users.find(x => x.email === email && x.password === password);
    if (!u) return alert("Invalid credentials");
    setUser(u);
    setView("home");
    pushNotification(`${u.name} signed in`);
  }
  function logout() {
    setUser(null);
    setView("home");
    pushNotification("Signed out");
  }

  /* ---------- notifications ---------- */
  function pushNotification(text) {
    const n = { id: uid("n_"), text, createdAt: Date.now(), read: false };
    setStore(prev => ({ ...prev, notifications: [...prev.notifications, n] }));
  }
  function markAllNotifsRead() {
    setStore(prev => ({ ...prev, notifications: prev.notifications.map(n => ({ ...n, read: true })) }));
  }

  /* ---------- products (admin) ---------- */
  function addProduct({ name, priceCents, inventory, description }) {
    const p = { id: uid("p_"), name, priceCents: Number(priceCents || 0), inventory: Number(inventory || 0), description: description || "" };
    setStore(prev => ({ ...prev, products: [...prev.products, p] }));
    pushNotification(`Product added: ${name}`);
  }
  function removeProduct(productId) {
    setStore(prev => ({ ...prev, products: prev.products.filter(p => p.id !== productId) }));
    pushNotification("Product removed");
  }

  /* ---------- cart & orders ---------- */
  function addToCart(productId, qty = 1) {
    setCart(prev => {
      const found = prev.find(i => i.productId === productId);
      if (found) return prev.map(i => i.productId === productId ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { productId, qty }];
    });
    pushNotification("Added to cart");
  }
  function updateCart(productId, qty) {
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, qty } : i).filter(i => i.qty > 0));
  }
  function clearCart() { setCart([]); }

  function checkout(customerName, customerEmail) {
    if (!cart.length) return alert("Cart empty");
    // compute total
    let total = 0;
    const items = cart.map(ci => {
      const p = store.products.find(x => x.id === ci.productId);
      const price = p ? p.priceCents : 0;
      total += price * ci.qty;
      return { productId: ci.productId, qty: ci.qty, priceCents: price };
    });
    const order = { id: uid("o_"), items, totalCents: total, customerEmail, customerName, status: "paid", createdAt: Date.now() };
    setStore(prev => ({ ...prev, orders: [...prev.orders, order] }));
    clearCart();
    pushNotification(`Order placed - ${customerName} - $${(total/100).toFixed(2)}`);
    setView("orders");
  }

  /* ---------- bookings ---------- */
  function makeBooking({ service, customerName, customerEmail, startISO, endISO }) {
    // check conflicts: overlapping start/end for same service
    const conflict = store.bookings.find(b => b.service === service && !(b.endISO <= startISO || b.startISO >= endISO));
    if (conflict) return { ok: false, error: "Slot not available" };
    const booking = { id: uid("b_"), service, customerName, customerEmail, startISO, endISO, status: "confirmed", createdAt: Date.now() };
    setStore(prev => ({ ...prev, bookings: [...prev.bookings, booking] }));
    pushNotification(`Booking confirmed for ${customerName} (${service})`);
    return { ok: true, booking };
  }

  /* ---------- helpers for UI ---------- */
  const unread = store.notifications.filter(n => !n.read).length;
  const myOrders = user ? store.orders.filter(o => o.customerEmail === user.email) : [];
  const customerRecord = user && user.role === "customer" ? user : null;

  /* ---------- Chatbot (simple menu) ---------- */
  function chatSend(text) {
    if (!text) return;
    const userMsg = { id: uid("m_"), from: "user", text };
    setChatMessages(m => [...m, userMsg]);
    const cmd = text.trim().toLowerCase();

    if (cmd === "menu" || cmd === "m") {
      botReply("Menu: 1-Shop 2-Bookings 3-Orders 4-Help");
      return;
    }
    if (cmd === "1" || cmd === "shop") { setView("shop"); botReply("Opening shop"); return; }
    if (cmd === "2" || cmd === "bookings") { setView("book"); botReply("Opening booking page"); return; }
    if (cmd === "3" || cmd === "orders") { setView("orders"); botReply("Showing your orders"); return; }
    if (cmd === "4" || cmd === "help") { botReply("Type 'menu' or '1'..'4'"); return; }
    botReply("Sorry, unknown command. Type 'menu' to see options.");
  }
  function botReply(text) { const m = { id: uid("m_"), from: "bot", text }; setChatMessages(p => [...p, m]); }

  /* ---------- UI components ---------- */
  return (
    <div style={S.app}>
      <header style={S.header}>
        <div>
          <strong>VictorLabs — Business Demo</strong>
          <div style={{ fontSize: 12 }}>Frontend-only demo (localStorage)</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={S.notifBtn} title="Notifications" onClick={() => setNotifOpen(v => !v)}>🔔</button>
            {unread > 0 && <div style={S.notifCount}>{unread}</div>}
            {notifOpen && (
              <div style={{ position: "absolute", right: 20, top: 72, width: 320, zIndex: 60 }}>
                <div style={S.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>Notifications</strong>
                    <div>
                      <button style={{ ...S.btn, marginRight: 6 }} onClick={() => markAllNotifsRead()}>Mark read</button>
                      <button style={{ ...S.danger }} onClick={() => setStore(prev => ({ ...prev, notifications: [] }))}>Clear</button>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, maxHeight: 240, overflowY: "auto" }}>
                    {store.notifications.slice().reverse().map(n => (
                      <div key={n.id} style={{ padding: 8, borderBottom: "1px solid #eef2f7" }}>
                        <div style={{ fontSize: 14 }}>{n.text}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{new Date(n.createdAt).toLocaleString()}</div>
                      </div>
                    ))}
                    {store.notifications.length === 0 && <div style={{ color: "#64748b" }}>No notifications</div>}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ color: "white", fontWeight: 600 }}>{user ? `${user.name} (${user.role})` : "Not signed in"}</div>
          {user ? <button style={S.btn} onClick={() => logout()}>Logout</button> : null}
        </div>
      </header>

      <div style={S.main}>
        <div style={S.left}>
          {/* Auth / Login */}
          {!user && (
            <div style={S.card}>
              <h3>Sign in</h3>
              <AuthCard onLogin={login} />
            </div>
          )}

          {/* Home / Shop / Products / Book / Orders */}
          {user && view === "home" && (
            <div style={S.card}>
              <h3>Welcome {user.name}</h3>
              <div style={S.small}>Role: {user.role}</div>
              <div style={{ marginTop: 10 }}>
                <button style={S.btn} onClick={() => setView("shop")}>Go to shop</button>{" "}
                <button style={S.btn} onClick={() => setView("book")}>Make a booking</button>{" "}
                <button style={S.btn} onClick={() => setView("orders")}>My orders</button>
                {user.role === "admin" && <button style={{ ...S.btn, marginLeft: 8 }} onClick={() => setView("products")}>Manage products</button>}
              </div>
            </div>
          )}

          {view === "shop" && (
            <div style={S.card}>
              <h3>Shop</h3>
              <div style={{ display: "grid", gap: 12 }}>
                {store.products.map(p => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.name}</div>
                      <div style={{ color: "#6b7280" }}>{p.description}</div>
                      <div style={{ marginTop: 6 }}>${(p.priceCents/100).toFixed(2)} • stock: {p.inventory}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <button style={S.btn} onClick={() => addToCart(p.id, 1)}>Add to cart</button>
                      <button style={{ ...S.danger, fontSize: 12 }} onClick={() => { setCart(c => [...c, { productId: p.id, qty: 1 }]); }}>Quick buy</button>
                    </div>
                  </div>
                ))}
                {store.products.length === 0 && <div style={{ color: "#64748b" }}>No products</div>}
              </div>
            </div>
          )}

          {view === "cart" && (
            <div style={S.card}>
              <h3>Your Cart</h3>
              {cart.length === 0 ? <div style={{ color: "#64748b" }}>Cart empty</div> : (
                <div>
                  {cart.map(ci => {
                    const p = store.products.find(x => x.id === ci.productId) || { name: "Unknown", priceCents: 0 };
                    return (
                      <div key={ci.productId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>{p.name}</div>
                          <div style={{ color: "#64748b" }}>${(p.priceCents/100).toFixed(2)} x {ci.qty}</div>
                        </div>
                        <div>
                          <input type="number" min={0} value={ci.qty} onChange={(e) => updateCart(ci.productId, Number(e.target.value))} style={{ width: 60, padding: 6 }} />
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ marginTop: 8 }}>
                    <strong>Total:</strong> ${(cart.reduce((s,ci) => {
                      const p = store.products.find(x => x.id === ci.productId);
                      return s + (p ? p.priceCents * ci.qty : 0);
                    }, 0)/100).toFixed(2)}
                  </div>
                  <CheckoutCard onCheckout={(name,email) => checkout(name,email)} />
                </div>
              )}
            </div>
          )}

          {view === "orders" && (
            <div style={S.card}>
              <h3>Orders</h3>
              <div style={{ color: "#64748b", marginBottom: 8 }}>{user.role === "admin" ? "All orders" : "Your orders"}</div>
              <div>
                {(user.role === "admin" ? store.orders.slice().reverse() : myOrders.slice().reverse()).map(o => (
                  <div key={o.id} style={{ borderBottom: "1px solid #eef2f7", padding: 10 }}>
                    <div style={{ fontWeight: 700 }}>Order {o.id} • ${ (o.totalCents/100).toFixed(2) } • {o.status}</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>{new Date(o.createdAt).toLocaleString()}</div>
                    <div style={{ marginTop: 6 }}>
                      {o.items.map(it => {
                        const p = store.products.find(x => x.id === it.productId) || { name: "Unknown" };
                        return <div key={it.productId} style={{ fontSize: 14 }}>{p.name} × {it.qty}</div>;
                      })}
                    </div>
                  </div>
                ))}
                {(user.role === "admin" ? store.orders.length === 0 : myOrders.length === 0) && <div style={{ color: "#64748b" }}>No orders found</div>}
              </div>
            </div>
          )}

          {view === "book" && (
            <div style={S.card}>
              <h3>Make a Booking</h3>
              <BookingCard
                products={store.products}
                onBook={(payload) => {
                  const res = makeBooking(payload);
                  if (!res.ok) alert(res.error); else { alert("Booked"); setView("bookings"); }
                }}
                user={user}
              />
            </div>
          )}

          {view === "bookings" && (
            <div style={S.card}>
              <h3>Bookings</h3>
              <div style={{ color: "#64748b", marginBottom: 8 }}>{user.role === "admin" ? "All bookings" : "Your bookings"}</div>
              {(user.role === "admin" ? store.bookings : store.bookings.filter(b => b.customerEmail === user.email)).slice().reverse().map(b => (
                <div key={b.id} style={{ padding: 8, borderBottom: "1px solid #eef2f7" }}>
                  <div style={{ fontWeight: 700 }}>{b.service} — {b.customerName}</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>{new Date(b.startISO).toLocaleString()} → {new Date(b.endISO).toLocaleString()}</div>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Status: {b.status}</div>
                </div>
              ))}
              {store.bookings.length === 0 && <div style={{ color: "#64748b" }}>No bookings</div>}
            </div>
          )}

          {view === "products" && user?.role === "admin" && (
            <div style={S.card}>
              <h3>Manage Products</h3>
              <ProductAdmin products={store.products} onAdd={(p) => addProduct(p)} onRemove={(id) => removeProduct(id)} />
            </div>
          )}
        </div>

        {/* RIGHT: quick panels */}
        <div style={S.right}>
          <div style={S.card}>
            <h4>Cart</h4>
            <div style={{ minHeight: 60 }}>
              {cart.length === 0 ? <div style={{ color: "#64748b" }}>Cart empty</div> : cart.map(ci => {
                const p = store.products.find(x => x.id === ci.productId) || { name: "Unknown", priceCents: 0 };
                return <div key={ci.productId} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>{p.name} × {ci.qty} <div>${((p.priceCents*ci.qty)/100).toFixed(2)}</div></div>;
              })}
            </div>
            <div style={{ marginTop: 8 }}>
              <button style={S.btn} onClick={() => setView("cart")}>Open Cart</button>
            </div>
          </div>

          <div style={S.card}>
            <h4>Quick actions</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={S.btn} onClick={() => setView("shop")}>Shop</button>
              <button style={S.btn} onClick={() => setView("book")}>Book</button>
              <button style={S.btn} onClick={() => setView("orders")}>Orders</button>
              {user?.role === "admin" && <button style={S.btn} onClick={() => setView("products")}>Products</button>}
            </div>
          </div>

          <div style={S.card}>
            <h4>Notifications</h4>
            <div style={{ maxHeight: 180, overflowY: "auto" }}>
              {store.notifications.slice().reverse().map(n => (
                <div key={n.id} style={{ padding: 8, borderBottom: "1px solid #eef2f7" }}>
                  <div>{n.text}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{new Date(n.createdAt).toLocaleString()}</div>
                </div>
              ))}
              {store.notifications.length === 0 && <div style={{ color: "#64748b" }}>No notifications</div>}
            </div>
          </div>

          <div style={S.card}>
            <h4>Demo info</h4>
            <div style={S.small}>Admin: admin@biz.com / 1234</div>
            <div style={S.small}>Customer: user@biz.com / 1234</div>
            <div style={{ marginTop: 8 }}>
              <button style={{ ...S.btn, background: "#10b981" }} onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(`${STORAGE_KEY}_cart`);
                setStore(loadStore());
                setCart([]);
                pushNotification("Demo reset");
              }}>Reset demo</button>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div style={S.chatToggle} title="Assistant" onClick={() => setChatOpen(v => !v)}>💬</div>
      {chatOpen && (
        <div style={S.chatWindow}>
          <div style={S.chatHeader}>
            <div>Assistant</div>
            <div>
              <button style={{ ...S.btn, padding: "6px 8px" }} onClick={() => { setChatMessages([{ id: uid("m_"), from: "bot", text: "Hi — demo assistant. Type 'menu' for options." }]); }}>Reset</button>
              <button style={{ ...S.danger, padding: "6px 8px", marginLeft: 8 }} onClick={() => setChatOpen(false)}>Close</button>
            </div>
          </div>
          <div style={S.chatBody}>
            {chatMessages.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.from === "bot" ? "flex-start" : "flex-end", marginBottom: 8 }}>
                <div style={{ padding: 8, borderRadius: 8, background: m.from === "bot" ? "#eff6ff" : "#0369a1", color: m.from === "bot" ? "#0f172a" : "white", maxWidth: "78%" }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div style={S.chatInputRow}>
            <input placeholder="Type 'menu' or an option..." style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #e6eef6" }} onKeyDown={(e) => {
              if (e.key === "Enter") { chatSend(e.target.value); e.target.value = ""; }
            }} />
            <button style={S.btn} onClick={() => {
              const inp = document.querySelector('input[placeholder="Type \'menu\' or an option..."]');
              if (inp) { chatSend(inp.value); inp.value = ""; }
            }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- subcomponents ---------- */

function AuthCard({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 8, borderRadius: 6 }} />
      <input placeholder="Password" type="password" value={pw} onChange={e => setPw(e.target.value)} style={{ padding: 8, borderRadius: 6 }} />
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ background: "#0369a1", color: "white", padding: "8px 12px", borderRadius: 6 }} onClick={() => onLogin(email.trim(), pw)}>Sign in</button>
        <button style={{ padding: "8px 12px", borderRadius: 6 }} onClick={() => { setEmail("admin@biz.com"); setPw("1234"); }}>Fill Admin</button>
        <button style={{ padding: "8px 12px", borderRadius: 6 }} onClick={() => { setEmail("user@biz.com"); setPw("1234"); }}>Fill Customer</button>
      </div>
    </div>
  );
}

function ProductAdmin({ products, onAdd, onRemove }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Price (e.g. 25.00)" value={price} onChange={e => setPrice(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} style={{ padding: 8 }} />
      </div>
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} style={{ padding: 8, marginBottom: 8 }} />
      <button style={{ ...S.btn }} onClick={() => {
        if (!name || !price) return alert("Name & price required");
        onAdd({ name, priceCents: Math.round(Number(price) * 100), inventory: Number(stock || 0), description: desc });
        setName(""); setPrice(""); setStock(""); setDesc("");
      }}>Add product</button>

      <div style={{ marginTop: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eef2f7" }}><th>Name</th><th>Price</th><th>Stock</th><th>Action</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: 8 }}>{p.name}</td>
                <td style={{ padding: 8 }}>${(p.priceCents/100).toFixed(2)}</td>
                <td style={{ padding: 8 }}>{p.inventory}</td>
                <td style={{ padding: 8 }}><button style={{ ...S.danger }} onClick={() => onRemove(p.id)}>Remove</button></td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={4} style={{ padding: 8, color: "#64748b" }}>No products</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CheckoutCard({ onCheckout }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div style={{ marginTop: 12 }}>
      <h4>Checkout (simulated)</h4>
      <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} style={{ padding: 8, width: "100%", marginBottom: 8 }} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 8, width: "100%", marginBottom: 8 }} />
      <div style={{ display: "flex", gap: 8 }}>
        <button style={S.btn} onClick={() => onCheckout(name || "Guest", email || "guest@example.com")}>Pay (simulate)</button>
      </div>
    </div>
  );
}

function BookingCard({ products, onBook, user }) {
  const [service, setService] = useState(products[2]?.name || "Consultation");
  const [date, setDate] = useState(todayISO());
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <select value={service} onChange={e => setService(e.target.value)} style={{ padding: 8 }}>
        {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
      </select>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: 8 }} />
        <input type="time" value={start} onChange={e => setStart(e.target.value)} style={{ padding: 8 }} />
        <input type="time" value={end} onChange={e => setEnd(e.target.value)} style={{ padding: 8 }} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={S.btn} onClick={() => {
          const startISO = `${date}T${start}:00`;
          const endISO = `${date}T${end}:00`;
          const payload = { service, customerName: user?.name || "Guest", customerEmail: user?.email || "guest@example.com", startISO, endISO };
          const res = onBook(payload);
          if (res && res.ok) alert("Booked!");
        }}>Book</button>
      </div>
    </div>
  );
}
