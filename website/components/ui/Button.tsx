import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center text-[15px] font-bold py-3.5 px-7 rounded-[10px] transition-all duration-200";

  const variants = {
    primary:
      "bg-textPrimary text-background hover:opacity-90 disabled:opacity-50",
    secondary:
      "bg-transparent text-textSecondary border-[1.5px] border-border hover:border-textSecondary",
    ghost: "bg-transparent text-textSecondary hover:text-textPrimary",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
