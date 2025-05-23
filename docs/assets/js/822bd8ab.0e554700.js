"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [6504],
  {
    3905: (t, e, r) => {
      r.d(e, { Zo: () => l, kt: () => f });
      var a = r(7294);
      function n(t, e, r) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (t[e] = r),
          t
        );
      }
      function o(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(t);
          e &&
            (a = a.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, a);
        }
        return r;
      }
      function s(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? o(Object(r), !0).forEach(function (e) {
                n(t, e, r[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
            : o(Object(r)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(r, e)
                );
              });
        }
        return t;
      }
      function i(t, e) {
        if (null == t) return {};
        var r,
          a,
          n = (function (t, e) {
            if (null == t) return {};
            var r,
              a,
              n = {},
              o = Object.keys(t);
            for (a = 0; a < o.length; a++)
              (r = o[a]), e.indexOf(r) >= 0 || (n[r] = t[r]);
            return n;
          })(t, e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(t);
          for (a = 0; a < o.length; a++)
            (r = o[a]),
              e.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(t, r) &&
                  (n[r] = t[r]));
        }
        return n;
      }
      var u = a.createContext({}),
        c = function (t) {
          var e = a.useContext(u),
            r = e;
          return t && (r = "function" == typeof t ? t(e) : s(s({}, e), t)), r;
        },
        l = function (t) {
          var e = c(t.components);
          return a.createElement(u.Provider, { value: e }, t.children);
        },
        p = "mdxType",
        m = {
          inlineCode: "code",
          wrapper: function (t) {
            var e = t.children;
            return a.createElement(a.Fragment, {}, e);
          }
        },
        d = a.forwardRef(function (t, e) {
          var r = t.components,
            n = t.mdxType,
            o = t.originalType,
            u = t.parentName,
            l = i(t, ["components", "mdxType", "originalType", "parentName"]),
            p = c(r),
            d = n,
            f = p["".concat(u, ".").concat(d)] || p[d] || m[d] || o;
          return r
            ? a.createElement(f, s(s({ ref: e }, l), {}, { components: r }))
            : a.createElement(f, s({ ref: e }, l));
        });
      function f(t, e) {
        var r = arguments,
          n = e && e.mdxType;
        if ("string" == typeof t || n) {
          var o = r.length,
            s = new Array(o);
          s[0] = d;
          var i = {};
          for (var u in e) hasOwnProperty.call(e, u) && (i[u] = e[u]);
          (i.originalType = t),
            (i[p] = "string" == typeof t ? t : n),
            (s[1] = i);
          for (var c = 2; c < o; c++) s[c] = r[c];
          return a.createElement.apply(null, s);
        }
        return a.createElement.apply(null, r);
      }
      d.displayName = "MDXCreateElement";
    },
    7428: (t, e, r) => {
      r.r(e),
        r.d(e, {
          assets: () => u,
          contentTitle: () => s,
          default: () => m,
          frontMatter: () => o,
          metadata: () => i,
          toc: () => c
        });
      var a = r(7462),
        n = (r(7294), r(3905));
      const o = { sidebar_position: 6 },
        s = "Congratulations!",
        i = {
          unversionedId: "tutorial-basics/congratulations",
          id: "tutorial-basics/congratulations",
          title: "Congratulations!",
          description:
            "You have just learned the basics of Docusaurus and made some changes to the initial template.",
          source: "@site/docs/tutorial-basics/congratulations.md",
          sourceDirName: "tutorial-basics",
          slug: "/tutorial-basics/congratulations",
          permalink:
            "/react-router-manage/docs/tutorial-basics/congratulations",
          draft: !1,
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial-basics/congratulations.md",
          tags: [],
          version: "current",
          sidebarPosition: 6,
          frontMatter: { sidebar_position: 6 },
          sidebar: "tutorialSidebar",
          previous: {
            title: "Deploy your site",
            permalink:
              "/react-router-manage/docs/tutorial-basics/deploy-your-site"
          },
          next: {
            title: "Tutorial - Extras",
            permalink: "/react-router-manage/docs/category/tutorial---extras"
          }
        },
        u = {},
        c = [{ value: "What&#39;s next?", id: "whats-next", level: 2 }],
        l = { toc: c },
        p = "wrapper";
      function m(t) {
        let { components: e, ...r } = t;
        return (0, n.kt)(
          p,
          (0, a.Z)({}, l, r, { components: e, mdxType: "MDXLayout" }),
          (0, n.kt)("h1", { id: "congratulations" }, "Congratulations!"),
          (0, n.kt)(
            "p",
            null,
            "You have just learned the ",
            (0, n.kt)("strong", { parentName: "p" }, "basics of Docusaurus"),
            " and made some changes to the ",
            (0, n.kt)("strong", { parentName: "p" }, "initial template"),
            "."
          ),
          (0, n.kt)(
            "p",
            null,
            "Docusaurus has ",
            (0, n.kt)("strong", { parentName: "p" }, "much more to offer"),
            "!"
          ),
          (0, n.kt)(
            "p",
            null,
            "Have ",
            (0, n.kt)("strong", { parentName: "p" }, "5 more minutes"),
            "? Take a look at ",
            (0, n.kt)(
              "strong",
              { parentName: "p" },
              (0, n.kt)(
                "a",
                {
                  parentName: "strong",
                  href: "/react-router-manage/docs/tutorial-extras/manage-docs-versions"
                },
                "versioning"
              )
            ),
            " and ",
            (0, n.kt)(
              "strong",
              { parentName: "p" },
              (0, n.kt)(
                "a",
                {
                  parentName: "strong",
                  href: "/react-router-manage/docs/tutorial-extras/translate-your-site"
                },
                "i18n"
              )
            ),
            "."
          ),
          (0, n.kt)(
            "p",
            null,
            "Anything ",
            (0, n.kt)("strong", { parentName: "p" }, "unclear"),
            " or ",
            (0, n.kt)("strong", { parentName: "p" }, "buggy"),
            " in this tutorial? ",
            (0, n.kt)(
              "a",
              {
                parentName: "p",
                href: "https://github.com/facebook/docusaurus/discussions/4610"
              },
              "Please report it!"
            )
          ),
          (0, n.kt)("h2", { id: "whats-next" }, "What's next?"),
          (0, n.kt)(
            "ul",
            null,
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              "Read the ",
              (0, n.kt)(
                "a",
                { parentName: "li", href: "https://docusaurus.io/" },
                "official documentation"
              )
            ),
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              "Modify your site configuration with ",
              (0, n.kt)(
                "a",
                {
                  parentName: "li",
                  href: "https://docusaurus.io/docs/api/docusaurus-config"
                },
                (0, n.kt)(
                  "inlineCode",
                  { parentName: "a" },
                  "docusaurus.config.js"
                )
              )
            ),
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              "Add navbar and footer items with ",
              (0, n.kt)(
                "a",
                {
                  parentName: "li",
                  href: "https://docusaurus.io/docs/api/themes/configuration"
                },
                (0, n.kt)("inlineCode", { parentName: "a" }, "themeConfig")
              )
            ),
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              "Add a custom ",
              (0, n.kt)(
                "a",
                {
                  parentName: "li",
                  href: "https://docusaurus.io/docs/styling-layout"
                },
                "Design and Layout"
              )
            ),
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              "Add a ",
              (0, n.kt)(
                "a",
                { parentName: "li", href: "https://docusaurus.io/docs/search" },
                "search bar"
              )
            ),
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              "Find inspirations in the ",
              (0, n.kt)(
                "a",
                { parentName: "li", href: "https://docusaurus.io/showcase" },
                "Docusaurus showcase"
              )
            ),
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              "Get involved in the ",
              (0, n.kt)(
                "a",
                {
                  parentName: "li",
                  href: "https://docusaurus.io/community/support"
                },
                "Docusaurus Community"
              )
            )
          )
        );
      }
      m.isMDXComponent = !0;
    }
  }
]);
