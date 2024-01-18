const favoritedIcon = (props) => {
  const favoritedColor = '#F7A508';
  const defaultColor = '#FFFFFF';

  //if passed in props is true, return the first SVG
  if (props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="favorite-icon"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke={favoritedColor}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M17 2a2 2 0 0 1 1.995 1.85l.005 .15v4c0 1.335 -.229 2.386 -.774 3.692l-.157 .363l-.31 .701a8.902 8.902 0 0 0 -.751 3.242l-.008 .377v3.625a2 2 0 0 1 -1.85 1.995l-.15 .005h-6a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3.625c0 -1.132 -.21 -2.25 -.617 -3.28l-.142 -.34l-.31 -.699c-.604 -1.358 -.883 -2.41 -.925 -3.698l-.006 -.358v-4a2 2 0 0 1 1.85 -1.995l.15 -.005h10zm0 2h-10v3h10v-3z"
          strokeWidth={0}
          fill={favoritedColor}
        />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="favorite-icon"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke={defaultColor}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 21h6a1 1 0 0 0 1 -1v-3.625c0 -1.397 .29 -2.775 .845 -4.025l.31 -.7c.556 -1.25 .845 -2.253 .845 -3.65v-4a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v4c0 1.397 .29 2.4 .845 3.65l.31 .7a9.931 9.931 0 0 1 .845 4.025v3.625a1 1 0 0 0 1 1z" />
        <path d="M6 8h12" />
      </svg>
    );
  }
};

export default favoritedIcon;
