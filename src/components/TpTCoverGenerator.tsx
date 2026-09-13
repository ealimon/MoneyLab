import React, { useRef, useState } from "react";
import { Sparkles, Download, BookOpen, Gamepad2, Brain, Award, Coins, ShoppingBag, CheckCircle2, ShieldCheck, Flame } from "lucide-react";

export default function TpTCoverGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const drawCover = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 2000;
    const H = 2000;
    canvas.width = W;
    canvas.height = H;

    // 1. Background Gradient (Crisp, High-Converting EdTech Sky & Sapphire)
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#0284c7");   // Sky-600
    bgGrad.addColorStop(0.35, "#0369a1"); // Sky-700
    bgGrad.addColorStop(0.75, "#0f172a"); // Slate-900
    bgGrad.addColorStop(1, "#090d16");    // Deep Navy
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Decorative ambient circles
    const drawOrb = (x: number, y: number, r: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    drawOrb(300, 300, 500, "rgba(56, 189, 248, 0.25)");
    drawOrb(1700, 500, 600, "rgba(250, 204, 21, 0.2)");
    drawOrb(1000, 1600, 700, "rgba(16, 185, 129, 0.15)");

    // 2. Bold Top Header Pill Banner
    const drawPill = (x: number, y: number, w: number, h: number, r: number, fill: string, stroke = "", strokeW = 0) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeW;
        ctx.stroke();
      }
    };

    // Target Grades Pill (Top Center)
    drawPill(W / 2 - 420, 90, 840, 95, 48, "#fef08a", "#ca8a04", 8);
    ctx.fillStyle = "#713f12";
    ctx.font = "900 48px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("⭐ GRADES 4 – 9  •  UPPER ELEM & MIDDLE SCHOOL ⭐", W / 2, 138);

    // 3. Main Product Super Title
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 12;

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 135px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("FINANCIAL LITERACY", W / 2, 310);

    // Sub-Super Title (Yellow Gradient Effect)
    ctx.fillStyle = "#facc15";
    ctx.font = "900 105px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.fillText("INTERACTIVE WEB CURRICULUM", W / 2, 435);

    ctx.shadowColor = "transparent";

    // Subtitle Pill
    drawPill(W / 2 - 580, 500, 1160, 85, 42, "rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.4)", 4);
    ctx.fillStyle = "#e0f2fe";
    ctx.font = "800 38px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.fillText("10 COMPLETE MODULES  •  SIMULATION GAMES  •  80+ QUIZZES", W / 2, 542);

    // 4. Center Hero Graphic Section: 3 Floating Interactive Preview Cards
    // Card 1 (Left): Debt & Credit Simulator
    const drawCard = (x: number, y: number, w: number, h: number, rot: number, title: string, subtitle: string, icon: string, accentColor: string, borderColor: string, tag: string) => {
      ctx.save();
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.translate(-(w / 2), -(h / 2));

      // Card Shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 25;

      // Card Background
      drawPill(0, 0, w, h, 36, "#ffffff");

      // Inner Border
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.shadowColor = "transparent";

      // Card Header Tag
      drawPill(30, 30, w - 60, 60, 20, accentColor);
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 28px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tag, w / 2, 60);

      // Icon Circle
      drawPill(w / 2 - 70, 120, 140, 140, 70, "#f8fafc", borderColor, 4);
      ctx.font = "80px system-ui";
      ctx.fillText(icon, w / 2, 195);

      // Card Title
      ctx.fillStyle = "#0f172a";
      ctx.font = "900 38px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(title, w / 2, 310);

      // Card Subtitle
      ctx.fillStyle = "#64748b";
      ctx.font = "700 26px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(subtitle, w / 2, 360);

      // Mini Visual Element (Bar or Buttons)
      drawPill(40, 420, w - 80, 70, 20, "#e2e8f0");
      drawPill(40, 420, (w - 80) * 0.75, 70, 20, accentColor);
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 28px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText("Interactive Simulation ▶", w / 2, 455);

      ctx.restore();
    };

    // Draw Left, Right, and Center Hero Cards
    drawCard(110, 650, 520, 530, -5, "Debt & Credit", "The Borrowing Beast", "👾", "#e11d48", "#f43f5e", "MODULE 7 SIMULATOR");
    drawCard(1370, 650, 520, 530, 5, "Stock Market", "Portfolio Simulator", "📈", "#059669", "#10b981", "MODULE 8 SIMULATOR");

    // Center Large Card: The 50/30/20 Budget Engine + Mascot
    ctx.save();
    ctx.translate(560, 610);
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 30;

    // Big Center Card Body
    drawPill(0, 0, 880, 610, 44, "#ffffff", "#38bdf8", 12);
    ctx.shadowColor = "transparent";

    // Header Badge
    drawPill(40, 35, 800, 70, 24, "#0284c7");
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 34px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎮 HANDS-ON INTERACTIVE LEARNING ENGINE", 440, 70);

    // Mascot Center Showcase
    drawPill(60, 135, 260, 260, 130, "#fef08a", "#eab308", 8);
    ctx.font = "140px system-ui";
    ctx.fillText("🧪", 190, 275);

    ctx.fillStyle = "#713f12";
    ctx.font = "900 24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("MoneyLab Simulator", 190, 430);

    // Center Card Feature List
    const bulletList = [
      { text: "10 Interactive Financial Simulations", icon: "🧪" },
      { text: "Stock Market, Tax & Budget Labs", icon: "🕹️" },
      { text: "Dynamic 80+ Question Randomized Quizzes", icon: "🧠" },
      { text: "Avatar Customizer & Star Rewards 🪙", icon: "👕" }
    ];

    bulletList.forEach((b, i) => {
      const by = 150 + i * 72;
      drawPill(350, by, 480, 60, 18, "#f0f9ff", "#bae6fd", 3);
      ctx.textAlign = "left";
      ctx.font = "30px system-ui";
      ctx.fillText(b.icon, 370, by + 30);
      ctx.fillStyle = "#0369a1";
      ctx.font = "800 24px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(b.text, 420, by + 32);
    });

    // Center Card Bottom Banner
    drawPill(40, 480, 800, 95, 28, "#22c55e", "#16a34a", 6);
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 38px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ 100% READY TO USE • ZERO INSTALLATION ✨", 440, 528);

    ctx.restore();

    // 5. Four Feature Pillars across Bottom Area
    const pillars = [
      { title: "Zero Prep Needed", desc: "Open link & play in browser", icon: "⚡", bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
      { title: "Dynamic Quizzes", desc: "Shuffled questions & options", icon: "🎲", bg: "#e0e7ff", border: "#6366f1", text: "#3730a3" },
      { title: "Printable Worksheets", desc: "10 Module Activity Sheets", icon: "📝", bg: "#fce7f3", border: "#ec4899", text: "#9d174d" },
      { title: "Gamified Shop", desc: "Earn Coins & Buy Outfits", icon: "🛍️", bg: "#dcfce7", border: "#22c55e", text: "#166534" }
    ];

    const pillarW = 415;
    const pillarH = 260;
    const gap = 40;
    const startX = 100;
    const startY = 1270;

    pillars.forEach((p, i) => {
      const px = startX + i * (pillarW + gap);
      // Pillar Card
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 15;
      drawPill(px, startY, pillarW, pillarH, 30, p.bg, p.border, 6);
      ctx.shadowColor = "transparent";

      // Icon Box
      drawPill(px + pillarW / 2 - 50, startY + 25, 100, 100, 50, "#ffffff", p.border, 4);
      ctx.font = "55px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.icon, px + pillarW / 2, startY + 75);

      // Title
      ctx.fillStyle = p.text;
      ctx.font = "900 32px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(p.title, px + pillarW / 2, startY + 160);

      // Desc
      ctx.fillStyle = "#475569";
      ctx.font = "700 24px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(p.desc, px + pillarW / 2, startY + 205);
    });

    // 6. Bottom Banner / Call to Action Strip
    const bannerY = 1580;
    const bannerH = 340;

    // Bottom Container
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;
    drawPill(80, bannerY, W - 160, bannerH, 40, "#0f172a", "#38bdf8", 8);
    ctx.shadowColor = "transparent";

    // Highlighted Yellow Top Stripe in Banner
    drawPill(120, bannerY + 30, W - 240, 75, 20, "#eab308");
    ctx.fillStyle = "#422006";
    ctx.font = "900 36px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("WORKS SEAMLESSLY ON CHROMEBOOKS, IPADS, PCS & MACS!", W / 2, bannerY + 68);

    // Topic Highlights Tags
    const topics = [
      "💰 Budgeting 50/30/20",
      "📈 Stocks & Index Funds",
      "💳 Debt & Credit Cards",
      "🧾 Taxes & Paychecks",
      "⏳ Compound Interest",
      "🏦 Bank Accounts & Checks"
    ];

    const tagStartX = 120;
    const tagStartY = bannerY + 135;
    const tagW = 560;
    const tagH = 65;

    topics.forEach((t, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const tx = tagStartX + col * (tagW + 40);
      const ty = tagStartY + row * (tagH + 18);

      drawPill(tx, ty, tagW, tagH, 18, "#1e293b", "#475569", 2);
      ctx.fillStyle = "#38bdf8";
      ctx.font = "800 28px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(t, tx + tagW / 2, ty + 34);
    });

    // Bottom Watermark / Teacher Trust Seal
    ctx.fillStyle = "#94a3b8";
    ctx.font = "700 26px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Created by FinKid Academy  •  Comprehensive Real-World Financial Literacy Curriculum", W / 2, 1960);
  };

  const handleDownload = () => {
    setIsExporting(true);
    drawCover();
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert to 2000x2000 PNG download
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = "FinKid-Academy-TpT-Cover-2000x2000.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      setIsExporting(false);
    }, 100);
  };

  React.useEffect(() => {
    drawCover();
  }, []);

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl text-white max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
              TpT Store Asset
            </span>
            <span className="text-xs text-sky-400 font-mono font-bold">2000 × 2000 PX HIGH RESOLUTION</span>
          </div>
          <h2 className="text-2xl font-black font-display tracking-tight text-white mt-1">
            FinKid Academy TpT Product Cover
          </h2>
          <p className="text-sm text-slate-400 font-medium">
            Standard high-converting 1:1 square cover formatted for the Teachers Pay Teachers store.
          </p>
        </div>

        <button
          id="download-tpt-cover-btn"
          onClick={handleDownload}
          disabled={isExporting}
          className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-yellow-950 font-black px-6 py-3.5 rounded-2xl shadow-lg border-b-4 border-yellow-600 transition-all flex items-center justify-center gap-2 cursor-pointer font-display uppercase tracking-wider text-sm whitespace-nowrap"
        >
          <Download className="w-5 h-5" />
          {isExporting ? "Generating PNG..." : "Download 2000×2000 PNG"}
        </button>
      </div>

      {/* Interactive Preview Canvas */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={2000}
          height={2000}
          className="w-full max-w-[540px] aspect-square rounded-2xl shadow-2xl border-2 border-slate-700 bg-slate-900"
        />
        <p className="text-xs text-slate-500 font-medium mt-3 text-center">
          Rendered at 2000×2000px native canvas resolution. Click the button above to export the crisp PNG directly to your computer.
        </p>
      </div>
    </div>
  );
}
