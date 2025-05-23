"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [4607],
  {
    3905: (e, t, r) => {
      r.d(t, { Zo: () => u, kt: () => b });
      var a = r(7294);
      function o(e, t, r) {
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
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, a);
        }
        return r;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? n(Object(r), !0).forEach(function (t) {
                o(e, t, r[t]);
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
      function i(e, t) {
        if (null == e) return {};
        var r,
          a,
          o = (function (e, t) {
            if (null == e) return {};
            var r,
              a,
              o = {},
              n = Object.keys(e);
            for (a = 0; a < n.length; a++)
              (r = n[a]), t.indexOf(r) >= 0 || (o[r] = e[r]);
            return o;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          for (a = 0; a < n.length; a++)
            (r = n[a]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (o[r] = e[r]));
        }
        return o;
      }
      var l = a.createContext({}),
        c = function (e) {
          var t = a.useContext(l),
            r = t;
          return e && (r = "function" == typeof e ? e(t) : s(s({}, t), e)), r;
        },
        u = function (e) {
          var t = c(e.components);
          return a.createElement(l.Provider, { value: t }, e.children);
        },
        p = "mdxType",
        g = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return a.createElement(a.Fragment, {}, t);
          }
        },
        m = a.forwardRef(function (e, t) {
          var r = e.components,
            o = e.mdxType,
            n = e.originalType,
            l = e.parentName,
            u = i(e, ["components", "mdxType", "originalType", "parentName"]),
            p = c(r),
            m = o,
            b = p["".concat(l, ".").concat(m)] || p[m] || g[m] || n;
          return r
            ? a.createElement(b, s(s({ ref: t }, u), {}, { components: r }))
            : a.createElement(b, s({ ref: t }, u));
        });
      function b(e, t) {
        var r = arguments,
          o = t && t.mdxType;
        if ("string" == typeof e || o) {
          var n = r.length,
            s = new Array(n);
          s[0] = m;
          var i = {};
          for (var l in t) hasOwnProperty.call(t, l) && (i[l] = t[l]);
          (i.originalType = e),
            (i[p] = "string" == typeof e ? e : o),
            (s[1] = i);
          for (var c = 2; c < n; c++) s[c] = r[c];
          return a.createElement.apply(null, s);
        }
        return a.createElement.apply(null, r);
      }
      m.displayName = "MDXCreateElement";
    },
    5802: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => l,
          contentTitle: () => s,
          default: () => g,
          frontMatter: () => n,
          metadata: () => i,
          toc: () => c
        });
      var a = r(7462),
        o = (r(7294), r(3905));
      const n = { sidebar_position: 3 },
        s = "Create a Blog Post",
        i = {
          unversionedId: "tutorial-basics/create-a-blog-post",
          id: "tutorial-basics/create-a-blog-post",
          title: "Create a Blog Post",
          description:
            "Docusaurus creates a page for each blog post, but also a blog index page, a tag system, an RSS feed...",
          source: "@site/docs/tutorial-basics/create-a-blog-post.md",
          sourceDirName: "tutorial-basics",
          slug: "/tutorial-basics/create-a-blog-post",
          permalink:
            "/react-router-manage/docs/tutorial-basics/create-a-blog-post",
          draft: !1,
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial-basics/create-a-blog-post.md",
          tags: [],
          version: "current",
          sidebarPosition: 3,
          frontMatter: { sidebar_position: 3 },
          sidebar: "tutorialSidebar",
          previous: {
            title: "Create a Document",
            permalink:
              "/react-router-manage/docs/tutorial-basics/create-a-document"
          },
          next: {
            title: "Markdown Features",
            permalink:
              "/react-router-manage/docs/tutorial-basics/markdown-features"
          }
        },
        l = {},
        c = [
          {
            value: "Create your first Post",
            id: "create-your-first-post",
            level: 2
          }
        ],
        u = { toc: c },
        p = "wrapper";
      function g(e) {
        let { components: t, ...r } = e;
        return (0, o.kt)(
          p,
          (0, a.Z)({}, u, r, { components: t, mdxType: "MDXLayout" }),
          (0, o.kt)("h1", { id: "create-a-blog-post" }, "Create a Blog Post"),
          (0, o.kt)(
            "p",
            null,
            "Docusaurus creates a ",
            (0, o.kt)("strong", { parentName: "p" }, "page for each blog post"),
            ", but also a ",
            (0, o.kt)("strong", { parentName: "p" }, "blog index page"),
            ", a ",
            (0, o.kt)("strong", { parentName: "p" }, "tag system"),
            ", an ",
            (0, o.kt)("strong", { parentName: "p" }, "RSS"),
            " feed..."
          ),
          (0, o.kt)(
            "h2",
            { id: "create-your-first-post" },
            "Create your first Post"
          ),
          (0, o.kt)(
            "p",
            null,
            "Create a file at ",
            (0, o.kt)(
              "inlineCode",
              { parentName: "p" },
              "blog/2021-02-28-greetings.md"
            ),
            ":"
          ),
          (0, o.kt)(
            "pre",
            null,
            (0, o.kt)(
              "code",
              {
                parentName: "pre",
                className: "language-md",
                metastring: 'title="blog/2021-02-28-greetings.md"',
                title: '"blog/2021-02-28-greetings.md"'
              },
              "---\nslug: greetings\ntitle: Greetings!\nauthors:\n  - name: Joel Marcey\n    title: Co-creator of Docusaurus 1\n    url: https://github.com/JoelMarcey\n    image_url: https://github.com/JoelMarcey.png\n  - name: S\xe9bastien Lorber\n    title: Docusaurus maintainer\n    url: https://sebastienlorber.com\n    image_url: https://github.com/slorber.png\ntags: [greetings]\n---\n\nCongratulations, you have made your first post!\n\nFeel free to play around and edit this post as much you like.\n"
            )
          ),
          (0, o.kt)(
            "p",
            null,
            "A new blog post is now available at ",
            (0, o.kt)(
              "a",
              { parentName: "p", href: "http://localhost:3000/blog/greetings" },
              "http://localhost:3000/blog/greetings"
            ),
            "."
          )
        );
      }
      g.isMDXComponent = !0;
    }
  }
]);
