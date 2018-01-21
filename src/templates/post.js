import React from 'react'
import Helmet from 'react-helmet'

import ArticleSchema from '../components/schema/article'
import Content from '../components/article/content'
import Disqus from '../components/disqus'
import Donation from '../components/donation'
import Header from '../components/article/header'
import Meta from '../components/meta'
import Related from '../components/related'

import excerpt from '../utils/excerpt'

export default function Template({ data, pathContext }) {
  const { site, markdownRemark: post } = data
  const metadata = site.siteMetadata;
  const { frontmatter } = post
  const { related } = pathContext

  const title = `${frontmatter.title} | manu.ninja`
  const description = frontmatter.summary || excerpt(post.html)
  const pageUrl = `${metadata.siteUrl}${frontmatter.path}`
  const imageUrl = frontmatter.thumbnail
    ? `${metadata.siteUrl}${frontmatter.thumbnail}`
    : `${metadata.siteUrl}/share.png`

  return (
    <div className="Column">
      <Helmet>
        {post.frontmatter.external && <meta name="robots" content="none" />}
      </Helmet>
      <Meta
        title={title}
        description={description}
        pageUrl={pageUrl}
        imageUrl={imageUrl}
      />
      <article className="Article">
        <Header post={post} />
        <Content post={post} siteUrl={metadata.siteUrl} />
      </article>
      <ArticleSchema
        title={title}
        description={description}
        date={frontmatter.date}
        imageUrl={imageUrl}
      />
      <Disqus url={pageUrl} identifier={frontmatter.path} />
      <Related posts={related || []} />
      <Donation />
    </div>
  )
}

export const pageQuery = graphql`
  query PostQuery($path: String!) {
    site {
      ...Index_siteMetadata
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      ...Index_frontmatter
    }
  }
`
