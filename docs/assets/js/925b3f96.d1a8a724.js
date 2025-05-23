"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [9003],
  {
    3905: (e, t, r) => {
      r.d(t, { Zo: () => c, kt: () => f });
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
      function s(e) {
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
      function i(e, t) {
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
      var u = o.createContext({}),
        l = function (e) {
          var t = o.useContext(u),
            r = t;
          return e && (r = "function" == typeof e ? e(t) : s(s({}, t), e)), r;
        },
        c = function (e) {
          var t = l(e.components);
          return o.createElement(u.Provider, { value: t }, e.children);
        },
        p = "mdxType",
        m = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return o.createElement(o.Fragment, {}, t);
          }
        },
        g = o.forwardRef(function (e, t) {
          var r = e.components,
            a = e.mdxType,
            n = e.originalType,
            u = e.parentName,
            c = i(e, ["components", "mdxType", "originalType", "parentName"]),
            p = l(r),
            g = a,
            f = p["".concat(u, ".").concat(g)] || p[g] || m[g] || n;
          return r
            ? o.createElement(f, s(s({ ref: t }, c), {}, { components: r }))
            : o.createElement(f, s({ ref: t }, c));
        });
      function f(e, t) {
        var r = arguments,
          a = t && t.mdxType;
        if ("string" == typeof e || a) {
          var n = r.length,
            s = new Array(n);
          s[0] = g;
          var i = {};
          for (var u in t) hasOwnProperty.call(t, u) && (i[u] = t[u]);
          (i.originalType = e),
            (i[p] = "string" == typeof e ? e : a),
            (s[1] = i);
          for (var l = 2; l < n; l++) s[l] = r[l];
          return o.createElement.apply(null, s);
        }
        return o.createElement.apply(null, r);
      }
      g.displayName = "MDXCreateElement";
    },
    8856: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => u,
          contentTitle: () => s,
          default: () => m,
          frontMatter: () => n,
          metadata: () => i,
          toc: () => l
        });
      var o = r(7462),
        a = (r(7294), r(3905));
      const n = {
          slug: "first-blog-post",
          title: "First Blog Post",
          authors: {
            name: "Gao Wei",
            title: "Docusaurus Core Team",
            url: "https://github.com/wgao19",
            image_url: "https://github.com/wgao19.png"
          },
          tags: ["hola", "docusaurus"]
        },
        s = void 0,
        i = {
          permalink: "/react-router-manage/blog/first-blog-post",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2019-05-28-first-blog-post.md",
          source: "@site/blog/2019-05-28-first-blog-post.md",
          title: "First Blog Post",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet",
          date: "2019-05-28T00:00:00.000Z",
          formattedDate: "May 28, 2019",
          tags: [
            { label: "hola", permalink: "/react-router-manage/blog/tags/hola" },
            {
              label: "docusaurus",
              permalink: "/react-router-manage/blog/tags/docusaurus"
            }
          ],
          readingTime: 0.12,
          hasTruncateMarker: !1,
          authors: [
            {
              name: "Gao Wei",
              title: "Docusaurus Core Team",
              url: "https://github.com/wgao19",
              image_url: "https://github.com/wgao19.png",
              imageURL: "https://github.com/wgao19.png"
            }
          ],
          frontMatter: {
            slug: "first-blog-post",
            title: "First Blog Post",
            authors: {
              name: "Gao Wei",
              title: "Docusaurus Core Team",
              url: "https://github.com/wgao19",
              image_url: "https://github.com/wgao19.png",
              imageURL: "https://github.com/wgao19.png"
            },
            tags: ["hola", "docusaurus"]
          },
          prevItem: {
            title: "Long Blog Post",
            permalink: "/react-router-manage/blog/long-blog-post"
          }
        },
        u = { authorsImageUrls: [void 0] },
        l = [],
        c = { toc: l },
        p = "wrapper";
      function m(e) {
        let { components: t, ...r } = e;
        return (0, a.kt)(
          p,
          (0, o.Z)({}, c, r, { components: t, mdxType: "MDXLayout" }),
          (0, a.kt)(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"
          )
        );
      }
      m.isMDXComponent = !0;
    }
  }
]);
