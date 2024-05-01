import {
  GraphIcon,
  EditIcon,
  HamburgerMenuIcon,
  QuestionMarkIcon,
} from "./NavIcons.js";

export type NavState = "networth" | "manage-business" | "menu";

interface BottomNavProps {
  setNavState: (newState: NavState) => void;
}

export function BottomNav({ setNavState }: BottomNavProps) {
  return (
    <div className="btm-nav h-10">
      <button className="text-info" onClick={() => setNavState("networth")}>
        <GraphIcon />
      </button>
      <button
        className="active text-info"
        onClick={() => setNavState("manage-business")}
      >
        <EditIcon />
      </button>
      <button className="text-info" onClick={() => setNavState("networth")}>
        <HamburgerMenuIcon />
      </button>
    </div>
  );
}

export function TopBar() {
  return (
    <div className="flex justify-between text-base">
      <h1 className="text-lg">Rooster Financial</h1>
      <FeatureOrIssueRequest/>
    </div>
  );
}

export function FeatureOrIssueRequest() {
  return (
    <div className="tooltip tooltip-left" data-tip="Issue / Feature Request">
      <button className="btn btn-ghost h-8 min-h-8 w-7 rounded-full p-0">
        <a href="mailto:mathuransada@gmail.com?subject=[Issue / Feature Request]">
          <QuestionMarkIcon />
        </a>
      </button>
    </div>
  );
}
