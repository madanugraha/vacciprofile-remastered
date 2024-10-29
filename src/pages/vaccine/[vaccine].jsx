import { useMemo } from 'react'
import Head from 'next/head'
import { parse } from 'rss-to-json'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { vaccinesData } from '@/data/vaccines'

export default function Vaccine({ vaccine }) {
    // let date = new Date()
    // let audioPlayerData = useMemo(
    //     () => ({
    //         title: episode.title,
    //         audio: {
    //             src: episode.audio.src,
    //             type: episode.audio.type,
    //         },
    //         link: `/${episode.id}`,
    //     }),
    //     [episode]
    // )
    // let player = useAudioPlayer(audioPlayerData)
    return (
        <>
            <Head>
                <title>{`${vaccine.name} - VacciProfile`}</title>
                <meta name="description" content={vaccine.description} />
            </Head>
            <article className="py-16 lg:py-36">
                <Container>
                    <header className="flex flex-col">
                        <div className="flex items-center gap-6">
                            {/* <PlayButton player={player} size="large" /> */}
                            <div className="flex flex-col">
                                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                                    {vaccine.name}
                                </h1>
                                <FormattedDate
                                    date={new Date()}
                                    className="order-first font-mono text-sm leading-7 text-slate-500"
                                />
                            </div>
                        </div>
                        <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
                            {vaccine.description}
                        </p>
                    </header>
                    <hr className="my-12 border-gray-200" />
                    <div
                        className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
                    >
                        <h2 id="manufacture">Manufacturers</h2>
                        <ul>
                            <li><a href="#">Pfizer</a>&nbsp;&nbsp;Pfizer Inc. is a leading global biopharmaceutical company dedicated to the discovery, development, and manufacture of innovative health solutions. Founded in 1849 and headquartered in New York City, Pfizer has a long history of pioneering advances in medicine, with a portfolio that includes vaccines, biologics, and small molecules across various therapeutic areas</li>
                        </ul>
                        <h2 id="pathogen">Pathogens</h2>
                        <ul>
                            <li><a href="#">Respiratory Syncytial Virus (RSV)</a>&nbsp;&nbsp;Respiratory Syncytial Virus (RSV) is a common respiratory virus that causes infections in the lungs and respiratory tract. It is known for causing cold-like symptoms, but it can lead to more severe respiratory illnesses, such as bronchiolitis and pneumonia, particularly in young children and older adults. RSV is highly contagious and spreads through respiratory droplets, making it a significant concern during the winter months.</li>
                        </ul>
                        <h2 id="sponsors">Licensing Authorities</h2>
                        <ul>
                            <li><a href="https://www.fda.gov/media/168889/download?attachment">FDA</a> U.S. Food and Drug Administration</li>
                            <li><a href="https://www.ema.europa.eu/en/medicines/human/EPAR/abrysvo">EMA</a> European Medicines Agency</li>
                        </ul>
                        <h2 id="links">Licensing Dates</h2>
                        <ul>
                            <li><a href="https://s28.q4cdn.com/781576035/files/doc_financials/2023/ar/2023-10k.pdf">FDA</a> Maternal / 08/2023</li>
                            <li><a href="https://s28.q4cdn.com/781576035/files/doc_financials/2023/ar/2023-10k.pdf">FDA</a> Older Adults / 05/2023</li>
                        </ul>
                    </div>
                </Container>
            </article>
        </>
    )
}

export async function getStaticProps({ params }) {
    let vaccine = vaccinesData.find(({ vaccineId }) => vaccineId.toString() === params.vaccine)
    if (!vaccine) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            vaccine,
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    let data = vaccinesData

    return {
        paths: data.map(({ vaccineId }) => ({
            params: {
                vaccine: vaccineId.toString(),
            },
        })),
        fallback: 'blocking',
    }
}
