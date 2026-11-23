import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const q = collection(db, "clients");
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setClients(
          snapshot.docs.map((docSnap) => {
            const data = docSnap.data() as Omit<Client, "id">;
            return { id: docSnap.id, name: data.name, logoUrl: data.logoUrl };
          }),
        );
      },
      (error) => {
        console.error("Failed to subscribe to clients collection:", error);
      },
    );
    return unsubscribe;
  }, []);

  if (clients.length === 0) {
    return null;
  }

  return (
    <section id="clients" className="px-6 sm:px-12 md:px-20 py-12 md:py-16 bg-black/[0.02]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl uppercase tracking-[0.2em] mb-10">Trusted by Industry Leaders</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {clients.map((client) => (
            <li
              key={client.id}
              className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 sm:p-8 flex items-center justify-center aspect-[3/2] mt-2 transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={client.logoUrl}
                alt={client.name}
                width={240}
                height={160}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
