import Head from 'next/head'
import Link from 'next/link'
import { toast, Bounce } from 'react-toastify'
import { Container } from '@/components/Container'
import { manufacturersData } from '@/data/manufacturers'

function PlayPauseIcon({ playing, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
      {playing ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
        />
      ) : (
        <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
      )}
    </svg>
  )
}

function ManufacturersEntry({ manufacture }) {
  return (
    <article
      aria-labelledby={`manufacture-${manufacture.manufacturerId}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`manufacturers-${manufacture.manufacturerId}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/manufacturers/manufacture/${manufacture.manufacturerId}`}>{manufacture.name}</Link>
          </h2>
          <p className="mt-1 text-base leading-7 text-slate-700">
            {manufacture.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                toast('⚠️  feature unavailable', {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                });
              }}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`${false ? 'Pause' : 'Play'} episode ${manufacture.name
                }}`}
            >
              <PlayPauseIcon
                playing={false}
                className="h-2.5 w-2.5 fill-current"
              />
              <span className="ml-3" aria-hidden="true">
                Listen
              </span>
            </button>
          </div>
        </div>
      </Container>
    </article>
  )
}


export default function ManufacturersList({ manufacturers }) {
  return (
    <>
      <Head>
        <title>
          VacciProfile by Global Health Press
        </title>
        <meta
          name="description"
          content="Convrsations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Manufacturers
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {manufacturers.map((manufacture) => {
            return (
              <ManufacturersEntry key={manufacture.manufacturerId} manufacture={manufacture} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      manufacturers: manufacturersData
    }
  }
}