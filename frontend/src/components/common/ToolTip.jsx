/**
 * A tooltip component that displays on hover with customizable position and margin.
 *
 * @param {Object} props - Component props
 * @param {string} props.text - The text content to display in the tooltip
 * @param {("tl"|"tc"|"tr"|"bl"|"bc"|"br")} [props.position="bc"] - Tooltip position
 *   - "tl": top-left
 *   - "tc": top-center
 *   - "tr": top-right
 *   - "bl": bottom-left
 *   - "bc": bottom-center (default)
 *   - "br": bottom-right
 * @param {number} [props.marginY=0] - Vertical margin spacing in Tailwind units (1 = 0.25rem / 4px, 2 = 0.5rem / 8px, etc.)
 * @param {number} [props.marginX=0] - Horizontal margin spacing in Tailwind units (1 = 0.25rem / 4px, 2 = 0.5rem / 8px, etc.)
 * @returns {JSX.Element} Tooltip component
 *
 * @note The parent element must have `relative` positioning and the `group` class for the tooltip to work properly.
 *
 * @example
 * // Bottom-center tooltip with 8px vertical margin
 * <button className="group relative">
 *   Hover me
 *   <ToolTip text="Click here" position="bc" marginY={2} />
 * </button>
 *
 * @example
 * // Top-right tooltip with both vertical and horizontal margins
 * <div className="group relative">
 *   Info icon
 *   <ToolTip text="Info" position="tr" marginY={1} marginX={2} />
 * </div>
 */
const ToolTip = ({ text, position = "bc", marginY = 0, marginX = 0 }) => {
  // Position mapping: shorthand to Tailwind classes
  const positionClasses = {
    tl: `bottom-full right-full`,
    tc: `bottom-full left-1/2 -translate-x-1/2`,
    tr: `bottom-full left-full`,
    bl: `top-full right-full`,
    bc: `top-full left-1/2 -translate-x-1/2`,
    br: `top-full left-full`,
  };

  // Get position classes or default to bottom-center
  const positionClass = positionClasses[position] || positionClasses.bc;

  // Calculate margin class based on position
  const marginVerticalClass = position.startsWith("t")
    ? `mb-${marginY}` // top positions use bottom margin
    : `mt-${marginY}`; // bottom positions use top margin

  const marginHorizontalClass = position.endsWith("l")
    ? `mr-${marginX}` // left positions use right margin
    : `ml-${marginX}`; // right positions use left margin

  return (
    <span
      className={`pointer-events-none absolute z-10 bg-gray-800/50 p-2 text-xs text-gray-200 opacity-0 transition-opacity delay-200 duration-300 group-hover:opacity-100 group-hover:delay-1000 dark:bg-gray-300/60 dark:text-gray-900 ${positionClass} ${marginHorizontalClass} ${marginVerticalClass}`}
    >
      {text}
    </span>
  );
};

export default ToolTip;
