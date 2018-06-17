import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

// react - helmet is a React component that can be used to manage any changes to the document head.
// I use this component here in the Template component to get a dynamic title of the blog post.

// Another thing to note in this component is the div with dangerouslySetInnerHTML API.
// I am using it here to render the HTML that is being created by Gatsby from the markdown file.

// I have created a new GraphQL query called pageQuery.
// This query is what will actually put our posts into the template. This query in turn contains another
// query called BlogPostByPath. This will get us the html and the frontmatter data.

const Template = ({ data, location, pathContext }) => {
  const { markdownRemark: post } = data;
  const { frontmatter, html } = post;
  const { title, date } = frontmatter;
  const { next, prev } = pathContext;

  return(
    <div>
      <Helmet title={`${title} - My Blog`} />
      <div>
        <h1>{title}</h1>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <p>
          {prev &&
            <Link to={prev.frontmatter.path}>
              Previous: {prev.frontmatter.title}
            </Link>
          }
        </p>
        <p>
          {next &&
            <Link to={next.frontmatter.path}>
              Next: {next.frontmatter.title}
            </Link>}
        </p>
      </div>
    </div >
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM, DD, YYYY")
        path
        tags
        excerpt
      }
    }
  }
`

export default Template;