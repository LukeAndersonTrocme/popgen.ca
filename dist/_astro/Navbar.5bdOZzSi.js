import { j as d } from "./jsx-runtime.D_zvdyIk.js";
import { r as s, R as Oe } from "./index.BB0SbgvW.js";
import { r as it, R as ct } from "./index.DjljD8Qc.js";
import "./index.BKWGwx0l.js";
function A(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function (o) {
		if ((e?.(o), n === !1 || !o.defaultPrevented)) return t?.(o);
	};
}
function ve(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function De(...e) {
	return (t) => {
		let n = !1;
		const r = e.map((o) => {
			const a = ve(o, t);
			return !n && typeof a == "function" && (n = !0), a;
		});
		if (n)
			return () => {
				for (let o = 0; o < r.length; o++) {
					const a = r[o];
					typeof a == "function" ? a() : ve(e[o], null);
				}
			};
	};
}
function M(...e) {
	return s.useCallback(De(...e), e);
}
function ut(e, t) {
	const n = s.createContext(t),
		r = (a) => {
			const { children: c, ...i } = a,
				f = s.useMemo(() => i, Object.values(i));
			return d.jsx(n.Provider, { value: f, children: c });
		};
	r.displayName = e + "Provider";
	function o(a) {
		const c = s.useContext(n);
		if (c) return c;
		if (t !== void 0) return t;
		throw new Error(`\`${a}\` must be used within \`${e}\``);
	}
	return [r, o];
}
function lt(e, t = []) {
	let n = [];
	function r(a, c) {
		const i = s.createContext(c),
			f = n.length;
		n = [...n, c];
		const l = (h) => {
			const { scope: m, children: g, ...C } = h,
				u = m?.[e]?.[f] || i,
				p = s.useMemo(() => C, Object.values(C));
			return d.jsx(u.Provider, { value: p, children: g });
		};
		l.displayName = a + "Provider";
		function v(h, m) {
			const g = m?.[e]?.[f] || i,
				C = s.useContext(g);
			if (C) return C;
			if (c !== void 0) return c;
			throw new Error(`\`${h}\` must be used within \`${a}\``);
		}
		return [l, v];
	}
	const o = () => {
		const a = n.map((c) => s.createContext(c));
		return function (i) {
			const f = i?.[e] || a;
			return s.useMemo(() => ({ [`__scope${e}`]: { ...i, [e]: f } }), [i, f]);
		};
	};
	return (o.scopeName = e), [r, dt(o, ...t)];
}
function dt(...e) {
	const t = e[0];
	if (e.length === 1) return t;
	const n = () => {
		const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
		return function (a) {
			const c = r.reduce((i, { useScope: f, scopeName: l }) => {
				const h = f(a)[`__scope${l}`];
				return { ...i, ...h };
			}, {});
			return s.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
		};
	};
	return (n.scopeName = t.scopeName), n;
}
var W = globalThis?.document ? s.useLayoutEffect : () => {},
	ft = Oe[" useId ".trim().toString()] || (() => {}),
	vt = 0;
function J(e) {
	const [t, n] = s.useState(ft());
	return (
		W(() => {
			n((r) => r ?? String(vt++));
		}, [e]),
		e || (t ? `radix-${t}` : "")
	);
}
var ht = Oe[" useInsertionEffect ".trim().toString()] || W;
function mt({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
	const [o, a, c] = pt({ defaultProp: t, onChange: n }),
		i = e !== void 0,
		f = i ? e : o;
	{
		const v = s.useRef(e !== void 0);
		s.useEffect(() => {
			const h = v.current;
			h !== i &&
				console.warn(
					`${r} is changing from ${h ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
				),
				(v.current = i);
		}, [i, r]);
	}
	const l = s.useCallback(
		(v) => {
			if (i) {
				const h = gt(v) ? v(e) : v;
				h !== e && c.current?.(h);
			} else a(v);
		},
		[i, e, a, c],
	);
	return [f, l];
}
function pt({ defaultProp: e, onChange: t }) {
	const [n, r] = s.useState(e),
		o = s.useRef(n),
		a = s.useRef(t);
	return (
		ht(() => {
			a.current = t;
		}, [t]),
		s.useEffect(() => {
			o.current !== n && (a.current?.(n), (o.current = n));
		}, [n, o]),
		[n, r, a]
	);
}
function gt(e) {
	return typeof e == "function";
}
function Le(e) {
	const t = yt(e),
		n = s.forwardRef((r, o) => {
			const { children: a, ...c } = r,
				i = s.Children.toArray(a),
				f = i.find(Et);
			if (f) {
				const l = f.props.children,
					v = i.map((h) =>
						h === f
							? s.Children.count(l) > 1
								? s.Children.only(null)
								: s.isValidElement(l)
									? l.props.children
									: null
							: h,
					);
				return d.jsx(t, {
					...c,
					ref: o,
					children: s.isValidElement(l) ? s.cloneElement(l, void 0, v) : null,
				});
			}
			return d.jsx(t, { ...c, ref: o, children: a });
		});
	return (n.displayName = `${e}.Slot`), n;
}
function yt(e) {
	const t = s.forwardRef((n, r) => {
		const { children: o, ...a } = n;
		if (s.isValidElement(o)) {
			const c = Ct(o),
				i = wt(a, o.props);
			return (
				o.type !== s.Fragment && (i.ref = r ? De(r, c) : c),
				s.cloneElement(o, i)
			);
		}
		return s.Children.count(o) > 1 ? s.Children.only(null) : null;
	});
	return (t.displayName = `${e}.SlotClone`), t;
}
var bt = Symbol("radix.slottable");
function Et(e) {
	return (
		s.isValidElement(e) &&
		typeof e.type == "function" &&
		"__radixId" in e.type &&
		e.type.__radixId === bt
	);
}
function wt(e, t) {
	const n = { ...t };
	for (const r in t) {
		const o = e[r],
			a = t[r];
		/^on[A-Z]/.test(r)
			? o && a
				? (n[r] = (...i) => {
						const f = a(...i);
						return o(...i), f;
					})
				: o && (n[r] = o)
			: r === "style"
				? (n[r] = { ...o, ...a })
				: r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
	}
	return { ...e, ...n };
}
function Ct(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
		n = t && "isReactWarning" in t && t.isReactWarning;
	return n
		? e.ref
		: ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
			(n = t && "isReactWarning" in t && t.isReactWarning),
			n ? e.props.ref : e.props.ref || e.ref);
}
var St = [
		"a",
		"button",
		"div",
		"form",
		"h2",
		"h3",
		"img",
		"input",
		"label",
		"li",
		"nav",
		"ol",
		"p",
		"select",
		"span",
		"svg",
		"ul",
	],
	D = St.reduce((e, t) => {
		const n = Le(`Primitive.${t}`),
			r = s.forwardRef((o, a) => {
				const { asChild: c, ...i } = o,
					f = c ? n : t;
				return (
					typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
					d.jsx(f, { ...i, ref: a })
				);
			});
		return (r.displayName = `Primitive.${t}`), { ...e, [t]: r };
	}, {});
function xt(e, t) {
	e && it.flushSync(() => e.dispatchEvent(t));
}
function B(e) {
	const t = s.useRef(e);
	return (
		s.useEffect(() => {
			t.current = e;
		}),
		s.useMemo(
			() =>
				(...n) =>
					t.current?.(...n),
			[],
		)
	);
}
function Rt(e, t = globalThis?.document) {
	const n = B(e);
	s.useEffect(() => {
		const r = (o) => {
			o.key === "Escape" && n(o);
		};
		return (
			t.addEventListener("keydown", r, { capture: !0 }),
			() => t.removeEventListener("keydown", r, { capture: !0 })
		);
	}, [n, t]);
}
var Nt = "DismissableLayer",
	ie = "dismissableLayer.update",
	Pt = "dismissableLayer.pointerDownOutside",
	Ot = "dismissableLayer.focusOutside",
	he,
	Ae = s.createContext({
		layers: new Set(),
		layersWithOutsidePointerEventsDisabled: new Set(),
		branches: new Set(),
	}),
	Te = s.forwardRef((e, t) => {
		const {
				disableOutsidePointerEvents: n = !1,
				onEscapeKeyDown: r,
				onPointerDownOutside: o,
				onFocusOutside: a,
				onInteractOutside: c,
				onDismiss: i,
				...f
			} = e,
			l = s.useContext(Ae),
			[v, h] = s.useState(null),
			m = v?.ownerDocument ?? globalThis?.document,
			[, g] = s.useState({}),
			C = M(t, (b) => h(b)),
			u = Array.from(l.layers),
			[p] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1),
			y = u.indexOf(p),
			S = v ? u.indexOf(v) : -1,
			E = l.layersWithOutsidePointerEventsDisabled.size > 0,
			w = S >= y,
			x = At((b) => {
				const O = b.target,
					F = [...l.branches].some((Q) => Q.contains(O));
				!w || F || (o?.(b), c?.(b), b.defaultPrevented || i?.());
			}, m),
			P = Tt((b) => {
				const O = b.target;
				[...l.branches].some((Q) => Q.contains(O)) ||
					(a?.(b), c?.(b), b.defaultPrevented || i?.());
			}, m);
		return (
			Rt((b) => {
				S === l.layers.size - 1 &&
					(r?.(b), !b.defaultPrevented && i && (b.preventDefault(), i()));
			}, m),
			s.useEffect(() => {
				if (v)
					return (
						n &&
							(l.layersWithOutsidePointerEventsDisabled.size === 0 &&
								((he = m.body.style.pointerEvents),
								(m.body.style.pointerEvents = "none")),
							l.layersWithOutsidePointerEventsDisabled.add(v)),
						l.layers.add(v),
						me(),
						() => {
							n &&
								l.layersWithOutsidePointerEventsDisabled.size === 1 &&
								(m.body.style.pointerEvents = he);
						}
					);
			}, [v, m, n, l]),
			s.useEffect(
				() => () => {
					v &&
						(l.layers.delete(v),
						l.layersWithOutsidePointerEventsDisabled.delete(v),
						me());
				},
				[v, l],
			),
			s.useEffect(() => {
				const b = () => g({});
				return (
					document.addEventListener(ie, b),
					() => document.removeEventListener(ie, b)
				);
			}, []),
			d.jsx(D.div, {
				...f,
				ref: C,
				style: {
					pointerEvents: E ? (w ? "auto" : "none") : void 0,
					...e.style,
				},
				onFocusCapture: A(e.onFocusCapture, P.onFocusCapture),
				onBlurCapture: A(e.onBlurCapture, P.onBlurCapture),
				onPointerDownCapture: A(e.onPointerDownCapture, x.onPointerDownCapture),
			})
		);
	});
Te.displayName = Nt;
var Dt = "DismissableLayerBranch",
	Lt = s.forwardRef((e, t) => {
		const n = s.useContext(Ae),
			r = s.useRef(null),
			o = M(t, r);
		return (
			s.useEffect(() => {
				const a = r.current;
				if (a)
					return (
						n.branches.add(a),
						() => {
							n.branches.delete(a);
						}
					);
			}, [n.branches]),
			d.jsx(D.div, { ...e, ref: o })
		);
	});
Lt.displayName = Dt;
function At(e, t = globalThis?.document) {
	const n = B(e),
		r = s.useRef(!1),
		o = s.useRef(() => {});
	return (
		s.useEffect(() => {
			const a = (i) => {
					if (i.target && !r.current) {
						let f = function () {
							Me(Pt, n, l, { discrete: !0 });
						};
						const l = { originalEvent: i };
						i.pointerType === "touch"
							? (t.removeEventListener("click", o.current),
								(o.current = f),
								t.addEventListener("click", o.current, { once: !0 }))
							: f();
					} else t.removeEventListener("click", o.current);
					r.current = !1;
				},
				c = window.setTimeout(() => {
					t.addEventListener("pointerdown", a);
				}, 0);
			return () => {
				window.clearTimeout(c),
					t.removeEventListener("pointerdown", a),
					t.removeEventListener("click", o.current);
			};
		}, [t, n]),
		{ onPointerDownCapture: () => (r.current = !0) }
	);
}
function Tt(e, t = globalThis?.document) {
	const n = B(e),
		r = s.useRef(!1);
	return (
		s.useEffect(() => {
			const o = (a) => {
				a.target &&
					!r.current &&
					Me(Ot, n, { originalEvent: a }, { discrete: !1 });
			};
			return (
				t.addEventListener("focusin", o),
				() => t.removeEventListener("focusin", o)
			);
		}, [t, n]),
		{
			onFocusCapture: () => (r.current = !0),
			onBlurCapture: () => (r.current = !1),
		}
	);
}
function me() {
	const e = new CustomEvent(ie);
	document.dispatchEvent(e);
}
function Me(e, t, n, { discrete: r }) {
	const o = n.originalEvent.target,
		a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
	t && o.addEventListener(e, t, { once: !0 }),
		r ? xt(o, a) : o.dispatchEvent(a);
}
var ee = "focusScope.autoFocusOnMount",
	te = "focusScope.autoFocusOnUnmount",
	pe = { bubbles: !1, cancelable: !0 },
	Mt = "FocusScope",
	je = s.forwardRef((e, t) => {
		const {
				loop: n = !1,
				trapped: r = !1,
				onMountAutoFocus: o,
				onUnmountAutoFocus: a,
				...c
			} = e,
			[i, f] = s.useState(null),
			l = B(o),
			v = B(a),
			h = s.useRef(null),
			m = M(t, (u) => f(u)),
			g = s.useRef({
				paused: !1,
				pause() {
					this.paused = !0;
				},
				resume() {
					this.paused = !1;
				},
			}).current;
		s.useEffect(() => {
			if (r) {
				let u = function (E) {
						if (g.paused || !i) return;
						const w = E.target;
						i.contains(w) ? (h.current = w) : L(h.current, { select: !0 });
					},
					p = function (E) {
						if (g.paused || !i) return;
						const w = E.relatedTarget;
						w !== null && (i.contains(w) || L(h.current, { select: !0 }));
					},
					y = function (E) {
						if (document.activeElement === document.body)
							for (const x of E) x.removedNodes.length > 0 && L(i);
					};
				document.addEventListener("focusin", u),
					document.addEventListener("focusout", p);
				const S = new MutationObserver(y);
				return (
					i && S.observe(i, { childList: !0, subtree: !0 }),
					() => {
						document.removeEventListener("focusin", u),
							document.removeEventListener("focusout", p),
							S.disconnect();
					}
				);
			}
		}, [r, i, g.paused]),
			s.useEffect(() => {
				if (i) {
					ye.add(g);
					const u = document.activeElement;
					if (!i.contains(u)) {
						const y = new CustomEvent(ee, pe);
						i.addEventListener(ee, l),
							i.dispatchEvent(y),
							y.defaultPrevented ||
								(jt(Wt(ke(i)), { select: !0 }),
								document.activeElement === u && L(i));
					}
					return () => {
						i.removeEventListener(ee, l),
							setTimeout(() => {
								const y = new CustomEvent(te, pe);
								i.addEventListener(te, v),
									i.dispatchEvent(y),
									y.defaultPrevented || L(u ?? document.body, { select: !0 }),
									i.removeEventListener(te, v),
									ye.remove(g);
							}, 0);
					};
				}
			}, [i, l, v, g]);
		const C = s.useCallback(
			(u) => {
				if ((!n && !r) || g.paused) return;
				const p = u.key === "Tab" && !u.altKey && !u.ctrlKey && !u.metaKey,
					y = document.activeElement;
				if (p && y) {
					const S = u.currentTarget,
						[E, w] = kt(S);
					E && w
						? !u.shiftKey && y === w
							? (u.preventDefault(), n && L(E, { select: !0 }))
							: u.shiftKey &&
								y === E &&
								(u.preventDefault(), n && L(w, { select: !0 }))
						: y === S && u.preventDefault();
				}
			},
			[n, r, g.paused],
		);
		return d.jsx(D.div, { tabIndex: -1, ...c, ref: m, onKeyDown: C });
	});
je.displayName = Mt;
function jt(e, { select: t = !1 } = {}) {
	const n = document.activeElement;
	for (const r of e)
		if ((L(r, { select: t }), document.activeElement !== n)) return;
}
function kt(e) {
	const t = ke(e),
		n = ge(t, e),
		r = ge(t.reverse(), e);
	return [n, r];
}
function ke(e) {
	const t = [],
		n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
			acceptNode: (r) => {
				const o = r.tagName === "INPUT" && r.type === "hidden";
				return r.disabled || r.hidden || o
					? NodeFilter.FILTER_SKIP
					: r.tabIndex >= 0
						? NodeFilter.FILTER_ACCEPT
						: NodeFilter.FILTER_SKIP;
			},
		});
	for (; n.nextNode(); ) t.push(n.currentNode);
	return t;
}
function ge(e, t) {
	for (const n of e) if (!It(n, { upTo: t })) return n;
}
function It(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e; ) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function _t(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function L(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		const n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && _t(e) && t && e.select();
	}
}
var ye = Ft();
function Ft() {
	let e = [];
	return {
		add(t) {
			const n = e[0];
			t !== n && n?.pause(), (e = be(e, t)), e.unshift(t);
		},
		remove(t) {
			(e = be(e, t)), e[0]?.resume();
		},
	};
}
function be(e, t) {
	const n = [...e],
		r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function Wt(e) {
	return e.filter((t) => t.tagName !== "A");
}
var Bt = "Portal",
	Ie = s.forwardRef((e, t) => {
		const { container: n, ...r } = e,
			[o, a] = s.useState(!1);
		W(() => a(!0), []);
		const c = n || (o && globalThis?.document?.body);
		return c ? ct.createPortal(d.jsx(D.div, { ...r, ref: t }), c) : null;
	});
Ie.displayName = Bt;
function Ut(e, t) {
	return s.useReducer((n, r) => t[n][r] ?? n, e);
}
var X = (e) => {
	const { present: t, children: n } = e,
		r = $t(t),
		o =
			typeof n == "function" ? n({ present: r.isPresent }) : s.Children.only(n),
		a = M(r.ref, Ht(o));
	return typeof n == "function" || r.isPresent
		? s.cloneElement(o, { ref: a })
		: null;
};
X.displayName = "Presence";
function $t(e) {
	const [t, n] = s.useState(),
		r = s.useRef(null),
		o = s.useRef(e),
		a = s.useRef("none"),
		c = e ? "mounted" : "unmounted",
		[i, f] = Ut(c, {
			mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
			unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
			unmounted: { MOUNT: "mounted" },
		});
	return (
		s.useEffect(() => {
			const l = U(r.current);
			a.current = i === "mounted" ? l : "none";
		}, [i]),
		W(() => {
			const l = r.current,
				v = o.current;
			if (v !== e) {
				const m = a.current,
					g = U(l);
				e
					? f("MOUNT")
					: g === "none" || l?.display === "none"
						? f("UNMOUNT")
						: f(v && m !== g ? "ANIMATION_OUT" : "UNMOUNT"),
					(o.current = e);
			}
		}, [e, f]),
		W(() => {
			if (t) {
				let l;
				const v = t.ownerDocument.defaultView ?? window,
					h = (g) => {
						const u = U(r.current).includes(g.animationName);
						if (g.target === t && u && (f("ANIMATION_END"), !o.current)) {
							const p = t.style.animationFillMode;
							(t.style.animationFillMode = "forwards"),
								(l = v.setTimeout(() => {
									t.style.animationFillMode === "forwards" &&
										(t.style.animationFillMode = p);
								}));
						}
					},
					m = (g) => {
						g.target === t && (a.current = U(r.current));
					};
				return (
					t.addEventListener("animationstart", m),
					t.addEventListener("animationcancel", h),
					t.addEventListener("animationend", h),
					() => {
						v.clearTimeout(l),
							t.removeEventListener("animationstart", m),
							t.removeEventListener("animationcancel", h),
							t.removeEventListener("animationend", h);
					}
				);
			} else f("ANIMATION_END");
		}, [t, f]),
		{
			isPresent: ["mounted", "unmountSuspended"].includes(i),
			ref: s.useCallback((l) => {
				(r.current = l ? getComputedStyle(l) : null), n(l);
			}, []),
		}
	);
}
function U(e) {
	return e?.animationName || "none";
}
function Ht(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
		n = t && "isReactWarning" in t && t.isReactWarning;
	return n
		? e.ref
		: ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
			(n = t && "isReactWarning" in t && t.isReactWarning),
			n ? e.props.ref : e.props.ref || e.ref);
}
var ne = 0;
function Vt() {
	s.useEffect(() => {
		const e = document.querySelectorAll("[data-radix-focus-guard]");
		return (
			document.body.insertAdjacentElement("afterbegin", e[0] ?? Ee()),
			document.body.insertAdjacentElement("beforeend", e[1] ?? Ee()),
			ne++,
			() => {
				ne === 1 &&
					document
						.querySelectorAll("[data-radix-focus-guard]")
						.forEach((t) => t.remove()),
					ne--;
			}
		);
	}, []);
}
function Ee() {
	const e = document.createElement("span");
	return (
		e.setAttribute("data-radix-focus-guard", ""),
		(e.tabIndex = 0),
		(e.style.outline = "none"),
		(e.style.opacity = "0"),
		(e.style.position = "fixed"),
		(e.style.pointerEvents = "none"),
		e
	);
}
var N = function () {
	return (
		(N =
			Object.assign ||
			function (t) {
				for (var n, r = 1, o = arguments.length; r < o; r++) {
					n = arguments[r];
					for (var a in n)
						Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
				}
				return t;
			}),
		N.apply(this, arguments)
	);
};
function _e(e, t) {
	var n = {};
	for (var r in e)
		Object.prototype.hasOwnProperty.call(e, r) &&
			t.indexOf(r) < 0 &&
			(n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function")
		for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
			t.indexOf(r[o]) < 0 &&
				Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
				(n[r[o]] = e[r[o]]);
	return n;
}
function Kt(e, t, n) {
	if (n || arguments.length === 2)
		for (var r = 0, o = t.length, a; r < o; r++)
			(a || !(r in t)) &&
				(a || (a = Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
	return e.concat(a || Array.prototype.slice.call(t));
}
var G = "right-scroll-bar-position",
	Y = "width-before-scroll-bar",
	Gt = "with-scroll-bars-hidden",
	Yt = "--removed-body-scroll-bar-size";
function re(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function zt(e, t) {
	var n = s.useState(function () {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(r) {
					var o = n.value;
					o !== r && ((n.value = r), n.callback(r, o));
				},
			},
		};
	})[0];
	return (n.callback = t), n.facade;
}
var Xt = typeof window < "u" ? s.useLayoutEffect : s.useEffect,
	we = new WeakMap();
function Zt(e, t) {
	var n = zt(null, function (r) {
		return e.forEach(function (o) {
			return re(o, r);
		});
	});
	return (
		Xt(
			function () {
				var r = we.get(n);
				if (r) {
					var o = new Set(r),
						a = new Set(e),
						c = n.current;
					o.forEach(function (i) {
						a.has(i) || re(i, null);
					}),
						a.forEach(function (i) {
							o.has(i) || re(i, c);
						});
				}
				we.set(n, e);
			},
			[e],
		),
		n
	);
}
function qt(e) {
	return e;
}
function Qt(e, t) {
	t === void 0 && (t = qt);
	var n = [],
		r = !1,
		o = {
			read: function () {
				if (r)
					throw new Error(
						"Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
					);
				return n.length ? n[n.length - 1] : e;
			},
			useMedium: function (a) {
				var c = t(a, r);
				return (
					n.push(c),
					function () {
						n = n.filter(function (i) {
							return i !== c;
						});
					}
				);
			},
			assignSyncMedium: function (a) {
				for (r = !0; n.length; ) {
					var c = n;
					(n = []), c.forEach(a);
				}
				n = {
					push: function (i) {
						return a(i);
					},
					filter: function () {
						return n;
					},
				};
			},
			assignMedium: function (a) {
				r = !0;
				var c = [];
				if (n.length) {
					var i = n;
					(n = []), i.forEach(a), (c = n);
				}
				var f = function () {
						var v = c;
						(c = []), v.forEach(a);
					},
					l = function () {
						return Promise.resolve().then(f);
					};
				l(),
					(n = {
						push: function (v) {
							c.push(v), l();
						},
						filter: function (v) {
							return (c = c.filter(v)), n;
						},
					});
			},
		};
	return o;
}
function Jt(e) {
	e === void 0 && (e = {});
	var t = Qt(null);
	return (t.options = N({ async: !0, ssr: !1 }, e)), t;
}
var Fe = function (e) {
	var t = e.sideCar,
		n = _e(e, ["sideCar"]);
	if (!t)
		throw new Error(
			"Sidecar: please provide `sideCar` property to import the right car",
		);
	var r = t.read();
	if (!r) throw new Error("Sidecar medium not found");
	return s.createElement(r, N({}, n));
};
Fe.isSideCarExport = !0;
function en(e, t) {
	return e.useMedium(t), Fe;
}
var We = Jt(),
	oe = function () {},
	Z = s.forwardRef(function (e, t) {
		var n = s.useRef(null),
			r = s.useState({
				onScrollCapture: oe,
				onWheelCapture: oe,
				onTouchMoveCapture: oe,
			}),
			o = r[0],
			a = r[1],
			c = e.forwardProps,
			i = e.children,
			f = e.className,
			l = e.removeScrollBar,
			v = e.enabled,
			h = e.shards,
			m = e.sideCar,
			g = e.noRelative,
			C = e.noIsolation,
			u = e.inert,
			p = e.allowPinchZoom,
			y = e.as,
			S = y === void 0 ? "div" : y,
			E = e.gapMode,
			w = _e(e, [
				"forwardProps",
				"children",
				"className",
				"removeScrollBar",
				"enabled",
				"shards",
				"sideCar",
				"noRelative",
				"noIsolation",
				"inert",
				"allowPinchZoom",
				"as",
				"gapMode",
			]),
			x = m,
			P = Zt([n, t]),
			b = N(N({}, w), o);
		return s.createElement(
			s.Fragment,
			null,
			v &&
				s.createElement(x, {
					sideCar: We,
					removeScrollBar: l,
					shards: h,
					noRelative: g,
					noIsolation: C,
					inert: u,
					setCallbacks: a,
					allowPinchZoom: !!p,
					lockRef: n,
					gapMode: E,
				}),
			c
				? s.cloneElement(s.Children.only(i), N(N({}, b), { ref: P }))
				: s.createElement(S, N({}, b, { className: f, ref: P }), i),
		);
	});
Z.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
Z.classNames = { fullWidth: Y, zeroRight: G };
var tn = function () {
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function nn() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = tn();
	return t && e.setAttribute("nonce", t), e;
}
function rn(e, t) {
	e.styleSheet
		? (e.styleSheet.cssText = t)
		: e.appendChild(document.createTextNode(t));
}
function on(e) {
	var t = document.head || document.getElementsByTagName("head")[0];
	t.appendChild(e);
}
var an = function () {
		var e = 0,
			t = null;
		return {
			add: function (n) {
				e == 0 && (t = nn()) && (rn(t, n), on(t)), e++;
			},
			remove: function () {
				e--,
					!e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
			},
		};
	},
	sn = function () {
		var e = an();
		return function (t, n) {
			s.useEffect(
				function () {
					return (
						e.add(t),
						function () {
							e.remove();
						}
					);
				},
				[t && n],
			);
		};
	},
	Be = function () {
		var e = sn(),
			t = function (n) {
				var r = n.styles,
					o = n.dynamic;
				return e(r, o), null;
			};
		return t;
	},
	cn = { left: 0, top: 0, right: 0, gap: 0 },
	ae = function (e) {
		return parseInt(e || "", 10) || 0;
	},
	un = function (e) {
		var t = window.getComputedStyle(document.body),
			n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
			r = t[e === "padding" ? "paddingTop" : "marginTop"],
			o = t[e === "padding" ? "paddingRight" : "marginRight"];
		return [ae(n), ae(r), ae(o)];
	},
	ln = function (e) {
		if ((e === void 0 && (e = "margin"), typeof window > "u")) return cn;
		var t = un(e),
			n = document.documentElement.clientWidth,
			r = window.innerWidth;
		return {
			left: t[0],
			top: t[1],
			right: t[2],
			gap: Math.max(0, r - n + t[2] - t[0]),
		};
	},
	dn = Be(),
	_ = "data-scroll-locked",
	fn = function (e, t, n, r) {
		var o = e.left,
			a = e.top,
			c = e.right,
			i = e.gap;
		return (
			n === void 0 && (n = "margin"),
			`
  .`
				.concat(
					Gt,
					` {
   overflow: hidden `,
				)
				.concat(
					r,
					`;
   padding-right: `,
				)
				.concat(i, "px ")
				.concat(
					r,
					`;
  }
  body[`,
				)
				.concat(
					_,
					`] {
    overflow: hidden `,
				)
				.concat(
					r,
					`;
    overscroll-behavior: contain;
    `,
				)
				.concat(
					[
						t && "position: relative ".concat(r, ";"),
						n === "margin" &&
							`
    padding-left: `
								.concat(
									o,
									`px;
    padding-top: `,
								)
								.concat(
									a,
									`px;
    padding-right: `,
								)
								.concat(
									c,
									`px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
								)
								.concat(i, "px ")
								.concat(
									r,
									`;
    `,
								),
						n === "padding" &&
							"padding-right: ".concat(i, "px ").concat(r, ";"),
					]
						.filter(Boolean)
						.join(""),
					`
  }
  
  .`,
				)
				.concat(
					G,
					` {
    right: `,
				)
				.concat(i, "px ")
				.concat(
					r,
					`;
  }
  
  .`,
				)
				.concat(
					Y,
					` {
    margin-right: `,
				)
				.concat(i, "px ")
				.concat(
					r,
					`;
  }
  
  .`,
				)
				.concat(G, " .")
				.concat(
					G,
					` {
    right: 0 `,
				)
				.concat(
					r,
					`;
  }
  
  .`,
				)
				.concat(Y, " .")
				.concat(
					Y,
					` {
    margin-right: 0 `,
				)
				.concat(
					r,
					`;
  }
  
  body[`,
				)
				.concat(
					_,
					`] {
    `,
				)
				.concat(Yt, ": ")
				.concat(
					i,
					`px;
  }
`,
				)
		);
	},
	Ce = function () {
		var e = parseInt(document.body.getAttribute(_) || "0", 10);
		return isFinite(e) ? e : 0;
	},
	vn = function () {
		s.useEffect(function () {
			return (
				document.body.setAttribute(_, (Ce() + 1).toString()),
				function () {
					var e = Ce() - 1;
					e <= 0
						? document.body.removeAttribute(_)
						: document.body.setAttribute(_, e.toString());
				}
			);
		}, []);
	},
	hn = function (e) {
		var t = e.noRelative,
			n = e.noImportant,
			r = e.gapMode,
			o = r === void 0 ? "margin" : r;
		vn();
		var a = s.useMemo(
			function () {
				return ln(o);
			},
			[o],
		);
		return s.createElement(dn, { styles: fn(a, !t, o, n ? "" : "!important") });
	},
	ce = !1;
if (typeof window < "u")
	try {
		var $ = Object.defineProperty({}, "passive", {
			get: function () {
				return (ce = !0), !0;
			},
		});
		window.addEventListener("test", $, $),
			window.removeEventListener("test", $, $);
	} catch {
		ce = !1;
	}
var j = ce ? { passive: !1 } : !1,
	mn = function (e) {
		return e.tagName === "TEXTAREA";
	},
	Ue = function (e, t) {
		if (!(e instanceof Element)) return !1;
		var n = window.getComputedStyle(e);
		return (
			n[t] !== "hidden" &&
			!(n.overflowY === n.overflowX && !mn(e) && n[t] === "visible")
		);
	},
	pn = function (e) {
		return Ue(e, "overflowY");
	},
	gn = function (e) {
		return Ue(e, "overflowX");
	},
	Se = function (e, t) {
		var n = t.ownerDocument,
			r = t;
		do {
			typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
			var o = $e(e, r);
			if (o) {
				var a = He(e, r),
					c = a[1],
					i = a[2];
				if (c > i) return !0;
			}
			r = r.parentNode;
		} while (r && r !== n.body);
		return !1;
	},
	yn = function (e) {
		var t = e.scrollTop,
			n = e.scrollHeight,
			r = e.clientHeight;
		return [t, n, r];
	},
	bn = function (e) {
		var t = e.scrollLeft,
			n = e.scrollWidth,
			r = e.clientWidth;
		return [t, n, r];
	},
	$e = function (e, t) {
		return e === "v" ? pn(t) : gn(t);
	},
	He = function (e, t) {
		return e === "v" ? yn(t) : bn(t);
	},
	En = function (e, t) {
		return e === "h" && t === "rtl" ? -1 : 1;
	},
	wn = function (e, t, n, r, o) {
		var a = En(e, window.getComputedStyle(t).direction),
			c = a * r,
			i = n.target,
			f = t.contains(i),
			l = !1,
			v = c > 0,
			h = 0,
			m = 0;
		do {
			var g = He(e, i),
				C = g[0],
				u = g[1],
				p = g[2],
				y = u - p - a * C;
			(C || y) && $e(e, i) && ((h += y), (m += C)),
				(i = i.parentNode.host || i.parentNode);
		} while ((!f && i !== document.body) || (f && (t.contains(i) || t === i)));
		return ((v && Math.abs(h) < 1) || (!v && Math.abs(m) < 1)) && (l = !0), l;
	},
	H = function (e) {
		return "changedTouches" in e
			? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
			: [0, 0];
	},
	xe = function (e) {
		return [e.deltaX, e.deltaY];
	},
	Re = function (e) {
		return e && "current" in e ? e.current : e;
	},
	Cn = function (e, t) {
		return e[0] === t[0] && e[1] === t[1];
	},
	Sn = function (e) {
		return `
  .block-interactivity-`
			.concat(
				e,
				` {pointer-events: none;}
  .allow-interactivity-`,
			)
			.concat(
				e,
				` {pointer-events: all;}
`,
			);
	},
	xn = 0,
	k = [];
function Rn(e) {
	var t = s.useRef([]),
		n = s.useRef([0, 0]),
		r = s.useRef(),
		o = s.useState(xn++)[0],
		a = s.useState(Be)[0],
		c = s.useRef(e);
	s.useEffect(
		function () {
			c.current = e;
		},
		[e],
	),
		s.useEffect(
			function () {
				if (e.inert) {
					document.body.classList.add("block-interactivity-".concat(o));
					var u = Kt([e.lockRef.current], (e.shards || []).map(Re), !0).filter(
						Boolean,
					);
					return (
						u.forEach(function (p) {
							return p.classList.add("allow-interactivity-".concat(o));
						}),
						function () {
							document.body.classList.remove("block-interactivity-".concat(o)),
								u.forEach(function (p) {
									return p.classList.remove("allow-interactivity-".concat(o));
								});
						}
					);
				}
			},
			[e.inert, e.lockRef.current, e.shards],
		);
	var i = s.useCallback(function (u, p) {
			if (
				("touches" in u && u.touches.length === 2) ||
				(u.type === "wheel" && u.ctrlKey)
			)
				return !c.current.allowPinchZoom;
			var y = H(u),
				S = n.current,
				E = "deltaX" in u ? u.deltaX : S[0] - y[0],
				w = "deltaY" in u ? u.deltaY : S[1] - y[1],
				x,
				P = u.target,
				b = Math.abs(E) > Math.abs(w) ? "h" : "v";
			if ("touches" in u && b === "h" && P.type === "range") return !1;
			var O = Se(b, P);
			if (!O) return !0;
			if ((O ? (x = b) : ((x = b === "v" ? "h" : "v"), (O = Se(b, P))), !O))
				return !1;
			if (
				(!r.current && "changedTouches" in u && (E || w) && (r.current = x), !x)
			)
				return !0;
			var F = r.current || x;
			return wn(F, p, u, F === "h" ? E : w);
		}, []),
		f = s.useCallback(function (u) {
			var p = u;
			if (!(!k.length || k[k.length - 1] !== a)) {
				var y = "deltaY" in p ? xe(p) : H(p),
					S = t.current.filter(function (x) {
						return (
							x.name === p.type &&
							(x.target === p.target || p.target === x.shadowParent) &&
							Cn(x.delta, y)
						);
					})[0];
				if (S && S.should) {
					p.cancelable && p.preventDefault();
					return;
				}
				if (!S) {
					var E = (c.current.shards || [])
							.map(Re)
							.filter(Boolean)
							.filter(function (x) {
								return x.contains(p.target);
							}),
						w = E.length > 0 ? i(p, E[0]) : !c.current.noIsolation;
					w && p.cancelable && p.preventDefault();
				}
			}
		}, []),
		l = s.useCallback(function (u, p, y, S) {
			var E = { name: u, delta: p, target: y, should: S, shadowParent: Nn(y) };
			t.current.push(E),
				setTimeout(function () {
					t.current = t.current.filter(function (w) {
						return w !== E;
					});
				}, 1);
		}, []),
		v = s.useCallback(function (u) {
			(n.current = H(u)), (r.current = void 0);
		}, []),
		h = s.useCallback(function (u) {
			l(u.type, xe(u), u.target, i(u, e.lockRef.current));
		}, []),
		m = s.useCallback(function (u) {
			l(u.type, H(u), u.target, i(u, e.lockRef.current));
		}, []);
	s.useEffect(function () {
		return (
			k.push(a),
			e.setCallbacks({
				onScrollCapture: h,
				onWheelCapture: h,
				onTouchMoveCapture: m,
			}),
			document.addEventListener("wheel", f, j),
			document.addEventListener("touchmove", f, j),
			document.addEventListener("touchstart", v, j),
			function () {
				(k = k.filter(function (u) {
					return u !== a;
				})),
					document.removeEventListener("wheel", f, j),
					document.removeEventListener("touchmove", f, j),
					document.removeEventListener("touchstart", v, j);
			}
		);
	}, []);
	var g = e.removeScrollBar,
		C = e.inert;
	return s.createElement(
		s.Fragment,
		null,
		C ? s.createElement(a, { styles: Sn(o) }) : null,
		g
			? s.createElement(hn, { noRelative: e.noRelative, gapMode: e.gapMode })
			: null,
	);
}
function Nn(e) {
	for (var t = null; e !== null; )
		e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode);
	return t;
}
const Pn = en(We, Rn);
var Ve = s.forwardRef(function (e, t) {
	return s.createElement(Z, N({}, e, { ref: t, sideCar: Pn }));
});
Ve.classNames = Z.classNames;
var On = function (e) {
		if (typeof document > "u") return null;
		var t = Array.isArray(e) ? e[0] : e;
		return t.ownerDocument.body;
	},
	I = new WeakMap(),
	V = new WeakMap(),
	K = {},
	se = 0,
	Ke = function (e) {
		return e && (e.host || Ke(e.parentNode));
	},
	Dn = function (e, t) {
		return t
			.map(function (n) {
				if (e.contains(n)) return n;
				var r = Ke(n);
				return r && e.contains(r)
					? r
					: (console.error(
							"aria-hidden",
							n,
							"in not contained inside",
							e,
							". Doing nothing",
						),
						null);
			})
			.filter(function (n) {
				return !!n;
			});
	},
	Ln = function (e, t, n, r) {
		var o = Dn(t, Array.isArray(e) ? e : [e]);
		K[n] || (K[n] = new WeakMap());
		var a = K[n],
			c = [],
			i = new Set(),
			f = new Set(o),
			l = function (h) {
				!h || i.has(h) || (i.add(h), l(h.parentNode));
			};
		o.forEach(l);
		var v = function (h) {
			!h ||
				f.has(h) ||
				Array.prototype.forEach.call(h.children, function (m) {
					if (i.has(m)) v(m);
					else
						try {
							var g = m.getAttribute(r),
								C = g !== null && g !== "false",
								u = (I.get(m) || 0) + 1,
								p = (a.get(m) || 0) + 1;
							I.set(m, u),
								a.set(m, p),
								c.push(m),
								u === 1 && C && V.set(m, !0),
								p === 1 && m.setAttribute(n, "true"),
								C || m.setAttribute(r, "true");
						} catch (y) {
							console.error("aria-hidden: cannot operate on ", m, y);
						}
				});
		};
		return (
			v(t),
			i.clear(),
			se++,
			function () {
				c.forEach(function (h) {
					var m = I.get(h) - 1,
						g = a.get(h) - 1;
					I.set(h, m),
						a.set(h, g),
						m || (V.has(h) || h.removeAttribute(r), V.delete(h)),
						g || h.removeAttribute(n);
				}),
					se--,
					se ||
						((I = new WeakMap()),
						(I = new WeakMap()),
						(V = new WeakMap()),
						(K = {}));
			}
		);
	},
	An = function (e, t, n) {
		n === void 0 && (n = "data-aria-hidden");
		var r = Array.from(Array.isArray(e) ? e : [e]),
			o = On(e);
		return o
			? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))),
				Ln(r, o, n, "aria-hidden"))
			: function () {
					return null;
				};
	},
	q = "Dialog",
	[Ge, gr] = lt(q),
	[Tn, R] = Ge(q),
	Ye = (e) => {
		const {
				__scopeDialog: t,
				children: n,
				open: r,
				defaultOpen: o,
				onOpenChange: a,
				modal: c = !0,
			} = e,
			i = s.useRef(null),
			f = s.useRef(null),
			[l, v] = mt({ prop: r, defaultProp: o ?? !1, onChange: a, caller: q });
		return d.jsx(Tn, {
			scope: t,
			triggerRef: i,
			contentRef: f,
			contentId: J(),
			titleId: J(),
			descriptionId: J(),
			open: l,
			onOpenChange: v,
			onOpenToggle: s.useCallback(() => v((h) => !h), [v]),
			modal: c,
			children: n,
		});
	};
