import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log("URL de Supabase:", supabaseUrl);
console.log("Clave de Supabase:", supabaseKey ? "Cargada" : "NO CARGADA");

export const supabase = createClient(supabaseUrl, supabaseKey);