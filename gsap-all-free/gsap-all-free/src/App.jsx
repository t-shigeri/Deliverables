import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// 無料プラグイン群
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  Draggable,
  Flip,
  MotionPathPlugin,
  Observer
);

export default function App() {
  const tweenBox = useRef(null);
  const tlTitle = useRef(null);
  const listWrap = useRef(null);
  const scrollAreaRef = useRef(null);
  const dragRef = useRef(null);
  const flipGridRef = useRef(null);
  const pathRef = useRef(null);
  const ballRef = useRef(null);
  const observerPanelRef = useRef(null);

  const [flipOrder, setFlipOrder] = useState([1,2,3,4,5,6,7,8]);

  // 1) Tween & Easing
  const runTween = () => {
    const el = tweenBox.current;
    gsap.fromTo(el,
      { x: 0, opacity: 0.6, rotate: 0 },
      { x: 220, opacity: 1, rotate: 10, duration: 0.8, ease: "power2.out", yoyo: true, repeat: 1 }
    );
  };

  // 2) Timeline
  useEffect(() => {
    const q = gsap.utils.selector(tlTitle);
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(q(".tl-1"), { y: -20, opacity: 0, duration: 0.4 })
      .from(q(".tl-2"), { y:  20, opacity: 0, duration: 0.4 }, "-=0.2")
      .from(q(".tl-3"), { scale: 0.9, opacity: 0, duration: 0.35 }, "-=0.1");
    return () => tl.kill();
  }, []);

  // 3) Stagger list
  const runStagger = () => {
    const pills = listWrap.current.querySelectorAll(".pill");
    gsap.fromTo(pills,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: "power1.out", stagger: 0.05 }
    );
  };

  // 4) ScrollTrigger（各 .section 登場）
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".section").forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: { trigger: sec, start: "top 80%" },
          y: 30, opacity: 0, duration: 0.5, ease: "power2.out"
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // 5) ScrollTo（ページ内スムーズスクロール）
  const scrollToDemo = (id) => {
    gsap.to(window, { duration: 0.6, scrollTo: id, ease: "power2.out" });
  };

  // 6) Draggable（無料版 / inertia 無し）
  useEffect(() => {
    const el = dragRef.current;
    const bounds = scrollAreaRef.current || window;
    const d = Draggable.create(el, {
      type: "x,y",
      bounds,
      edgeResistance: 0.65,
      onPress() { gsap.to(el, { scale: 1.05, duration: 0.15 }); },
      onRelease() { gsap.to(el, { scale: 1.0, duration: 0.15 }); }
    });
    return () => d.forEach(x => x.kill());
  }, []);

  // 7) Flip（グリッドの並べ替え）
  const shuffleFlip = () => {
    const grid = flipGridRef.current;
    const state = Flip.getState(grid.querySelectorAll(".cell"));
    setFlipOrder(prev => gsap.utils.shuffle([...prev]));
    requestAnimationFrame(() => {
      Flip.from(state, { duration: 0.5, ease: "power2.out", absolute: true });
    });
  };

  // 8) MotionPath（SVGパスに沿って移動）
  const runMotionPath = () => {
    gsap.to(ballRef.current, {
      duration: 3,
      ease: "none",
      repeat: 1,
      yoyo: true,
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        autoRotate: true
      }
    });
  };

  // 9) Observer（ホイール/タッチでパネル切替）
  useEffect(() => {
    const panel = observerPanelRef.current;
    let page = 1;
    const setPage = (n) => {
      page = gsap.utils.clamp(1, 3, n);
      gsap.to(panel, { xPercent: -(page-1)*100, duration: 0.4, ease: "power2.out" });
    };
    const obs = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: 1,
      onDown: () => setPage(page+1),
      onUp:   () => setPage(page-1),
      tolerance: 10,
      preventDefault: true
    });
    return () => obs.kill();
  }, []);

  return (
    <div className="app">
      <header ref={tlTitle}>
        <h1><span className="tl-1">GSAP </span><span className="tl-2">Free </span><span className="tl-3">Showcase</span></h1>
        <p className="sub">
          Tween / Timeline / Stagger / ScrollTrigger / ScrollTo / Draggable / Flip / MotionPath / Observer（無料範囲） — 下の <span className="kbd">Run</span> を押して体験
        </p>
        <div className="row">
          <button className="btn" onClick={() => scrollToDemo("#scroll-area")}>ScrollTo: 下のデモへ</button>
          <a className="anchor" onClick={() => scrollToDemo("body")}>Topへ戻る</a>
        </div>
      </header>

      <div className="grid">

        <section className="section" id="tween">
          <h2>1) Tween & Easing</h2>
          <div className="row">
            <div ref={tweenBox} className="box">Box</div>
            <button className="btn" onClick={runTween}>Run</button>
            <span className="badge">ease: power2.out / yoyo</span>
          </div>
        </section>

        <section className="section">
          <h2>2) Timeline（順番制御）</h2>
          <div className="row">
            <div className="box">step 1</div>
            <div className="box">step 2</div>
            <div className="box">step 3</div>
            <span className="badge">ページ表示時に順次登場</span>
          </div>
        </section>

        <section className="section">
          <h2>3) Stagger（まとめて自然に）</h2>
          <div className="row list" ref={listWrap}>
            {["Apple","Banana","Cherry","Durian","Elderberry","Fig","Grape"].map((t,i)=>(
              <div key={i} className="pill">{t}</div>
            ))}
          </div>
          <button className="btn" onClick={runStagger}>Run</button>
        </section>

        <section className="section" id="scroll-area" ref={scrollAreaRef}>
          <h2>4) ScrollTrigger（スクロールで発火）</h2>
          <p className="badge">各 .section は「top 80%」でふわっと登場</p>
          <div style={{height: 8}} />
          <div className="row">
            <div className="card">セクションがビューポートに入ると発火</div>
          </div>
        </section>

        <section className="section">
          <h2>5) ScrollTo（スムーズスクロール）</h2>
          <div className="row">
            <button className="btn" onClick={() => scrollToDemo("#drag")}>ドラッグデモへ移動</button>
            <button className="btn ghost" onClick={() => scrollToDemo("#flip")}>Flipへ移動</button>
          </div>
        </section>

        <section className="section" id="drag">
          <h2>6) Draggable（要素をドラッグ）</h2>
          <div className="row" style={{position:"relative", minHeight:120}}>
            <div ref={dragRef} className="circle">Drag me</div>
            <span className="badge">bounds: セクション内 / inertia なし（有料）</span>
          </div>
        </section>

        <section className="section" id="flip">
          <h2>7) Flip（並び替えをアニメでつなぐ）</h2>
          <div ref={flipGridRef} className="demo-grid">
            {flipOrder.map(n => (
              <div className="cell" key={n}>#{n}</div>
            ))}
          </div>
          <div className="row" style={{marginTop:10}}>
            <button className="btn" onClick={shuffleFlip}>Shuffle</button>
            <span className="badge">Flip.getState → Flip.from</span>
          </div>
        </section>

        <section className="section">
          <h2>8) MotionPath（パスに沿って移動）</h2>
          <div style={{position:"relative"}}>
            <svg width="600" height="160" viewBox="0 0 600 160">
              <path
                ref={pathRef}
                d="M20,120 Q150,10 300,120 T580,120"
                stroke="#2a3648" strokeWidth="2" fill="transparent"
              />
            </svg>
            <div ref={ballRef} className="circle" style={{position:"absolute", left:0, top:80, width:32, height:32, display:"grid", placeItems:"center"}}>●</div>
          </div>
          <button className="btn" onClick={runMotionPath}>Run</button>
        </section>

        <section className="section">
          <h2>9) Observer（ホイール/タッチでページング）</h2>
          <p className="badge">ホイール/スワイプでパネルが左右にスライド（3枚）</p>
          <div
            ref={observerPanelRef}
            style={{
              display:"grid",
              gridTemplateColumns:"100% 100% 100%",
              gap:12,
              overflow:"hidden"
            }}
          >
            <div className="box" style={{minHeight:80, background:"#14202b"}}>Panel 1</div>
            <div className="box" style={{minHeight:80, background:"#1a2432"}}>Panel 2</div>
            <div className="box" style={{minHeight:80, background:"#1f2a3a"}}>Panel 3</div>
          </div>
          <p style={{marginTop:8}}>↑ トラックパッドの左右スワイプ/ホイール/タッチで切替</p>
        </section>

      </div>

      <footer>
        <small>© {new Date().getFullYear()} GSAP Free Features Demo（React + Vite）</small>
      </footer>
    </div>
  );
}
