"use client";

import { useMemo } from "react";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (a: number, b: number, n: number) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function AnimeFighter({ side, progress, clash }: { side: "frost" | "ember"; progress: number; clash: number }) {
  const blue = side === "frost";
  const palette = blue
    ? { main: "#3fd9ef", shadow: "#153b68", deep: "#101a31", light: "#bdfaff", trim: "#84efff" }
    : { main: "#fa594d", shadow: "#711f39", deep: "#271329", light: "#ffd7a0", trim: "#ffcc68" };
  const firstLunge = smooth(0.16, 0.43, progress) * (1 - smooth(0.48, 0.59, progress));
  const secondLunge = smooth(0.67, 0.79, progress) * (1 - smooth(0.84, 0.94, progress));
  const approach = Math.max(firstLunge, secondLunge);
  const firstRecoil = smooth(0.46, 0.57, progress) * (1 - smooth(0.63, 0.69, progress));
  const secondRecoil = smooth(0.83, 0.92, progress);
  const recoil = Math.max(firstRecoil, secondRecoil);
  const firstRaise = smooth(0.08, 0.22, progress);
  const firstSwing = smooth(0.22, 0.44, progress);
  const secondRaise = smooth(0.62, 0.72, progress);
  const secondSwing = smooth(0.72, 0.81, progress);
  const baseAngle = blue ? -151 : -154;
  const swordAngle = baseAngle + (blue ? 120 : 123) * firstSwing - 42 * firstRecoil - 82 * secondRaise + (blue ? 120 : 123) * secondSwing - 42 * secondRecoil + firstRaise * 3;
  const origin = blue ? 548 + approach * 42 - recoil * 17 : 1005 - approach * 42 + recoil * 17;
  const lean = blue ? -2 - approach * 8 + recoil * 5 : 2 + approach * 8 - recoil * 5;
  const handY = blue ? 516 - approach * 14 + recoil * 7 : 507 - approach * 13 + recoil * 7;
  const capeLift = Math.sin(progress * Math.PI * 12 + (blue ? 0 : 1.8)) * 9 + clash * 34 + approach * 14;

  return (
    <g transform={`translate(${origin} 0) rotate(${lean} 0 440) scale(${blue ? 1 : -1} 1)`}>
      {/* Long scarf/cape, cut into graphic anime shapes. */}
      <path d={`M-30 340 Q-125 ${286 - capeLift} -225 305 Q-158 342 -248 390 Q-170 378 -214 443 Q-126 426 -83 473 L-27 414Z`} fill={palette.shadow} stroke="#10131b" strokeWidth="9" strokeLinejoin="round" />
      <path d={`M-52 351 Q-130 ${318 - capeLift} -203 319 Q-160 348 -224 378 Q-152 364 -166 407 Q-110 386 -68 423`} fill="none" stroke={palette.main} strokeWidth="8" strokeLinecap="round" />
      <path d="M-65 411 L-175 442 L-104 427" fill="none" stroke={palette.light} strokeOpacity=".72" strokeWidth="3" />

      {/* Legs are separate angular plates to keep the full-body pose readable. */}
      <path d="M-39 492 L10 500 L-39 606 L-107 662 L-156 647 L-112 592Z" fill={palette.deep} stroke="#11131a" strokeWidth="11" strokeLinejoin="round" />
      <path d="M-105 592 L-161 635 L-181 681 L-130 699 L-84 660 L-45 619Z" fill={palette.shadow} stroke="#11131a" strokeWidth="10" strokeLinejoin="round" />
      <path d="M-180 675 L-131 692 L-106 718 L-185 725 L-215 709Z" fill="#96999a" stroke="#161821" strokeWidth="9" strokeLinejoin="round" />
      <path d="M13 495 L54 507 L83 594 L157 647 L142 682 L56 653 L-12 584Z" fill={palette.deep} stroke="#11131a" strokeWidth="11" strokeLinejoin="round" />
      <path d="M83 594 L159 637 L180 675 L145 699 L94 666 L48 637Z" fill={palette.shadow} stroke="#11131a" strokeWidth="9" strokeLinejoin="round" />
      <path d="M144 682 L180 676 L218 696 L197 718 L126 710Z" fill="#a6a6a0" stroke="#151821" strokeWidth="9" strokeLinejoin="round" />
      <path d="M-156 650 L-131 662 M145 649 L166 668" stroke={palette.trim} strokeWidth="6" />

      {/* Torso, plated collar, split coat, and belt. */}
      <path d="M-39 328 L25 323 L70 354 L81 450 L39 516 L-47 504 L-87 435 L-69 357Z" fill={palette.deep} stroke="#11131a" strokeWidth="12" strokeLinejoin="round" />
      <path d="M-55 366 L3 350 L54 372 L43 455 L1 488 L-48 467 L-68 425Z" fill={palette.shadow} stroke={palette.main} strokeWidth="5" strokeLinejoin="round" />
      <path d="M-4 360 L26 376 L12 438 L-12 466 L-27 428Z" fill={palette.deep} stroke={palette.trim} strokeWidth="4" />
      <path d="M-71 450 L-45 478 L-31 519 L-94 541 L-121 504Z" fill={palette.shadow} stroke="#15151b" strokeWidth="9" strokeLinejoin="round" />
      <path d="M-83 469 L-109 502 M-68 484 L-94 518" stroke={palette.trim} strokeWidth="4" />
      <path d="M40 451 L79 445 L63 510 L31 548 L-4 513 L15 476Z" fill={palette.main} stroke="#11131a" strokeWidth="9" strokeLinejoin="round" />
      <path d="M38 477 L64 469 L48 514 L29 529 L16 514Z" fill={palette.light} stroke="#25202a" strokeWidth="4" />
      <path d="M-81 486 L45 479 L60 508 L-50 529 L-99 515Z" fill="#dcc89f" stroke="#17151a" strokeWidth="7" />
      <path d="M-48 510 L-74 572 L-24 554 L4 587 L25 522Z" fill={palette.shadow} stroke="#15151a" strokeWidth="8" strokeLinejoin="round" />
      <path d="M-74 554 L-111 595 L-67 587 L-43 609 L-24 565Z" fill={palette.deep} stroke="#14151a" strokeWidth="7" />
      <path d="M-72 562 L-47 569 M-89 584 L-61 589" stroke={palette.trim} strokeWidth="4" />
      <circle cx="-26" cy="504" r="10" fill={palette.light} stroke="#221a21" strokeWidth="4" />

      {/* Shoulder guard and forward arm, connected directly to the sword grip. */}
      <path d="M-57 359 Q-50 324 -12 325 L26 349 L11 385 L-45 389Z" fill={palette.main} stroke="#11131a" strokeWidth="9" strokeLinejoin="round" />
      <path d="M-47 359 L-15 341 L1 358 L-13 378 L-42 379Z" fill={palette.light} stroke="#271e25" strokeWidth="4" />
      <path d={`M16 376 Q52 395 89 ${handY - 34} L119 ${handY} L88 ${handY + 17} L52 433 L15 417Z`} fill={palette.shadow} stroke="#12141b" strokeWidth="9" strokeLinejoin="round" />
      <path d={`M72 ${handY - 39} L109 ${handY - 23} L126 ${handY + 1} L102 ${handY + 20} L72 ${handY - 2}Z`} fill={palette.main} stroke="#17151a" strokeWidth="7" strokeLinejoin="round" />
      <path d={`M81 ${handY - 30} L108 ${handY - 18} L95 ${handY - 6}Z`} fill={palette.light} />
      <path d={`M36 405 L64 425 L91 ${handY - 38}`} fill="none" stroke={palette.trim} strokeWidth="4" />

      {/* Face, windswept hair, and one sharp highlighted eye. */}
      <path d="M-37 255 L-18 220 L6 237 L29 216 L44 247 L68 239 L61 280 L47 314 L17 334 L-20 316 L-39 287Z" fill="#e7c7ac" stroke="#10131b" strokeWidth="9" strokeLinejoin="round" />
      <path d="M-40 270 L-59 244 L-28 253 L-53 215 L-10 235 L-19 194 L12 225 L20 187 L38 228 L64 210 L53 246 L78 239 L56 275 L19 269 L-8 285Z" fill={blue ? "#202d44" : "#551c2c"} stroke="#11131a" strokeWidth="8" strokeLinejoin="round" />
      <path d="M20 278 L59 269 L50 284 L22 291Z" fill={palette.deep} />
      <path d="M33 282 L51 278" stroke={palette.light} strokeWidth="4" strokeLinecap="round" />
      <path d="M-22 309 Q5 327 31 309 L22 344 L-10 351Z" fill={palette.main} stroke="#14141a" strokeWidth="7" />
      <path d="M-39 330 L-67 354 L-31 364 L-1 344Z" fill={palette.deep} stroke="#15151a" strokeWidth="6" />
      <path d="M-60 354 L-39 359" stroke={palette.trim} strokeWidth="4" />

      {/* A single broad blade, rotated into the central collision point. */}
      <g transform={`translate(112 ${handY}) rotate(${swordAngle})`}>
        <path d="M-21 -12 L10 -17 L27 -8 L18 11 L-16 9Z" fill={palette.deep} stroke="#13151d" strokeWidth="6" />
        <path d="M2 -19 L15 19" stroke="#f4dfbe" strokeWidth="9" strokeLinecap="round" />
        <path d="M1 -21 L15 17" stroke={palette.trim} strokeWidth="4" strokeLinecap="round" />
        <path d="M18 -2 L267 -2 L294 0 L267 8 L18 7Z" fill="#e5e7df" stroke="#171920" strokeWidth="7" strokeLinejoin="round" />
        <path d="M26 0 L271 0" stroke={palette.main} strokeWidth="5" />
        <path d="M30 -4 L276 -4 L293 0 L277 1 L30 1Z" fill={palette.light} opacity=".9" />
        <path d="M18 -18 L23 19" stroke={palette.trim} strokeWidth="8" strokeLinecap="round" />
        <path d="M5 -23 L28 -18 M10 -17 L32 -12" stroke="#19171d" strokeWidth="5" />
      </g>
    </g>
  );
}

