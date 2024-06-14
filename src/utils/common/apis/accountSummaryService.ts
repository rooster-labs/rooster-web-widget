import { createClient } from "@supabase/supabase-js";
import { Database } from "./accountSummaryService.types.js";

export type UserTableType = Database["public"]["Tables"]["user_table"]["Row"];
export type AccountValue =
  Database["public"]["Tables"]["account_values"]["Row"];
export type AccountInfo = Database["public"]["Tables"]["account_info"]["Row"];
export type AccountData = AccountInfo & AccountValue;
export type LogAccountDataArgs = Database["public"]["Functions"]["log_account_data"]["Args"];

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlbXVoc3l0eHN2ZHRlcHlua2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxMzY2MjksImV4cCI6MjAzMjcxMjYyOX0.ODxHRjha6bEs3wXWQPim5V7stk1wXswilv5yLXeKeMM";
const SUPABASE_URL = "https://gemuhsytxsvdtepynkaf.supabase.co";

export const accountSummaryService = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

export function accountDataToLogAccountArgs(a: AccountData): LogAccountDataArgs {
  return {
      p_user_id: a.user_id,
      p_service_name: a.service_name,
      p_account_name: a.account_name,
      p_account_type: a.account_type,
      p_is_investment: a.is_investment,
      p_balance: a.balance,
      p_pending_balance: a.pending_balance ?? 0,
      p_cash: a.cash ?? 0,
      p_market_value: a.market_value ?? 0,
      p_net_deposit: a.net_deposit ?? 0,
    };
}
