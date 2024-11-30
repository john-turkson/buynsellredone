'use client'

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <></>
    );

  if (resolvedTheme === "dark") {
    return <FiSun className="hover:text-yellow-400 text-neutral-300 transition-colors duration-200 w-9 h-9 cursor-pointer px-2"  onClick={() => setTheme("light")}  />;
  }

  if (resolvedTheme === "light") {
    return <FiMoon className="hover:text-blue-500 text-gray-600 transition-colors duration-200 w-9 h-9 cursor-pointer px-2" onClick={() => setTheme("dark")} />;
  }
}