export default function BattleScene({ progress }: { progress: number }) {
  const firstClash = smooth(0.34, 0.45, progress) * (1 - smooth(0.49, 0.59, progress));
  const secondClash = smooth(0.76, 0.82, progress) * (1 - smooth(0.84, 0.92, progress));
  const clash = clamp(firstClash + secondClash);
  const impact = clamp(
    Math.exp(-Math.pow((progress - 0.465) * 31, 2)) +
    Math.exp(-Math.pow((progress - 0.815) * 36, 2)) * 0.92,
  );
  const firstRush = smooth(0.16, 0.43, progress) * (1 - smooth(0.48, 0.59, progress));
  const secondRush = smooth(0.67, 0.79, progress) * (1 - smooth(0.84, 0.94, progress));
  const approach = Math.max(firstRush, secondRush);
  const firstCameraIn = smooth(0.12, 0.45, progress) * (1 - smooth(0.49, 0.64, progress));
  const secondCameraIn = smooth(0.64, 0.82, progress) * (1 - smooth(0.84, 0.98, progress));
  const cameraScale = 1 + smooth(0, 0.22, progress) * 0.05 + firstCameraIn * 0.2 + secondCameraIn * 0.17;
  const cameraX = Math.sin(progress * Math.PI * 2) * 10 + Math.sin(progress * 380) * impact * 4;
  const cameraY = -firstCameraIn * 19 - secondCameraIn * 13 + Math.sin(progress * Math.PI * 2.4) * 7 + Math.cos(progress * 420) * impact * 3;
  const cameraTransform = `translate(${720 + cameraX} ${450 + cameraY}) scale(${cameraScale}) translate(-720 -450)`;
  const drift = progress * 220;
  const speedlineOpacity = 0.08 + approach * 0.52 + impact * 0.4;
  const rocks = useMemo(() => [
    { x: 382, y: 507, r: 22, d: "M-24 -4 L-12 -25 L9 -21 L23 -3 L9 20 L-14 15Z" },
    { x: 1134, y: 428, r: -19, d: "M-27 -12 L-8 -28 L20 -18 L25 4 L6 23 L-20 14Z" },
    { x: 883, y: 575, r: 13, d: "M-30 -7 L-10 -19 L14 -14 L24 8 L3 24 L-20 15Z" },
    { x: 540, y: 618, r: -14, d: "M-17 -19 L13 -24 L27 -4 L7 19 L-17 13Z" },
    { x: 1276, y: 600, r: 20, d: "M-20 -18 L11 -22 L25 -1 L13 21 L-15 17Z" },
  ], []);

  return (
    <svg className="battle-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Anime inspired duel between a frost swordsman and a fire swordswoman">
      <defs>
        <linearGradient id="battle-sky" x2="0" y2="1"><stop stopColor="#424858" /><stop offset=".4" stopColor="#c59d83" /><stop offset=".72" stopColor="#f3c88a" /><stop offset="1" stopColor="#55454a" /></linearGradient>
        <radialGradient id="battle-sun"><stop stopColor="#fff1c7" stopOpacity=".98" /><stop offset=".25" stopColor="#ffd28c" stopOpacity=".7" /><stop offset="1" stopColor="#f0a36e" stopOpacity="0" /></radialGradient>
        <linearGradient id="battle-ground" x2="0" y2="1"><stop stopColor="#806c68" /><stop offset=".45" stopColor="#403b43" /><stop offset="1" stopColor="#171923" /></linearGradient>
        <linearGradient id="magic-blue"><stop stopColor="#7deeff" stopOpacity="0" /><stop offset=".5" stopColor="#a7f7ff" /><stop offset="1" stopColor="#54dbff" stopOpacity="0" /></linearGradient>
        <linearGradient id="magic-gold"><stop stopColor="#ffe8a5" stopOpacity="0" /><stop offset=".5" stopColor="#fff2a6" /><stop offset="1" stopColor="#ffb847" stopOpacity="0" /></linearGradient>
        <filter id="battle-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="10" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="soft-smoke" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="15" /></filter>
      </defs>

      <g transform={cameraTransform}>
      <rect width="1440" height="900" fill="url(#battle-sky)" />
      <ellipse cx="797" cy="285" rx="440" ry="300" fill="url(#battle-sun)" />
      <circle cx="813" cy="317" r="77" fill="#ffe6b5" opacity=".34" />

      {/* Distant ridgelines and storm clouds. */}
      <g opacity=".66" transform={`translate(${-drift * .2} 0)`}>
        <path d="M0 397 L113 326 L182 364 L275 294 L379 375 L496 311 L598 372 L718 287 L837 368 L931 309 L1057 383 L1168 301 L1280 365 L1367 318 L1440 363 L1440 524 L0 524Z" fill="#574c55" />
        <path d="M0 431 L155 377 L262 406 L420 356 L567 420 L681 365 L811 409 L965 354 L1107 413 L1263 359 L1440 422 L1440 555 L0 555Z" fill="#88716d" opacity=".75" />
        <path d="M49 0 Q120 24 155 98 Q215 77 264 141 Q317 160 333 237 Q266 220 216 259 Q130 244 86 201 Q24 177 0 121Z" fill="#3d414c" />
        <path d="M1325 0 Q1235 40 1228 117 Q1158 119 1123 192 Q1083 225 1097 277 Q1173 248 1215 271 Q1307 257 1354 203 Q1417 174 1440 112Z" fill="#44444c" />
        <path d="M67 85 Q122 58 164 128 M118 137 Q185 106 232 173 M1251 110 Q1198 84 1164 151 M1313 165 Q1244 136 1206 197" fill="none" stroke="#c8b8a5" strokeWidth="13" strokeLinecap="round" opacity=".52" />
      </g>

      {/* Battlefield plane, distant figures, and dust sheets. */}
      <path d="M0 464 Q215 427 426 472 Q619 432 807 468 Q1050 432 1440 464 L1440 900 L0 900Z" fill="url(#battle-ground)" />
      <path d="M0 500 Q190 440 381 486 T765 480 T1150 477 T1440 454" fill="none" stroke="#d4a984" strokeOpacity=".53" strokeWidth="7" />
      <g opacity=".34" fill="#fff0d4" filter="url(#soft-smoke)">
        <path d="M-80 437 Q8 355 131 430 Q199 362 292 423 Q347 472 277 515 L-62 523Z" />
        <path d="M1102 430 Q1190 343 1284 423 Q1376 344 1497 427 L1498 529 L1100 512Z" />
      </g>
      <g fill="#292932" opacity=".66">
        <path d="M278 483 l0 -53 8 -17 8 17 0 53 -7 -17Z M264 456 l-16 -23 18 10 M295 455 l22 -25 -20 14" />
        <path d="M1166 472 l0 -62 8 -17 8 17 0 62 -7 -18Z M1152 442 l-18 -25 19 12 M1183 441 l22 -27 -21 17" />
        <path d="M427 478 l0 -40 6 -14 7 14 0 40Z M1006 471 l0 -52 6 -15 7 15 0 52Z" />
      </g>
      <g fill="none" stroke="#c5aaa0" strokeOpacity=".4" strokeWidth="4"><path d="M76 530 Q285 493 483 539 M1020 526 Q1209 484 1400 529 M373 476 Q526 462 620 485 M858 479 Q1044 450 1170 484" /></g>

      {/* Cracked earth converges on the swords. */}
      <g fill="none" stroke="#161821" strokeWidth="7" strokeLinecap="round" opacity=".8">
        <path d="M0 754 L196 718 L253 687 L310 706 L363 667 L461 676 L510 646 L582 659 L634 607 L711 630" />
        <path d="M1440 732 L1268 713 L1204 678 L1148 694 L1079 652 L1000 674 L940 635 L865 655 L816 609 L742 626" />
        <path d="M319 900 L369 838 L355 791 L412 742 M1093 900 L1046 845 L1068 793 L1011 744 M671 900 L690 833 L667 788 L708 745" />
        <path d="M119 609 L189 637 L239 620 M1321 610 L1260 637 L1219 616" />
      </g>
      <g fill="#817974" stroke="#262630" strokeWidth="8" strokeLinejoin="round">
        <path d="M237 706 l30 -36 46 10 15 38 -34 31 -48 -9Z" />
        <path d="M1194 677 l33 -39 41 8 26 39 -39 29 -45 -9Z" />
        <path d="M478 774 l34 -32 45 13 17 41 -31 26 -54 -12Z" />
        <path d="M923 752 l29 -34 47 10 15 42 -38 27 -49 -13Z" />
      </g>

      {/* Hand-drawn motion streaks, strongest during the rush. */}
      <g fill="none" stroke="#131620" strokeWidth="4" opacity={speedlineOpacity}>
        <path d="M0 125 L420 384 M0 230 L438 423 M92 0 L490 361 M1440 122 L1044 382 M1440 222 L1016 424 M1334 0 L969 364" />
        <path d="M135 66 L503 392 M1308 77 L958 391 M14 374 L425 466 M1427 367 L1027 458" strokeWidth="2" />
      </g>

      {/* Arcane ribbons frame the encounter and sweep inward on the strike. */}
      <g fill="none" strokeLinecap="round" filter="url(#battle-glow)" opacity={0.14 + clash * .7}>
        <path d="M144 603 C272 451 456 458 564 529 C643 588 691 485 780 448 C870 411 945 438 1004 539 C1116 626 1217 586 1310 482" stroke="#48dbff" strokeWidth="16" />
        <path d="M1290 607 C1164 453 1012 472 929 527 C848 580 842 483 780 448 C712 411 584 483 494 548 C398 619 274 580 196 480" stroke="#ffb94d" strokeWidth="15" />
      </g>
      <g fill="none" strokeLinecap="round" opacity={0.14 + clash * .55}>
        <path d="M173 593 C307 468 475 478 584 542 C656 585 712 482 780 448" stroke="#c0fbff" strokeWidth="4" />
        <path d="M1264 587 C1141 473 1006 488 915 541 C836 588 815 482 780 448" stroke="#fff0b6" strokeWidth="4" />
      </g>

      <g className="battle-action">
        {/* The two foreground duelists. */}
        <AnimeFighter side="frost" progress={progress} clash={clash} />
        <AnimeFighter side="ember" progress={progress} clash={clash} />

        {/* Debris kicks up and hangs around the impact. */}
        <g opacity={.3 + clash * .7}>
          {rocks.map((rock, i) => <g key={i} transform={`translate(${rock.x + Math.sin(progress * 13 + i) * 16} ${rock.y - impact * (42 + i * 8)}) rotate(${rock.r + progress * 45})`}>
            <path d={rock.d} fill={i % 2 ? "#6b6870" : "#8b7a70"} stroke="#272832" strokeWidth="7" strokeLinejoin="round" />
            <path d="M-10 -11 L8 -15 L17 -4 L2 0Z" fill="#c6a990" opacity=".66" />
          </g>)}
        </g>

        {/* A bright, unmistakable blade-on-blade contact point. */}
        <g transform="translate(780 448)" opacity={impact} filter="url(#battle-glow)">
        <circle r={28 + impact * 22} fill="#fff7d9" opacity=".88" />
        <circle r="9" fill="#fff" />
        <g stroke="#fff3c4" strokeWidth="7" strokeLinecap="round">
          <path d="M-3 -12 L-3 -77" /><path d="M5 13 L5 81" /><path d="M-15 -3 L-95 -3" /><path d="M15 5 L104 5" />
          <path d="M-12 -12 L-62 -66" /><path d="M12 12 L72 72" /><path d="M-14 12 L-70 67" /><path d="M13 -13 L68 -73" />
        </g>
        <g fill="#fff4c8"><path d="M-103 -43 l7 21 19 7 -19 7 -7 21 -7 -21 -19 -7 19 -7Z" /><path d="M93 21 l5 15 15 5 -15 5 -5 15 -5 -15 -15 -5 15 -5Z" /><circle cx="-52" cy="54" r="7" /><circle cx="52" cy="-54" r="6" /></g>
        </g>
        <g fill="#fff1c7" opacity={impact}>
          <path d="M698 329 l5 14 14 5 -14 5 -5 14 -5 -14 -14 -5 14 -5Z" />
          <path d="M878 412 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4Z" />
          <circle cx="737" cy="420" r="5" /><circle cx="846" cy="318" r="4" />
        </g>
      </g>
      <rect width="1440" height="900" fill="url(#battle-sky)" opacity=".035" />
      </g>
    </svg>
  );
}
