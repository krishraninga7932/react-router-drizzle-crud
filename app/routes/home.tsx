import type { Route } from "./+types/home";
import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inventory App" },
    {
      name: "description",
      content: "Inventory CRUD Application",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex items-center justify-center p-6">

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>

          {/* SMALL BADGE */}
          <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur border border-slate-700 px-4 py-2 rounded-full text-sm text-gray-300 mb-6">
            <Package size={16} className="text-cyan-400" />
            Inventory Management System
          </div>

          {/* HEADING */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Manage Products
            <span className="block text-cyan-400 mt-2">
              Faster & Smarter
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8">
            A modern inventory CRUD application built with React Router,
            TypeScript, Drizzle ORM and PostgreSQL for managing products,
            prices and stock efficiently.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">

            <Link
              to="/products"
              className="bg-cyan-500 hover:bg-cyan-400 transition text-black font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              Go To Products
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative hidden lg:flex justify-center">

          {/* MAIN CARD */}
          <div className="w-[380px] h-[380px] bg-slate-800/80 backdrop-blur border border-slate-700 rounded-3xl shadow-2xl flex items-center justify-center">

            <div className="w-40 h-40 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Package size={80} className="text-cyan-400" />
            </div>

          </div>

          {/* FLOATING CARD 1 */}
          <div className="absolute top-6 -left-5 bg-slate-800 border border-slate-700 px-5 py-4 rounded-2xl shadow-lg">
            <p className="text-gray-400 text-sm">
              Products Managed
            </p>

            <h3 className="text-2xl font-bold text-white mt-1">
              120+
            </h3>
          </div>

          {/* FLOATING CARD 2 */}
          <div className="absolute bottom-6 -right-5 bg-slate-800 border border-slate-700 px-5 py-4 rounded-2xl shadow-lg">
            <p className="text-gray-400 text-sm">
              Fast CRUD Operations
            </p>

            <h3 className="text-cyan-400 font-semibold mt-1">
              React Router + TS
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}