Ye.displayName = q;
var ze = "DialogTrigger",
	Xe = s.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			o = R(ze, n),
			a = M(t, o.triggerRef);
		return d.jsx(D.button, {
			type: "button",
			"aria-haspopup": "dialog",
			"aria-expanded": o.open,
			"aria-controls": o.contentId,
			"data-state": de(o.open),
			...r,
			ref: a,
			onClick: A(e.onClick, o.onOpenToggle),
		});
	});
Xe.displayName = ze;
var ue = "DialogPortal",
	[Mn, Ze] = Ge(ue, { forceMount: void 0 }),
	qe = (e) => {
		const { __scopeDialog: t, forceMount: n, children: r, container: o } = e,
			a = R(ue, t);
		return d.jsx(Mn, {
			scope: t,
			forceMount: n,
			children: s.Children.map(r, (c) =>
				d.jsx(X, {
					present: n || a.open,
					children: d.jsx(Ie, { asChild: !0, container: o, children: c }),
				}),
			),
		});
	};
qe.displayName = ue;
var z = "DialogOverlay",
	Qe = s.forwardRef((e, t) => {
		const n = Ze(z, e.__scopeDialog),
			{ forceMount: r = n.forceMount, ...o } = e,
			a = R(z, e.__scopeDialog);
		return a.modal
			? d.jsx(X, {
					present: r || a.open,
					children: d.jsx(kn, { ...o, ref: t }),
				})
			: null;
	});
