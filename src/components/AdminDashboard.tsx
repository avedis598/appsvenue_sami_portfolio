import { useState, useEffect, useRef, type FormEvent } from "react";
import { db } from "../lib/firebase";
import { auth, storage, isAuthorizedAdmin } from "../lib/firebaseAdmin";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
}

const MAX_LOGO_BYTES = 5 * 1024 * 1024; // 5 MB

export default function AdminDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    const querySnapshot = await getDocs(collection(db, "clients"));
    setClients(
      querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Client, "id">;
        return { id: docSnap.id, name: data.name, logoUrl: data.logoUrl };
      }),
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isAuthorizedAdmin(user)) {
        if (user) {
          await signOut(auth);
        }
        setAdminUser(null);
        setCheckingAuth(false);
        navigate("/admin/login", { replace: true });
        return;
      }

      setAdminUser(user);
      setCheckingAuth(false);
      try {
        await fetchClients();
      } catch (err) {
        console.error("Failed to fetch clients:", err);
        setError("Unable to load clients list.");
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleAddClient = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length > 200) {
      setError("Please enter a client name (1–200 characters).");
      return;
    }
    if (!file) {
      setError("Please choose a logo image to upload.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed for client logos.");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setError("Logo image must be 5 MB or smaller.");
      return;
    }

    setIsSubmitting(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const uniqueKey = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`;
      const storageRef = ref(storage, `logos/${uniqueKey}`);
      await uploadBytes(storageRef, file, { contentType: file.type });
      const logoUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "clients"), { name: trimmedName, logoUrl });
      setName("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      await fetchClients();
    } catch (err) {
      console.error("Failed to add client:", err);
      setError("Failed to upload logo or save client. Check your permissions and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    setError(null);
    try {
      await deleteDoc(doc(db, "clients", id));
      await fetchClients();
    } catch (err) {
      console.error("Failed to delete client:", err);
      setError("Failed to delete client.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login", { replace: true });
  };

  if (checkingAuth || !adminUser) {
    return (
      <div className="flex items-center justify-center min-h-dvh bg-black text-white font-sans">
        <p className="text-sm uppercase tracking-[0.2em] text-white/70">Verifying access…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-dvh bg-gray-100 font-sans text-gray-900">
      <aside className="w-full md:w-64 bg-black text-white p-6 flex flex-col justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
          <p className="text-xs text-gray-400 break-all mb-6">{adminUser.email}</p>
          <nav aria-label="Admin sections">
            <ul className="space-y-2">
              <li className="font-bold underline">Clients</li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white">
                  View Live Portfolio
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-fit underline text-sm text-gray-400 hover:text-white cursor-pointer"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 sm:p-10">
        <h1 className="text-2xl font-bold mb-6">Manage Clients</h1>

        {error && (
          <p role="alert" className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">
            {error}
          </p>
        )}

        <form onSubmit={handleAddClient} className="bg-white p-6 rounded shadow mb-10 space-y-4 max-w-xl">
          <h2 className="text-lg font-bold">Add New Client</h2>
          <div>
            <label htmlFor="client-name" className="block text-sm font-medium mb-1">
              Client Name
            </label>
            <input
              id="client-name"
              type="text"
              required
              maxLength={200}
              placeholder="e.g. Badra International"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="client-logo" className="block text-sm font-medium mb-1">
              Client Logo (PNG, JPG, SVG, or WebP — max 5 MB)
            </label>
            <input
              ref={fileInputRef}
              id="client-logo"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white font-medium py-2 px-4 rounded w-full hover:bg-gray-800 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Uploading…" : "Add Client"}
          </button>
        </form>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <li key={client.id} className="border border-gray-200 p-4 bg-white rounded flex flex-col justify-between gap-3">
              <div>
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  width={120}
                  height={80}
                  loading="lazy"
                  className="w-24 h-16 object-contain mb-2"
                />
                <p className="font-bold">{client.name}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteClient(client.id)}
                className="w-fit text-red-600 hover:underline text-sm cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
