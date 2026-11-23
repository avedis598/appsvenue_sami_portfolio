import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, isAuthorizedAdmin } from "../lib/firebaseAdmin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isAuthorizedAdmin(user)) {
        navigate("/admin/dashboard", { replace: true });
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogin = async () => {
    setError(null);
    setIsSigningIn(true);
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      if (!isAuthorizedAdmin(credential.user)) {
        await signOut(auth);
        setError("Access denied. Please sign in with the authorized administrator Google account.");
        return;
      }
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error("Admin login failed:", err);
      setError("Google sign-in failed or was cancelled. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-dvh px-6 bg-black text-white font-sans">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl font-serif font-bold">Admin Login</h1>
        {error && (
          <p role="alert" className="text-sm text-red-400 bg-red-950/60 border border-red-800 rounded p-3">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={handleLogin}
          disabled={isSigningIn}
          className="w-full bg-white text-black font-medium py-3 px-6 rounded hover:bg-gray-200 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {isSigningIn ? "Signing in…" : "Sign in with Google"}
        </button>
        <div>
          <Link to="/" className="text-sm text-white/60 hover:text-white underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
