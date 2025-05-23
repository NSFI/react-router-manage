"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [8636],
  {
    3905: (e, t, r) => {
      r.d(t, { Zo: () => p, kt: () => b });
      var o = r(7294);
      function n(e, t, r) {
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
      function a(e, t) {
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
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                n(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : a(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function c(e, t) {
        if (null == e) return {};
        var r,
          o,
          n = (function (e, t) {
            if (null == e) return {};
            var r,
              o,
              n = {},
              a = Object.keys(e);
            for (o = 0; o < a.length; o++)
              (r = a[o]), t.indexOf(r) >= 0 || (n[r] = e[r]);
            return n;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (o = 0; o < a.length; o++)
            (r = a[o]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (n[r] = e[r]));
        }
        return n;
      }
      var u = o.createContext({}),
        l = function (e) {
          var t = o.useContext(u),
            r = t;
          return e && (r = "function" == typeof e ? e(t) : s(s({}, t), e)), r;
        },
        p = function (e) {
          var t = l(e.components);
          return o.createElement(u.Provider, { value: t }, e.children);
        },
        i = "mdxType",
        m = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return o.createElement(o.Fragment, {}, t);
          }
        },
        g = o.forwardRef(function (e, t) {
          var r = e.components,
            n = e.mdxType,
            a = e.originalType,
            u = e.parentName,
            p = c(e, ["components", "mdxType", "originalType", "parentName"]),
            i = l(r),
            g = n,
            b = i["".concat(u, ".").concat(g)] || i[g] || m[g] || a;
          return r
            ? o.createElement(b, s(s({ ref: t }, p), {}, { components: r }))
            : o.createElement(b, s({ ref: t }, p));
        });
      function b(e, t) {
        var r = arguments,
          n = t && t.mdxType;
        if ("string" == typeof e || n) {
          var a = r.length,
            s = new Array(a);
          s[0] = g;
          var c = {};
          for (var u in t) hasOwnProperty.call(t, u) && (c[u] = t[u]);
          (c.originalType = e),
            (c[i] = "string" == typeof e ? e : n),
            (s[1] = c);
          for (var l = 2; l < a; l++) s[l] = r[l];
          return o.createElement.apply(null, s);
        }
        return o.createElement.apply(null, r);
      }
      g.displayName = "MDXCreateElement";
    },
    5145: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => u,
          contentTitle: () => s,
          default: () => m,
          frontMatter: () => a,
          metadata: () => c,
          toc: () => l
        });
      var o = r(7462),
        n = (r(7294), r(3905));
      const a = {
          slug: "mdx-blog-post",
          title: "MDX Blog Post",
          authors: ["slorber"],
          tags: ["docusaurus"]
        },
        s = void 0,
        c = {
          permalink: "/react-router-manage/blog/mdx-blog-post",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-08-01-mdx-blog-post.mdx",
          source: "@site/blog/2021-08-01-mdx-blog-post.mdx",
          title: "MDX Blog Post",
          description:
            "Blog posts support Docusaurus Markdown features, such as MDX.",
          date: "2021-08-01T00:00:00.000Z",
          formattedDate: "August 1, 2021",
          tags: [
            {
              label: "docusaurus",
              permalink: "/react-router-manage/blog/tags/docusaurus"
            }
          ],
          readingTime: 0.175,
          hasTruncateMarker: !1,
          authors: [
            {
              name: "S\xe9bastien Lorber",
              title: "Docusaurus maintainer",
              url: "https://sebastienlorber.com",
              imageURL: "https://github.com/slorber.png",
              key: "slorber"
            }
          ],
          frontMatter: {
            slug: "mdx-blog-post",
            title: "MDX Blog Post",
            authors: ["slorber"],
            tags: ["docusaurus"]
          },
          prevItem: {
            title: "Welcome",
            permalink: "/react-router-manage/blog/welcome"
          },
          nextItem: {
            title: "Long Blog Post",
            permalink: "/react-router-manage/blog/long-blog-post"
          }
        },
        u = { authorsImageUrls: [void 0] },
        l = [],
        p = { toc: l },
        i = "wrapper";
      function m(e) {
        let { components: t, ...r } = e;
        return (0, n.kt)(
          i,
          (0, o.Z)({}, p, r, { components: t, mdxType: "MDXLayout" }),
          (0, n.kt)(
            "p",
            null,
            "Blog posts support ",
            (0, n.kt)(
              "a",
              {
                parentName: "p",
                href: "https://docusaurus.io/docs/markdown-features"
              },
              "Docusaurus Markdown features"
            ),
            ", such as ",
            (0, n.kt)(
              "a",
              { parentName: "p", href: "https://mdxjs.com/" },
              "MDX"
            ),
            "."
          ),
          (0, n.kt)(
            "admonition",
            { type: "tip" },
            (0, n.kt)(
              "p",
              { parentName: "admonition" },
              "Use the power of React to create interactive blog posts."
            ),
            (0, n.kt)(
              "pre",
              { parentName: "admonition" },
              (0, n.kt)(
                "code",
                { parentName: "pre", className: "language-js" },
                "<button onClick={() => alert('button clicked!')}>Click me!</button>\n"
              )
            ),
            (0, n.kt)(
              "button",
              { onClick: () => alert("button clicked!") },
              "Click me!"
            )
          )
        );
      }
      m.isMDXComponent = !0;
    }
  }
]);