Qe.displayName = z;
var jn = Le("DialogOverlay.RemoveScroll"),
	kn = s.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			o = R(z, n);
		return d.jsx(Ve, {
			as: jn,
			allowPinchZoom: !0,
			shards: [o.contentRef],
			children: d.jsx(D.div, {
				"data-state": de(o.open),
				...r,
				ref: t,
				style: { pointerEvents: "auto", ...r.style },
			}),
		});
	}),
	T = "DialogContent",
	Je = s.forwardRef((e, t) => {
		const n = Ze(T, e.__scopeDialog),
			{ forceMount: r = n.forceMount, ...o } = e,
			a = R(T, e.__scopeDialog);
		return d.jsx(X, {
			present: r || a.open,
			children: a.modal
				? d.jsx(In, { ...o, ref: t })
				: d.jsx(_n, { ...o, ref: t }),
		});
	});
Je.displayName = T;
var In = s.forwardRef((e, t) => {
		const n = R(T, e.__scopeDialog),
			r = s.useRef(null),
			o = M(t, n.contentRef, r);
		return (
			s.useEffect(() => {
				const a = r.current;
				if (a) return An(a);
			}, []),
			d.jsx(et, {
				...e,
				ref: o,
				trapFocus: n.open,
				disableOutsidePointerEvents: !0,
				onCloseAutoFocus: A(e.onCloseAutoFocus, (a) => {
					a.preventDefault(), n.triggerRef.current?.focus();
				}),
				onPointerDownOutside: A(e.onPointerDownOutside, (a) => {
					const c = a.detail.originalEvent,
						i = c.button === 0 && c.ctrlKey === !0;
					(c.button === 2 || i) && a.preventDefault();
				}),
				onFocusOutside: A(e.onFocusOutside, (a) => a.preventDefault()),
			})
		);
	}),
	_n = s.forwardRef((e, t) => {
		const n = R(T, e.__scopeDialog),
			r = s.useRef(!1),
			o = s.useRef(!1);
		return d.jsx(et, {
			...e,
			ref: t,
			trapFocus: !1,
			disableOutsidePointerEvents: !1,
			onCloseAutoFocus: (a) => {
				e.onCloseAutoFocus?.(a),
					a.defaultPrevented ||
						(r.current || n.triggerRef.current?.focus(), a.preventDefault()),
					(r.current = !1),
					(o.current = !1);
			},
			onInteractOutside: (a) => {
				e.onInteractOutside?.(a),
					a.defaultPrevented ||
						((r.current = !0),
						a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
				const c = a.target;
				n.triggerRef.current?.contains(c) && a.preventDefault(),
					a.detail.originalEvent.type === "focusin" &&
						o.current &&
						a.preventDefault();
			},
		});
	}),
	et = s.forwardRef((e, t) => {
		const {
				__scopeDialog: n,
				trapFocus: r,
				onOpenAutoFocus: o,
				onCloseAutoFocus: a,
				...c
			} = e,
			i = R(T, n),
			f = s.useRef(null),
			l = M(t, f);
		return (
			Vt(),
			d.jsxs(d.Fragment, {
				children: [
					d.jsx(je, {
						asChild: !0,
						loop: !0,
						trapped: r,
						onMountAutoFocus: o,
						onUnmountAutoFocus: a,
						children: d.jsx(Te, {
							role: "dialog",
							id: i.contentId,
							"aria-describedby": i.descriptionId,
							"aria-labelledby": i.titleId,
							"data-state": de(i.open),
							...c,
							ref: l,
							onDismiss: () => i.onOpenChange(!1),
						}),
					}),
					d.jsxs(d.Fragment, {
						children: [
							d.jsx(Bn, { titleId: i.titleId }),
							d.jsx($n, { contentRef: f, descriptionId: i.descriptionId }),
						],
					}),
				],
			})
		);
	}),
	le = "DialogTitle",
	Fn = s.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			o = R(le, n);
		return d.jsx(D.h2, { id: o.titleId, ...r, ref: t });
	});
