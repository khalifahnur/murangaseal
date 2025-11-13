// import React from "react";

// export default function FUTCard() {
//   const playerData = {
//     rating: 98,
//     position: "LW",
//     name: "NEYMAR JR",
//     country: "🇧🇷",
//     club: "PSG",
//     stats: {
//       PAC: 98,
//       SHO: 96,
//       PAS: 98,
//       DRI: 99,
//       DEF: 38,
//       PHY: 67,
//     },
//     imageUrl:
//       "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
//       <div className="relative w-96 h-[560px]">
//         <svg
//           viewBox="0 0 300 450"
//           className="w-full h-full drop-shadow-2xl"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             {/* rich red body */}
//             <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor="#751A1A" />
//               <stop offset="50%" stopColor="#5C1313" />
//               <stop offset="100%" stopColor="#3C0E0E" />
//             </linearGradient>

//             {/* bright gold edge */}
//             <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#FEE8A0" />
//               <stop offset="40%" stopColor="#D4AF37" />
//               <stop offset="100%" stopColor="#B8860B" />
//             </linearGradient>

//             {/* subtle glow */}
//             <filter id="glow">
//               <feGaussianBlur stdDeviation="2" result="blur" />
//               <feMerge>
//                 <feMergeNode in="blur" />
//                 <feMergeNode in="SourceGraphic" />
//               </feMerge>
//             </filter>

//             {/* inner drop shadow for depth */}
//             <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
//               <feOffset dx="0" dy="2" />
//               <feGaussianBlur stdDeviation="3" result="offset-blur" />
//               <feComposite
//                 operator="out"
//                 in="SourceGraphic"
//                 in2="offset-blur"
//                 result="inverse"
//               />
//               <feFlood floodColor="black" floodOpacity="0.5" result="color" />
//               <feComposite operator="in" in="color" in2="inverse" result="shadow" />
//               <feComposite operator="over" in="shadow" in2="SourceGraphic" />
//             </filter>
//           </defs>

//           {/* === refined outer path === */}
//           <path
//             d="
//               M25,60 
//               Q25,25 60,15 
//               Q100,5 150,5 
//               Q200,5 240,15 
//               Q275,25 275,60
//               L275,400
//               Q275,430 250,440 
//               L50,440
//               Q25,430 25,400 
//               Z
//             "
//             fill="url(#cardGradient)"
//             stroke="url(#goldGradient)"
//             strokeWidth="5"
//             filter="url(#innerShadow)"
//             strokeLinejoin="round"
//           />

//           {/* thin inner border */}
//           <path
//             d="
//               M35,65 
//               Q35,35 70,25 
//               Q110,15 150,15 
//               Q190,15 230,25 
//               Q265,35 265,65
//               L265,395
//               Q265,415 245,425 
//               L55,425
//               Q35,415 35,395 
//               Z
//             "
//             fill="none"
//             stroke="url(#goldGradient)"
//             strokeWidth="2"
//             opacity="0.6"
//           />

//           {/* badge top */}
//           <circle
//             cx="150"
//             cy="22"
//             r="14"
//             fill="url(#goldGradient)"
//             stroke="#4A1515"
//             strokeWidth="2"
//           />
//           <text
//             x="150"
//             y="27"
//             textAnchor="middle"
//             fill="#4A1515"
//             fontSize="9"
//             fontWeight="bold"
//           >
//             FUT
//           </text>

//           {/* rating & position */}
//           <text
//             x="65"
//             y="100"
//             textAnchor="middle"
//             fill="url(#goldGradient)"
//             fontSize="52"
//             fontWeight="bold"
//             filter="url(#glow)"
//           >
//             {playerData.rating}
//           </text>
//           <text
//             x="65"
//             y="132"
//             textAnchor="middle"
//             fill="url(#goldGradient)"
//             fontSize="22"
//             fontWeight="bold"
//           >
//             {playerData.position}
//           </text>

//           {/* flag + club */}
//           <text x="65" y="160" textAnchor="middle" fontSize="26">
//             {playerData.country}
//           </text>
//           <circle
//             cx="65"
//             cy="190"
//             r="20"
//             fill="#1a3a5c"
//             stroke="url(#goldGradient)"
//             strokeWidth="2.5"
//           />
//           <text
//             x="65"
//             y="196"
//             textAnchor="middle"
//             fill="#fff"
//             fontSize="11"
//             fontWeight="bold"
//           >
//             {playerData.club}
//           </text>

//           {/* player image */}
//           <clipPath id="imageClip">
//             <path
//               d="
//                 M100,70 
//                 Q120,40 150,40 
//                 Q180,40 200,70 
//                 L240,240 
//                 Q180,250 150,250 
//                 Q120,250 100,240 
//                 Z
//               "
//             />
//           </clipPath>
//           <image
//             href={playerData.imageUrl}
//             width="160"
//             height="210"
//             x="90"
//             y="65"
//             clipPath="url(#imageClip)"
//             preserveAspectRatio="xMidYMid slice"
//           />

//           {/* name banner */}
//           <rect
//             x="35"
//             y="260"
//             width="230"
//             height="40"
//             fill="#000"
//             opacity="0.65"
//             rx="6"
//           />
//           <text
//             x="150"
//             y="288"
//             textAnchor="middle"
//             fill="url(#goldGradient)"
//             fontSize="24"
//             fontWeight="bold"
//             letterSpacing="2"
//           >
//             {playerData.name}
//           </text>

//           {/* stats */}
//           <g fontFamily="sans-serif">
//             {[
//               ["PAC", playerData.stats.PAC, 330],
//               ["SHO", playerData.stats.SHO, 358],
//               ["PAS", playerData.stats.PAS, 386],
//             ].map(([label, val, y]) => (
//               <g key={label}>
//                 <text
//                   x="80"
//                   y={y}
//                   textAnchor="end"
//                   fill="url(#goldGradient)"
//                   fontSize="18"
//                   fontWeight="bold"
//                 >
//                   {val as number}
//                 </text>
//                 <text
//                   x="90"
//                   y={y}
//                   textAnchor="start"
//                   fill="url(#goldGradient)"
//                   fontSize="13"
//                   fontWeight="600"
//                 >
//                   {label}
//                 </text>
//               </g>
//             ))}
//             {[
//               ["DRI", playerData.stats.DRI, 330],
//               ["DEF", playerData.stats.DEF, 358],
//               ["PHY", playerData.stats.PHY, 386],
//             ].map(([label, val, y]) => (
//               <g key={label}>
//                 <text
//                   x="200"
//                   y={y}
//                   textAnchor="end"
//                   fill="url(#goldGradient)"
//                   fontSize="18"
//                   fontWeight="bold"
//                 >
//                   {val as number}
//                 </text>
//                 <text
//                   x="210"
//                   y={y}
//                   textAnchor="start"
//                   fill="url(#goldGradient)"
//                   fontSize="13"
//                   fontWeight="600"
//                 >
//                   {label}
//                 </text>
//               </g>
//             ))}
//           </g>

//           {/* bottom chevron */}
//           <g transform="translate(150,410)">
//             <path
//               d="M -15 0 L -8 12 L 0 8 L 8 12 L 15 0 Z"
//               fill="url(#goldGradient)"
//               opacity="0.9"
//             />
//           </g>
//         </svg>
//       </div>
//     </div>
//   );
// }
