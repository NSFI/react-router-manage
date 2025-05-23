"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [3085],
  {
    4247: (e, n, t) => {
      t.r(n), t.d(n, { default: () => d });
      var a = t(7294),
        l = t(6010),
        r = t(1944),
        c = t(5281),
        i = t(3285),
        o = t(210),
        s = t(9407);
      const m = { mdxPageWrapper: "mdxPageWrapper_j9I6" };
      function d(e) {
        const { content: n } = e,
          {
            metadata: { title: t, description: d, frontMatter: u }
          } = n,
          { wrapperClassName: f, hide_table_of_contents: v } = u;
        return a.createElement(
          r.FG,
          { className: (0, l.Z)(f ?? c.k.wrapper.mdxPages, c.k.page.mdxPage) },
          a.createElement(r.d, { title: t, description: d }),
          a.createElement(
            i.Z,
            null,
            a.createElement(
              "main",
              { className: "container container--fluid margin-vert--lg" },
              a.createElement(
                "div",
                { className: (0, l.Z)("row", m.mdxPageWrapper) },
                a.createElement(
                  "div",
                  { className: (0, l.Z)("col", !v && "col--8") },
                  a.createElement(
                    "article",
                    null,
                    a.createElement(o.Z, null, a.createElement(n, null))
                  )
                ),
                !v &&
                  n.toc.length > 0 &&
                  a.createElement(
                    "div",
                    { className: "col col--2" },
                    a.createElement(s.Z, {
                      toc: n.toc,
                      minHeadingLevel: u.toc_min_heading_level,
                      maxHeadingLevel: u.toc_max_heading_level
                    })
                  )
              )
            )
          )
        );
      }
    },
    9407: (e, n, t) => {
      t.d(n, { Z: () => m });
      var a = t(7462),
        l = t(7294),
        r = t(6010),
        c = t(3743);
      const i = {
          tableOfContents: "tableOfContents_bqdL",
          docItemContainer: "docItemContainer_F8PC"
        },
        o = "table-of-contents__link toc-highlight",
        s = "table-of-contents__link--active";
      function m(e) {
        let { className: n, ...t } = e;
        return l.createElement(
          "div",
          { className: (0, r.Z)(i.tableOfContents, "thin-scrollbar", n) },
          l.createElement(
            c.Z,
            (0, a.Z)({}, t, { linkClassName: o, linkActiveClassName: s })
          )
        );
      }
    },
    3743: (e, n, t) => {
      t.d(n, { Z: () => v });
      var a = t(7462),
        l = t(7294),
        r = t(6668);
      function c(e) {
        const n = e.map(e => ({ ...e, parentIndex: -1, children: [] })),
          t = Array(7).fill(-1);
        n.forEach((e, n) => {
          const a = t.slice(2, e.level);
          (e.parentIndex = Math.max(...a)), (t[e.level] = n);
        });
        const a = [];
        return (
          n.forEach(e => {
            const { parentIndex: t, ...l } = e;
            t >= 0 ? n[t].children.push(l) : a.push(l);
          }),
          a
        );
      }
      function i(e) {
        let { toc: n, minHeadingLevel: t, maxHeadingLevel: a } = e;
        return n.flatMap(e => {
          const n = i({
            toc: e.children,
            minHeadingLevel: t,
            maxHeadingLevel: a
          });
          return (function (e) {
            return e.level >= t && e.level <= a;
          })(e)
            ? [{ ...e, children: n }]
            : n;
        });
      }
      function o(e) {
        const n = e.getBoundingClientRect();
        return n.top === n.bottom ? o(e.parentNode) : n;
      }
      function s(e, n) {
        let { anchorTopOffset: t } = n;
        const a = e.find(e => o(e).top >= t);
        if (a) {
          return (function (e) {
            return e.top > 0 && e.bottom < window.innerHeight / 2;
          })(o(a))
            ? a
            : e[e.indexOf(a) - 1] ?? null;
        }
        return e[e.length - 1] ?? null;
      }
      function m() {
        const e = (0, l.useRef)(0),
          {
            navbar: { hideOnScroll: n }
          } = (0, r.L)();
        return (
          (0, l.useEffect)(() => {
            e.current = n ? 0 : document.querySelector(".navbar").clientHeight;
          }, [n]),
          e
        );
      }
      function d(e) {
        const n = (0, l.useRef)(void 0),
          t = m();
        (0, l.useEffect)(() => {
          if (!e) return () => {};
          const {
            linkClassName: a,
            linkActiveClassName: l,
            minHeadingLevel: r,
            maxHeadingLevel: c
          } = e;
          function i() {
            const e = (function (e) {
                return Array.from(document.getElementsByClassName(e));
              })(a),
              i = (function (e) {
                let { minHeadingLevel: n, maxHeadingLevel: t } = e;
                const a = [];
                for (let l = n; l <= t; l += 1) a.push(`h${l}.anchor`);
                return Array.from(document.querySelectorAll(a.join()));
              })({ minHeadingLevel: r, maxHeadingLevel: c }),
              o = s(i, { anchorTopOffset: t.current }),
              m = e.find(
                e =>
                  o &&
                  o.id ===
                    (function (e) {
                      return decodeURIComponent(
                        e.href.substring(e.href.indexOf("#") + 1)
                      );
                    })(e)
              );
            e.forEach(e => {
              !(function (e, t) {
                t
                  ? (n.current &&
                      n.current !== e &&
                      n.current.classList.remove(l),
                    e.classList.add(l),
                    (n.current = e))
                  : e.classList.remove(l);
              })(e, e === m);
            });
          }
          return (
            document.addEventListener("scroll", i),
            document.addEventListener("resize", i),
            i(),
            () => {
              document.removeEventListener("scroll", i),
                document.removeEventListener("resize", i);
            }
          );
        }, [e, t]);
      }
      function u(e) {
        let { toc: n, className: t, linkClassName: a, isChild: r } = e;
        return n.length
          ? l.createElement(
              "ul",
              { className: r ? void 0 : t },
              n.map(e =>
                l.createElement(
                  "li",
                  { key: e.id },
                  l.createElement("a", {
                    href: `#${e.id}`,
                    className: a ?? void 0,
                    dangerouslySetInnerHTML: { __html: e.value }
                  }),
                  l.createElement(u, {
                    isChild: !0,
                    toc: e.children,
                    className: t,
                    linkClassName: a
                  })
                )
              )
            )
          : null;
      }
      const f = l.memo(u);
      function v(e) {
        let {
          toc: n,
          className: t = "table-of-contents table-of-contents__left-border",
          linkClassName: o = "table-of-contents__link",
          linkActiveClassName: s,
          minHeadingLevel: m,
          maxHeadingLevel: u,
          ...v
        } = e;
        const g = (0, r.L)(),
          h = m ?? g.tableOfContents.minHeadingLevel,
          L = u ?? g.tableOfContents.maxHeadingLevel,
          p = (function (e) {
            let { toc: n, minHeadingLevel: t, maxHeadingLevel: a } = e;
            return (0, l.useMemo)(
              () => i({ toc: c(n), minHeadingLevel: t, maxHeadingLevel: a }),
              [n, t, a]
            );
          })({ toc: n, minHeadingLevel: h, maxHeadingLevel: L });
        return (
          d(
            (0, l.useMemo)(() => {
              if (o && s)
                return {
                  linkClassName: o,
                  linkActiveClassName: s,
                  minHeadingLevel: h,
                  maxHeadingLevel: L
                };
            }, [o, s, h, L])
          ),
          l.createElement(
            f,
            (0, a.Z)({ toc: p, className: t, linkClassName: o }, v)
          )
        );
      }
    }
  }
]);
