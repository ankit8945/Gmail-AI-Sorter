import { useState } from "react";
import { api } from "../api";

export default function AddKeyword() {
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ======================
     ADD CATEGORY
  ====================== */
  const addKeyword = async () => {
    if (!keyword.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/api/add-keyword", {
        keyword: keyword.trim()
      });

      if (res.data?.success) {
        setCategories(
          Object.values(res.data.userCategories || {})
        );
        setKeyword("");
      }
    } catch (err) {
      console.error("Add category failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     DELETE CATEGORY
  ====================== */
  const deleteCategory = async (category) => {
    try {
      await api.post("/api/delete-category", { category });

      setCategories((prev) =>
        prev.filter((c) => c !== category)
      );
    } catch (err) {
      console.error("Delete category failed", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">

      {/* INPUT */}
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Add category (eg. scholarship)"
        className="rounded-full px-4 py-2 bg-white text-slate-800 font-medium shadow"
      />

      {/* ADD BUTTON */}
      <button
        onClick={addKeyword}
        disabled={loading}
        className="px-5 py-2 rounded-full bg-slate-900 text-white font-semibold shadow hover:bg-black disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add"}
      </button>

      {/* ADDED CATEGORIES */}
      {categories.length > 0 && (
        <div className="flex gap-2 ml-2 flex-wrap">
          {categories.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs"
            >
              {cat}
              <button
                onClick={() => deleteCategory(cat)}
                className="text-red-400 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

