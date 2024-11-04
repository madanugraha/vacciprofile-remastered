import Head from 'next/head'
import { Container } from '@/components/Container'
import { licensersData } from '@/data/licensers';

export default function LicenserDetail({ licensers }) {
    return (
        <>
            <Head>
                <title>{`${licensers.fullName} - VacciProfile`}</title>
                <meta name="description" content={licensers.description} />
            </Head>
            <article className="py-16 lg:py-36">
                <Container>
                    <header className="flex flex-col">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                                    {licensers.fullName}
                                </h1>
                            </div>
                        </div>
                        <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
                            {licensers.description}
                        </p>
                    </header>
                </Container>
            </article>
        </>
    )
}

export async function getStaticProps({ params }) {
    let licensers = licensersData.find(({ licenserId }) => licenserId.toString() === params.licenserId)
    if (!licensers) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            licensers,
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    let data = licensersData
    return {
        paths: data.map(({ licenserId }) => ({
            params: {
                licenserId: licenserId.toString(),
            },
        })),
        fallback: 'blocking',
    }
}
