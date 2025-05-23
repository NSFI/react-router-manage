"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [3792],
  {
    3905: (e, t, n) => {
      n.d(t, { Zo: () => d, kt: () => v });
      var r = n(7294);
      function o(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      function a(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(n), !0).forEach(function (t) {
                o(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : a(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function i(e, t) {
        if (null == e) return {};
        var n,
          r,
          o = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              o = {},
              a = Object.keys(e);
            for (r = 0; r < a.length; r++)
              (n = a[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
            return o;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (r = 0; r < a.length; r++)
            (n = a[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (o[n] = e[n]));
        }
        return o;
      }
      var l = r.createContext({}),
        c = function (e) {
          var t = r.useContext(l),
            n = t;
          return e && (n = "function" == typeof e ? e(t) : s(s({}, t), e)), n;
        },
        d = function (e) {
          var t = c(e.components);
          return r.createElement(l.Provider, { value: t }, e.children);
        },
        u = "mdxType",
        p = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return r.createElement(r.Fragment, {}, t);
          }
        },
        m = r.forwardRef(function (e, t) {
          var n = e.components,
            o = e.mdxType,
            a = e.originalType,
            l = e.parentName,
            d = i(e, ["components", "mdxType", "originalType", "parentName"]),
            u = c(n),
            m = o,
            v = u["".concat(l, ".").concat(m)] || u[m] || p[m] || a;
          return n
            ? r.createElement(v, s(s({ ref: t }, d), {}, { components: n }))
            : r.createElement(v, s({ ref: t }, d));
        });
      function v(e, t) {
        var n = arguments,
          o = t && t.mdxType;
        if ("string" == typeof e || o) {
          var a = n.length,
            s = new Array(a);
          s[0] = m;
          var i = {};
          for (var l in t) hasOwnProperty.call(t, l) && (i[l] = t[l]);
          (i.originalType = e),
            (i[u] = "string" == typeof e ? e : o),
            (s[1] = i);
          for (var c = 2; c < a; c++) s[c] = n[c];
          return r.createElement.apply(null, s);
        }
        return r.createElement.apply(null, n);
      }
      m.displayName = "MDXCreateElement";
    },
    89: (e, t, n) => {
      n.r(t),
        n.d(t, {
          assets: () => l,
          contentTitle: () => s,
          default: () => p,
          frontMatter: () => a,
          metadata: () => i,
          toc: () => c
        });
      var r = n(7462),
        o = (n(7294), n(3905));
      const a = { sidebar_position: 1 },
        s = "Manage Docs Versions",
        i = {
          unversionedId: "tutorial-extras/manage-docs-versions",
          id: "tutorial-extras/manage-docs-versions",
          title: "Manage Docs Versions",
          description: "Docusaurus can manage multiple versions of your docs.",
          source: "@site/docs/tutorial-extras/manage-docs-versions.md",
          sourceDirName: "tutorial-extras",
          slug: "/tutorial-extras/manage-docs-versions",
          permalink:
            "/react-router-manage/docs/tutorial-extras/manage-docs-versions",
          draft: !1,
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial-extras/manage-docs-versions.md",
          tags: [],
          version: "current",
          sidebarPosition: 1,
          frontMatter: { sidebar_position: 1 },
          sidebar: "tutorialSidebar",
          previous: {
            title: "Tutorial - Extras",
            permalink: "/react-router-manage/docs/category/tutorial---extras"
          },
          next: {
            title: "Translate your site",
            permalink:
              "/react-router-manage/docs/tutorial-extras/translate-your-site"
          }
        },
        l = {},
        c = [
          {
            value: "Create a docs version",
            id: "create-a-docs-version",
            level: 2
          },
          {
            value: "Add a Version Dropdown",
            id: "add-a-version-dropdown",
            level: 2
          },
          {
            value: "Update an existing version",
            id: "update-an-existing-version",
            level: 2
          }
        ],
        d = { toc: c },
        u = "wrapper";
      function p(e) {
        let { components: t, ...a } = e;
        return (0, o.kt)(
          u,
          (0, r.Z)({}, d, a, { components: t, mdxType: "MDXLayout" }),
          (0, o.kt)(
            "h1",
            { id: "manage-docs-versions" },
            "Manage Docs Versions"
          ),
          (0, o.kt)(
            "p",
            null,
            "Docusaurus can manage multiple versions of your docs."
          ),
          (0, o.kt)(
            "h2",
            { id: "create-a-docs-version" },
            "Create a docs version"
          ),
          (0, o.kt)("p", null, "Release a version 1.0 of your project:"),
          (0, o.kt)(
            "pre",
            null,
            (0, o.kt)(
              "code",
              { parentName: "pre", className: "language-bash" },
              "npm run docusaurus docs:version 1.0\n"
            )
          ),
          (0, o.kt)(
            "p",
            null,
            "The ",
            (0, o.kt)("inlineCode", { parentName: "p" }, "docs"),
            " folder is copied into ",
            (0, o.kt)(
              "inlineCode",
              { parentName: "p" },
              "versioned_docs/version-1.0"
            ),
            " and ",
            (0, o.kt)("inlineCode", { parentName: "p" }, "versions.json"),
            " is created."
          ),
          (0, o.kt)("p", null, "Your docs now have 2 versions:"),
          (0, o.kt)(
            "ul",
            null,
            (0, o.kt)(
              "li",
              { parentName: "ul" },
              (0, o.kt)("inlineCode", { parentName: "li" }, "1.0"),
              " at ",
              (0, o.kt)(
                "inlineCode",
                { parentName: "li" },
                "http://localhost:3000/docs/"
              ),
              " for the version 1.0 docs"
            ),
            (0, o.kt)(
              "li",
              { parentName: "ul" },
              (0, o.kt)("inlineCode", { parentName: "li" }, "current"),
              " at ",
              (0, o.kt)(
                "inlineCode",
                { parentName: "li" },
                "http://localhost:3000/docs/next/"
              ),
              " for the ",
              (0, o.kt)(
                "strong",
                { parentName: "li" },
                "upcoming, unreleased docs"
              )
            )
          ),
          (0, o.kt)(
            "h2",
            { id: "add-a-version-dropdown" },
            "Add a Version Dropdown"
          ),
          (0, o.kt)(
            "p",
            null,
            "To navigate seamlessly across versions, add a version dropdown."
          ),
          (0, o.kt)(
            "p",
            null,
            "Modify the ",
            (0, o.kt)(
              "inlineCode",
              { parentName: "p" },
              "docusaurus.config.js"
            ),
            " file:"
          ),
          (0, o.kt)(
            "pre",
            null,
            (0, o.kt)(
              "code",
              {
                parentName: "pre",
                className: "language-js",
                metastring: 'title="docusaurus.config.js"',
                title: '"docusaurus.config.js"'
              },
              "module.exports = {\n  themeConfig: {\n    navbar: {\n      items: [\n        // highlight-start\n        {\n          type: 'docsVersionDropdown',\n        },\n        // highlight-end\n      ],\n    },\n  },\n};\n"
            )
          ),
          (0, o.kt)(
            "p",
            null,
            "The docs version dropdown appears in your navbar:"
          ),
          (0, o.kt)(
            "p",
            null,
            (0, o.kt)("img", {
              alt: "Docs Version Dropdown",
              src: n(3126).Z,
              width: "370",
              height: "302"
            })
          ),
          (0, o.kt)(
            "h2",
            { id: "update-an-existing-version" },
            "Update an existing version"
          ),
          (0, o.kt)(
            "p",
            null,
            "It is possible to edit versioned docs in their respective folder:"
          ),
          (0, o.kt)(
            "ul",
            null,
            (0, o.kt)(
              "li",
              { parentName: "ul" },
              (0, o.kt)(
                "inlineCode",
                { parentName: "li" },
                "versioned_docs/version-1.0/hello.md"
              ),
              " updates ",
              (0, o.kt)(
                "inlineCode",
                { parentName: "li" },
                "http://localhost:3000/docs/hello"
              )
            ),
            (0, o.kt)(
              "li",
              { parentName: "ul" },
              (0, o.kt)("inlineCode", { parentName: "li" }, "docs/hello.md"),
              " updates ",
              (0, o.kt)(
                "inlineCode",
                { parentName: "li" },
                "http://localhost:3000/docs/next/hello"
              )
            )
          )
        );
      }
      p.isMDXComponent = !0;
    },
    3126: (e, t, n) => {
      n.d(t, { Z: () => r });
      const r =
        n.p +
        "assets/images/docsVersionDropdown-35e13cbe46c9923327f30a76a90bff3b.png";
    }
  }
]);