Fn.displayName = le;
var tt = "DialogDescription",
	Wn = s.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			o = R(tt, n);
		return d.jsx(D.p, { id: o.descriptionId, ...r, ref: t });
	});
Wn.displayName = tt;
var nt = "DialogClose",
	rt = s.forwardRef((e, t) => {
		const { __scopeDialog: n, ...r } = e,
			o = R(nt, n);
		return d.jsx(D.button, {
			type: "button",
			...r,
			ref: t,
			onClick: A(e.onClick, () => o.onOpenChange(!1)),
		});
	});
rt.displayName = nt;
function de(e) {
	return e ? "open" : "closed";
}
var ot = "DialogTitleWarning",
	[yr, at] = ut(ot, { contentName: T, titleName: le, docsSlug: "dialog" }),
	Bn = ({ titleId: e }) => {
		const t = at(ot),
			n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
		return (
			s.useEffect(() => {
				e && (document.getElementById(e) || console.error(n));
			}, [n, e]),
			null
		);
	},
	Un = "DialogDescriptionWarning",
	$n = ({ contentRef: e, descriptionId: t }) => {
		const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${at(Un).contentName}}.`;
		return (
			s.useEffect(() => {
				const o = e.current?.getAttribute("aria-describedby");
				t && o && (document.getElementById(t) || console.warn(r));
			}, [r, e, t]),
			null
		);
	},
	Hn = Ye,
	Vn = Xe,
	Kn = qe,
	Gn = Qe,
	Yn = Je,
	zn = rt;
function Xn(e, t) {
	if (e == null) return {};
	var n = {},
		r = Object.keys(e),
		o,
		a;
	for (a = 0; a < r.length; a++)
		(o = r[a]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
	return n;
}
var Zn = ["color"],
	qn = s.forwardRef(function (e, t) {
		var n = e.color,
			r = n === void 0 ? "currentColor" : n,
			o = Xn(e, Zn);
		return s.createElement(
			"svg",
			Object.assign(
				{
					width: "15",
					height: "15",
					viewBox: "0 0 15 15",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
				},
				o,
				{ ref: t },
			),
			s.createElement("path", {
				d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
				fill: r,
				fillRule: "evenodd",
				clipRule: "evenodd",
			}),
		);
	});
const Qn = Hn,
	Jn = Vn,
	er = s.forwardRef(({ children: e, ...t }, n) =>
		d.jsxs(Kn, {
			children: [
				d.jsx(Gn, { className: "fixed inset-0 bg-black/50" }),
				d.jsxs(Yn, {
					ref: n,
					className:
						"fixed bottom-0 right-0 top-0 z-50 w-full max-w-xs bg-white p-4 shadow-lg dark:bg-slate-900",
					...t,
					children: [
						e,
						d.jsx(zn, {
							asChild: !0,
							children: d.jsx("button", {
								className:
									"absolute right-4 top-4 p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary",
								"aria-label": "Close menu",
								children: d.jsx(qn, {}),
							}),
						}),
					],
				}),
			],
		}),
	); /**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tr = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	nr = (e) =>
		e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, n, r) =>
			r ? r.toUpperCase() : n.toLowerCase(),
		),
	Ne = (e) => {
		const t = nr(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	},
	st = (...e) =>
		e
			.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n)
			.join(" ")
			.trim(),
	rr = (e) => {
		for (const t in e)
			if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	}; /**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var or = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round",
}; /**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ar = s.forwardRef(
	(
		{
			color: e = "currentColor",
			size: t = 24,
			strokeWidth: n = 2,
			absoluteStrokeWidth: r,
			className: o = "",
			children: a,
			iconNode: c,
			...i
		},
		f,
	) =>
		s.createElement(
			"svg",
			{
				ref: f,
				...or,
				width: t,
				height: t,
				stroke: e,
				strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
				className: st("lucide", o),
				...(!a && !rr(i) && { "aria-hidden": "true" }),
				...i,
			},
			[
				...c.map(([l, v]) => s.createElement(l, v)),
				...(Array.isArray(a) ? a : [a]),
			],
		),
); /**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fe = (e, t) => {
	const n = s.forwardRef(({ className: r, ...o }, a) =>
		s.createElement(ar, {
			ref: a,
			iconNode: t,
			className: st(`lucide-${tr(Ne(e))}`, `lucide-${e}`, r),
			...o,
		}),
	);
	return (n.displayName = Ne(e)), n;
}; /**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sr = [
		["path", { d: "M4 12h16", key: "1lakjw" }],
		["path", { d: "M4 18h16", key: "19g7jn" }],
		["path", { d: "M4 6h16", key: "1o0s65" }],
	],
	ir = fe("menu", sr); /**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cr = [
		["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }],
	],
	ur = fe("moon", cr); /**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lr = [
		["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
		["path", { d: "M12 2v2", key: "tus03m" }],
		["path", { d: "M12 20v2", key: "1lh1kg" }],
		["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
		["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
		["path", { d: "M2 12h2", key: "1t8f8n" }],
		["path", { d: "M20 12h2", key: "1q8mjw" }],
		["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
		["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
	],
	dr = fe("sun", lr);
function Pe() {
	const [e, t] = s.useState("system"),
		n = (r) =>
			typeof window > "u"
				? "light"
				: r === "system"
					? window.matchMedia("(prefers-color-scheme: dark)").matches
						? "dark"
						: "light"
					: r;
	return (
		s.useEffect(() => {
			if (typeof localStorage < "u") {
				const r = localStorage.getItem("color-mode") || "system";
				t(r);
			}
		}, []),
		s.useEffect(() => {
			if (typeof document < "u") {
				const r = n(e);
				document.documentElement.classList.toggle("dark", r === "dark"),
					localStorage.setItem("color-mode", e);
			}
		}, [e]),
		d.jsx("button", {
			"aria-label": "Toggle dark mode",
			className:
				"p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary",
			onClick: () =>
				t((r) => (r === "light" ? "dark" : r === "dark" ? "system" : "light")),
			children: n(e) === "dark" ? d.jsx(dr, {}) : d.jsx(ur, {}),
		})
	);
}
const fr = {
	en: {
		home: "/",
		research: "/research",
		people: "/people",
		publications: "/publications",
		news: "/news",
		join: "/join",
		contact: "/contact",
		switch: "/fr",
		switchLabel: "Français",
		homeLabel: "Home",
		researchLabel: "Research",
		peopleLabel: "Team",
		publicationsLabel: "Publications",
		newsLabel: "News",
		joinLabel: "Join Us",
		contactLabel: "Contact",
	},
	fr: {
		home: "/fr/",
		research: "/fr/recherche",
		people: "/fr/equipe",
		publications: "/fr/publications",
		news: "/fr/nouvelles",
		join: "/fr/rejoindre",
		contact: "/fr/contact",
		switch: "/",
		switchLabel: "English",
		homeLabel: "Accueil",
		researchLabel: "Recherche",
		peopleLabel: "Équipe",
		publicationsLabel: "Publications",
		newsLabel: "Nouvelles",
		joinLabel: "Rejoindre",
		contactLabel: "Contact",
	},
};
function br({ locale: e = "en" }) {
	const t = fr[e],
		[n, r] = s.useState(!1),
		[o, a] = s.useState(!1);
	s.useEffect(() => {
		const i = () => r(window.scrollY > 10);
		return (
			window.addEventListener("scroll", i),
			() => window.removeEventListener("scroll", i)
		);
	}, []);
	const c = [
		"home",
		"research",
		"people",
		"publications",
		"news",
		"join",
		"contact",
	];
	return d.jsx("nav", {
		className: `sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-900/70 p-4 transition-shadow ${n ? "shadow-sm" : ""}`,
		children: d.jsxs("div", {
			className: "flex items-center justify-between max-w-7xl mx-auto px-4",
			children: [
				d.jsx("a", {
					href: t.home,
					children: d.jsx("img", {
						src: "/assets/logo.jpg",
						alt: "PopGen Lab logo",
						className: "h-10 w-auto",
						width: 120,
						height: 40,
						loading: "eager",
					}),
				}),
				d.jsxs("ul", {
					className: "hidden md:flex space-x-6",
					children: [
						c.map((i) =>
							d.jsx(
								"li",
								{
									children: d.jsx("a", {
										href: t[i],
										className: "hover:text-cta",
										children: t[`${i}Label`],
									}),
								},
								i,
							),
						),
						d.jsxs("li", {
							className: "flex items-center space-x-2",
							children: [
								d.jsx(Pe, {}),
								d.jsx("a", {
									href: t.switch,
									className: "font-semibold hover:text-highlight",
									children: t.switchLabel,
								}),
							],
						}),
					],
				}),
				d.jsxs("div", {
					className: "md:hidden flex items-center space-x-4",
					children: [
						d.jsx(Pe, {}),
						d.jsx("a", {
							href: t.switch,
							className: "font-semibold",
							children: t.switchLabel,
						}),
						d.jsxs(Qn, {
							open: o,
							onOpenChange: a,
							children: [
								d.jsx(Jn, {
									asChild: !0,
									children: d.jsx("button", {
										"aria-label": "Open menu",
										children: d.jsx(ir, {}),
									}),
								}),
								d.jsx(er, {
									position: "right",
									className: "p-4",
									children: d.jsx("ul", {
										className: "space-y-4",
										children: c.map((i) =>
											d.jsx(
												"li",
												{
													children: d.jsx("a", {
														href: t[i],
														onClick: () => a(!1),
														className: "block text-lg",
														children: t[`${i}Label`],
													}),
												},
												i,
											),
										),
									}),
								}),
							],
						}),
					],
				}),
			],
		}),
	});
}
export { br as default };
