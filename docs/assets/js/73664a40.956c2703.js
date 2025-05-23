"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [3514],
  {
    3905: (e, t, o) => {
      o.d(t, { Zo: () => a, kt: () => g });
      var i = o(7294);
      function s(e, t, o) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = o),
          e
        );
      }
      function r(e, t) {
        var o = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          t &&
            (i = i.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            o.push.apply(o, i);
        }
        return o;
      }
      function n(e) {
        for (var t = 1; t < arguments.length; t++) {
          var o = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? r(Object(o), !0).forEach(function (t) {
                s(e, t, o[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
            : r(Object(o)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(o, t)
                );
              });
        }
        return e;
      }
      function u(e, t) {
        if (null == e) return {};
        var o,
          i,
          s = (function (e, t) {
            if (null == e) return {};
            var o,
              i,
              s = {},
              r = Object.keys(e);
            for (i = 0; i < r.length; i++)
              (o = r[i]), t.indexOf(o) >= 0 || (s[o] = e[o]);
            return s;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (i = 0; i < r.length; i++)
            (o = r[i]),
              t.indexOf(o) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, o) &&
                  (s[o] = e[o]));
        }
        return s;
      }
      var l = i.createContext({}),
        m = function (e) {
          var t = i.useContext(l),
            o = t;
          return e && (o = "function" == typeof e ? e(t) : n(n({}, t), e)), o;
        },
        a = function (e) {
          var t = m(e.components);
          return i.createElement(l.Provider, { value: t }, e.children);
        },
        c = "mdxType",
        p = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return i.createElement(i.Fragment, {}, t);
          }
        },
        d = i.forwardRef(function (e, t) {
          var o = e.components,
            s = e.mdxType,
            r = e.originalType,
            l = e.parentName,
            a = u(e, ["components", "mdxType", "originalType", "parentName"]),
            c = m(o),
            d = s,
            g = c["".concat(l, ".").concat(d)] || c[d] || p[d] || r;
          return o
            ? i.createElement(g, n(n({ ref: t }, a), {}, { components: o }))
            : i.createElement(g, n({ ref: t }, a));
        });
      function g(e, t) {
        var o = arguments,
          s = t && t.mdxType;
        if ("string" == typeof e || s) {
          var r = o.length,
            n = new Array(r);
          n[0] = d;
          var u = {};
          for (var l in t) hasOwnProperty.call(t, l) && (u[l] = t[l]);
          (u.originalType = e),
            (u[c] = "string" == typeof e ? e : s),
            (n[1] = u);
          for (var m = 2; m < r; m++) n[m] = o[m];
          return i.createElement.apply(null, n);
        }
        return i.createElement.apply(null, o);
      }
      d.displayName = "MDXCreateElement";
    },
    1976: (e, t, o) => {
      o.r(t),
        o.d(t, {
          assets: () => l,
          contentTitle: () => n,
          default: () => p,
          frontMatter: () => r,
          metadata: () => u,
          toc: () => m
        });
      var i = o(7462),
        s = (o(7294), o(3905));
      const r = {
          slug: "long-blog-post",
          title: "Long Blog Post",
          authors: "endi",
          tags: ["hello", "docusaurus"]
        },
        n = void 0,
        u = {
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
        l = { authorsImageUrls: [void 0] },
        m = [],
        a = { toc: m },
        c = "wrapper";
      function p(e) {
        let { components: t, ...o } = e;
        return (0, s.kt)(
          c,
          (0, i.Z)({}, a, o, { components: t, mdxType: "MDXLayout" }),
          (0, s.kt)("p", null, "This is the summary of a very long blog post,"),
          (0, s.kt)(
            "p",
            null,
            "Use a ",
            (0, s.kt)("inlineCode", { parentName: "p" }, "\x3c!--"),
            " ",
            (0, s.kt)("inlineCode", { parentName: "p" }, "truncate"),
            " ",
            (0, s.kt)("inlineCode", { parentName: "p" }, "--\x3e"),
            " comment to limit blog post size in the list view."
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          ),
          (0, s.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          )
        );
      }
      p.isMDXComponent = !0;
    }
  }
]);
