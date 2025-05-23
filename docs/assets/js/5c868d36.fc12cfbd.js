"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [5589],
  {
    3905: (e, t, a) => {
      a.d(t, { Zo: () => s, kt: () => g });
      var r = a(7294);
      function n(e, t, a) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = a),
          e
        );
      }
      function o(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function i(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? o(Object(a), !0).forEach(function (t) {
                n(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : o(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function c(e, t) {
        if (null == e) return {};
        var a,
          r,
          n = (function (e, t) {
            if (null == e) return {};
            var a,
              r,
              n = {},
              o = Object.keys(e);
            for (r = 0; r < o.length; r++)
              (a = o[r]), t.indexOf(a) >= 0 || (n[a] = e[a]);
            return n;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (r = 0; r < o.length; r++)
            (a = o[r]),
              t.indexOf(a) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, a) &&
                  (n[a] = e[a]));
        }
        return n;
      }
      var l = r.createContext({}),
        p = function (e) {
          var t = r.useContext(l),
            a = t;
          return e && (a = "function" == typeof e ? e(t) : i(i({}, t), e)), a;
        },
        s = function (e) {
          var t = p(e.components);
          return r.createElement(l.Provider, { value: t }, e.children);
        },
        u = "mdxType",
        m = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return r.createElement(r.Fragment, {}, t);
          }
        },
        d = r.forwardRef(function (e, t) {
          var a = e.components,
            n = e.mdxType,
            o = e.originalType,
            l = e.parentName,
            s = c(e, ["components", "mdxType", "originalType", "parentName"]),
            u = p(a),
            d = n,
            g = u["".concat(l, ".").concat(d)] || u[d] || m[d] || o;
          return a
            ? r.createElement(g, i(i({ ref: t }, s), {}, { components: a }))
            : r.createElement(g, i({ ref: t }, s));
        });
      function g(e, t) {
        var a = arguments,
          n = t && t.mdxType;
        if ("string" == typeof e || n) {
          var o = a.length,
            i = new Array(o);
          i[0] = d;
          var c = {};
          for (var l in t) hasOwnProperty.call(t, l) && (c[l] = t[l]);
          (c.originalType = e),
            (c[u] = "string" == typeof e ? e : n),
            (i[1] = c);
          for (var p = 2; p < o; p++) i[p] = a[p];
          return r.createElement.apply(null, i);
        }
        return r.createElement.apply(null, a);
      }
      d.displayName = "MDXCreateElement";
    },
    187: (e, t, a) => {
      a.r(t),
        a.d(t, {
          assets: () => l,
          contentTitle: () => i,
          default: () => m,
          frontMatter: () => o,
          metadata: () => c,
          toc: () => p
        });
      var r = a(7462),
        n = (a(7294), a(3905));
      const o = { sidebar_position: 1 },
        i = "Create a Page",
        c = {
          unversionedId: "tutorial-basics/create-a-page",
          id: "tutorial-basics/create-a-page",
          title: "Create a Page",
          description:
            "Add Markdown or React files to src/pages to create a standalone page:",
          source: "@site/docs/tutorial-basics/create-a-page.md",
          sourceDirName: "tutorial-basics",
          slug: "/tutorial-basics/create-a-page",
          permalink: "/react-router-manage/docs/tutorial-basics/create-a-page",
          draft: !1,
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial-basics/create-a-page.md",
          tags: [],
          version: "current",
          sidebarPosition: 1,
          frontMatter: { sidebar_position: 1 },
          sidebar: "tutorialSidebar",
          previous: {
            title: "Tutorial - Basics",
            permalink: "/react-router-manage/docs/category/tutorial---basics"
          },
          next: {
            title: "Create a Document",
            permalink:
              "/react-router-manage/docs/tutorial-basics/create-a-document"
          }
        },
        l = {},
        p = [
          {
            value: "Create your first React Page",
            id: "create-your-first-react-page",
            level: 2
          },
          {
            value: "Create your first Markdown Page",
            id: "create-your-first-markdown-page",
            level: 2
          }
        ],
        s = { toc: p },
        u = "wrapper";
      function m(e) {
        let { components: t, ...a } = e;
        return (0, n.kt)(
          u,
          (0, r.Z)({}, s, a, { components: t, mdxType: "MDXLayout" }),
          (0, n.kt)("h1", { id: "create-a-page" }, "Create a Page"),
          (0, n.kt)(
            "p",
            null,
            "Add ",
            (0, n.kt)("strong", { parentName: "p" }, "Markdown or React"),
            " files to ",
            (0, n.kt)("inlineCode", { parentName: "p" }, "src/pages"),
            " to create a ",
            (0, n.kt)("strong", { parentName: "p" }, "standalone page"),
            ":"
          ),
          (0, n.kt)(
            "ul",
            null,
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              (0, n.kt)(
                "inlineCode",
                { parentName: "li" },
                "src/pages/index.js"
              ),
              " \u2192 ",
              (0, n.kt)("inlineCode", { parentName: "li" }, "localhost:3000/")
            ),
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              (0, n.kt)("inlineCode", { parentName: "li" }, "src/pages/foo.md"),
              " \u2192 ",
              (0, n.kt)(
                "inlineCode",
                { parentName: "li" },
                "localhost:3000/foo"
              )
            ),
            (0, n.kt)(
              "li",
              { parentName: "ul" },
              (0, n.kt)(
                "inlineCode",
                { parentName: "li" },
                "src/pages/foo/bar.js"
              ),
              " \u2192 ",
              (0, n.kt)(
                "inlineCode",
                { parentName: "li" },
                "localhost:3000/foo/bar"
              )
            )
          ),
          (0, n.kt)(
            "h2",
            { id: "create-your-first-react-page" },
            "Create your first React Page"
          ),
          (0, n.kt)(
            "p",
            null,
            "Create a file at ",
            (0, n.kt)(
              "inlineCode",
              { parentName: "p" },
              "src/pages/my-react-page.js"
            ),
            ":"
          ),
          (0, n.kt)(
            "pre",
            null,
            (0, n.kt)(
              "code",
              {
                parentName: "pre",
                className: "language-jsx",
                metastring: 'title="src/pages/my-react-page.js"',
                title: '"src/pages/my-react-page.js"'
              },
              "import React from 'react';\nimport Layout from '@theme/Layout';\n\nexport default function MyReactPage() {\n  return (\n    <Layout>\n      <h1>My React page</h1>\n      <p>This is a React page</p>\n    </Layout>\n  );\n}\n"
            )
          ),
          (0, n.kt)(
            "p",
            null,
            "A new page is now available at ",
            (0, n.kt)(
              "a",
              { parentName: "p", href: "http://localhost:3000/my-react-page" },
              "http://localhost:3000/my-react-page"
            ),
            "."
          ),
          (0, n.kt)(
            "h2",
            { id: "create-your-first-markdown-page" },
            "Create your first Markdown Page"
          ),
          (0, n.kt)(
            "p",
            null,
            "Create a file at ",
            (0, n.kt)(
              "inlineCode",
              { parentName: "p" },
              "src/pages/my-markdown-page.md"
            ),
            ":"
          ),
          (0, n.kt)(
            "pre",
            null,
            (0, n.kt)(
              "code",
              {
                parentName: "pre",
                className: "language-mdx",
                metastring: 'title="src/pages/my-markdown-page.md"',
                title: '"src/pages/my-markdown-page.md"'
              },
              "# My Markdown page\n\nThis is a Markdown page\n"
            )
          ),
          (0, n.kt)(
            "p",
            null,
            "A new page is now available at ",
            (0, n.kt)(
              "a",
              {
                parentName: "p",
                href: "http://localhost:3000/my-markdown-page"
              },
              "http://localhost:3000/my-markdown-page"
            ),
            "."
          )
        );
      }
      m.isMDXComponent = !0;
    }
  }
]);
