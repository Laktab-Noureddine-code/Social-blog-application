function UnknownCoverPhoto() {
  return (
    <svg
      viewBox="0 0 800 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="800" height="300" fill="#e5e5e5" />
      <g transform="translate(50, 50)" opacity="0.6">
        <path
          d="M100,100 Q150,50 200,100 T300,100 T400,100 T500,100"
          fill="none"
          stroke="#a0a0a0"
          strokeWidth="2"
        />
        <circle cx="100" cy="80" r="30" fill="#c0c0c0" />
        <circle cx="200" cy="90" r="25" fill="#d0d0d0" />
        <circle cx="300" cy="70" r="35" fill="#b0b0b0" />
        <circle cx="400" cy="85" r="28" fill="#c5c5c5" />
        <rect x="150" y="150" width="200" height="100" rx="10" fill="#b8b8b8" />
        <path
          d="M50,200 C100,150 200,250 300,200"
          fill="none"
          stroke="#a0a0a0"
          strokeWidth="3"
        />
        <path
          d="M350,220 C400,170 450,270 500,220"
          fill="none"
          stroke="#a0a0a0"
          strokeWidth="3"
        />
        <circle cx="120" cy="180" r="15" fill="#d8d8d8" />
        <circle cx="420" cy="190" r="18" fill="#d8d8d8" />
        <rect x="180" y="120" width="30" height="60" fill="#909090" />
        <rect x="380" y="130" width="25" height="50" fill="#909090" />
      </g>
    </svg>
  );
}

export default UnknownCoverPhoto
