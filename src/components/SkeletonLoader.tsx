import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonLoader() {
  return (
    <SkeletonTheme baseColor="#1f1e1e" highlightColor="#444">
      <section style={{ height: '88vh' }}>
        <Skeleton height="100%" count={1} />
      </section>
      <section
        style={{
          height: '10vh',
          minHeight: 270,
          marginTop: '1vh',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 15,
          padding: '0 10px',
        }}>
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="15vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="15vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="15vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="15vh"
          width="19vw"
          count={1}
        />
        <Skeleton
          style={{ minHeight: 270, minWidth: 250 }}
          height="15vh"
          width="19vw"
          count={1}
        />
      </section>
    </SkeletonTheme>
  )
}

export default SkeletonLoader
