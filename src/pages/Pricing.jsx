// src/pages/Pricing.jsx — REDESIGNED FROM SCRATCH
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, GraduationCap, Globe, Check, ArrowRight, ChevronDown, Zap, Star, Users } from "lucide-react";

const T = { bg:"#F0FFFE",ink:"#0F172A",green:"#10B981",sky:"#0EA5E9",
  yellow:"#FFD166",pink:"#FF6B9D",purple:"#A78BFA",gold:"#C9A84C" };

const TABS = [
  {id:"coding",label:"Kids Coding",icon:Code2,emoji:"🎮",sub:"Ages 5–15"},
  {id:"cs",label:"CS Tuition",icon:GraduationCap,emoji:"📚",sub:"Classes 6–12"},
  {id:"web",label:"Web Dev",icon:Globe,emoji:"🌐",sub:"For Brands"},
];

const CODING_GRADES = [
  { label:"Grades 1–3",emoji:"🐥",color:"#FFD166",textColor:"#A8760A",
    hourly:400,monthly:3200,grpHourly:240,grpMonthly:1920,
    packages:[{c:30,p:9999,s:2001,d:17},{c:45,p:15800,s:2200,d:12},{c:90,p:28800,s:7200,d:20},{c:150,p:43800,s:16200,d:27}],
    kidImg:"/images/kids/pricing-little.png",
  },
  { label:"Grades 4–6",emoji:"🌱",color:"#06D6A0",textColor:"#047857",
    hourly:500,monthly:4000,grpHourly:300,grpMonthly:2400,
    packages:[{c:30,p:12999,s:2001,d:13},{c:45,p:19800,s:2700,d:12},{c:90,p:36000,s:9000,d:20},{c:150,p:54800,s:20200,d:27}],
    kidImg:"/images/kids/pricing-bright.png",
  },
  { label:"Grades 7+",emoji:"🦋",color:"#A78BFA",textColor:"#6D28D9",
    hourly:650,monthly:5200,grpHourly:390,grpMonthly:3120,
    packages:[{c:30,p:15999,s:3501,d:18},{c:45,p:25700,s:3550,d:12},{c:90,p:46800,s:11700,d:20},{c:150,p:71200,s:26300,d:27}],
    kidImg:"/images/kids/pricing-rising.png",
  },
];

const CS_GRADES = [
  {label:"Grades 5–8",emoji:"📘",color:"#4CC9F0",textColor:"#0284C7",hourly:200,monthly:1600,grpHourly:120,grpMonthly:960},
  {label:"Grades 9–10",emoji:"📗",color:"#06D6A0",textColor:"#047857",hourly:250,monthly:2000,grpHourly:150,grpMonthly:1200},
  {label:"Grades 11–12",emoji:"📕",color:"#A78BFA",textColor:"#6D28D9",hourly:300,monthly:2400,grpHourly:180,grpMonthly:1440},
];

const WHAT_INCLUDED = [
  "Live 1-on-1 or group classes","Personalized doubt clearing","Monthly progress report for parents",
  "Access to recorded session replays","Learning materials & worksheets","Certificate upon level completion",
  "WhatsApp parent support group","Free rescheduling (24hr notice)",
];

const WEB_PACKAGES = [
  { name:"Starter Site",price:"₹14,999",desc:"Perfect for personal brands, portfolios, and small businesses.",
    color:T.gold,features:["Up to 5 pages","Mobile responsive","Contact form","Basic SEO","1-month support"],emoji:"🚀" },
  { name:"Business Pro",price:"₹29,999",desc:"Full-featured website for growing businesses.",badge:"⭐ Most Popular",
    color:T.green,features:["Up to 12 pages","Custom UI/UX design","CMS (admin panel)","Google SEO setup","Blog/News section","3-month support"],emoji:"💼" },
  { name:"E-commerce",price:"₹49,999",desc:"Complete shopping experience with payments.",
    color:T.sky,features:["Unlimited products","Payment gateway","Order management","Product catalog","Inventory tracking","6-month support"],emoji:"🛒" },
];

