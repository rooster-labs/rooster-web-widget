import { createClient } from "@supabase/supabase-js";
import { Database } from "./accountSummaryService.types.js";

export type UserTableType = Database["public"]["Tables"]["user_table"]["Row"];
export type AccountData = Database["public"]["Views"]["account_data_view"]["Row"];

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlbXVoc3l0eHN2ZHRlcHlua2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxMzY2MjksImV4cCI6MjAzMjcxMjYyOX0.ODxHRjha6bEs3wXWQPim5V7stk1wXswilv5yLXeKeMM';
const SUPABASE_URL = "https://gemuhsytxsvdtepynkaf.supabase.co";

export const accountSummaryService = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);
