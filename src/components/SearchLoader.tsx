import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styled from 'styled-components'

const Loader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 0 15px;
  margin-top: 250px;
`

function SearchLoader() {
  return (
    <SkeletonTheme baseColor="#1f1e1e" highlightColor="#444">
      <Loader>
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
      </Loader>
      <Loader>
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="25vh"
          width="19vw"
          count={1}
        />
      </Loader>
    </SkeletonTheme>
  )
}

export default SearchLoader
