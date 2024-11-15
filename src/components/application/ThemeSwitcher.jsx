'use client'

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <></>
    );

  if (resolvedTheme === "dark") {
    return <FiSun onClick={() => setTheme("light")} style={{ cursor: "pointer" }} />;
  }

  if (resolvedTheme === "light") {
    return <FiMoon onClick={() => setTheme("dark")} style={{ cursor: "pointer" }}/>;
  }
}
