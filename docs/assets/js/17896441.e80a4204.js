"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [7918],
  {
    1986: (e, t, n) => {
      n.d(t, { Z: () => g });
      var a = n(7462),
        l = n(7294),
        r = n(6010),
        o = n(5281),
        s = n(2802),
        c = n(8596),
        i = n(9960),
        d = n(4996),
        m = n(5999);
      function u(e) {
        return l.createElement(
          "svg",
          (0, a.Z)({ viewBox: "0 0 24 24" }, e),
          l.createElement("path", {
            d: "M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",
            fill: "currentColor"
          })
        );
      }
      const v = {
        breadcrumbsContainer: "breadcrumbsContainer_Z_bl",
        breadcrumbHomeIcon: "breadcrumbHomeIcon_OVgt"
      };
      function b(e) {
        let { children: t, href: n, isLast: a } = e;
        const r = "breadcrumbs__link";
        return a
          ? l.createElement("span", { className: r, itemProp: "name" }, t)
          : n
          ? l.createElement(
              i.Z,
              { className: r, href: n, itemProp: "item" },
              l.createElement("span", { itemProp: "name" }, t)
            )
          : l.createElement("span", { className: r }, t);
      }
      function p(e) {
        let { children: t, active: n, index: o, addMicrodata: s } = e;
        return l.createElement(
          "li",
          (0, a.Z)(
            {},
            s && {
              itemScope: !0,
              itemProp: "itemListElement",
              itemType: "https://schema.org/ListItem"
            },
            {
              className: (0, r.Z)("breadcrumbs__item", {
                "breadcrumbs__item--active": n
              })
            }
          ),
          t,
          l.createElement("meta", {
            itemProp: "position",
            content: String(o + 1)
          })
        );
      }
      function h() {
        const e = (0, d.Z)("/");
        return l.createElement(
          "li",
          { className: "breadcrumbs__item" },
          l.createElement(
            i.Z,
            {
              "aria-label": (0, m.I)({
                id: "theme.docs.breadcrumbs.home",
                message: "Home page",
                description:
                  "The ARIA label for the home page in the breadcrumbs"
              }),
              className: (0, r.Z)("breadcrumbs__link", v.breadcrumbsItemLink),
              href: e
            },
            l.createElement(u, { className: v.breadcrumbHomeIcon })
          )
        );
      }
      function g() {
        const e = (0, s.s1)(),
          t = (0, c.Ns)();
        return e
          ? l.createElement(
              "nav",
              {
                className: (0, r.Z)(
                  o.k.docs.docBreadcrumbs,
                  v.breadcrumbsContainer
                ),
                "aria-label": (0, m.I)({
                  id: "theme.docs.breadcrumbs.navAriaLabel",
                  message: "Breadcrumbs",
                  description: "The ARIA label for the breadcrumbs"
                })
              },
              l.createElement(
                "ul",
                {
                  className: "breadcrumbs",
                  itemScope: !0,
                  itemType: "https://schema.org/BreadcrumbList"
                },
                t && l.createElement(h, null),
                e.map((t, n) => {
                  const a = n === e.length - 1;
                  return l.createElement(
                    p,
                    { key: n, active: a, index: n, addMicrodata: !!t.href },
                    l.createElement(b, { href: t.href, isLast: a }, t.label)
                  );
                })
              )
            )
          : null;
      }
    },
    5154: (e, t, n) => {
      n.r(t), n.d(t, { default: () => j });
      var a = n(7294),
        l = n(1944),
        r = n(902);
      const o = a.createContext(null);
      function s(e) {
        let { children: t, content: n } = e;
        const l = (function (e) {
          return (0, a.useMemo)(
            () => ({
              metadata: e.metadata,
              frontMatter: e.frontMatter,
              assets: e.assets,
              contentTitle: e.contentTitle,
              toc: e.toc
            }),
            [e]
          );
        })(n);
        return a.createElement(o.Provider, { value: l }, t);
      }
      function c() {
        const e = (0, a.useContext)(o);
        if (null === e) throw new r.i6("DocProvider");
        return e;
      }
      function i() {
        const { metadata: e, frontMatter: t, assets: n } = c();
        return a.createElement(l.d, {
          title: e.title,
          description: e.description,
          keywords: t.keywords,
          image: n.image ?? t.image
        });
      }
      var d = n(6010),
        m = n(7524),
        u = n(49);
      function v() {
        const { metadata: e } = c();
        return a.createElement(u.Z, { previous: e.previous, next: e.next });
      }
      var b = n(3120),
        p = n(4364),
        h = n(5281),
        g = n(5999);
      function E(e) {
        let { lastUpdatedAt: t, formattedLastUpdatedAt: n } = e;
        return a.createElement(
          g.Z,
          {
            id: "theme.lastUpdated.atDate",
            description:
              "The words used to describe on which date a page has been last updated",
            values: {
              date: a.createElement(
                "b",
                null,
                a.createElement(
                  "time",
                  { dateTime: new Date(1e3 * t).toISOString() },
                  n
                )
              )
            }
          },
          " on {date}"
        );
      }
      function f(e) {
        let { lastUpdatedBy: t } = e;
        return a.createElement(
          g.Z,
          {
            id: "theme.lastUpdated.byUser",
            description:
              "The words used to describe by who the page has been last updated",
            values: { user: a.createElement("b", null, t) }
          },
          " by {user}"
        );
      }
      function L(e) {
        let {
          lastUpdatedAt: t,
          formattedLastUpdatedAt: n,
          lastUpdatedBy: l
        } = e;
        return a.createElement(
          "span",
          { className: h.k.common.lastUpdated },
          a.createElement(
            g.Z,
            {
              id: "theme.lastUpdated.lastUpdatedAtBy",
              description:
                "The sentence used to display when a page has been last updated, and by who",
              values: {
                atDate:
                  t && n
                    ? a.createElement(E, {
                        lastUpdatedAt: t,
                        formattedLastUpdatedAt: n
                      })
                    : "",
                byUser: l ? a.createElement(f, { lastUpdatedBy: l }) : ""
              }
            },
            "Last updated{atDate}{byUser}"
          ),
          !1
        );
      }
      var Z = n(4881),
        N = n(1526);
      const C = { lastUpdated: "lastUpdated_vwxv" };
      function _(e) {
        return a.createElement(
          "div",
          {
            className: (0, d.Z)(
              h.k.docs.docFooterTagsRow,
              "row margin-bottom--sm"
            )
          },
          a.createElement("div", { className: "col" }, a.createElement(N.Z, e))
        );
      }
      function k(e) {
        let {
          editUrl: t,
          lastUpdatedAt: n,
          lastUpdatedBy: l,
          formattedLastUpdatedAt: r
        } = e;
        return a.createElement(
          "div",
          { className: (0, d.Z)(h.k.docs.docFooterEditMetaRow, "row") },
          a.createElement(
            "div",
            { className: "col" },
            t && a.createElement(Z.Z, { editUrl: t })
          ),
          a.createElement(
            "div",
            { className: (0, d.Z)("col", C.lastUpdated) },
            (n || l) &&
              a.createElement(L, {
                lastUpdatedAt: n,
                formattedLastUpdatedAt: r,
                lastUpdatedBy: l
              })
          )
        );
      }
      function x() {
        const { metadata: e } = c(),
          {
            editUrl: t,
            lastUpdatedAt: n,
            formattedLastUpdatedAt: l,
            lastUpdatedBy: r,
            tags: o
          } = e,
          s = o.length > 0,
          i = !!(t || n || r);
        return s || i
          ? a.createElement(
              "footer",
              { className: (0, d.Z)(h.k.docs.docFooter, "docusaurus-mt-lg") },
              s && a.createElement(_, { tags: o }),
              i &&
                a.createElement(k, {
                  editUrl: t,
                  lastUpdatedAt: n,
                  lastUpdatedBy: r,
                  formattedLastUpdatedAt: l
                })
            )
          : null;
      }
      var T = n(6043),
        H = n(3743),
        U = n(7462);
      const y = {
        tocCollapsibleButton: "tocCollapsibleButton_TO0P",
        tocCollapsibleButtonExpanded: "tocCollapsibleButtonExpanded_MG3E"
      };
      function A(e) {
        let { collapsed: t, ...n } = e;
        return a.createElement(
          "button",
          (0, U.Z)({ type: "button" }, n, {
            className: (0, d.Z)(
              "clean-btn",
              y.tocCollapsibleButton,
              !t && y.tocCollapsibleButtonExpanded,
              n.className
            )
          }),
          a.createElement(
            g.Z,
            {
              id: "theme.TOCCollapsible.toggleButtonLabel",
              description:
                "The label used by the button on the collapsible TOC component"
            },
            "On this page"
          )
        );
      }
      const w = {
        tocCollapsible: "tocCollapsible_ETCw",
        tocCollapsibleContent: "tocCollapsibleContent_vkbj",
        tocCollapsibleExpanded: "tocCollapsibleExpanded_sAul"
      };
      function I(e) {
        let {
          toc: t,
          className: n,
          minHeadingLevel: l,
          maxHeadingLevel: r
        } = e;
        const { collapsed: o, toggleCollapsed: s } = (0, T.u)({
          initialState: !0
        });
        return a.createElement(
          "div",
          {
            className: (0, d.Z)(
              w.tocCollapsible,
              !o && w.tocCollapsibleExpanded,
              n
            )
          },
          a.createElement(A, { collapsed: o, onClick: s }),
          a.createElement(
            T.z,
            { lazy: !0, className: w.tocCollapsibleContent, collapsed: o },
            a.createElement(H.Z, {
              toc: t,
              minHeadingLevel: l,
              maxHeadingLevel: r
            })
          )
        );
      }
      const M = { tocMobile: "tocMobile_ITEo" };
      function B() {
        const { toc: e, frontMatter: t } = c();
        return a.createElement(I, {
          toc: e,
          minHeadingLevel: t.toc_min_heading_level,
          maxHeadingLevel: t.toc_max_heading_level,
          className: (0, d.Z)(h.k.docs.docTocMobile, M.tocMobile)
        });
      }
      var O = n(9407);
      function V() {
        const { toc: e, frontMatter: t } = c();
        return a.createElement(O.Z, {
          toc: e,
          minHeadingLevel: t.toc_min_heading_level,
          maxHeadingLevel: t.toc_max_heading_level,
          className: h.k.docs.docTocDesktop
        });
      }
      var S = n(2503),
        P = n(210);
      function R(e) {
        let { children: t } = e;
        const n = (function () {
          const { metadata: e, frontMatter: t, contentTitle: n } = c();
          return t.hide_title || void 0 !== n ? null : e.title;
        })();
        return a.createElement(
          "div",
          { className: (0, d.Z)(h.k.docs.docMarkdown, "markdown") },
          n &&
            a.createElement(
              "header",
              null,
              a.createElement(S.Z, { as: "h1" }, n)
            ),
          a.createElement(P.Z, null, t)
        );
      }
      var D = n(1986);
      const z = {
        docItemContainer: "docItemContainer_Djhp",
        docItemCol: "docItemCol_VOVn"
      };
      function F(e) {
        let { children: t } = e;
        const n = (function () {
          const { frontMatter: e, toc: t } = c(),
            n = (0, m.i)(),
            l = e.hide_table_of_contents,
            r = !l && t.length > 0;
          return {
            hidden: l,
            mobile: r ? a.createElement(B, null) : void 0,
            desktop:
              !r || ("desktop" !== n && "ssr" !== n)
                ? void 0
                : a.createElement(V, null)
          };
        })();
        return a.createElement(
          "div",
          { className: "row" },
          a.createElement(
            "div",
            { className: (0, d.Z)("col", !n.hidden && z.docItemCol) },
            a.createElement(b.Z, null),
            a.createElement(
              "div",
              { className: z.docItemContainer },
              a.createElement(
                "article",
                null,
                a.createElement(D.Z, null),
                a.createElement(p.Z, null),
                n.mobile,
                a.createElement(R, null, t),
                a.createElement(x, null)
              ),
              a.createElement(v, null)
            )
          ),
          n.desktop &&
            a.createElement("div", { className: "col col--3" }, n.desktop)
        );
      }
      function j(e) {
        const t = `docs-doc-id-${e.content.metadata.unversionedId}`,
          n = e.content;
        return a.createElement(
          s,
          { content: e.content },
          a.createElement(
            l.FG,
            { className: t },
            a.createElement(i, null),
            a.createElement(F, null, a.createElement(n, null))
          )
        );
      }
    },
    49: (e, t, n) => {
      n.d(t, { Z: () => s });
      var a = n(7462),
        l = n(7294),
        r = n(5999),
        o = n(2244);
      function s(e) {
        const { previous: t, next: n } = e;
        return l.createElement(
          "nav",
          {
            className: "pagination-nav docusaurus-mt-lg",
            "aria-label": (0, r.I)({
              id: "theme.docs.paginator.navAriaLabel",
              message: "Docs pages navigation",
              description: "The ARIA label for the docs pagination"
            })
          },
          t &&
            l.createElement(
              o.Z,
              (0, a.Z)({}, t, {
                subLabel: l.createElement(
                  r.Z,
                  {
                    id: "theme.docs.paginator.previous",
                    description:
                      "The label used to navigate to the previous doc"
                  },
                  "Previous"
                )
              })
            ),
          n &&
            l.createElement(
              o.Z,
              (0, a.Z)({}, n, {
                subLabel: l.createElement(
                  r.Z,
                  {
                    id: "theme.docs.paginator.next",
                    description: "The label used to navigate to the next doc"
                  },
                  "Next"
                ),
                isNext: !0
              })
            )
        );
      }
    },
    4364: (e, t, n) => {
      n.d(t, { Z: () => c });
      var a = n(7294),
        l = n(6010),
        r = n(5999),
        o = n(5281),
        s = n(4477);
      function c(e) {
        let { className: t } = e;
        const n = (0, s.E)();
        return n.badge
          ? a.createElement(
              "span",
              {
                className: (0, l.Z)(
                  t,
                  o.k.docs.docVersionBadge,
                  "badge badge--secondary"
                )
              },
              a.createElement(
                r.Z,
                {
                  id: "theme.docs.versionBadge.label",
                  values: { versionLabel: n.label }
                },
                "Version: {versionLabel}"
              )
            )
          : null;
      }
    },
    3120: (e, t, n) => {
      n.d(t, { Z: () => h });
      var a = n(7294),
        l = n(6010),
        r = n(2263),
        o = n(9960),
        s = n(5999),
        c = n(143),
        i = n(5281),
        d = n(373),
        m = n(4477);
      const u = {
        unreleased: function (e) {
          let { siteTitle: t, versionMetadata: n } = e;
          return a.createElement(
            s.Z,
            {
              id: "theme.docs.versions.unreleasedVersionLabel",
              description:
                "The label used to tell the user that he's browsing an unreleased doc version",
              values: {
                siteTitle: t,
                versionLabel: a.createElement("b", null, n.label)
              }
            },
            "This is unreleased documentation for {siteTitle} {versionLabel} version."
          );
        },
        unmaintained: function (e) {
          let { siteTitle: t, versionMetadata: n } = e;
          return a.createElement(
            s.Z,
            {
              id: "theme.docs.versions.unmaintainedVersionLabel",
              description:
                "The label used to tell the user that he's browsing an unmaintained doc version",
              values: {
                siteTitle: t,
                versionLabel: a.createElement("b", null, n.label)
              }
            },
            "This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."
          );
        }
      };
      function v(e) {
        const t = u[e.versionMetadata.banner];
        return a.createElement(t, e);
      }
      function b(e) {
        let { versionLabel: t, to: n, onClick: l } = e;
        return a.createElement(
          s.Z,
          {
            id: "theme.docs.versions.latestVersionSuggestionLabel",
            description:
              "The label used to tell the user to check the latest version",
            values: {
              versionLabel: t,
              latestVersionLink: a.createElement(
                "b",
                null,
                a.createElement(
                  o.Z,
                  { to: n, onClick: l },
                  a.createElement(
                    s.Z,
                    {
                      id: "theme.docs.versions.latestVersionLinkLabel",
                      description:
                        "The label used for the latest version suggestion link label"
                    },
                    "latest version"
                  )
                )
              )
            }
          },
          "For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."
        );
      }
      function p(e) {
        let { className: t, versionMetadata: n } = e;
        const {
            siteConfig: { title: o }
          } = (0, r.Z)(),
          { pluginId: s } = (0, c.gA)({ failfast: !0 }),
          { savePreferredVersionName: m } = (0, d.J)(s),
          { latestDocSuggestion: u, latestVersionSuggestion: p } = (0, c.Jo)(s),
          h = u ?? (g = p).docs.find(e => e.id === g.mainDocId);
        var g;
        return a.createElement(
          "div",
          {
            className: (0, l.Z)(
              t,
              i.k.docs.docVersionBanner,
              "alert alert--warning margin-bottom--md"
            ),
            role: "alert"
          },
          a.createElement(
            "div",
            null,
            a.createElement(v, { siteTitle: o, versionMetadata: n })
          ),
          a.createElement(
            "div",
            { className: "margin-top--md" },
            a.createElement(b, {
              versionLabel: p.label,
              to: h.path,
              onClick: () => m(p.name)
            })
          )
        );
      }
      function h(e) {
        let { className: t } = e;
        const n = (0, m.E)();
        return n.banner
          ? a.createElement(p, { className: t, versionMetadata: n })
          : null;
      }
    },
    4881: (e, t, n) => {
      n.d(t, { Z: () => d });
      var a = n(7294),
        l = n(5999),
        r = n(5281),
        o = n(7462),
        s = n(6010);
      const c = { iconEdit: "iconEdit_Z9Sw" };
      function i(e) {
        let { className: t, ...n } = e;
        return a.createElement(
          "svg",
          (0, o.Z)(
            {
              fill: "currentColor",
              height: "20",
              width: "20",
              viewBox: "0 0 40 40",
              className: (0, s.Z)(c.iconEdit, t),
              "aria-hidden": "true"
            },
            n
          ),
          a.createElement(
            "g",
            null,
            a.createElement("path", {
              d: "m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"
            })
          )
        );
      }
      function d(e) {
        let { editUrl: t } = e;
        return a.createElement(
          "a",
          {
            href: t,
            target: "_blank",
            rel: "noreferrer noopener",
            className: r.k.common.editThisPage
          },
          a.createElement(i, null),
          a.createElement(
            l.Z,
            {
              id: "theme.common.editThisPage",
              description: "The link label to edit the current page"
            },
            "Edit this page"
          )
        );
      }
    },
    2244: (e, t, n) => {
      n.d(t, { Z: () => o });
      var a = n(7294),
        l = n(6010),
        r = n(9960);
      function o(e) {
        const { permalink: t, title: n, subLabel: o, isNext: s } = e;
        return a.createElement(
          r.Z,
          {
            className: (0, l.Z)(
              "pagination-nav__link",
              s ? "pagination-nav__link--next" : "pagination-nav__link--prev"
            ),
            to: t
          },
          o &&
            a.createElement(
              "div",
              { className: "pagination-nav__sublabel" },
              o
            ),
          a.createElement("div", { className: "pagination-nav__label" }, n)
        );
      }
    },
    9407: (e, t, n) => {
      n.d(t, { Z: () => d });
      var a = n(7462),
        l = n(7294),
        r = n(6010),
        o = n(3743);
      const s = {
          tableOfContents: "tableOfContents_bqdL",
          docItemContainer: "docItemContainer_F8PC"
        },
        c = "table-of-contents__link toc-highlight",
        i = "table-of-contents__link--active";
      function d(e) {
        let { className: t, ...n } = e;
        return l.createElement(
          "div",
          { className: (0, r.Z)(s.tableOfContents, "thin-scrollbar", t) },
          l.createElement(
            o.Z,
            (0, a.Z)({}, n, { linkClassName: c, linkActiveClassName: i })
          )
        );
      }
    },
    3743: (e, t, n) => {
      n.d(t, { Z: () => b });
      var a = n(7462),
        l = n(7294),
        r = n(6668);
      function o(e) {
        const t = e.map(e => ({ ...e, parentIndex: -1, children: [] })),
          n = Array(7).fill(-1);
        t.forEach((e, t) => {
          const a = n.slice(2, e.level);
          (e.parentIndex = Math.max(...a)), (n[e.level] = t);
        });
        const a = [];
        return (
          t.forEach(e => {
            const { parentIndex: n, ...l } = e;
            n >= 0 ? t[n].children.push(l) : a.push(l);
          }),
          a
        );
      }
      function s(e) {
        let { toc: t, minHeadingLevel: n, maxHeadingLevel: a } = e;
        return t.flatMap(e => {
          const t = s({
            toc: e.children,
            minHeadingLevel: n,
            maxHeadingLevel: a
          });
          return (function (e) {
            return e.level >= n && e.level <= a;
          })(e)
            ? [{ ...e, children: t }]
            : t;
        });
      }
      function c(e) {
        const t = e.getBoundingClientRect();
        return t.top === t.bottom ? c(e.parentNode) : t;
      }
      function i(e, t) {
        let { anchorTopOffset: n } = t;
        const a = e.find(e => c(e).top >= n);
        if (a) {
          return (function (e) {
            return e.top > 0 && e.bottom < window.innerHeight / 2;
          })(c(a))
            ? a
            : e[e.indexOf(a) - 1] ?? null;
        }
        return e[e.length - 1] ?? null;
      }
      function d() {
        const e = (0, l.useRef)(0),
          {
            navbar: { hideOnScroll: t }
          } = (0, r.L)();
        return (
          (0, l.useEffect)(() => {
            e.current = t ? 0 : document.querySelector(".navbar").clientHeight;
          }, [t]),
          e
        );
      }
      function m(e) {
        const t = (0, l.useRef)(void 0),
          n = d();
        (0, l.useEffect)(() => {
          if (!e) return () => {};
          const {
            linkClassName: a,
            linkActiveClassName: l,
            minHeadingLevel: r,
            maxHeadingLevel: o
          } = e;
          function s() {
            const e = (function (e) {
                return Array.from(document.getElementsByClassName(e));
              })(a),
              s = (function (e) {
                let { minHeadingLevel: t, maxHeadingLevel: n } = e;
                const a = [];
                for (let l = t; l <= n; l += 1) a.push(`h${l}.anchor`);
                return Array.from(document.querySelectorAll(a.join()));
              })({ minHeadingLevel: r, maxHeadingLevel: o }),
              c = i(s, { anchorTopOffset: n.current }),
              d = e.find(
                e =>
                  c &&
                  c.id ===
                    (function (e) {
                      return decodeURIComponent(
                        e.href.substring(e.href.indexOf("#") + 1)
                      );
                    })(e)
              );
            e.forEach(e => {
              !(function (e, n) {
                n
                  ? (t.current &&
                      t.current !== e &&
                      t.current.classList.remove(l),
                    e.classList.add(l),
                    (t.current = e))
                  : e.classList.remove(l);
              })(e, e === d);
            });
          }
          return (
            document.addEventListener("scroll", s),
            document.addEventListener("resize", s),
            s(),
            () => {
              document.removeEventListener("scroll", s),
                document.removeEventListener("resize", s);
            }
          );
        }, [e, n]);
      }
      function u(e) {
        let { toc: t, className: n, linkClassName: a, isChild: r } = e;
        return t.length
          ? l.createElement(
              "ul",
              { className: r ? void 0 : n },
              t.map(e =>
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
                    className: n,
                    linkClassName: a
                  })
                )
              )
            )
          : null;
      }
      const v = l.memo(u);
      function b(e) {
        let {
          toc: t,
          className: n = "table-of-contents table-of-contents__left-border",
          linkClassName: c = "table-of-contents__link",
          linkActiveClassName: i,
          minHeadingLevel: d,
          maxHeadingLevel: u,
          ...b
        } = e;
        const p = (0, r.L)(),
          h = d ?? p.tableOfContents.minHeadingLevel,
          g = u ?? p.tableOfContents.maxHeadingLevel,
          E = (function (e) {
            let { toc: t, minHeadingLevel: n, maxHeadingLevel: a } = e;
            return (0, l.useMemo)(
              () => s({ toc: o(t), minHeadingLevel: n, maxHeadingLevel: a }),
              [t, n, a]
            );
          })({ toc: t, minHeadingLevel: h, maxHeadingLevel: g });
        return (
          m(
            (0, l.useMemo)(() => {
              if (c && i)
                return {
                  linkClassName: c,
                  linkActiveClassName: i,
                  minHeadingLevel: h,
                  maxHeadingLevel: g
                };
            }, [c, i, h, g])
          ),
          l.createElement(
            v,
            (0, a.Z)({ toc: E, className: n, linkClassName: c }, b)
          )
        );
      }
    },
    3008: (e, t, n) => {
      n.d(t, { Z: () => s });
      var a = n(7294),
        l = n(6010),
        r = n(9960);
      const o = {
        tag: "tag_zVej",
        tagRegular: "tagRegular_sFm0",
        tagWithCount: "tagWithCount_h2kH"
      };
      function s(e) {
        let { permalink: t, label: n, count: s } = e;
        return a.createElement(
          r.Z,
          {
            href: t,
            className: (0, l.Z)(o.tag, s ? o.tagWithCount : o.tagRegular)
          },
          n,
          s && a.createElement("span", null, s)
        );
      }
    },
    1526: (e, t, n) => {
      n.d(t, { Z: () => c });
      var a = n(7294),
        l = n(6010),
        r = n(5999),
        o = n(3008);
      const s = { tags: "tags_jXut", tag: "tag_QGVx" };
      function c(e) {
        let { tags: t } = e;
        return a.createElement(
          a.Fragment,
          null,
          a.createElement(
            "b",
            null,
            a.createElement(
              r.Z,
              {
                id: "theme.tags.tagsListLabel",
                description: "The label alongside a tag list"
              },
              "Tags:"
            )
          ),
          a.createElement(
            "ul",
            { className: (0, l.Z)(s.tags, "padding--none", "margin-left--sm") },
            t.map(e => {
              let { label: t, permalink: n } = e;
              return a.createElement(
                "li",
                { key: n, className: s.tag },
                a.createElement(o.Z, { label: t, permalink: n })
              );
            })
          )
        );
      }
    }
  }
]);
