"use client";

import { useEffect, useState } from "react";

import {
  homeGallerySections,
  type AdminViewer,
  type ContactMessage,
  type FurnitureItem,
  type HomeGallerySectionKey,
  type HomeListing,
} from "@/app/lib/cms-types";

type AuthMode = "login" | "signup" | "verify";
type Tab = "homes" | "furniture" | "contacts";
type Notice = { type: "success" | "error" | "info"; message: string } | null;

function createEmptyHomeGalleryFiles(): Record<HomeGallerySectionKey, File[]> {
  return {
    livingRoom: [],
    bedroom: [],
    toilet: [],
  };
}

function createEmptyHomeForm() {
  return {
    title: "",
    type: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    parkingSpaces: "",
    imageFile: null as File | null,
    galleryFiles: createEmptyHomeGalleryFiles(),
  };
}

const emptyFurnitureForm = {
  name: "",
  category: "",
  description: "",
  price: "",
  imageFile: null as File | null,
};

export default function AdminConsole() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [activeTab, setActiveTab] = useState<Tab>("homes");
  const [viewer, setViewer] = useState<AdminViewer | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [submittingAuth, setSubmittingAuth] = useState(false);
  const [savingHome, setSavingHome] = useState(false);
  const [savingFurniture, setSavingFurniture] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pendingSignupEmail, setPendingSignupEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [homeForm, setHomeForm] = useState(createEmptyHomeForm);
  const [homeFileKey, setHomeFileKey] = useState(0);
  const [editingHomeId, setEditingHomeId] = useState<number | null>(null);
  const [furnitureForm, setFurnitureForm] = useState(emptyFurnitureForm);
  const [furnitureFileKey, setFurnitureFileKey] = useState(0);
  const [editingFurnitureId, setEditingFurnitureId] = useState<number | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [homes, setHomes] = useState<HomeListing[]>([]);
  const [furniture, setFurniture] = useState<FurnitureItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const editingHome = homes.find((home) => home.id === editingHomeId) ?? null;

  useEffect(() => {
    void loadSession();
  }, []);

  async function loadSession() {
    setCheckingSession(true);

    try {
      const response = await fetch("/api/admin/auth/session", { cache: "no-store" });

      if (!response.ok) {
        setViewer(null);
        return;
      }

      const data = await response.json();
      setViewer(data.viewer);
      await loadDashboard();
    } finally {
      setCheckingSession(false);
    }
  }

  async function loadDashboard() {
    setLoadingDashboard(true);

    try {
      const [homesResponse, furnitureResponse, contactResponse] = await Promise.all([
        fetch("/api/admin/homes", { cache: "no-store" }),
        fetch("/api/admin/furniture", { cache: "no-store" }),
        fetch("/api/admin/contact-messages", { cache: "no-store" }),
      ]);

      if (
        homesResponse.status === 401 ||
        furnitureResponse.status === 401 ||
        contactResponse.status === 401
      ) {
        setViewer(null);
        return;
      }

      const [homesData, furnitureData, contactData] = await Promise.all([
        homesResponse.json(),
        furnitureResponse.json(),
        contactResponse.json(),
      ]);

      setHomes(homesData.homes ?? []);
      setFurniture(furnitureData.furniture ?? []);
      setMessages(contactData.messages ?? []);
    } finally {
      setLoadingDashboard(false);
    }
  }

  function resetHomeForm() {
    setHomeForm(createEmptyHomeForm());
    setEditingHomeId(null);
    setHomeFileKey((value) => value + 1);
  }

  function resetFurnitureForm() {
    setFurnitureForm(emptyFurnitureForm);
    setEditingFurnitureId(null);
    setFurnitureFileKey((value) => value + 1);
  }

  async function submitJson(url: string, body: object, method = "POST") {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Request failed.");
    }

    return data;
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittingAuth(true);
    setNotice(null);

    try {
      const data = await submitJson("/api/admin/auth/session", loginForm);
      setViewer(data.viewer);
      setLoginForm({ email: "", password: "" });
      setNotice({ type: "success", message: "Login successful." });
      await loadDashboard();
    } catch (error) {
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "Login failed.",
      });
    } finally {
      setSubmittingAuth(false);
    }
  }

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittingAuth(true);
    setNotice(null);

    try {
      const data = await submitJson("/api/admin/auth/signup/request-code", signupForm);
      setPendingSignupEmail(data.email);
      setAuthMode("verify");
      setNotice({
        type: data.deliveryMethod === "preview" ? "info" : "success",
        message:
          data.deliveryMethod === "preview"
            ? `SMTP not configured yet. Local preview code: ${data.previewCode}.`
            : `Verification code sent to ${data.email}.`,
      });
    } catch (error) {
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "Signup failed.",
      });
    } finally {
      setSubmittingAuth(false);
    }
  }

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittingAuth(true);
    setNotice(null);

    try {
      const data = await submitJson("/api/admin/auth/signup/verify", {
        email: pendingSignupEmail,
        code: verificationCode,
      });
      setViewer(data.viewer);
      setVerificationCode("");
      setNotice({ type: "success", message: "Admin account created successfully." });
      await loadDashboard();
    } catch (error) {
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "Verification failed.",
      });
    } finally {
      setSubmittingAuth(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/session", { method: "DELETE" });
    setViewer(null);
    setHomes([]);
    setFurniture([]);
    setMessages([]);
    setAuthMode("login");
    setNotice({ type: "success", message: "Logged out successfully." });
  }

  async function handleHomeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingHome(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("title", homeForm.title);
      formData.append("type", homeForm.type);
      formData.append("description", homeForm.description);
      formData.append("price", homeForm.price);
      formData.append("location", homeForm.location);
      formData.append("bedrooms", homeForm.bedrooms);
      formData.append("bathrooms", homeForm.bathrooms);
      formData.append("toilets", homeForm.toilets);
      formData.append("parkingSpaces", homeForm.parkingSpaces);

      if (homeForm.imageFile) {
        formData.append("image", homeForm.imageFile);
      }

      homeGallerySections.forEach((section) => {
        homeForm.galleryFiles[section.key].forEach((file) => {
          formData.append(section.fieldName, file);
        });
      });

      const response = await fetch(
        editingHomeId ? `/api/admin/homes/${editingHomeId}` : "/api/admin/homes",
        {
          method: editingHomeId ? "PATCH" : "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to save listing.");
      }

      resetHomeForm();
      setNotice({
        type: "success",
        message: editingHomeId ? "Home listing updated." : "Home listing created.",
      });
      await loadDashboard();
    } catch (error) {
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to save listing.",
      });
    } finally {
      setSavingHome(false);
    }
  }

  async function handleFurnitureSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingFurniture(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("name", furnitureForm.name);
      formData.append("category", furnitureForm.category);
      formData.append("description", furnitureForm.description);
      formData.append("price", furnitureForm.price);

      if (furnitureForm.imageFile) {
        formData.append("image", furnitureForm.imageFile);
      }

      const response = await fetch(
        editingFurnitureId
          ? `/api/admin/furniture/${editingFurnitureId}`
          : "/api/admin/furniture",
        {
          method: editingFurnitureId ? "PATCH" : "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to save furniture item.");
      }

      resetFurnitureForm();
      setNotice({
        type: "success",
        message: editingFurnitureId ? "Furniture item updated." : "Furniture item created.",
      });
      await loadDashboard();
    } catch (error) {
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to save furniture item.",
      });
    } finally {
      setSavingFurniture(false);
    }
  }

  async function deleteHome(id: number) {
    if (!window.confirm("Delete this home listing?")) return;

    const response = await fetch(`/api/admin/homes/${id}`, { method: "DELETE" });
    const data = await response.json();

    if (!response.ok) {
      setNotice({ type: "error", message: data.error ?? "Unable to delete listing." });
      return;
    }

    setNotice({ type: "success", message: "Home listing deleted." });
    await loadDashboard();
  }

  async function deleteHomeImage(id: number) {
    const response = await fetch(`/api/admin/homes/${id}/image`, { method: "DELETE" });
    const data = await response.json();

    if (!response.ok) {
      setNotice({ type: "error", message: data.error ?? "Unable to clear photos." });
      return;
    }

    setNotice({ type: "success", message: "Home photos cleared." });
    await loadDashboard();
  }

  async function deleteFurniture(id: number) {
    if (!window.confirm("Delete this furniture item?")) return;

    const response = await fetch(`/api/admin/furniture/${id}`, { method: "DELETE" });
    const data = await response.json();

    if (!response.ok) {
      setNotice({ type: "error", message: data.error ?? "Unable to delete item." });
      return;
    }

    setNotice({ type: "success", message: "Furniture item deleted." });
    await loadDashboard();
  }

  async function sendReply(messageId: string) {
    const message = replyDrafts[messageId]?.trim();

    if (!message) {
      setNotice({ type: "error", message: "Write a reply before sending it." });
      return;
    }

    setReplyingToId(messageId);

    try {
      const data = await submitJson(`/api/admin/contact-messages/${messageId}/reply`, { message });
      setReplyDrafts((current) => ({ ...current, [messageId]: "" }));
      setNotice({
        type: data.deliveryMethod === "preview" ? "info" : "success",
        message:
          data.deliveryMethod === "preview"
            ? "Reply saved locally. Configure SMTP to send real emails."
            : "Reply sent successfully.",
      });
      await loadDashboard();
    } catch (error) {
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send reply.",
      });
    } finally {
      setReplyingToId(null);
    }
  }

  function startEditingHome(home: HomeListing) {
    setActiveTab("homes");
    setEditingHomeId(home.id);
    setHomeForm({
      title: home.title,
      type: home.type,
      description: home.description,
      price: String(home.price),
      location: home.location,
      bedrooms: String(home.features.bedrooms),
      bathrooms: String(home.features.bathrooms),
      toilets: String(home.features.toilets),
      parkingSpaces: String(home.features.parkingSpaces),
      imageFile: null,
      galleryFiles: createEmptyHomeGalleryFiles(),
    });
    setHomeFileKey((value) => value + 1);
  }

  function startEditingFurniture(item: FurnitureItem) {
    setActiveTab("furniture");
    setEditingFurnitureId(item.id);
    setFurnitureForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: String(item.price),
      imageFile: null,
    });
    setFurnitureFileKey((value) => value + 1);
  }

  function noticeClass() {
    if (!notice) return "";
    if (notice.type === "error") return "border-red-200 bg-red-50 text-red-700";
    if (notice.type === "info") return "border-blue-200 bg-blue-50 text-blue-700";
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (checkingSession) {
    return <main className="min-h-screen px-4 pb-16 pt-28">Checking admin session...</main>;
  }

  if (!viewer) {
    return (
      <main className="min-h-screen bg-[#f5efe7] px-4 pb-16 pt-28 text-black">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow">
          {notice && (
            <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${noticeClass()}`}>
              {notice.message}
            </div>
          )}

          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setAuthMode("login")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${authMode === "login" ? "bg-black text-white" : "bg-[#f2ece4]"}`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode("signup")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${authMode === "signup" ? "bg-black text-white" : "bg-[#f2ece4]"}`}
            >
              Create account
            </button>
          </div>

          {authMode === "login" && (
            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="Official email"
                className="w-full rounded-xl border px-4 py-3"
              />
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, password: event.target.value }))
                }
                placeholder="Password"
                className="w-full rounded-xl border px-4 py-3"
              />
              <button
                type="submit"
                disabled={submittingAuth}
                className="rounded-xl bg-[#dd5500] px-5 py-3 font-semibold text-white"
              >
                {submittingAuth ? "Signing in..." : "Login"}
              </button>
            </form>
          )}

          {authMode === "signup" && (
            <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                value={signupForm.fullName}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, fullName: event.target.value }))
                }
                placeholder="Full name"
                className="w-full rounded-xl border px-4 py-3"
              />
              <input
                type="email"
                value={signupForm.email}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="Admin email (name@gmail.com)"
                className="w-full rounded-xl border px-4 py-3"
              />
              <input
                type="password"
                value={signupForm.password}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, password: event.target.value }))
                }
                placeholder="Password"
                className="w-full rounded-xl border px-4 py-3"
              />
              <input
                type="password"
                value={signupForm.confirmPassword}
                onChange={(event) =>
                  setSignupForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                placeholder="Confirm password"
                className="w-full rounded-xl border px-4 py-3"
              />
              <button
                type="submit"
                disabled={submittingAuth}
                className="rounded-xl bg-black px-5 py-3 font-semibold text-white"
              >
                {submittingAuth ? "Sending code..." : "Create account"}
              </button>
            </form>
          )}

          {authMode === "verify" && (
            <form className="space-y-4" onSubmit={handleVerify}>
              <p className="rounded-xl bg-[#f2ece4] px-4 py-3 text-sm">
                Confirm the code sent to <strong>{pendingSignupEmail}</strong>.
              </p>
              <input
                type="text"
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
                placeholder="6-digit verification code"
                className="w-full rounded-xl border px-4 py-3"
              />
              <button
                type="submit"
                disabled={submittingAuth}
                className="rounded-xl bg-[#dd5500] px-5 py-3 font-semibold text-white"
              >
                {submittingAuth ? "Verifying..." : "Verify and continue"}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className="block text-sm font-medium text-[#555]"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5efe7] px-4 pb-16 pt-28 text-black">
      <div className="mx-auto max-w-7xl">
        {notice && (
          <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${noticeClass()}`}>
            {notice.message}
          </div>
        )}

        <div className="mb-6 rounded-3xl bg-white p-6 shadow">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#dd5500]">Admin Dashboard</p>
              <h1 className="text-2xl font-bold">Welcome, {viewer.fullName}</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => void loadDashboard()}
                className="rounded-xl border px-4 py-2 text-sm font-semibold"
              >
                {loadingDashboard ? "Refreshing..." : "Refresh"}
              </button>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("homes")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === "homes" ? "bg-[#dd5500] text-white" : "bg-[#f2ece4]"}`}
            >
              Homes ({homes.length})
            </button>
            <button
              onClick={() => setActiveTab("furniture")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === "furniture" ? "bg-[#dd5500] text-white" : "bg-[#f2ece4]"}`}
            >
              Furniture ({furniture.length})
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === "contacts" ? "bg-[#dd5500] text-white" : "bg-[#f2ece4]"}`}
            >
              Contacts ({messages.length})
            </button>
          </div>
        </div>

        {activeTab === "homes" && (
          <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editingHomeId ? "Edit listing" : "Add listing"}
                </h2>
                {editingHomeId && (
                  <button onClick={resetHomeForm} className="text-sm underline">
                    Cancel
                  </button>
                )}
              </div>

              <form className="space-y-3" onSubmit={handleHomeSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={homeForm.title}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className="w-full rounded-xl border px-4 py-3"
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={homeForm.type}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, type: event.target.value }))
                  }
                  className="w-full rounded-xl border px-4 py-3"
                />
                <textarea
                  placeholder="Description"
                  value={homeForm.description}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, description: event.target.value }))
                  }
                  className="h-28 w-full rounded-xl border px-4 py-3"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={homeForm.price}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, price: event.target.value }))
                  }
                  className="w-full rounded-xl border px-4 py-3"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={homeForm.location}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, location: event.target.value }))
                  }
                  className="w-full rounded-xl border px-4 py-3"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Beds"
                    value={homeForm.bedrooms}
                    onChange={(event) =>
                      setHomeForm((current) => ({ ...current, bedrooms: event.target.value }))
                    }
                    className="rounded-xl border px-4 py-3"
                  />
                  <input
                    type="number"
                    placeholder="Baths"
                    value={homeForm.bathrooms}
                    onChange={(event) =>
                      setHomeForm((current) => ({ ...current, bathrooms: event.target.value }))
                    }
                    className="rounded-xl border px-4 py-3"
                  />
                  <input
                    type="number"
                    placeholder="Toilets"
                    value={homeForm.toilets}
                    onChange={(event) =>
                      setHomeForm((current) => ({ ...current, toilets: event.target.value }))
                    }
                    className="rounded-xl border px-4 py-3"
                  />
                  <input
                    type="number"
                    placeholder="Parking"
                    value={homeForm.parkingSpaces}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        parkingSpaces: event.target.value,
                      }))
                    }
                    className="rounded-xl border px-4 py-3"
                  />
                </div>

                <div className="rounded-2xl bg-[#f8efe8] px-4 py-4 text-sm text-[#5b4739]">
                  <p className="font-semibold text-[#1c140d]">Apartment photos</p>
                  <p className="mt-2 leading-6">
                    Upload one cover image, then add multiple room photos for the living room,
                    bedroom/rest room, and toilet. When editing a listing, newly uploaded room
                    photos are added to the existing gallery.
                  </p>
                  {editingHome ? (
                    <p className="mt-2 text-xs text-[#6d5646]">
                      Current room photos:{" "}
                      {homeGallerySections
                        .map(
                          (section) =>
                            `${section.label} ${editingHome.gallery[section.key].length}`
                        )
                        .join(" | ")}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#1c140d]">
                    Cover photo
                  </label>
                  <input
                    key={`${homeFileKey}-cover`}
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        imageFile: event.target.files?.[0] ?? null,
                      }))
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  />
                  <p className="text-xs text-[#666]">
                    {editingHome?.image ? "Cover photo already added." : "No cover photo yet."}{" "}
                    {homeForm.imageFile ? `New file: ${homeForm.imageFile.name}` : ""}
                  </p>
                </div>

                {homeGallerySections.map((section) => (
                  <div key={section.key} className="space-y-2">
                    <label className="block text-sm font-semibold text-[#1c140d]">
                      {section.label} photos
                    </label>
                    <input
                      key={`${homeFileKey}-${section.key}`}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(event) =>
                        setHomeForm((current) => ({
                          ...current,
                          galleryFiles: {
                            ...current.galleryFiles,
                            [section.key]: Array.from(event.target.files ?? []),
                          },
                        }))
                      }
                      className="w-full rounded-xl border px-4 py-3"
                    />
                    <p className="text-xs text-[#666]">
                      {editingHome
                        ? `${editingHome.gallery[section.key].length} current photo(s). `
                        : ""}
                      {homeForm.galleryFiles[section.key].length > 0
                        ? `${homeForm.galleryFiles[section.key].length} new file(s) selected.`
                        : "No new files selected."}
                    </p>
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={savingHome}
                  className="rounded-xl bg-[#dd5500] px-5 py-3 font-semibold text-white"
                >
                  {savingHome ? "Saving..." : editingHomeId ? "Update listing" : "Create listing"}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {homes.map((home) => (
                <article key={home.id} className="rounded-3xl bg-white p-5 shadow">
                  <h3 className="text-xl font-bold">{home.title}</h3>
                  <p className="mt-1 text-sm text-[#666]">{home.type} • {home.location}</p>
                  <p className="mt-3 text-sm">{home.description}</p>
                  <p className="mt-3 text-sm font-semibold">
                    Beds {home.features.bedrooms} | Baths {home.features.bathrooms} | Toilets {home.features.toilets} | Parking {home.features.parkingSpaces}
                  </p>
                  <p className="mt-2 text-sm text-[#666]">
                    Cover photo {home.image ? "set" : "not set"} | Room photos{" "}
                    {homeGallerySections.reduce(
                      (total, section) => total + home.gallery[section.key].length,
                      0
                    )}
                  </p>
                  <p className="mt-2 text-sm text-[#666]">
                    {homeGallerySections
                      .map((section) => `${section.label} ${home.gallery[section.key].length}`)
                      .join(" | ")}
                  </p>
                  <p className="mt-3 font-bold">N{home.price.toLocaleString()}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => startEditingHome(home)} className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">Edit</button>
                    <button onClick={() => void deleteHomeImage(home.id)} className="rounded-full border px-4 py-2 text-sm font-semibold">Clear photos</button>
                    <button onClick={() => void deleteHome(home.id)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600">Delete listing</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "furniture" && (
          <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editingFurnitureId ? "Edit furniture" : "Add furniture"}
                </h2>
                {editingFurnitureId && (
                  <button onClick={resetFurnitureForm} className="text-sm underline">
                    Cancel
                  </button>
                )}
              </div>

              <form className="space-y-3" onSubmit={handleFurnitureSubmit}>
                <input type="text" placeholder="Name" value={furnitureForm.name} onChange={(event) => setFurnitureForm((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-xl border px-4 py-3" />
                <input type="text" placeholder="Category" value={furnitureForm.category} onChange={(event) => setFurnitureForm((current) => ({ ...current, category: event.target.value }))} className="w-full rounded-xl border px-4 py-3" />
                <textarea placeholder="Description" value={furnitureForm.description} onChange={(event) => setFurnitureForm((current) => ({ ...current, description: event.target.value }))} className="h-28 w-full rounded-xl border px-4 py-3" />
                <input type="number" placeholder="Price" value={furnitureForm.price} onChange={(event) => setFurnitureForm((current) => ({ ...current, price: event.target.value }))} className="w-full rounded-xl border px-4 py-3" />
                <input key={furnitureFileKey} type="file" accept="image/*" onChange={(event) => setFurnitureForm((current) => ({ ...current, imageFile: event.target.files?.[0] ?? null }))} className="w-full rounded-xl border px-4 py-3" />
                <button type="submit" disabled={savingFurniture} className="rounded-xl bg-black px-5 py-3 font-semibold text-white">
                  {savingFurniture ? "Saving..." : editingFurnitureId ? "Update item" : "Create item"}
                </button>
              </form>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {furniture.map((item) => (
                <article key={item.id} className="rounded-3xl bg-white p-5 shadow">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dd5500]">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
                  <p className="mt-3 text-sm">{item.description}</p>
                  <p className="mt-3 font-bold">N{item.price.toLocaleString()}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => startEditingFurniture(item)} className="rounded-full bg-[#dd5500] px-4 py-2 text-sm font-semibold text-white">Edit</button>
                    <button onClick={() => void deleteFurniture(item.id)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600">Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "contacts" && (
          <section className="space-y-4">
            {messages.map((message) => (
              <article key={message.id} className="rounded-3xl bg-white p-5 shadow">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#dd5500]">{message.interest}</p>
                    <h3 className="text-xl font-bold">
                      {message.firstName} {message.lastName}
                    </h3>
                    <p className="text-sm text-[#666]">{message.email}</p>
                    {message.company && <p className="text-sm text-[#666]">Company: {message.company}</p>}
                  </div>
                  <p className="text-sm text-[#666]">{new Date(message.createdAt).toLocaleString()}</p>
                </div>

                <p className="mt-4 text-sm">{message.message}</p>

                {message.replies.length > 0 && (
                  <div className="mt-4 space-y-2 rounded-2xl bg-[#f2ece4] p-4">
                    {message.replies.map((reply) => (
                      <div key={reply.id} className="rounded-xl bg-white p-3 text-sm">
                        <p>{reply.message}</p>
                        <p className="mt-2 text-xs text-[#666]">
                          {reply.adminName} ({reply.deliveryMethod}) on {new Date(reply.sentAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 space-y-3">
                  <textarea value={replyDrafts[message.id] ?? ""} onChange={(event) => setReplyDrafts((current) => ({ ...current, [message.id]: event.target.value }))} placeholder="Write your reply..." className="h-28 w-full rounded-xl border px-4 py-3" />
                  <button onClick={() => void sendReply(message.id)} disabled={replyingToId === message.id} className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white">
                    {replyingToId === message.id ? "Sending..." : "Send reply"}
                  </button>
                </div>
              </article>
            ))}

            {messages.length === 0 && <div className="rounded-3xl bg-white p-6 shadow">No contact messages yet.</div>}
          </section>
        )}
      </div>
    </main>
  );
}
