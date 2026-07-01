import { navItems } from "@/src/lib";
import InteractiveHeader from "./InteractiveHeader";

export default function Header() {
  return <InteractiveHeader navItems={navItems} />;
}
