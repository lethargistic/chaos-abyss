export const calculateDeepAccent = (accent: string) => {
    const match = accent.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/);
    if (!match) {
        console.warn("Lethargistic: Invalid accent, default will be used instead.");
        return "oklch(0.8149 0.1044 20)";
    } else {
        let [l, c, h] = match.slice(1).map(Number);

        // won't reach 0 anyway but idk maybe I'm feeling spooky
        l = Math.max(0, l-0.0508);
        c = Math.max(0, c+0.0254);
        h = Math.max(0, h);

        return `oklch(${l}, ${c}, ${h})`;
    }

}