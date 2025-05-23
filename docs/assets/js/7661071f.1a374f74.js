"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [9642],
  {
    3905: (e, t, r) => {
      r.d(t, { Zo: () => i, kt: () => b });
      var n = r(7294);
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
      function a(e, t) {
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
            ? a(Object(r), !0).forEach(function (t) {
                o(e, t, r[t]);
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
      function u(e, t) {
        if (null == e) return {};
        var r,
          n,
          o = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              o = {},
              a = Object.keys(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
            return o;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (o[r] = e[r]));
        }
        return o;
      }
      var s = n.createContext({}),
        c = function (e) {
          var t = n.useContext(s),
            r = t;
          return e && (r = "function" == typeof e ? e(t) : l(l({}, t), e)), r;
        },
        i = function (e) {
          var t = c(e.components);
          return n.createElement(s.Provider, { value: t }, e.children);
        },
        p = "mdxType",
        g = {
          inlineCode: "code",
          wrapper: function (e) {
            var t = e.children;
            return n.createElement(n.Fragment, {}, t);
          }
        },
        m = n.forwardRef(function (e, t) {
          var r = e.components,
            o = e.mdxType,
            a = e.originalType,
            s = e.parentName,
            i = u(e, ["components", "mdxType", "originalType", "parentName"]),
            p = c(r),
            m = o,
            b = p["".concat(s, ".").concat(m)] || p[m] || g[m] || a;
          return r
            ? n.createElement(b, l(l({ ref: t }, i), {}, { components: r }))
            : n.createElement(b, l({ ref: t }, i));
        });
      function b(e, t) {
        var r = arguments,
          o = t && t.mdxType;
        if ("string" == typeof e || o) {
          var a = r.length,
            l = new Array(a);
          l[0] = m;
          var u = {};
          for (var s in t) hasOwnProperty.call(t, s) && (u[s] = t[s]);
          (u.originalType = e),
            (u[p] = "string" == typeof e ? e : o),
            (l[1] = u);
          for (var c = 2; c < a; c++) l[c] = r[c];
          return n.createElement.apply(null, l);
        }
        return n.createElement.apply(null, r);
      }
      m.displayName = "MDXCreateElement";
    },
    6911: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => s,
          contentTitle: () => l,
          default: () => g,
          frontMatter: () => a,
          metadata: () => u,
          toc: () => c
        });
      var n = r(7462),
        o = (r(7294), r(3905));
      const a = {
          slug: "welcome",
          title: "Welcome",
          authors: ["slorber", "yangshun"],
          tags: ["facebook", "hello", "docusaurus"]
        },
        l = void 0,
        u = {
          permalink: "/react-router-manage/blog/welcome",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-08-26-welcome/index.md",
          source: "@site/blog/2021-08-26-welcome/index.md",
          title: "Welcome",
          description:
            "Docusaurus blogging features are powered by the blog plugin.",
          date: "2021-08-26T00:00:00.000Z",
          formattedDate: "August 26, 2021",
          tags: [
            {
              label: "facebook",
              permalink: "/react-router-manage/blog/tags/facebook"
            },
            {
              label: "hello",
              permalink: "/react-router-manage/blog/tags/hello"
            },
            {
              label: "docusaurus",
              permalink: "/react-router-manage/blog/tags/docusaurus"
            }
          ],
          readingTime: 0.405,
          hasTruncateMarker: !1,
          authors: [
            {
              name: "S\xe9bastien Lorber",
              title: "Docusaurus maintainer",
              url: "https://sebastienlorber.com",
              imageURL: "https://github.com/slorber.png",
              key: "slorber"
            },
            {
              name: "Yangshun Tay",
              title: "Front End Engineer @ Facebook",
              url: "https://github.com/yangshun",
              imageURL: "https://github.com/yangshun.png",
              key: "yangshun"
            }
          ],
          frontMatter: {
            slug: "welcome",
            title: "Welcome",
            authors: ["slorber", "yangshun"],
            tags: ["facebook", "hello", "docusaurus"]
          },
          nextItem: {
            title: "MDX Blog Post",
            permalink: "/react-router-manage/blog/mdx-blog-post"
          }
        },
        s = { authorsImageUrls: [void 0, void 0] },
        c = [],
        i = { toc: c },
        p = "wrapper";
      function g(e) {
        let { components: t, ...a } = e;
        return (0, o.kt)(
          p,
          (0, n.Z)({}, i, a, { components: t, mdxType: "MDXLayout" }),
          (0, o.kt)(
            "p",
            null,
            (0, o.kt)(
              "a",
              { parentName: "p", href: "https://docusaurus.io/docs/blog" },
              "Docusaurus blogging features"
            ),
            " are powered by the ",
            (0, o.kt)(
              "a",
              {
                parentName: "p",
                href: "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog"
              },
              "blog plugin"
            ),
            "."
          ),
          (0, o.kt)(
            "p",
            null,
            "Simply add Markdown files (or folders) to the ",
            (0, o.kt)("inlineCode", { parentName: "p" }, "blog"),
            " directory."
          ),
          (0, o.kt)(
            "p",
            null,
            "Regular blog authors can be added to ",
            (0, o.kt)("inlineCode", { parentName: "p" }, "authors.yml"),
            "."
          ),
          (0, o.kt)(
            "p",
            null,
            "The blog post date can be extracted from filenames, such as:"
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
                "2019-05-30-welcome.md"
              )
            ),
            (0, o.kt)(
              "li",
              { parentName: "ul" },
              (0, o.kt)(
                "inlineCode",
                { parentName: "li" },
                "2019-05-30-welcome/index.md"
              )
            )
          ),
          (0, o.kt)(
            "p",
            null,
            "A blog post folder can be convenient to co-locate blog post images:"
          ),
          (0, o.kt)(
            "p",
            null,
            (0, o.kt)("img", {
              alt: "Docusaurus Plushie",
              src: r(9278).Z,
              width: "1500",
              height: "500"
            })
          ),
          (0, o.kt)("p", null, "The blog supports tags as well!"),
          (0, o.kt)(
            "p",
            null,
            (0, o.kt)(
              "strong",
              { parentName: "p" },
              "And if you don't want a blog"
            ),
            ": just delete this directory, and use ",
            (0, o.kt)("inlineCode", { parentName: "p" }, "blog: false"),
            " in your Docusaurus config."
          )
        );
      }
      g.isMDXComponent = !0;
    },
    9278: (e, t, r) => {
      r.d(t, { Z: () => n });
      const n =
        r.p +
        "assets/images/docusaurus-plushie-banner-a60f7593abca1e3eef26a9afa244e4fb.jpeg";
    }
  }
]);
