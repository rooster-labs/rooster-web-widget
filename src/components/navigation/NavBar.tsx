import { GraphIcon, EditIcon, HamburgerMenuIcon } from "./NavBarIcons.js";

export type NavState = "networth" | "manage-business" | "menu";

interface BottomNavProps {
  setNavState: (newState: NavState) => void
}

export function BottomNav({setNavState}: BottomNavProps) {
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