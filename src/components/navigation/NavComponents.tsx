// NavState represents which page should be rendered
// The acronym "af" stands for active financial page where nav bar will show up
export type NavState =
  | "networth"
  | "af_networth"         
  | "af_manage_business"
  | "menu"
  | "user_sign_up";

interface BottomNavProps {
  navState: NavState;
  setNavState: (newState: NavState) => void;
}

export function BottomNav({ navState, setNavState }: BottomNavProps) {
  return (
    <div className="btm-nav h-10">
      <button
        className={`${navState === "af_networth" ? "active" : ""} text-info`}
        onClick={() => setNavState("af_networth")}
      >
        <b>Summary</b>
      </button>
      <button
        className={`${navState === "af_manage_business" ? "active" : ""} text-info`}
        onClick={() => setNavState("af_manage_business")}
      >
        <b>Accounts</b>
      </button>
    </div>
  );
}

export function TopBar() {
  return (
    <div className="flex justify-between text-base">
      <h1>
        <a href="https://www.roosterfinancial.ca/">Rooster Financial</a>
      </h1>
      <FeatureOrIssueRequest />
    </div>
  );
}

export function FeatureOrIssueRequest() {
  return (
    <div className="tooltip tooltip-left" data-tip="Issue / Feature Request">
      <button className="btn btn-ghost h-8 min-h-8 w-7 rounded-full p-0">
        <a href="mailto:mathuransada@gmail.com?subject=[Issue / Feature Request]">
          ?
        </a>
      </button>
    </div>
  );
}
