import React, { SyntheticEvent, useState } from "react";
import { NavState } from "../navigation/NavComponents.js";
import { accountSummaryService } from "../../utils/common/apis/accountSummaryService.js";
import { UserIcon } from "./UserProviderIcons.js";
import { Database } from "../../utils/common/apis/accountSummaryService.types.js";

const USER_INFO = "user_info";

export async function isUserSignedIn() {
  return chrome.storage.local.get([USER_INFO]).then((res) => {
    console.log("User Provider localstorge", res);
    return res[USER_INFO]?.user_id != undefined;
  });
}

function assInitUser(userName: string) {
  return accountSummaryService
    .from("user_table")
    .insert([{ user_name: userName }])
    .select();
}

function assGetUser(userName: string) {
  return accountSummaryService
    .from("user_table")
    .select("*")
    .eq("user_name", userName);
}

type UserTableType = Database["public"]["Tables"]["user_table"]["Row"];

interface UserProviderProps {
  navState: NavState;
  setNavState: (newState: NavState) => void;
}

export function UserProviderView({ navState, setNavState }: UserProviderProps) {
  const [userName, setUserName] = useState("");
  const [isSignInForm, setIsSignInForm] = useState(false);

  const setUserInfo = (userInfo: UserTableType) =>
    chrome.storage.local.set({ [USER_INFO]: userInfo });

  const handleSignInOrSignUp = (e: SyntheticEvent) => {
    const initOrGetUser = isSignInForm ? assGetUser : assInitUser;
    e.preventDefault();
    console.log("UserName submitted and signIn type", { userName, isSignInForm });
    initOrGetUser(userName).then((res) => {
      console.log("Handle SignUp init user response:", res);
      if (res.error) {
        console.log(`Error in handleSignUp init user response:`, res);
      } else if (res.data && res.data.length > 0) {
        setUserInfo(res.data[0]);
        setNavState("networth");
      }
    });
  };

  if (navState != "user_sign_up") {
    console.log("why asdfasf");
    setNavState("networth");
    return null;
  } else {
    return (
      <form
        onSubmit={handleSignInOrSignUp}
        className="flex flex-col justify-between"
      >
        <h2 className="mb-2 mt-6">
          {isSignInForm
            ? `Sign In (Only for registered users)`
            : `Sign Up (Only for new users)`}
        </h2>
        <div className="my-2">
          <label className="input input-bordered flex items-center gap-2">
            <UserIcon />
            <input
              type="text"
              className="grow"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
        <button
          onMouseDown={() => setIsSignInForm(!isSignInForm)}
          className="my-2 text-left text-base"
        >
          Toggle Sign In / Sign Up
        </button>
      </form>
    );
  }
}

export default UserProviderView;
