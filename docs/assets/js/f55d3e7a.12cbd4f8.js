"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [4193],
  {
    3905: (e, t, r) => {
      r.d(t, { Zo: () => p, kt: () => m });
      var o = r(7294);
      function a(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = r),
          e
        );
      }
      function n(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t &&
            (o = o.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, o);
        }
        return r;
      }
      function i(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? n(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : n(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function s(e, t) {
        if (null == e) return {};
        var r,
          o,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              o,
              a = {},
              n = Object.keys(e);
            for (o = 0; o < n.length; o++)
              (r = n[o]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          for (o = 0; o < n.length; o++)
            (r = n[o]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (a[r] = e[r]));
        }
        return a;
      }
      var l = o.createContext({}),
        u = function (e) {
          var t = o.useContext(l),
            r = t;
          return e && (r = "function" == typeof e ? e(t) : i(i({}, t), e)), r;
        },
        p = function (e) {
          var t = u(e.components);
          return o.createElement(l.Provider, { value: t }, e.children);
        },
        c = "mdxType",
        d = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return o.createElement(o.Fragment, {}, t);
          }
        },
        y = o.forwardRef(function (e, t) {
          var r = e.components,
            a = e.mdxType,
            n = e.originalType,
            l = e.parentName,
            p = s(e, ["components", "mdxType", "originalType", "parentName"]),
            c = u(r),
            y = a,
            m = c["".concat(l, ".").concat(y)] || c[y] || d[y] || n;
          return r
            ? o.createElement(m, i(i({ ref: t }, p), {}, { components: r }))
            : o.createElement(m, i({ ref: t }, p));
        });
      function m(e, t) {
        var r = arguments,
          a = t && t.mdxType;
        if ("string" == typeof e || a) {
          var n = r.length,
            i = new Array(n);
          i[0] = y;
          var s = {};
          for (var l in t) hasOwnProperty.call(t, l) && (s[l] = t[l]);
          (s.originalType = e),
            (s[c] = "string" == typeof e ? e : a),
            (i[1] = s);
          for (var u = 2; u < n; u++) i[u] = r[u];
          return o.createElement.apply(null, i);
        }
        return o.createElement.apply(null, r);
      }
      y.displayName = "MDXCreateElement";
    },
    8030: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => l,
          contentTitle: () => i,
          default: () => d,
          frontMatter: () => n,
          metadata: () => s,
          toc: () => u
        });
      var o = r(7462),
        a = (r(7294), r(3905));
      const n = { sidebar_position: 5 },
        i = "Deploy your site",
        s = {
          unversionedId: "tutorial-basics/deploy-your-site",
          id: "tutorial-basics/deploy-your-site",
          title: "Deploy your site",
          description:
            "Docusaurus is a static-site-generator (also called Jamstack).",
          source: "@site/docs/tutorial-basics/deploy-your-site.md",
          sourceDirName: "tutorial-basics",
          slug: "/tutorial-basics/deploy-your-site",
          permalink:
            "/react-router-manage/docs/tutorial-basics/deploy-your-site",
          draft: !1,
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial-basics/deploy-your-site.md",
          tags: [],
          version: "current",
          sidebarPosition: 5,
          frontMatter: { sidebar_position: 5 },
          sidebar: "tutorialSidebar",
          previous: {
            title: "Markdown Features",
            permalink:
              "/react-router-manage/docs/tutorial-basics/markdown-features"
          },
          next: {
            title: "Congratulations!",
            permalink:
              "/react-router-manage/docs/tutorial-basics/congratulations"
          }
        },
        l = {},
        u = [
          { value: "Build your site", id: "build-your-site", level: 2 },
          { value: "Deploy your site", id: "deploy-your-site-1", level: 2 }
        ],
        p = { toc: u },
        c = "wrapper";
      function d(e) {
        let { components: t, ...r } = e;
        return (0, a.kt)(
          c,
          (0, o.Z)({}, p, r, { components: t, mdxType: "MDXLayout" }),
          (0, a.kt)("h1", { id: "deploy-your-site" }, "Deploy your site"),
          (0, a.kt)(
            "p",
            null,
            "Docusaurus is a ",
            (0, a.kt)("strong", { parentName: "p" }, "static-site-generator"),
            " (also called ",
            (0, a.kt)(
              "strong",
              { parentName: "p" },
              (0, a.kt)(
                "a",
                { parentName: "strong", href: "https://jamstack.org/" },
                "Jamstack"
              )
            ),
            ")."
          ),
          (0, a.kt)(
            "p",
            null,
            "It builds your site as simple ",
            (0, a.kt)(
              "strong",
              { parentName: "p" },
              "static HTML, JavaScript and CSS files"
            ),
            "."
          ),
          (0, a.kt)("h2", { id: "build-your-site" }, "Build your site"),
          (0, a.kt)(
            "p",
            null,
            "Build your site ",
            (0, a.kt)("strong", { parentName: "p" }, "for production"),
            ":"
          ),
          (0, a.kt)(
            "pre",
            null,
            (0, a.kt)(
              "code",
              { parentName: "pre", className: "language-bash" },
              "npm run build\n"
            )
          ),
          (0, a.kt)(
            "p",
            null,
            "The static files are generated in the ",
            (0, a.kt)("inlineCode", { parentName: "p" }, "build"),
            " folder."
          ),
          (0, a.kt)("h2", { id: "deploy-your-site-1" }, "Deploy your site"),
          (0, a.kt)("p", null, "Test your production build locally:"),
          (0, a.kt)(
            "pre",
            null,
            (0, a.kt)(
              "code",
              { parentName: "pre", className: "language-bash" },
              "npm run serve\n"
            )
          ),
          (0, a.kt)(
            "p",
            null,
            "The ",
            (0, a.kt)("inlineCode", { parentName: "p" }, "build"),
            " folder is now served at ",
            (0, a.kt)(
              "a",
              { parentName: "p", href: "http://localhost:3000/" },
              "http://localhost:3000/"
            ),
            "."
          ),
          (0, a.kt)(
            "p",
            null,
            "You can now deploy the ",
            (0, a.kt)("inlineCode", { parentName: "p" }, "build"),
            " folder ",
            (0, a.kt)("strong", { parentName: "p" }, "almost anywhere"),
            " easily, ",
            (0, a.kt)("strong", { parentName: "p" }, "for free"),
            " or very small cost (read the ",
            (0, a.kt)(
              "strong",
              { parentName: "p" },
              (0, a.kt)(
                "a",
                {
                  parentName: "strong",
                  href: "https://docusaurus.io/docs/deployment"
                },
                "Deployment Guide"
              )
            ),
            ")."
          )
        );
      }
      d.isMDXComponent = !0;
    }
  }
]);
