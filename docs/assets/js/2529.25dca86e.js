"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [2529],
  {
    9058: (e, t, a) => {
      a.d(t, { Z: () => p });
      var l = a(7294),
        n = a(6010),
        r = a(3285),
        s = a(7524),
        o = a(9960),
        i = a(5999);
      const c = {
        sidebar: "sidebar_re4s",
        sidebarItemTitle: "sidebarItemTitle_pO2u",
        sidebarItemList: "sidebarItemList_Yudw",
        sidebarItem: "sidebarItem__DBe",
        sidebarItemLink: "sidebarItemLink_mo7H",
        sidebarItemLinkActive: "sidebarItemLinkActive_I1ZP"
      };
      function m(e) {
        let { sidebar: t } = e;
        return l.createElement(
          "aside",
          { className: "col col--3" },
          l.createElement(
            "nav",
            {
              className: (0, n.Z)(c.sidebar, "thin-scrollbar"),
              "aria-label": (0, i.I)({
                id: "theme.blog.sidebar.navAriaLabel",
                message: "Blog recent posts navigation",
                description:
                  "The ARIA label for recent posts in the blog sidebar"
              })
            },
            l.createElement(
              "div",
              { className: (0, n.Z)(c.sidebarItemTitle, "margin-bottom--md") },
              t.title
            ),
            l.createElement(
              "ul",
              { className: (0, n.Z)(c.sidebarItemList, "clean-list") },
              t.items.map(e =>
                l.createElement(
                  "li",
                  { key: e.permalink, className: c.sidebarItem },
                  l.createElement(
                    o.Z,
                    {
                      isNavLink: !0,
                      to: e.permalink,
                      className: c.sidebarItemLink,
                      activeClassName: c.sidebarItemLinkActive
                    },
                    e.title
                  )
                )
              )
            )
          )
        );
      }
      var u = a(3102);
      function d(e) {
        let { sidebar: t } = e;
        return l.createElement(
          "ul",
          { className: "menu__list" },
          t.items.map(e =>
            l.createElement(
              "li",
              { key: e.permalink, className: "menu__list-item" },
              l.createElement(
                o.Z,
                {
                  isNavLink: !0,
                  to: e.permalink,
                  className: "menu__link",
                  activeClassName: "menu__link--active"
                },
                e.title
              )
            )
          )
        );
      }
      function g(e) {
        return l.createElement(u.Zo, { component: d, props: e });
      }
      function h(e) {
        let { sidebar: t } = e;
        const a = (0, s.i)();
        return t?.items.length
          ? "mobile" === a
            ? l.createElement(g, { sidebar: t })
            : l.createElement(m, { sidebar: t })
          : null;
      }
      function p(e) {
        const { sidebar: t, toc: a, children: s, ...o } = e,
          i = t && t.items.length > 0;
        return l.createElement(
          r.Z,
          o,
          l.createElement(
            "div",
            { className: "container margin-vert--lg" },
            l.createElement(
              "div",
              { className: "row" },
              l.createElement(h, { sidebar: t }),
              l.createElement(
                "main",
                {
                  className: (0, n.Z)("col", {
                    "col--7": i,
                    "col--9 col--offset-1": !i
                  }),
                  itemScope: !0,
                  itemType: "http://schema.org/Blog"
                },
                s
              ),
              a && l.createElement("div", { className: "col col--2" }, a)
            )
          )
        );
      }
    },
    390: (e, t, a) => {
      a.d(t, { Z: () => R });
      var l = a(7294),
        n = a(6010),
        r = a(9460),
        s = a(4996);
      function o(e) {
        let { children: t, className: a } = e;
        const { frontMatter: n, assets: o } = (0, r.C)(),
          { withBaseUrl: i } = (0, s.C)(),
          c = o.image ?? n.image;
        return l.createElement(
          "article",
          {
            className: a,
            itemProp: "blogPost",
            itemScope: !0,
            itemType: "http://schema.org/BlogPosting"
          },
          c &&
            l.createElement("meta", {
              itemProp: "image",
              content: i(c, { absolute: !0 })
            }),
          t
        );
      }
      var i = a(9960);
      const c = { title: "title_f1Hy" };
      function m(e) {
        let { className: t } = e;
        const { metadata: a, isBlogPostPage: s } = (0, r.C)(),
          { permalink: o, title: m } = a,
          u = s ? "h1" : "h2";
        return l.createElement(
          u,
          { className: (0, n.Z)(c.title, t), itemProp: "headline" },
          s ? m : l.createElement(i.Z, { itemProp: "url", to: o }, m)
        );
      }
      var u = a(5999),
        d = a(8824);
      const g = { container: "container_mt6G" };
      function h(e) {
        let { readingTime: t } = e;
        const a = (function () {
          const { selectMessage: e } = (0, d.c)();
          return t => {
            const a = Math.ceil(t);
            return e(
              a,
              (0, u.I)(
                {
                  id: "theme.blog.post.readingTime.plurals",
                  description:
                    'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
                  message: "One min read|{readingTime} min read"
                },
                { readingTime: a }
              )
            );
          };
        })();
        return l.createElement(l.Fragment, null, a(t));
      }
      function p(e) {
        let { date: t, formattedDate: a } = e;
        return l.createElement(
          "time",
          { dateTime: t, itemProp: "datePublished" },
          a
        );
      }
      function E() {
        return l.createElement(l.Fragment, null, " \xb7 ");
      }
      function b(e) {
        let { className: t } = e;
        const { metadata: a } = (0, r.C)(),
          { date: s, formattedDate: o, readingTime: i } = a;
        return l.createElement(
          "div",
          { className: (0, n.Z)(g.container, "margin-vert--md", t) },
          l.createElement(p, { date: s, formattedDate: o }),
          void 0 !== i &&
            l.createElement(
              l.Fragment,
              null,
              l.createElement(E, null),
              l.createElement(h, { readingTime: i })
            )
        );
      }
      function f(e) {
        return e.href
          ? l.createElement(i.Z, e)
          : l.createElement(l.Fragment, null, e.children);
      }
      function v(e) {
        let { author: t, className: a } = e;
        const { name: r, title: s, url: o, imageURL: i, email: c } = t,
          m = o || (c && `mailto:${c}`) || void 0;
        return l.createElement(
          "div",
          { className: (0, n.Z)("avatar margin-bottom--sm", a) },
          i &&
            l.createElement(
              f,
              { href: m, className: "avatar__photo-link" },
              l.createElement("img", {
                className: "avatar__photo",
                src: i,
                alt: r
              })
            ),
          r &&
            l.createElement(
              "div",
              {
                className: "avatar__intro",
                itemProp: "author",
                itemScope: !0,
                itemType: "https://schema.org/Person"
              },
              l.createElement(
                "div",
                { className: "avatar__name" },
                l.createElement(
                  f,
                  { href: m, itemProp: "url" },
                  l.createElement("span", { itemProp: "name" }, r)
                )
              ),
              s &&
                l.createElement(
                  "small",
                  { className: "avatar__subtitle", itemProp: "description" },
                  s
                )
            )
        );
      }
      const N = {
        authorCol: "authorCol_Hf19",
        imageOnlyAuthorRow: "imageOnlyAuthorRow_pa_O",
        imageOnlyAuthorCol: "imageOnlyAuthorCol_G86a"
      };
      function _(e) {
        let { className: t } = e;
        const {
          metadata: { authors: a },
          assets: s
        } = (0, r.C)();
        if (0 === a.length) return null;
        const o = a.every(e => {
          let { name: t } = e;
          return !t;
        });
        return l.createElement(
          "div",
          {
            className: (0, n.Z)(
              "margin-top--md margin-bottom--sm",
              o ? N.imageOnlyAuthorRow : "row",
              t
            )
          },
          a.map((e, t) =>
            l.createElement(
              "div",
              {
                className: (0, n.Z)(
                  !o && "col col--6",
                  o ? N.imageOnlyAuthorCol : N.authorCol
                ),
                key: t
              },
              l.createElement(v, {
                author: { ...e, imageURL: s.authorsImageUrls[t] ?? e.imageURL }
              })
            )
          )
        );
      }
      function P() {
        return l.createElement(
          "header",
          null,
          l.createElement(m, null),
          l.createElement(b, null),
          l.createElement(_, null)
        );
      }
      var Z = a(8780),
        k = a(210);
      function C(e) {
        let { children: t, className: a } = e;
        const { isBlogPostPage: s } = (0, r.C)();
        return l.createElement(
          "div",
          {
            id: s ? Z.blogPostContainerID : void 0,
            className: (0, n.Z)("markdown", a),
            itemProp: "articleBody"
          },
          l.createElement(k.Z, null, t)
        );
      }
      var I = a(4881),
        T = a(1526),
        w = a(7462);
      function y() {
        return l.createElement(
          "b",
          null,
          l.createElement(
            u.Z,
            {
              id: "theme.blog.post.readMore",
              description:
                "The label used in blog post item excerpts to link to full blog posts"
            },
            "Read More"
          )
        );
      }
      function F(e) {
        const { blogPostTitle: t, ...a } = e;
        return l.createElement(
          i.Z,
          (0, w.Z)(
            {
              "aria-label": (0, u.I)(
                {
                  message: "Read more about {title}",
                  id: "theme.blog.post.readMoreLabel",
                  description:
                    "The ARIA label for the link to full blog posts from excerpts"
                },
                { title: t }
              )
            },
            a
          ),
          l.createElement(y, null)
        );
      }
      const L = { blogPostFooterDetailsFull: "blogPostFooterDetailsFull_mRVl" };
      function B() {
        const { metadata: e, isBlogPostPage: t } = (0, r.C)(),
          { tags: a, title: s, editUrl: o, hasTruncateMarker: i } = e,
          c = !t && i,
          m = a.length > 0;
        return m || c || o
          ? l.createElement(
              "footer",
              {
                className: (0, n.Z)(
                  "row docusaurus-mt-lg",
                  t && L.blogPostFooterDetailsFull
                )
              },
              m &&
                l.createElement(
                  "div",
                  { className: (0, n.Z)("col", { "col--9": c }) },
                  l.createElement(T.Z, { tags: a })
                ),
              t &&
                o &&
                l.createElement(
                  "div",
                  { className: "col margin-top--sm" },
                  l.createElement(I.Z, { editUrl: o })
                ),
              c &&
                l.createElement(
                  "div",
                  { className: (0, n.Z)("col text--right", { "col--3": m }) },
                  l.createElement(F, { blogPostTitle: s, to: e.permalink })
                )
            )
          : null;
      }
      function R(e) {
        let { children: t, className: a } = e;
        const s = (function () {
          const { isBlogPostPage: e } = (0, r.C)();
          return e ? void 0 : "margin-bottom--xl";
        })();
        return l.createElement(
          o,
          { className: (0, n.Z)(s, a) },
          l.createElement(P, null),
          l.createElement(C, null, t),
          l.createElement(B, null)
        );
      }
    },
    4881: (e, t, a) => {
      a.d(t, { Z: () => m });
      var l = a(7294),
        n = a(5999),
        r = a(5281),
        s = a(7462),
        o = a(6010);
      const i = { iconEdit: "iconEdit_Z9Sw" };
      function c(e) {
        let { className: t, ...a } = e;
        return l.createElement(
          "svg",
          (0, s.Z)(
            {
              fill: "currentColor",
              height: "20",
              width: "20",
              viewBox: "0 0 40 40",
              className: (0, o.Z)(i.iconEdit, t),
              "aria-hidden": "true"
            },
            a
          ),
          l.createElement(
            "g",
            null,
            l.createElement("path", {
              d: "m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"
            })
          )
        );
      }
      function m(e) {
        let { editUrl: t } = e;
        return l.createElement(
          "a",
          {
            href: t,
            target: "_blank",
            rel: "noreferrer noopener",
            className: r.k.common.editThisPage
          },
          l.createElement(c, null),
          l.createElement(
            n.Z,
            {
              id: "theme.common.editThisPage",
              description: "The link label to edit the current page"
            },
            "Edit this page"
          )
        );
      }
    },
    2244: (e, t, a) => {
      a.d(t, { Z: () => s });
      var l = a(7294),
        n = a(6010),
        r = a(9960);
      function s(e) {
        const { permalink: t, title: a, subLabel: s, isNext: o } = e;
        return l.createElement(
          r.Z,
          {
            className: (0, n.Z)(
              "pagination-nav__link",
              o ? "pagination-nav__link--next" : "pagination-nav__link--prev"
            ),
            to: t
          },
          s &&
            l.createElement(
              "div",
              { className: "pagination-nav__sublabel" },
              s
            ),
          l.createElement("div", { className: "pagination-nav__label" }, a)
        );
      }
    },
    3008: (e, t, a) => {
      a.d(t, { Z: () => o });
      var l = a(7294),
        n = a(6010),
        r = a(9960);
      const s = {
        tag: "tag_zVej",
        tagRegular: "tagRegular_sFm0",
        tagWithCount: "tagWithCount_h2kH"
      };
      function o(e) {
        let { permalink: t, label: a, count: o } = e;
        return l.createElement(
          r.Z,
          {
            href: t,
            className: (0, n.Z)(s.tag, o ? s.tagWithCount : s.tagRegular)
          },
          a,
          o && l.createElement("span", null, o)
        );
      }
    },
    1526: (e, t, a) => {
      a.d(t, { Z: () => i });
      var l = a(7294),
        n = a(6010),
        r = a(5999),
        s = a(3008);
      const o = { tags: "tags_jXut", tag: "tag_QGVx" };
      function i(e) {
        let { tags: t } = e;
        return l.createElement(
          l.Fragment,
          null,
          l.createElement(
            "b",
            null,
            l.createElement(
              r.Z,
              {
                id: "theme.tags.tagsListLabel",
                description: "The label alongside a tag list"
              },
              "Tags:"
            )
          ),
          l.createElement(
            "ul",
            { className: (0, n.Z)(o.tags, "padding--none", "margin-left--sm") },
            t.map(e => {
              let { label: t, permalink: a } = e;
              return l.createElement(
                "li",
                { key: a, className: o.tag },
                l.createElement(s.Z, { label: t, permalink: a })
              );
            })
          )
        );
      }
    },
    9460: (e, t, a) => {
      a.d(t, { C: () => o, n: () => s });
      var l = a(7294),
        n = a(902);
      const r = l.createContext(null);
      function s(e) {
        let { children: t, content: a, isBlogPostPage: n = !1 } = e;
        const s = (function (e) {
          let { content: t, isBlogPostPage: a } = e;
          return (0, l.useMemo)(
            () => ({
              metadata: t.metadata,
              frontMatter: t.frontMatter,
              assets: t.assets,
              toc: t.toc,
              isBlogPostPage: a
            }),
            [t, a]
          );
        })({ content: a, isBlogPostPage: n });
        return l.createElement(r.Provider, { value: s }, t);
      }
      function o() {
        const e = (0, l.useContext)(r);
        if (null === e) throw new n.i6("BlogPostProvider");
        return e;
      }
    },
    8824: (e, t, a) => {
      a.d(t, { c: () => c });
      var l = a(7294),
        n = a(2263);
      const r = ["zero", "one", "two", "few", "many", "other"];
      function s(e) {
        return r.filter(t => e.includes(t));
      }
      const o = {
        locale: "en",
        pluralForms: s(["one", "other"]),
        select: e => (1 === e ? "one" : "other")
      };
      function i() {
        const {
          i18n: { currentLocale: e }
        } = (0, n.Z)();
        return (0, l.useMemo)(() => {
          try {
            return (function (e) {
              const t = new Intl.PluralRules(e);
              return {
                locale: e,
                pluralForms: s(t.resolvedOptions().pluralCategories),
                select: e => t.select(e)
              };
            })(e);
          } catch (t) {
            return (
              console.error(
                `Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`
              ),
              o
            );
          }
        }, [e]);
      }
      function c() {
        const e = i();
        return {
          selectMessage: (t, a) =>
            (function (e, t, a) {
              const l = e.split("|");
              if (1 === l.length) return l[0];
              l.length > a.pluralForms.length &&
                console.error(
                  `For locale=${a.locale}, a maximum of ${
                    a.pluralForms.length
                  } plural forms are expected (${a.pluralForms.join(
                    ","
                  )}), but the message contains ${l.length}: ${e}`
                );
              const n = a.select(t),
                r = a.pluralForms.indexOf(n);
              return l[Math.min(r, l.length - 1)];
            })(a, t, e)
        };
      }
    }
  }
]);
