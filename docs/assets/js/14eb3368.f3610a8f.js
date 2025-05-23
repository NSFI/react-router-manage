"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [9817],
  {
    1986: (e, t, a) => {
      a.d(t, { Z: () => p });
      var n = a(7462),
        r = a(7294),
        i = a(6010),
        l = a(5281),
        s = a(2802),
        c = a(8596),
        o = a(9960),
        m = a(4996),
        d = a(5999);
      function u(e) {
        return r.createElement(
          "svg",
          (0, n.Z)({ viewBox: "0 0 24 24" }, e),
          r.createElement("path", {
            d: "M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",
            fill: "currentColor"
          })
        );
      }
      const h = {
        breadcrumbsContainer: "breadcrumbsContainer_Z_bl",
        breadcrumbHomeIcon: "breadcrumbHomeIcon_OVgt"
      };
      function b(e) {
        let { children: t, href: a, isLast: n } = e;
        const i = "breadcrumbs__link";
        return n
          ? r.createElement("span", { className: i, itemProp: "name" }, t)
          : a
          ? r.createElement(
              o.Z,
              { className: i, href: a, itemProp: "item" },
              r.createElement("span", { itemProp: "name" }, t)
            )
          : r.createElement("span", { className: i }, t);
      }
      function v(e) {
        let { children: t, active: a, index: l, addMicrodata: s } = e;
        return r.createElement(
          "li",
          (0, n.Z)(
            {},
            s && {
              itemScope: !0,
              itemProp: "itemListElement",
              itemType: "https://schema.org/ListItem"
            },
            {
              className: (0, i.Z)("breadcrumbs__item", {
                "breadcrumbs__item--active": a
              })
            }
          ),
          t,
          r.createElement("meta", {
            itemProp: "position",
            content: String(l + 1)
          })
        );
      }
      function g() {
        const e = (0, m.Z)("/");
        return r.createElement(
          "li",
          { className: "breadcrumbs__item" },
          r.createElement(
            o.Z,
            {
              "aria-label": (0, d.I)({
                id: "theme.docs.breadcrumbs.home",
                message: "Home page",
                description:
                  "The ARIA label for the home page in the breadcrumbs"
              }),
              className: (0, i.Z)("breadcrumbs__link", h.breadcrumbsItemLink),
              href: e
            },
            r.createElement(u, { className: h.breadcrumbHomeIcon })
          )
        );
      }
      function p() {
        const e = (0, s.s1)(),
          t = (0, c.Ns)();
        return e
          ? r.createElement(
              "nav",
              {
                className: (0, i.Z)(
                  l.k.docs.docBreadcrumbs,
                  h.breadcrumbsContainer
                ),
                "aria-label": (0, d.I)({
                  id: "theme.docs.breadcrumbs.navAriaLabel",
                  message: "Breadcrumbs",
                  description: "The ARIA label for the breadcrumbs"
                })
              },
              r.createElement(
                "ul",
                {
                  className: "breadcrumbs",
                  itemScope: !0,
                  itemType: "https://schema.org/BreadcrumbList"
                },
                t && r.createElement(g, null),
                e.map((t, a) => {
                  const n = a === e.length - 1;
                  return r.createElement(
                    v,
                    { key: a, active: n, index: a, addMicrodata: !!t.href },
                    r.createElement(b, { href: t.href, isLast: n }, t.label)
                  );
                })
              )
            )
          : null;
      }
    },
    4228: (e, t, a) => {
      a.r(t), a.d(t, { default: () => I });
      var n = a(7294),
        r = a(1944),
        i = a(2802),
        l = a(4996),
        s = a(6010),
        c = a(9960),
        o = a(3919),
        m = a(5999);
      const d = {
        cardContainer: "cardContainer_fWXF",
        cardTitle: "cardTitle_rnsV",
        cardDescription: "cardDescription_PWke"
      };
      function u(e) {
        let { href: t, children: a } = e;
        return n.createElement(
          c.Z,
          { href: t, className: (0, s.Z)("card padding--lg", d.cardContainer) },
          a
        );
      }
      function h(e) {
        let { href: t, icon: a, title: r, description: i } = e;
        return n.createElement(
          u,
          { href: t },
          n.createElement(
            "h2",
            { className: (0, s.Z)("text--truncate", d.cardTitle), title: r },
            a,
            " ",
            r
          ),
          i &&
            n.createElement(
              "p",
              {
                className: (0, s.Z)("text--truncate", d.cardDescription),
                title: i
              },
              i
            )
        );
      }
      function b(e) {
        let { item: t } = e;
        const a = (0, i.Wl)(t);
        return a
          ? n.createElement(h, {
              href: a,
              icon: "\ud83d\uddc3\ufe0f",
              title: t.label,
              description: (0, m.I)(
                {
                  message: "{count} items",
                  id: "theme.docs.DocCard.categoryDescription",
                  description:
                    "The default description for a category card in the generated index about how many items this category includes"
                },
                { count: t.items.length }
              )
            })
          : null;
      }
      function v(e) {
        let { item: t } = e;
        const a = (0, o.Z)(t.href) ? "\ud83d\udcc4\ufe0f" : "\ud83d\udd17",
          r = (0, i.xz)(t.docId ?? void 0);
        return n.createElement(h, {
          href: t.href,
          icon: a,
          title: t.label,
          description: r?.description
        });
      }
      function g(e) {
        let { item: t } = e;
        switch (t.type) {
          case "link":
            return n.createElement(v, { item: t });
          case "category":
            return n.createElement(b, { item: t });
          default:
            throw new Error(`unknown item type ${JSON.stringify(t)}`);
        }
      }
      function p(e) {
        let { className: t } = e;
        const a = (0, i.jA)();
        return n.createElement(E, { items: a.items, className: t });
      }
      function E(e) {
        const { items: t, className: a } = e;
        if (!t) return n.createElement(p, e);
        const r = (0, i.MN)(t);
        return n.createElement(
          "section",
          { className: (0, s.Z)("row", a) },
          r.map((e, t) =>
            n.createElement(
              "article",
              { key: t, className: "col col--6 margin-bottom--lg" },
              n.createElement(g, { item: e })
            )
          )
        );
      }
      var f = a(49),
        N = a(3120),
        Z = a(4364),
        k = a(1986),
        L = a(2503);
      const _ = {
        generatedIndexPage: "generatedIndexPage_vN6x",
        list: "list_eTzJ",
        title: "title_kItE"
      };
      function T(e) {
        let { categoryGeneratedIndex: t } = e;
        return n.createElement(r.d, {
          title: t.title,
          description: t.description,
          keywords: t.keywords,
          image: (0, l.Z)(t.image)
        });
      }
      function x(e) {
        let { categoryGeneratedIndex: t } = e;
        const a = (0, i.jA)();
        return n.createElement(
          "div",
          { className: _.generatedIndexPage },
          n.createElement(N.Z, null),
          n.createElement(k.Z, null),
          n.createElement(Z.Z, null),
          n.createElement(
            "header",
            null,
            n.createElement(L.Z, { as: "h1", className: _.title }, t.title),
            t.description && n.createElement("p", null, t.description)
          ),
          n.createElement(
            "article",
            { className: "margin-top--lg" },
            n.createElement(E, { items: a.items, className: _.list })
          ),
          n.createElement(
            "footer",
            { className: "margin-top--lg" },
            n.createElement(f.Z, {
              previous: t.navigation.previous,
              next: t.navigation.next
            })
          )
        );
      }
      function I(e) {
        return n.createElement(
          n.Fragment,
          null,
          n.createElement(T, e),
          n.createElement(x, e)
        );
      }
    },
    49: (e, t, a) => {
      a.d(t, { Z: () => s });
      var n = a(7462),
        r = a(7294),
        i = a(5999),
        l = a(2244);
      function s(e) {
        const { previous: t, next: a } = e;
        return r.createElement(
          "nav",
          {
            className: "pagination-nav docusaurus-mt-lg",
            "aria-label": (0, i.I)({
              id: "theme.docs.paginator.navAriaLabel",
              message: "Docs pages navigation",
              description: "The ARIA label for the docs pagination"
            })
          },
          t &&
            r.createElement(
              l.Z,
              (0, n.Z)({}, t, {
                subLabel: r.createElement(
                  i.Z,
                  {
                    id: "theme.docs.paginator.previous",
                    description:
                      "The label used to navigate to the previous doc"
                  },
                  "Previous"
                )
              })
            ),
          a &&
            r.createElement(
              l.Z,
              (0, n.Z)({}, a, {
                subLabel: r.createElement(
                  i.Z,
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
    4364: (e, t, a) => {
      a.d(t, { Z: () => c });
      var n = a(7294),
        r = a(6010),
        i = a(5999),
        l = a(5281),
        s = a(4477);
      function c(e) {
        let { className: t } = e;
        const a = (0, s.E)();
        return a.badge
          ? n.createElement(
              "span",
              {
                className: (0, r.Z)(
                  t,
                  l.k.docs.docVersionBadge,
                  "badge badge--secondary"
                )
              },
              n.createElement(
                i.Z,
                {
                  id: "theme.docs.versionBadge.label",
                  values: { versionLabel: a.label }
                },
                "Version: {versionLabel}"
              )
            )
          : null;
      }
    },
    3120: (e, t, a) => {
      a.d(t, { Z: () => g });
      var n = a(7294),
        r = a(6010),
        i = a(2263),
        l = a(9960),
        s = a(5999),
        c = a(143),
        o = a(5281),
        m = a(373),
        d = a(4477);
      const u = {
        unreleased: function (e) {
          let { siteTitle: t, versionMetadata: a } = e;
          return n.createElement(
            s.Z,
            {
              id: "theme.docs.versions.unreleasedVersionLabel",
              description:
                "The label used to tell the user that he's browsing an unreleased doc version",
              values: {
                siteTitle: t,
                versionLabel: n.createElement("b", null, a.label)
              }
            },
            "This is unreleased documentation for {siteTitle} {versionLabel} version."
          );
        },
        unmaintained: function (e) {
          let { siteTitle: t, versionMetadata: a } = e;
          return n.createElement(
            s.Z,
            {
              id: "theme.docs.versions.unmaintainedVersionLabel",
              description:
                "The label used to tell the user that he's browsing an unmaintained doc version",
              values: {
                siteTitle: t,
                versionLabel: n.createElement("b", null, a.label)
              }
            },
            "This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."
          );
        }
      };
      function h(e) {
        const t = u[e.versionMetadata.banner];
        return n.createElement(t, e);
      }
      function b(e) {
        let { versionLabel: t, to: a, onClick: r } = e;
        return n.createElement(
          s.Z,
          {
            id: "theme.docs.versions.latestVersionSuggestionLabel",
            description:
              "The label used to tell the user to check the latest version",
            values: {
              versionLabel: t,
              latestVersionLink: n.createElement(
                "b",
                null,
                n.createElement(
                  l.Z,
                  { to: a, onClick: r },
                  n.createElement(
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
      function v(e) {
        let { className: t, versionMetadata: a } = e;
        const {
            siteConfig: { title: l }
          } = (0, i.Z)(),
          { pluginId: s } = (0, c.gA)({ failfast: !0 }),
          { savePreferredVersionName: d } = (0, m.J)(s),
          { latestDocSuggestion: u, latestVersionSuggestion: v } = (0, c.Jo)(s),
          g = u ?? (p = v).docs.find(e => e.id === p.mainDocId);
        var p;
        return n.createElement(
          "div",
          {
            className: (0, r.Z)(
              t,
              o.k.docs.docVersionBanner,
              "alert alert--warning margin-bottom--md"
            ),
            role: "alert"
          },
          n.createElement(
            "div",
            null,
            n.createElement(h, { siteTitle: l, versionMetadata: a })
          ),
          n.createElement(
            "div",
            { className: "margin-top--md" },
            n.createElement(b, {
              versionLabel: v.label,
              to: g.path,
              onClick: () => d(v.name)
            })
          )
        );
      }
      function g(e) {
        let { className: t } = e;
        const a = (0, d.E)();
        return a.banner
          ? n.createElement(v, { className: t, versionMetadata: a })
          : null;
      }
    },
    2503: (e, t, a) => {
      a.d(t, { Z: () => o });
      var n = a(7462),
        r = a(7294),
        i = a(6010),
        l = a(5999),
        s = a(6668);
      const c = {
        anchorWithStickyNavbar: "anchorWithStickyNavbar_LWe7",
        anchorWithHideOnScrollNavbar: "anchorWithHideOnScrollNavbar_WYt5"
      };
      function o(e) {
        let { as: t, id: a, ...o } = e;
        const {
          navbar: { hideOnScroll: m }
        } = (0, s.L)();
        return "h1" !== t && a
          ? r.createElement(
              t,
              (0, n.Z)({}, o, {
                className: (0, i.Z)(
                  "anchor",
                  m ? c.anchorWithHideOnScrollNavbar : c.anchorWithStickyNavbar
                ),
                id: a
              }),
              o.children,
              r.createElement(
                "a",
                {
                  className: "hash-link",
                  href: `#${a}`,
                  title: (0, l.I)({
                    id: "theme.common.headingLinkTitle",
                    message: "Direct link to heading",
                    description: "Title for link to heading"
                  })
                },
                "\u200b"
              )
            )
          : r.createElement(t, (0, n.Z)({}, o, { id: void 0 }));
      }
    },
    2244: (e, t, a) => {
      a.d(t, { Z: () => l });
      var n = a(7294),
        r = a(6010),
        i = a(9960);
      function l(e) {
        const { permalink: t, title: a, subLabel: l, isNext: s } = e;
        return n.createElement(
          i.Z,
          {
            className: (0, r.Z)(
              "pagination-nav__link",
              s ? "pagination-nav__link--next" : "pagination-nav__link--prev"
            ),
            to: t
          },
          l &&
            n.createElement(
              "div",
              { className: "pagination-nav__sublabel" },
              l
            ),
          n.createElement("div", { className: "pagination-nav__label" }, a)
        );
      }
    }
  }
]);