/* BG-removed floating image */
const FloatImg = ({src,emoji,style,delay=0}) => (
  <motion.div animate={{y:[0,-12,0]}} transition={{duration:5+delay,repeat:Infinity,ease:"easeInOut",delay}}
    className="absolute pointer-events-none select-none" style={style}>
    <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"contain",
      filter:"drop-shadow(0 14px 28px rgba(0,0,0,0.13))"}}
      onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} />
    <div style={{display:"none",width:"100%",height:"100%",alignItems:"center",
      justifyContent:"center",fontSize:"3rem"}}>{emoji}</div>
  </motion.div>
);

const CodingSection = () => {
  const [gradeIdx,setGradeIdx] = useState(1);
  const [mode,setMode] = useState("monthly");
  const g = CODING_GRADES[gradeIdx];
  const isGrp = mode==="group";
  const hrPrice = isGrp?g.grpHourly:g.hourly;
  const moPrice = isGrp?g.grpMonthly:g.monthly;

  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <div className="relative rounded-[2rem] overflow-hidden p-8"
        style={{background:"linear-gradient(135deg,#0D0818,#0C1A14)",boxShadow:"0 20px 60px rgba(120,60,240,0.2)"}}>
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{background:`linear-gradient(90deg,${T.purple},${T.green},${T.yellow},${T.pink})`}} />
        <motion.div animate={{scale:[1,1.2,1]}} transition={{duration:8,repeat:Infinity}}
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{background:"radial-gradient(circle,rgba(167,139,250,0.15),transparent 70%)",transform:"translate(30%,-30%)"}} />
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{color:T.purple}}>🎮 Kids Coding Classes</p>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-xs text-white/40">Starting from</span>
              <span className="font-black text-white" style={{fontSize:"clamp(2rem,4vw,2.8rem)",letterSpacing:"-0.03em"}}>
                ₹{moPrice.toLocaleString()}
              </span>
              <span className="text-sm text-white/40">/month</span>
            </div>
            <p className="text-xs text-white/35">8 sessions/month · 2 per week · 1 hour each · Live online</p>
          </div>
          {/* Mini kid floats */}
          <div className="flex-shrink-0 flex gap-3">
            {[
              {src:"/images/kids/pricing-hero-1.png",emoji:"👦‍💻",s:80},
              {src:"/images/kids/pricing-hero-2.png",emoji:"👩‍💻",s:70},
            ].map((img,ii)=>(
              <motion.div key={ii} animate={{y:[0,-8+ii*3,0]}} transition={{duration:3+ii*0.5,repeat:Infinity}}
                style={{width:img.s,height:img.s,borderRadius:18,overflow:"hidden",
                  border:"2px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 24px rgba(0,0,0,0.3)"}}>
                <img src={img.src} alt="" style={{width:"100%",height:"100%",objectFit:"contain",mixBlendMode:"multiply"}}
                  onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} />
                <div style={{display:"none",width:"100%",height:"100%",alignItems:"center",
                  justifyContent:"center",fontSize:"2rem"}}>{img.emoji}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade & mode selectors */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="flex gap-2 flex-wrap">
          {CODING_GRADES.map((gr,i)=>(
            <button key={i} onClick={()=>setGradeIdx(i)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold border-2 transition-all"
              style={{background:gradeIdx===i?`${gr.color}15`:"#fff",borderColor:gradeIdx===i?`${gr.color}50`:"rgba(15,23,42,0.08)",
                color:gradeIdx===i?gr.textColor:"#64748B",boxShadow:gradeIdx===i?`0 4px 16px ${gr.color}25`:"none"}}>
              <span>{gr.emoji}</span>{gr.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[{id:"monthly",l:"Monthly"},{id:"group",l:"Group"}].map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all border"
              style={{background:mode===m.id?T.green:"#fff",color:mode===m.id?"#fff":"#64748B",
                borderColor:mode===m.id?T.green:"rgba(15,23,42,0.08)"}}>
              {m.l}
            </button>
          ))}
        </div>
      </div>

      {/* Rates */}
      <AnimatePresence mode="wait">
        <motion.div key={gradeIdx+mode} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
          transition={{duration:0.25}} className="grid sm:grid-cols-2 gap-4">
          {[
            {l:"Per Session",v:`₹${hrPrice}`,sub:isGrp?"Group class":"1-on-1 session",emoji:"🎯"},
            {l:"Monthly",v:`₹${moPrice.toLocaleString()}`,sub:"8 sessions · 2/week",emoji:"📅"},
          ].map((r,ri)=>(
            <div key={ri} className="p-6 rounded-2xl border-2 bg-white"
              style={{borderColor:`${g.color}35`,boxShadow:`0 8px 28px ${g.color}12`}}>
              <div className="text-2xl mb-2">{r.emoji}</div>
              <div className="font-black text-3xl mb-1" style={{color:T.ink}}>{r.v}</div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{color:g.textColor}}>{r.l}</div>
              <div className="text-xs text-slate-400 mt-1">{r.sub}</div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Packages */}
      <h3 className="font-black text-xl" style={{color:T.ink}}>Class Packages — Save More 💰</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {g.packages.map((pkg,pi)=>(
          <motion.div key={pi} whileHover={{y:-8,scale:1.02}}
            className="p-5 rounded-2xl border-2 bg-white relative overflow-hidden"
            style={{borderColor:`${g.color}35`,boxShadow:`0 6px 20px ${g.color}12`}}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{background:g.color}} />
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{color:g.textColor}}>
              {pkg.c} Classes
            </div>
            <div className="font-black text-2xl mb-1" style={{color:T.ink}}>₹{pkg.p.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mb-3">Save ₹{pkg.s.toLocaleString()} · {pkg.d}% off</div>
            <div className="px-3 py-1 rounded-full text-xs font-black text-white w-fit"
              style={{background:g.color}}>Save {pkg.d}%</div>
            <a href="https://wa.link/5pk793"
              className="mt-4 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-bold text-white"
              style={{background:g.color}}>
              Get This Plan <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CSTuitionSection = () => {
  const [idx,setIdx] = useState(0);
  const g = CS_GRADES[idx];
  return (
    <div className="space-y-8">
      <div className="relative rounded-[2rem] overflow-hidden p-8"
        style={{background:"linear-gradient(135deg,#0F172A,#0C1A3A)",boxShadow:"0 20px 60px rgba(14,165,233,0.2)"}}>
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{background:`linear-gradient(90deg,${T.sky},${T.purple},${T.green})`}} />
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{color:T.sky}}>📚 Academic CS Tuition</p>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-xs text-white/40">Starting from</span>
          <span className="font-black text-white text-4xl" style={{letterSpacing:"-0.03em"}}>
            ₹{g.monthly.toLocaleString()}
          </span>
          <span className="text-sm text-white/40">/month</span>
        </div>
        <p className="text-xs text-white/35">CBSE · ICSE · ISC · IGCSE · 8 sessions/month</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {CS_GRADES.map((gr,i)=>(
          <button key={i} onClick={()=>setIdx(i)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold border-2 transition-all"
            style={{background:idx===i?`${gr.color}15`:"#fff",borderColor:idx===i?`${gr.color}50`:"rgba(15,23,42,0.08)",
              color:idx===i?gr.textColor:"#64748B"}}>
            <span>{gr.emoji}</span>{gr.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
          transition={{duration:0.25}} className="grid sm:grid-cols-2 gap-4">
          {[
            {l:"Per Session (1-on-1)",v:`₹${g.hourly}`,emoji:"🎯"},
            {l:"Per Session (Group)",v:`₹${g.grpHourly}`,emoji:"👫"},
            {l:"Monthly (1-on-1)",v:`₹${g.monthly.toLocaleString()}`,emoji:"📅"},
            {l:"Monthly (Group)",v:`₹${g.grpMonthly.toLocaleString()}`,emoji:"🗓️"},
          ].map((r,ri)=>(
            <div key={ri} className="p-6 rounded-2xl border-2 bg-white"
              style={{borderColor:`${g.color}35`,boxShadow:`0 8px 28px ${g.color}12`}}>
              <div className="text-2xl mb-2">{r.emoji}</div>
              <div className="font-black text-3xl mb-1" style={{color:T.ink}}>{r.v}</div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{color:g.textColor}}>{r.l}</div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <a href="https://wa.link/5pk793"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white"
        style={{background:`linear-gradient(135deg,${g.color},${g.textColor})`,boxShadow:`0 8px 28px ${g.color}30`}}>
        Book CS Tuition Session <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  );
};

const WebDevSection = () => (
  <div className="space-y-6">
    <div className="relative rounded-[2rem] overflow-hidden p-8"
      style={{background:"linear-gradient(135deg,#1A0E00,#0E1A0A)",boxShadow:"0 20px 60px rgba(201,168,76,0.2)"}}>
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{background:`linear-gradient(90deg,${T.gold},${T.green},${T.sky})`}} />
      <p className="text-xs font-black uppercase tracking-widest mb-2" style={{color:T.gold}}>🌐 Web Development Services</p>
      <div className="font-black text-white text-4xl mb-1" style={{letterSpacing:"-0.03em"}}>Custom pricing</div>
      <p className="text-xs text-white/40">Based on scope, pages, and features. Free quote in 24 hrs.</p>
    </div>
    <div className="grid sm:grid-cols-3 gap-5">
      {WEB_PACKAGES.map((pkg,i)=>(
        <motion.div key={i} whileHover={{y:-10}}
          className="p-6 rounded-[1.8rem] border-2 bg-white relative overflow-hidden"
          style={{borderColor:`${pkg.color}35`,boxShadow:`0 8px 28px ${pkg.color}12`}}>
          {pkg.badge && (
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[9px] font-black text-white"
              style={{background:pkg.color}}>{pkg.badge}</div>
          )}
          <div className="text-3xl mb-3">{pkg.emoji}</div>
          <h4 className="font-black text-lg mb-1" style={{color:T.ink}}>{pkg.name}</h4>
          <div className="font-black text-2xl mb-2" style={{color:pkg.color}}>{pkg.price}</div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">{pkg.desc}</p>
          <ul className="space-y-2 mb-5">
            {pkg.features.map((f,fi)=>(
              <li key={fi} className="flex items-center gap-2 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{color:pkg.color}} />{f}
              </li>
            ))}
          </ul>
          <a href="https://wa.link/5pk793"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white"
            style={{background:pkg.color}}>
            Get Quote <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      ))}
    </div>
  </div>
);

const Pricing = () => {
  const [activeTab,setActiveTab] = useState("coding");

  return (
    <section className="min-h-screen  relative overflow-hidden py-30" style={{background:T.bg}}>
      {/* Live background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{backgroundImage:"radial-gradient(circle at 1px 1px, rgba(16,185,129,0.14) 1px, transparent 0)",backgroundSize:"40px 40px"}} />
        {[{c:T.gold,x:"auto",y:"-5%",s:"35vw",right:true,dur:18},
          {c:T.green,x:"-5%",y:"20%",s:"30vw",dur:22},
          {c:T.purple,x:"auto",bottom:true,s:"28vw",right:true,dur:16}].map((o,i)=>(
          <motion.div key={i} animate={{scale:[1,1.18,1]}} transition={{duration:o.dur,repeat:Infinity,ease:"easeInOut"}}
            className="absolute rounded-full"
            style={{width:o.s,height:o.s,left:o.right?"auto":o.x,right:o.right?"-5%":undefined,
              top:o.bottom?"auto":o.y,bottom:o.bottom?"-5%":undefined,
              background:`radial-gradient(circle,${o.c}12 0%,transparent 70%)`,filter:"blur(50px)"}} />
        ))}
        {/* Floating price tags */}
        {[{t:"₹400/hr",top:"12%",left:"3%",c:T.yellow},
          {t:"Save 27%",top:"25%",right:"3%",c:T.green},
          {t:"Free Trial",bottom:"18%",left:"2%",c:T.sky},
          {t:"No hidden fees",bottom:"8%",right:"2%",c:T.purple}].map((c,i)=>(
          <motion.div key={i} animate={{y:[0,-16,0],opacity:[0.7,1,0.7]}}
            transition={{duration:6+i,repeat:Infinity,delay:i*0.9}}
            className="absolute text-xs font-black px-3 py-1.5 rounded-xl bg-white/75 backdrop-blur-sm border"
            style={{top:c.top,left:c.left,right:c.right,bottom:c.bottom,
              borderColor:`${c.c}25`,color:c.c}}>{c.t}</motion.div>
        ))}
      </div>

      {/* Floating kid images */}
      <FloatImg src="/images/kids/pricing-float-1.png" emoji="😊"
        style={{width:100,height:140,top:"15%",right:"1.5%",zIndex:1}} delay={0} />
      <FloatImg src="/images/kids/pricing-float-2.png" emoji="💰"
        style={{width:85,height:115,bottom:"20%",left:"0.5%",zIndex:1}} delay={1.5} />
      <FloatImg src="/images/kids/pricing-coin.png" emoji="💎"
        style={{width:65,height:65,top:"40%",right:"1%",zIndex:1}} delay={0.7} />

      <div className="max-w-6xl mx-auto px-4 px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 mb-8">
            <div className="flex-1">
              <p className="text-xs font-black tracking-widest uppercase mb-3" style={{color:T.gold,letterSpacing:"0.12em"}}>
                💎 Transparent Pricing
              </p>
              <h1 className="font-black mb-3" style={{color:T.ink,letterSpacing:"-0.04em",
                fontSize:"clamp(2.2rem,5vw,3.5rem)",lineHeight:1.1}}>
                Simple, honest{" "}
                <span style={{background:`linear-gradient(135deg,${T.gold},${T.green})`,
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  fee details
                </span>
              </h1>
              <p className="text-slate-500 max-w-md leading-relaxed">
                No hidden charges. No registration fees. No tricks. Pay only for sessions you book — and save big with packages.
              </p>
            </div>
            {/* Header kid floats */}
            <div className="flex gap-3 flex-shrink-0">
              {[{src:"/images/kids/pricing-h1.png",emoji:"😊",s:72},
                {src:"/images/kids/pricing-h2.png",emoji:"💻",s:80},
                {src:"/images/kids/pricing-h3.png",emoji:"👫",s:72}].map((img,ii)=>(
                <motion.div key={ii} animate={{y:[0,-6+ii*2,0]}}
                  transition={{duration:3+ii*0.4,repeat:Infinity,delay:ii*0.3}}
                  style={{width:img.s,height:img.s,borderRadius:18,overflow:"hidden",
                    border:"2px solid rgba(201,168,76,0.2)",boxShadow:"0 8px 24px rgba(0,0,0,0.08)"}}>
                  <img src={img.src} alt="" style={{width:"100%",height:"100%",objectFit:"contain",mixBlendMode:"multiply"}}
                    onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} />
                  <div style={{display:"none",width:"100%",height:"100%",alignItems:"center",
                    justifyContent:"center",fontSize:"2rem"}}>{img.emoji}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What's always included */}
          <div className="p-6 rounded-2xl border-2 bg-white mb-8"
            style={{borderColor:"rgba(16,185,129,0.2)",boxShadow:"0 4px 20px rgba(16,185,129,0.06)"}}>
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{color:T.green}}>✅ Always included in every plan</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {WHAT_INCLUDED.map((w,wi)=>(
                <div key={wi} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 flex-shrink-0" style={{color:T.green}} />{w}
                </div>
              ))}
            </div>
          </div>

          {/* Tab cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            {TABS.map(tab=>(
              <motion.button key={tab.id} onClick={()=>setActiveTab(tab.id)}
                whileHover={{y:-3}} whileTap={{scale:0.98}}
                className="flex items-center gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-250"
                style={{background:activeTab===tab.id?T.ink:"#fff",
                  borderColor:activeTab===tab.id?T.ink:"rgba(15,23,42,0.08)",
                  boxShadow:activeTab===tab.id?"0 12px 40px rgba(15,23,42,0.2)":"0 2px 8px rgba(0,0,0,0.03)"}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{background:activeTab===tab.id?"rgba(201,168,76,0.2)":"rgba(16,185,129,0.08)"}}>
                  <tab.icon className="w-5 h-5" style={{color:activeTab===tab.id?T.gold:T.green}} />
                </div>
                <div>
                  <div className="text-sm font-black" style={{color:activeTab===tab.id?"#fff":T.ink}}>{tab.label}</div>
                  <div className="text-xs" style={{color:activeTab===tab.id?"rgba(255,255,255,0.4)":"#94A3B8"}}>{tab.sub}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            transition={{duration:0.3}}>
            {activeTab==="coding" && <CodingSection />}
            {activeTab==="cs"     && <CSTuitionSection />}
            {activeTab==="web"    && <WebDevSection />}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
          className="mt-16 rounded-[2.5rem] overflow-hidden border-2 relative"
          style={{borderColor:"rgba(201,168,76,0.2)",boxShadow:"0 16px 60px rgba(201,168,76,0.1)"}}>
          <div className="absolute inset-0" style={{background:"linear-gradient(135deg,#FFFDF5,#F9F5FF)"}} />
          <div className="absolute top-0 left-0 right-0 h-1.5"
            style={{background:`linear-gradient(90deg,${T.purple},${T.green},${T.gold},${T.pink})`}} />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-10 lg:p-12">
            {/* Kid images */}
            <div className="lg:w-2/5 flex gap-4 justify-center">
              {[{src:"/images/kids/cta-1.png",emoji:"🙋‍♀️",s:90},
                {src:"/images/kids/cta-2.png",emoji:"🧑‍💻",s:110},
                {src:"/images/kids/cta-3.png",emoji:"🎉",s:90}].map((img,ii)=>(
                <motion.div key={ii} animate={{y:[0,-8+ii*3,0]}}
                  transition={{duration:3+ii*0.5,repeat:Infinity,delay:ii*0.3}}
                  style={{width:img.s,height:img.s,borderRadius:22,overflow:"hidden",
                    border:"2px solid rgba(167,139,250,0.2)",boxShadow:"0 8px 24px rgba(0,0,0,0.08)",
                    alignSelf:ii===1?"flex-start":"flex-end"}}>
                  <img src={img.src} alt="" style={{width:"100%",height:"100%",objectFit:"contain",mixBlendMode:"multiply"}}
                    onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} />
                  <div style={{display:"none",width:"100%",height:"100%",alignItems:"center",
                    justifyContent:"center",fontSize:"2.5rem"}}>{img.emoji}</div>
                </motion.div>
              ))}
            </div>
            <div className="lg:w-3/5 text-center lg:text-left">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{color:T.gold}}>Not sure which plan?</p>
              <h3 className="font-black mb-3"
                style={{fontSize:"clamp(1.6rem,3.5vw,2.2rem)",color:T.ink,letterSpacing:"-0.03em"}}>
                Book a{" "}
                <span style={{background:`linear-gradient(135deg,${T.gold},${T.green})`,
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  free demo class
                </span>
              </h3>
              <p className="text-sm mb-6 max-w-md mx-auto lg:mx-0 text-slate-500 leading-relaxed">
                Try a free 30-min session — no commitment, no payment. We'll understand your board, grade, and goals before recommending the perfect plan.
              </p>
              <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
                <motion.a href="https://wa.link/5pk793"
                  whileHover={{scale:1.03,boxShadow:`0 8px 30px ${T.gold}40`}}
                  className="px-6 py-3.5 rounded-2xl text-sm font-black"
                  style={{background:`linear-gradient(135deg,${T.gold},#A07830)`,color:"#0E0E0E",
                    boxShadow:`0 4px 20px ${T.gold}30`}}>
                  Book Free Demo →
                </motion.a>
                <motion.a href="https://wa.link/5pk793"
                  whileHover={{scale:1.03}}
                  className="px-6 py-3.5 rounded-2xl text-sm font-bold border-2 transition-all"
                  style={{color:T.ink,borderColor:"rgba(15,23,42,0.15)",background:"#fff"}}>
                  💬 Chat on WhatsApp
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;