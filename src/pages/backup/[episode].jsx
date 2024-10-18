import { useMemo } from 'react'
import Head from 'next/head'
import { parse } from 'rss-to-json'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { PlayButton } from '@/components/player/PlayButton'

export default function Episode({ episode }) {
  let date = new Date(episode.published)

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode]
  )
  let player = useAudioPlayer(audioPlayerData)

  return (
    <>
      <Head>
        <title>{`${episode.title} - Their Side`}</title>
        <meta name="description" content={episode.description} />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {episode.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
            <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
              {episode.description}
            </p>
          </header>
          <hr className="my-12 border-gray-200" />
          <div
            className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
          >
            <h2 id="topics">Topics</h2>
            <ul>
              <li>xxxxxxx saepe veritatis unde ea omnis repudiandae neque unde sapiente</li>
              <li>Praesentium velit ratione</li>
              <li>Deserunt ullam sit perspiciatis</li>
              <li>Omnis occaecati tempore numquam delectus iste iste odio</li>
              <li>Est qui consequuntur quis quia quod ipsum consectetur ad aperiam</li>
              <li>Voluptate laborum cum dignissimos esse debitis incidunt tempore</li>
            </ul>
            <h2 id="sponsors">Sponsors</h2>
            <ul>
              <li><a href="#">Initech</a> â€” Pioneers of the TPS report, Initech is actively looking for job-seekers with people skills who can work with customers to gather specifications and deliver them to the software people.</li>
              <li><a href="#">Globex Corporation</a> â€” Just a friendly and innocent high-tech company, with a casual work environment and an office without walls. Anything youâ€™ve heard about a â€œdoomsday deviceâ€ is pure conjecture and not based in fact.</li>
            </ul>
            <h2 id="links">Links</h2>
            <ul>
              <li><a href="#">Quis laboriosam</a> molestiae tempore necessitatibus</li>
              <li><a href="#">Sit autem</a> neque minima itaque sit commodi</li>
              <li>Eos ratione <a href="#">blanditiis</a></li>
              <li>Eius a <a href="#">qui quasi</a></li>
              <li>Laborum laudantium sunt <a href="#">mollitia aliquam</a> corporis</li>
            </ul>
          </div>
        </Container>
      </article>
    </>
  )
}

export async function getStaticProps({ params }) {
  let feed = await parse('https://their-side-feed.vercel.app/api/feed')
  let episode = feed.items
    .map(({ id, title, description, content, enclosures, published }) => ({
      id: id.toString(),
      title: `${id}: ${title}`,
      description,
      content,
      published,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }))
    .find(({ id }) => id === params.episode)

  if (!episode) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  let feed = await parse('https://their-side-feed.vercel.app/api/feed')

  return {
    paths: feed.items.map(({ id }) => ({
      params: {
        episode: id.toString(),
      },
    })),
    fallback: 'blocking',
  }
}
