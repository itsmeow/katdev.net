import { format } from 'date-fns'
import GenericListing from './GenericListing.tsx'
import { GrayMatterData } from '../util/posts'

interface BlogListingProps {
    data: GrayMatterData
    poem?: boolean
}

const BlogListing = ({ data, poem }: BlogListingProps) => {
    const formattedDate = format(data.meta.dateParsed, 'PPPP')
    return (
        <GenericListing
            linkTo={`/${poem ? 'poem' : 'blog'}/${data.id}`}
            title={data.meta.title}
            description={data.meta.description}
            meta={`${formattedDate} - ${data.wordCount.toLocaleString()} words`}
        />
    )
}

export default BlogListing
