"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [6755],
  {
    3905: (e, t, r) => {
      r.d(t, { Zo: () => c, kt: () => f });
      var n = r(7294);
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
      function o(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? o(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : o(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function i(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++)
              (r = o[n]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (r = o[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (a[r] = e[r]));
        }
        return a;
      }
      var s = n.createContext({}),
        u = function (e) {
          var t = n.useContext(s),
            r = t;
          return e && (r = "function" == typeof e ? e(t) : l(l({}, t), e)), r;
        },
        c = function (e) {
          var t = u(e.components);
          return n.createElement(s.Provider, { value: t }, e.children);
        },
        d = "mdxType",
        p = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return n.createElement(n.Fragment, {}, t);
          }
        },
        m = n.forwardRef(function (e, t) {
          var r = e.components,
            a = e.mdxType,
            o = e.originalType,
            s = e.parentName,
            c = i(e, ["components", "mdxType", "originalType", "parentName"]),
            d = u(r),
            m = a,
            f = d["".concat(s, ".").concat(m)] || d[m] || p[m] || o;
          return r
            ? n.createElement(f, l(l({ ref: t }, c), {}, { components: r }))
            : n.createElement(f, l({ ref: t }, c));
        });
      function f(e, t) {
        var r = arguments,
          a = t && t.mdxType;
        if ("string" == typeof e || a) {
          var o = r.length,
            l = new Array(o);
          l[0] = m;
          var i = {};
          for (var s in t) hasOwnProperty.call(t, s) && (i[s] = t[s]);
          (i.originalType = e),
            (i[d] = "string" == typeof e ? e : a),
            (l[1] = i);
          for (var u = 2; u < o; u++) l[u] = r[u];
          return n.createElement.apply(null, l);
        }
        return n.createElement.apply(null, r);
      }
      m.displayName = "MDXCreateElement";
    },
    740: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => s,
          contentTitle: () => l,
          default: () => p,
          frontMatter: () => o,
          metadata: () => i,
          toc: () => u
        });
      var n = r(7462),
        a = (r(7294), r(3905));
      const o = { sidebar_position: 2 },
        l = "Translate your site",
        i = {
          unversionedId: "tutorial-extras/translate-your-site",
          id: "tutorial-extras/translate-your-site",
          title: "Translate your site",
          description: "Let's translate docs/intro.md to French.",
          source: "@site/docs/tutorial-extras/translate-your-site.md",
          sourceDirName: "tutorial-extras",
          slug: "/tutorial-extras/translate-your-site",
          permalink:
            "/react-router-manage/docs/tutorial-extras/translate-your-site",
          draft: !1,
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial-extras/translate-your-site.md",
          tags: [],
          version: "current",
          sidebarPosition: 2,
          frontMatter: { sidebar_position: 2 },
          sidebar: "tutorialSidebar",
          previous: {
            title: "Manage Docs Versions",
            permalink:
              "/react-router-manage/docs/tutorial-extras/manage-docs-versions"
          }
        },
        s = {},
        u = [
          { value: "Configure i18n", id: "configure-i18n", level: 2 },
          { value: "Translate a doc", id: "translate-a-doc", level: 2 },
          {
            value: "Start your localized site",
            id: "start-your-localized-site",
            level: 2
          },
          {
            value: "Add a Locale Dropdown",
            id: "add-a-locale-dropdown",
            level: 2
          },
          {
            value: "Build your localized site",
            id: "build-your-localized-site",
            level: 2
          }
        ],
        c = { toc: u },
        d = "wrapper";
      function p(e) {
        let { components: t, ...o } = e;
        return (0, a.kt)(
          d,
          (0, n.Z)({}, c, o, { components: t, mdxType: "MDXLayout" }),
          (0, a.kt)("h1", { id: "translate-your-site" }, "Translate your site"),
          (0, a.kt)(
            "p",
            null,
            "Let's translate ",
            (0, a.kt)("inlineCode", { parentName: "p" }, "docs/intro.md"),
            " to French."
          ),
          (0, a.kt)("h2", { id: "configure-i18n" }, "Configure i18n"),
          (0, a.kt)(
            "p",
            null,
            "Modify ",
            (0, a.kt)(
              "inlineCode",
              { parentName: "p" },
              "docusaurus.config.js"
            ),
            " to add support for the ",
            (0, a.kt)("inlineCode", { parentName: "p" }, "fr"),
            " locale:"
          ),
          (0, a.kt)(
            "pre",
            null,
            (0, a.kt)(
              "code",
              {
                parentName: "pre",
                className: "language-js",
                metastring: 'title="docusaurus.config.js"',
                title: '"docusaurus.config.js"'
              },
              "module.exports = {\n  i18n: {\n    defaultLocale: 'en',\n    locales: ['en', 'fr'],\n  },\n};\n"
            )
          ),
          (0, a.kt)("h2", { id: "translate-a-doc" }, "Translate a doc"),
          (0, a.kt)(
            "p",
            null,
            "Copy the ",
            (0, a.kt)("inlineCode", { parentName: "p" }, "docs/intro.md"),
            " file to the ",
            (0, a.kt)("inlineCode", { parentName: "p" }, "i18n/fr"),
            " folder:"
          ),
          (0, a.kt)(
            "pre",
            null,
            (0, a.kt)(
              "code",
              { parentName: "pre", className: "language-bash" },
              "mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/\n\ncp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md\n"
            )
          ),
          (0, a.kt)(
            "p",
            null,
            "Translate ",
            (0, a.kt)(
              "inlineCode",
              { parentName: "p" },
              "i18n/fr/docusaurus-plugin-content-docs/current/intro.md"
            ),
            " in French."
          ),
          (0, a.kt)(
            "h2",
            { id: "start-your-localized-site" },
            "Start your localized site"
          ),
          (0, a.kt)("p", null, "Start your site on the French locale:"),
          (0, a.kt)(
            "pre",
            null,
            (0, a.kt)(
              "code",
              { parentName: "pre", className: "language-bash" },
              "npm run start -- --locale fr\n"
            )
          ),
          (0, a.kt)(
            "p",
            null,
            "Your localized site is accessible at ",
            (0, a.kt)(
              "a",
              { parentName: "p", href: "http://localhost:3000/fr/" },
              "http://localhost:3000/fr/"
            ),
            " and the ",
            (0, a.kt)("inlineCode", { parentName: "p" }, "Getting Started"),
            " page is translated."
          ),
          (0, a.kt)(
            "admonition",
            { type: "caution" },
            (0, a.kt)(
              "p",
              { parentName: "admonition" },
              "In development, you can only use one locale at a same time."
            )
          ),
          (0, a.kt)(
            "h2",
            { id: "add-a-locale-dropdown" },
            "Add a Locale Dropdown"
          ),
          (0, a.kt)(
            "p",
            null,
            "To navigate seamlessly across languages, add a locale dropdown."
          ),
          (0, a.kt)(
            "p",
            null,
            "Modify the ",
            (0, a.kt)(
              "inlineCode",
              { parentName: "p" },
              "docusaurus.config.js"
            ),
            " file:"
          ),
          (0, a.kt)(
            "pre",
            null,
            (0, a.kt)(
              "code",
              {
                parentName: "pre",
                className: "language-js",
                metastring: 'title="docusaurus.config.js"',
                title: '"docusaurus.config.js"'
              },
              "module.exports = {\n  themeConfig: {\n    navbar: {\n      items: [\n        // highlight-start\n        {\n          type: 'localeDropdown',\n        },\n        // highlight-end\n      ],\n    },\n  },\n};\n"
            )
          ),
          (0, a.kt)(
            "p",
            null,
            "The locale dropdown now appears in your navbar:"
          ),
          (0, a.kt)(
            "p",
            null,
            (0, a.kt)("img", {
              alt: "Locale Dropdown",
              src: r(1795).Z,
              width: "370",
              height: "302"
            })
          ),
          (0, a.kt)(
            "h2",
            { id: "build-your-localized-site" },
            "Build your localized site"
          ),
          (0, a.kt)("p", null, "Build your site for a specific locale:"),
          (0, a.kt)(
            "pre",
            null,
            (0, a.kt)(
              "code",
              { parentName: "pre", className: "language-bash" },
              "npm run build -- --locale fr\n"
            )
          ),
          (0, a.kt)(
            "p",
            null,
            "Or build your site to include all the locales at once:"
          ),
          (0, a.kt)(
            "pre",
            null,
            (0, a.kt)(
              "code",
              { parentName: "pre", className: "language-bash" },
              "npm run build\n"
            )
          )
        );
      }
      p.isMDXComponent = !0;
    },
    1795: (e, t, r) => {
      r.d(t, { Z: () => n });
      const n =
        r.p +
        "assets/images/localeDropdown-f0d995e751e7656a1b0dbbc1134e49c2.png";
    }
  }
]);
