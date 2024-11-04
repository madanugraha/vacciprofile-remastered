import Head from 'next/head'
import { Container } from '@/components/Container'
import { manufacturersData } from '@/data/manufacturers';
import { getVaccineById } from '@/utils/vaccine';
import { pathogensData } from '@/data/pathogens';

export default function PathogenDetail({ pathogens }) {
    return (
        <>
            <Head>
                <title>{`${pathogens.name} - VacciProfile`}</title>
                <meta name="description" content={pathogens.description} />
            </Head>
            <article className="py-16 lg:py-36">
                <Container>
                    <header className="flex flex-col">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                                    {pathogens.name}
                                </h1>
                            </div>
                        </div>
                        <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
                            {pathogens.description}
                        </p>
                    </header>
                    <hr className="my-12 border-gray-200" />
                    <div
                        className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
                    >
                        <h2 id="pathogen">Linked Vaccines</h2>
                        <ul>
                            {pathogens.vaccines && pathogens.vaccines.length > 0 && pathogens.vaccines.map((vac) => {
                                return (
                                    <li key={vac.vaccineId}><a href="#">{getVaccineById(vac.vaccineId)?.name}</a></li>
                                )
                            })}

                        </ul>
                        <h2 id="sponsors">Other</h2>
                        <ul>
                            <li><a href={pathogens.link}>Reference Link</a> {pathogens.link}</li>
                        </ul>
                    </div>
                </Container>
            </article>
        </>
    )
}

export async function getStaticProps({ params }) {
    let pathogens = pathogensData.find(({ pathogenId }) => pathogenId.toString() === params.pathogenId)
    if (!pathogens) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            pathogens,
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    let data = pathogensData

    return {
        paths: data.map(({ pathogenId }) => ({
            params: {
                pathogenId: pathogenId.toString(),
            },
        })),
        fallback: 'blocking',
    }
}
