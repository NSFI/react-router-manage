"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [948],
  {
    3905: (e, t, r) => {
      r.d(t, { Zo: () => u, kt: () => f });
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
      function l(e) {
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
      function i(e, t) {
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
      var s = o.createContext({}),
        c = function (e) {
          var t = o.useContext(s),
            r = t;
          return e && (r = "function" == typeof e ? e(t) : l(l({}, t), e)), r;
        },
        u = function (e) {
          var t = c(e.components);
          return o.createElement(s.Provider, { value: t }, e.children);
        },
        p = "mdxType",
        g = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return o.createElement(o.Fragment, {}, t);
          }
        },
        m = o.forwardRef(function (e, t) {
          var r = e.components,
            n = e.mdxType,
            a = e.originalType,
            s = e.parentName,
            u = i(e, ["components", "mdxType", "originalType", "parentName"]),
            p = c(r),
            m = n,
            f = p["".concat(s, ".").concat(m)] || p[m] || g[m] || a;
          return r
            ? o.createElement(f, l(l({ ref: t }, u), {}, { components: r }))
            : o.createElement(f, l({ ref: t }, u));
        });
      function f(e, t) {
        var r = arguments,
          n = t && t.mdxType;
        if ("string" == typeof e || n) {
          var a = r.length,
            l = new Array(a);
          l[0] = m;
          var i = {};
          for (var s in t) hasOwnProperty.call(t, s) && (i[s] = t[s]);
          (i.originalType = e),
            (i[p] = "string" == typeof e ? e : n),
            (l[1] = i);
          for (var c = 2; c < a; c++) l[c] = r[c];
          return o.createElement.apply(null, l);
        }
        return o.createElement.apply(null, r);
      }
      m.displayName = "MDXCreateElement";
    },
    3352: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => s,
          contentTitle: () => l,
          default: () => g,
          frontMatter: () => a,
          metadata: () => i,
          toc: () => c
        });
      var o = r(7462),
        n = (r(7294), r(3905));
      const a = {
          slug: "long-blog-post",
          title: "Long Blog Post",
          authors: "endi",
          tags: ["hello", "docusaurus"]
        },
        l = void 0,
        i = {
          permalink: "/react-router-manage/blog/long-blog-post",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2019-05-29-long-blog-post.md",
          source: "@site/blog/2019-05-29-long-blog-post.md",
          title: "Long Blog Post",
          description: "This is the summary of a very long blog post,",
          date: "2019-05-29T00:00:00.000Z",
          formattedDate: "May 29, 2019",
          tags: [
            {
              label: "hello",
              permalink: "/react-router-manage/blog/tags/hello"
            },
            {
              label: "docusaurus",
              permalink: "/react-router-manage/blog/tags/docusaurus"
            }
          ],
          readingTime: 2.05,
          hasTruncateMarker: !0,
          authors: [
            {
              name: "Endilie Yacop Sucipto",
              title: "Maintainer of Docusaurus",
              url: "https://github.com/endiliey",
              imageURL: "https://github.com/endiliey.png",
              key: "endi"
            }
          ],
          frontMatter: {
            slug: "long-blog-post",
            title: "Long Blog Post",
            authors: "endi",
            tags: ["hello", "docusaurus"]
          },
          prevItem: {
            title: "MDX Blog Post",
            permalink: "/react-router-manage/blog/mdx-blog-post"
          },
          nextItem: {
            title: "First Blog Post",
            permalink: "/react-router-manage/blog/first-blog-post"
          }
        },
        s = { authorsImageUrls: [void 0] },
        c = [],
        u = { toc: c },
        p = "wrapper";
      function g(e) {
        let { components: t, ...r } = e;
        return (0, n.kt)(
          p,
          (0, o.Z)({}, u, r, { components: t, mdxType: "MDXLayout" }),
          (0, n.kt)("p", null, "This is the summary of a very long blog post,"),
          (0, n.kt)(
            "p",
            null,
            "Use a ",
            (0, n.kt)("inlineCode", { parentName: "p" }, "\x3c!--"),
            " ",
            (0, n.kt)("inlineCode", { parentName: "p" }, "truncate"),
            " ",
            (0, n.kt)("inlineCode", { parentName: "p" }, "--\x3e"),
            " comment to limit blog post size in the list view."
          )
        );
      }
      g.isMDXComponent = !0;
    }
  }
]);
