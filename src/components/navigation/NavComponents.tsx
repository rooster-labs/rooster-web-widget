import {
  GraphIcon,
  EditIcon,
  HamburgerMenuIcon,
  QuestionMarkIcon,
} from "./NavIcons.js";

export type NavState = "networth" | "manage-business" | "menu";

interface BottomNavProps {
  navState: NavState;
  setNavState: (newState: NavState) => void;
}

export function BottomNav({ navState, setNavState }: BottomNavProps) {
  return (
    <div className="btm-nav h-10">
      <button
        className={`${navState === "networth" ? "active" : ""} text-info`}
        onClick={() => setNavState("networth")}
      >
        <b>Summary</b>
      </button>
      <button
        className={`${navState === "manage-business" ? "active" : ""} text-info`}
        onClick={() => setNavState("manage-business")}
      >
        <b>Summary</b>
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
