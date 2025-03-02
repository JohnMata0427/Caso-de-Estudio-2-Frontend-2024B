import { memo, ReactNode } from 'react';

type Colors = 'lust' | 'vulcan';

interface Props {
  children: ReactNode;
  moreStyles?: string;
  onClick?: () => void;
  color?: Colors;
  disabled?: boolean;
}

export const ShimmerButton = memo(
  ({
    onClick,
    children,
    moreStyles = '',
    color = 'lust',
    disabled = false,
  }: Props) => {
    const colorClasses: Record<Colors, string> = {
      lust: 'bg-shimmer-lust border-lust-700',
      vulcan: 'bg-shimmer-vulcan border-vulcan-700',
    };

    return (
      <button
        className={`animate-shimmer text-vulcan-50 w-full rounded-lg border-2 font-bold ${colorClasses[color]} bg-[length:200%_100%] px-4 py-2 transition-all duration-400 ${moreStyles} ${disabled ? 'cursor-wait opacity-80' : 'cursor-crosshair hover:opacity-95 active:opacity-90'}`}
        onClick={onClick}
        disabled={disabled}
      >
        {disabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-vulcan-50 size-6 animate-spin"
            viewBox="0 -960 960 960"
          >
            <path d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480t33-163 89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17 42 17 17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33" />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  },
);
