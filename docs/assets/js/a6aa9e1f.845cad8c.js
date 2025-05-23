"use strict";
(self.webpackChunkdocs = self.webpackChunkdocs || []).push([
  [3089],
  {
    46: (e, t, a) => {
      a.r(t), a.d(t, { default: () => u });
      var n = a(7294),
        l = a(6010),
        r = a(2263),
        i = a(1944),
        o = a(5281),
        s = a(9058),
        c = a(9703),
        m = a(197),
        g = a(9985);
      function p(e) {
        const { metadata: t } = e,
          {
            siteConfig: { title: a }
          } = (0, r.Z)(),
          { blogDescription: l, blogTitle: o, permalink: s } = t,
          c = "/" === s ? a : o;
        return n.createElement(
          n.Fragment,
          null,
          n.createElement(i.d, { title: c, description: l }),
          n.createElement(m.Z, { tag: "blog_posts_list" })
        );
      }
      function d(e) {
        const { metadata: t, items: a, sidebar: l } = e;
        return n.createElement(
          s.Z,
          { sidebar: l },
          n.createElement(g.Z, { items: a }),
          n.createElement(c.Z, { metadata: t })
        );
      }
      function u(e) {
        return n.createElement(
          i.FG,
          { className: (0, l.Z)(o.k.wrapper.blogPages, o.k.page.blogListPage) },
          n.createElement(p, e),
          n.createElement(d, e)
        );
      }
    },
    9703: (e, t, a) => {
      a.d(t, { Z: () => i });
      var n = a(7294),
        l = a(5999),
        r = a(2244);
      function i(e) {
        const { metadata: t } = e,
          { previousPage: a, nextPage: i } = t;
        return n.createElement(
          "nav",
          {
            className: "pagination-nav",
            "aria-label": (0, l.I)({
              id: "theme.blog.paginator.navAriaLabel",
              message: "Blog list page navigation",
              description: "The ARIA label for the blog pagination"
            })
          },
          a &&
            n.createElement(r.Z, {
              permalink: a,
              title: n.createElement(
                l.Z,
                {
                  id: "theme.blog.paginator.newerEntries",
                  description:
                    "The label used to navigate to the newer blog posts page (previous page)"
                },
                "Newer Entries"
              )
            }),
          i &&
            n.createElement(r.Z, {
              permalink: i,
              title: n.createElement(
                l.Z,
                {
                  id: "theme.blog.paginator.olderEntries",
                  description:
                    "The label used to navigate to the older blog posts page (next page)"
                },
                "Older Entries"
              ),
              isNext: !0
            })
        );
      }
    },
    9985: (e, t, a) => {
      a.d(t, { Z: () => i });
      var n = a(7294),
        l = a(9460),
        r = a(390);
      function i(e) {
        let { items: t, component: a = r.Z } = e;
        return n.createElement(
          n.Fragment,
          null,
          t.map(e => {
            let { content: t } = e;
            return n.createElement(
              l.n,
              { key: t.metadata.permalink, content: t },
              n.createElement(a, null, n.createElement(t, null))
            );
          })
        );
      }
    }
  }
]);
