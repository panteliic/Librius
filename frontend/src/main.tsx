import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter } from "react-router";
import AppRoutes from "./Routes.tsx";

export { default as BookmarkIcon} from './assets/icons/Bookmark-Icon.svg?react'
export { default as HomeIcon} from './assets/icons/Home-Icon.svg?react'
export { default as CompassIcon} from './assets/icons/Compass-Icon.svg?react'
export { default as GearIcon} from './assets/icons/Gear-Icon.svg?react'
export { default as ChevronIcon} from './assets/icons/Chevron-Icon.svg?react'
export { default as UserProfileIcon} from './assets/icons/User-Profile-Icon.svg?react'
export { default as LogoutIcon} from './assets/icons/Logout-Icon.svg?react'
export { default as LoginIcon} from './assets/icons/Login-Icon.svg?react'
export { default as LayoutLeftIcon} from './assets/icons/Layout-Left-Icon.svg?react'
export { default as SearchIcon} from './assets/icons/Search-Icon.svg?react'
export { default as CloseIcon} from './assets/icons/Close-Icon.svg?react'
export { default as MessageIcon} from './assets/icons/Message-Icon.svg?react'
export { default as SendIcon} from './assets/icons/Send-Icon.svg?react'

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Provider>
);
